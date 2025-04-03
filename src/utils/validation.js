// Регулярное выражение для проверки email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Проверка существования email через localStorage
export const checkEmailExists = async (email) => {
  try {
    // Получаем список пользователей из localStorage
    const users = localStorage.getItem('users')
    const usersList = users ? JSON.parse(users) : []
    return usersList.some(user => user.email === email)
  } catch (error) {
    console.error('Error checking email:', error)
    return false
  }
}

// Проверка формата email
export const validateEmailFormat = (email) => {
  return emailRegex.test(email);
};

// Проверка пароля
export const validatePassword = (password) => {
  const errors = [];
  
  // Минимальная длина
  if (password.length < 8) {
    errors.push('Пароль должен содержать минимум 8 символов');
  }
  
  // Проверка на наличие заглавных букв
  if (!/[A-Z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну заглавную букву');
  }
  
  // Проверка на наличие строчных букв
  if (!/[a-z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну строчную букву');
  }
  
  // Проверка на наличие цифр
  if (!/\d/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну цифру');
  }
  
  // Проверка на наличие специальных символов
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы один специальный символ');
  }

  // Проверка на наличие пробелов
  if (/\s/.test(password)) {
    errors.push('Пароль не должен содержать пробелов');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Проверка совпадения паролей
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      errors: ['Пароли не совпадают']
    };
  }
  return { isValid: true, errors: [] };
};

// Проверка существования пользователя
export const checkUserExists = (email, users) => {
  return users.some(user => user.email === email);
}; 