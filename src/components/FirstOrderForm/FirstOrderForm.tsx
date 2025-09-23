import { useState } from 'react';

import { Button, ValidatedInput } from '../../index';
import { readString, validateName } from '../../utils/validation';

import css from './FirstOrderForm.module.css';

//===============================================================

interface FirstOrderFormProps {
  onSubmit: (value: string) => void;
}

function FirstOrderForm({ onSubmit }: FirstOrderFormProps) {
  const [nameError, setNameError] = useState('');

  const handleSubmit = (fd: FormData) => {
    const username = readString(fd, 'username');
    const err = validateName(username);
    if (err) return setNameError(err);

    setNameError('');
    onSubmit(username.trim());
  };

  return (
    <>
      <h2>First Order Form</h2>
      <h3>Place your order</h3>

      <form className={css.form} action={handleSubmit}>
        <ValidatedInput
          name="username"
          label="Username"
          srOnlyLabel
          placeholder="Enter your name"
          validator={validateName}
          externalError={nameError}
          onErrorChange={setNameError}
        />
        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}

export default FirstOrderForm;
