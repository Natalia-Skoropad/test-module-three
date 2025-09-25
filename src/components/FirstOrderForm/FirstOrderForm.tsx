import { useState } from 'react';

import { Button, ValidatedInput } from '../../index';
import { readString, validateName } from '../../utils/validation';
import { useLocalStorageString } from '../../utils/useLocalStorageString';

import css from './FirstOrderForm.module.css';

//===============================================================

interface FirstOrderFormProps {
  onSubmit: (value: string) => void;
}

const LS_KEY = 'firstOrder.username';

function FirstOrderForm({ onSubmit }: FirstOrderFormProps) {
  const [username, setUsername] = useLocalStorageString(LS_KEY, '');
  const [error, setError] = useState('');

  const handleChange = (val: string) => {
    setUsername(val);
    setError(validateName(val) ?? '');
  };

  const handleSubmit = (formaDate: FormData) => {
    const username = readString(formaDate, 'username');

    const err = validateName(username);
    if (err) return setError(err);

    const trimmed = username.trim();
    onSubmit(trimmed);

    setUsername('');
    setError('');
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
          value={username}
          onChangeValue={handleChange}
          error={error}
        />
        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}

export default FirstOrderForm;
