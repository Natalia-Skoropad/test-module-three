import { useRef, useState } from 'react';
import type { JSX } from 'react';

import { Button, ValidatedInput, ValidatedTextarea } from '../../index';

import {
  readString,
  validateName,
  validateEmail,
  validateMessage,
} from '../../utils/validation';

import css from './SecondOrderForm.module.css';

// ===============================================================

export default function SecondOrderForm(): JSX.Element {
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [notesErr, setNotesErr] = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (fd: FormData): void => {
    const name = readString(fd, 'username');
    const email = readString(fd, 'email');
    const notes = readString(fd, 'notes');

    const nErr = nameErr || validateName(name);
    const eErr = emailErr || validateEmail(email);
    const mErr = notesErr || validateMessage(notes);

    if (nErr || eErr || mErr) {
      setNameErr(nErr ?? '');
      setEmailErr(eErr ?? '');
      setNotesErr(mErr ?? '');
      return;
    }

    console.log('Order:', {
      name: name.trim(),
      email: email.trim(),
      notes: notes.trim(),
    });

    formRef.current?.reset();
    setNameErr('');
    setEmailErr('');
    setNotesErr('');
  };

  return (
    <>
      <h2>Second Order Form</h2>
      <h3>Place your order</h3>

      <form ref={formRef} className={css.form} action={handleSubmit} noValidate>
        <ValidatedInput
          name="username"
          label="Name"
          placeholder="Enter your name"
          validator={validateName}
          externalError={nameErr}
          onErrorChange={setNameErr}
        />

        <ValidatedInput
          name="email"
          label="Email"
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
          validator={validateMessage}
          rows={5}
          externalError={notesErr}
          onErrorChange={setNotesErr}
        />

        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}
