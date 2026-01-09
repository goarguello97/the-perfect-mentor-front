import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";

const useForm = (initialValues: any, submit: any, validations: any) => {
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(formErrors).length === 0) {
        dispatch(submit(values));
      }
      setIsSubmitting(false);
      setTimeout(() => {
        setFormErrors({});
      }, 5000);
    }
  }, [formErrors]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type == "checkbox") {
      setValues({ ...values, [e.target.name]: e.target.checked });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validations) {
      setFormErrors(validations(values));
    } else {
      setFormErrors({});
    }
    setIsSubmitting(true);
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setValues(initialValues);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    formErrors,
    setValues,
    handleReset,
  };
};

export default useForm;
