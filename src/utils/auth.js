// Функция для хеширования пароля
export const hashPassword = (password) => {
  // В реальном проекте здесь должно быть безопасное хеширование
  // Для демонстрации используем простое преобразование
  return btoa(password);
};

// Функция для проверки пароля
export const verifyPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};

// Функция для проверки учетных данных
export const validateCredentials = (email, password) => {
  const errors = [];

  if (!email) {
    errors.push('Email обязателен');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Некорректный формат email');
  }

  if (!password) {
    errors.push('Пароль обязателен');
  } else if (password.length < 6) {
    errors.push('Пароль должен содержать минимум 6 символов');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 