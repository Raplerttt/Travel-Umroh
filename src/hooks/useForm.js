import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    if (validate) {
      const fieldErrors = validate({ [name]: values[name] });
      setErrors(prev => ({
        ...prev,
        ...fieldErrors
      }));
    }
  };

  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const setFieldError = (name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const validateForm = () => {
    if (!validate) return true;

    const formErrors = validate(values);
    setErrors(formErrors);
    setTouched(Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    return Object.keys(formErrors).length === 0;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    resetForm,
    validateForm,
    setValues,
    isValid: Object.keys(errors).length === 0
  };
};

export default useForm;