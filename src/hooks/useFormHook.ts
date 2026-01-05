import { useEffect, useState } from "react";
import { useAppDispatch } from "src/app/hooks";

const useForm = (initialValues: any, submit: any, validations: any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        dispatch(submit(values));
      }
      setIsSubmitting(false);
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  }, [errors]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validations) {
      setErrors(validations(values));
    } else {
      setErrors({});
    }
    setIsSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues,
  };
};

export default useForm;
