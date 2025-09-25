import { useState } from 'react';
import { Button, ValidatedInput, ValidatedTextarea } from '../../index';

import {
  validateName,
  validateEmail,
  validateMessage,
} from '../../utils/validation';

import { useLocalStorageString } from '../../utils/useLocalStorageString';
import { readString } from '../../utils/validation';

import css from './SecondOrderForm.module.css';

// ===============================================================

interface SecondOrderFormProps {
  onSubmit: (data: { username: string; email: string; notes: string }) => void;
}

const LS = {
  name: 'secondOrder.username',
  email: 'secondOrder.email',
  notes: 'secondOrder.notes',
} as const;

export default function SecondOrderForm({ onSubmit }: SecondOrderFormProps) {
  const [username, setUsername] = useLocalStorageString(LS.name, '');
  const [email, setEmail] = useLocalStorageString(LS.email, '');
  const [notes, setNotes] = useLocalStorageString(LS.notes, '');

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [notesErr, setNotesErr] = useState('');

  const handleNameChange = (v: string) => {
    setUsername(v);
    setNameErr(validateName(v) ?? '');
  };

  const handleEmailChange = (v: string) => {
    setEmail(v);
    setEmailErr(validateEmail(v) ?? '');
  };

  const handleNotesChange = (v: string) => {
    setNotes(v);
    setNotesErr(validateMessage(v) ?? '');
  };

  const handleSubmit = (formaDate: FormData) => {
    const username = readString(formaDate, 'username');
    const email = readString(formaDate, 'email');
    const notes = readString(formaDate, 'notes');

    const nErr = validateName(username) ?? '';
    const eErr = validateEmail(email) ?? '';
    const mErr = validateMessage(notes) ?? '';

    setNameErr(nErr);
    setEmailErr(eErr);
    setNotesErr(mErr);

    if (nErr || eErr || mErr) return;

    onSubmit({
      username: username.trim(),
      email: email.trim(),
      notes: notes.trim(),
    });

    setUsername('');
    setEmail('');
    setNotes('');
    setNameErr('');
    setEmailErr('');
    setNotesErr('');
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
          value={username}
          onChangeValue={handleNameChange}
          error={nameErr}
        />

        <ValidatedInput
          name="email"
          label="Email"
          srOnlyLabel
          placeholder="Enter your email"
          type="email"
          value={email}
          onChangeValue={handleEmailChange}
          error={emailErr}
        />

        <ValidatedTextarea
          name="notes"
          label="Notes"
          placeholder="Delivery notes…"
          rows={5}
          value={notes}
          onChangeValue={handleNotesChange}
          error={notesErr}
        />

        <Button text="Place order" variant="normal" type="submit" />
      </form>
    </>
  );
}
