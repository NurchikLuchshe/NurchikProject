// Функция для получения пользователей из базы данных
export const getUsers = async () => {
  try {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Функция для сохранения пользователей в базу данных
export const saveUsers = async (users) => {
  try {
    localStorage.setItem('users', JSON.stringify(users))
    return true
  } catch (error) {
    console.error('Error saving users:', error)
    return false
  }
}

// Функция для добавления нового пользователя
export const addUser = async (user) => {
  const users = await getUsers()
  users.push(user)
  return await saveUsers(users)
}

// Функция для проверки существования email
export const checkEmailExists = async (email) => {
  const users = await getUsers()
  return users.some(user => user.email === email)
} 