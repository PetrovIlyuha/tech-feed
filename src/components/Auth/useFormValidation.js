import { useState, useEffect } from "react";

function useFormValidation(initialState, validate, authenticateUser) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const errorsCleared = Object.keys(errors).length === 0;
      if (errorsCleared) {
        setSubmitting(false);
        authenticateUser();
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (e) => {
    e.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };
  return {
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    values,
    errors,
  };
}

export default useFormValidation;
