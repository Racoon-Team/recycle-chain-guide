import { useState, type ChangeEvent } from 'react';

type FormValues = Record<string, string>;

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [formState, setFormState] = useState(initialValues);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const resetForm = () => setFormState(initialValues);

  return {
    ...formState,
    formState,
    onInputChange,
    resetForm,
  };
};