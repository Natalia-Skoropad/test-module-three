import { useState } from 'react';
import { Button, ValidatedInput, ValidatedTextarea } from '../../index';

import {
  readString,
  validateName,
  validateEmail,
  validateMessage,
} from '../../utils/validation';

import css from './SecondOrderForm.module.css';

// ===============================================================

interface SecondOrderFormProps {
  onSubmit: (data: { username: string; email: string; notes: string }) => void;
}

export default function SecondOrderForm({ onSubmit }: SecondOrderFormProps) {
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [notesErr, setNotesErr] = useState('');

  const handleSubmit = (fd: FormData) => {
    const username = readString(fd, 'username');
    const email = readString(fd, 'email');
    const notes = readString(fd, 'notes');

    const nErr = validateName(username);
    const eErr = validateEmail(email);
    const mErr = validateMessage(notes);

    if (nErr || eErr || mErr) {
      setNameErr(nErr ?? '');
      setEmailErr(eErr ?? '');
      setNotesErr(mErr ?? '');
      return;
    }

    setNameErr('');
    setEmailErr('');
    setNotesErr('');
    onSubmit({
      username: username.trim(),
      email: email.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <>
      <h2>Second Order Form</h2>
      <h3>Place your order</h3>

      <form className={css.form} action={handleSubmit} noValidate>
        <ValidatedInput
          name="username"
          label="Name"
          srOnlyLabel
          placeholder="Enter your name"
          validator={validateName}
          externalError={nameErr}
          onErrorChange={setNameErr}
        />

        <ValidatedInput
          name="email"
          label="Email"
          srOnlyLabel
          placeholder="Enter your email"
          type="email"
          validator={validateEmail}
          externalError={emailErr}
          onErrorChange={setEmailErr}
        />

        <ValidatedTextarea
          name="notes"
          label="Notes"
          placeholder="Delivery notes…"
          rows={5}
          validator={validateMessage}
          externalError={notesErr}
          onErrorChange={setNotesErr}
        />

        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}
