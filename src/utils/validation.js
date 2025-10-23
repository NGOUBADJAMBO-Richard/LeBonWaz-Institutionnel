export const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateLeadData = (data) => {
  const errors = {};

  if (!validateRequired(data.firstName)) {
    errors.firstName = 'Le prénom est requis';
  }

  if (!validateRequired(data.lastName)) {
    errors.lastName = 'Le nom est requis';
  }

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Format de téléphone invalide';
  }

  if (!validateRequired(data.source)) {
    errors.source = 'La source est requise';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};