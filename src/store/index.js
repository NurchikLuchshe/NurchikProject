import { createStore } from 'vuex'
import { validateCredentials, verifyPassword, hashPassword } from '@/utils/auth'
import { getUsers, addUser, checkEmailExists, saveUsers } from '@/utils/db'

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    userAvatar: null,
    darkTheme: false,
    users: []
  },
  mutations: {
    setAuthenticated(state, value) {
      state.isAuthenticated = value
    },
    setUser(state, user) {
      state.user = user
    },
    setUsers(state, users) {
      state.users = users
    },
    addUser(state, user) {
      state.users.push(user)
    },
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme
      localStorage.setItem('darkTheme', state.darkTheme)
      if (state.darkTheme) {
        document.body.classList.add('dark-theme')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.body.classList.remove('dark-theme')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    },
    initTheme(state) {
      const darkTheme = localStorage.getItem('darkTheme') === 'true'
      state.darkTheme = darkTheme
      if (darkTheme) {
        document.body.classList.add('dark-theme')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.body.classList.remove('dark-theme')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    },
    initAuth(state) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      const user = JSON.parse(localStorage.getItem('user'))
      const savedAvatar = localStorage.getItem('userAvatar')
      
      state.isAuthenticated = isAuthenticated
      state.user = user
      if (savedAvatar) {
        state.userAvatar = savedAvatar
      }
    },
    setUserAvatar(state, avatar) {
      state.userAvatar = avatar
      localStorage.setItem('userAvatar', avatar)
    }
  },
  actions: {
    async getUsers({ commit }) {
      const users = await getUsers()
      commit('setUsers', users)
      return users
    },
    async saveUsers({ commit }, users) {
      const success = await saveUsers(users)
      if (success) {
        commit('setUsers', users)
      }
      return success
    },
    hashPassword(_, password) {
      return hashPassword(password)
    },
    async login({ commit, state, dispatch }, credentials) {
      try {
        // Извлекаем данные из FormData, если это FormData
        let email, password;
        
        if (credentials instanceof FormData) {
          email = credentials.get('email');
          password = credentials.get('password');
        } else {
          email = credentials.email;
          password = credentials.password;
        }
        
        // Валидация учетных данных
        const validation = validateCredentials(email, password)
        if (!validation.isValid) {
          throw new Error(validation.errors.join(', '))
        }

        // Получаем список пользователей
        const users = await getUsers()
        
        // Ищем пользователя по email
        const user = users.find(u => u.email === email)
        
        if (!user) {
          throw new Error('Пользователь с таким email не найден')
        }

        // Проверяем пароль
        if (!verifyPassword(password, user.password)) {
          throw new Error('Неверный пароль')
        }

        // Если все проверки пройдены, создаем объект пользователя без пароля
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email
        }

        // Сохраняем состояние
        commit('setAuthenticated', true)
        commit('setUser', userData)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(userData))
        
        return userData
      } catch (error) {
        throw error
      }
    },
    async register({ commit, state, dispatch }, credentials) {
      try {
        // Извлекаем данные из FormData, если это FormData
        let username, email, password, avatar;
        
        if (credentials instanceof FormData) {
          username = credentials.get('username');
          email = credentials.get('email');
          password = credentials.get('password');
          avatar = credentials.get('avatar');
        } else {
          username = credentials.username;
          email = credentials.email;
          password = credentials.password;
          avatar = credentials.avatar;
        }
        
        // Валидация учетных данных
        const validation = validateCredentials(email, password)
        if (!validation.isValid) {
          throw new Error(validation.errors.join(', '))
        }

        // Проверяем, существует ли пользователь
        const exists = await checkEmailExists(email)
        if (exists) {
          throw new Error('Пользователь с таким email уже существует')
        }

        // Создаем нового пользователя с хешированным паролем
        const newUser = {
          id: Date.now(),
          username: username,
          email: email,
          password: hashPassword(password)
        }

        // Добавляем пользователя в базу данных
        const success = await addUser(newUser)
        if (!success) {
          throw new Error('Ошибка при сохранении пользователя')
        }

        // Создаем объект пользователя без пароля
        const userData = {
          id: newUser.id,
          username: username,
          email: email
        }

        // Сохраняем состояние
        commit('setAuthenticated', true)
        commit('setUser', userData)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Если есть аватар, сохраняем его
        if (avatar) {
          // В реальном проекте здесь должна быть загрузка файла на сервер
          // Для демонстрации используем URL.createObjectURL
          const avatarUrl = URL.createObjectURL(avatar)
          commit('setUserAvatar', avatarUrl)
        }
        
        return userData
      } catch (error) {
        throw error
      }
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('setAuthenticated', false)
        commit('setUser', null)
        commit('setUserAvatar', null)
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        localStorage.removeItem('userAvatar')
        resolve()
      })
    },
    async init({ commit, dispatch }) {
      await dispatch('getUsers')
      commit('initAuth')
      commit('initTheme')
    },
    showNotification({ commit }, notification) {
      if (window.$notify) {
        window.$notify(notification)
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    isDarkTheme: state => state.darkTheme
  }
}) 