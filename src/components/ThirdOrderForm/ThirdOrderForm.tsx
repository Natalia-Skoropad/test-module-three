import { useState } from 'react';
import { Button } from '../../index';

import {
  readString,
  validateName,
  validateEmail,
  validateMessage,
} from '../../utils/validation';

import { useLocalStorageString } from '../../utils/useLocalStorageString';

import css from './ThirdOrderForm.module.css';

import ClientInfo from './ClientInfo';
import DeliveryMethod from './DeliveryMethod';
import DietaryRestrictions from './DietaryRestrictions';
import PreferredDeliveryTime from './PreferredDeliveryTime';
import Notes from './Notes';

// ===============================================================

export interface OrderData {
  username: string;
  email: string;
  delivery: string;
  deliveryTime: string;
  restrictions: string[];
  notes: string;
}

const LS = {
  name: 'thirdOrder.username',
  email: 'thirdOrder.email',
  notes: 'thirdOrder.notes',
} as const;

export default function ThirdOrderForm() {
  const [username, setUsername] = useLocalStorageString(LS.name, '');
  const [email, setEmail] = useLocalStorageString(LS.email, '');
  const [notes, setNotes] = useLocalStorageString(LS.notes, '');

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [notesErr, setNotesErr] = useState('');
  const [timeErr, setTimeErr] = useState('');

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

  const validateTime = (v: string) => (v ? '' : 'Please choose delivery time');

  const handleSubmit = (fd: FormData) => {
    const order: OrderData = {
      username: readString(fd, 'username'),
      email: readString(fd, 'email'),
      delivery: readString(fd, 'delivery') || 'pickup',
      deliveryTime: readString(fd, 'deliveryTime'),
      restrictions: fd.getAll('restrictions').filter(Boolean) as string[],
      notes: readString(fd, 'notes'),
    };

    const nErr = validateName(order.username);
    const eErr = validateEmail(order.email);
    const mErr = validateMessage(order.notes);
    const tErr = validateTime(order.deliveryTime);

    if (nErr || eErr || mErr || tErr) {
      setNameErr(nErr ?? '');
      setEmailErr(eErr ?? '');
      setNotesErr(mErr ?? '');
      setTimeErr(tErr ?? '');
      return;
    }

    // TODO: submit to API
    console.log('Order placed:', {
      ...order,
      username: order.username.trim(),
      email: order.email.trim(),
      notes: order.notes.trim(),
    });

    setNameErr('');
    setEmailErr('');
    setNotesErr('');
    setTimeErr('');

    setUsername('');
    setEmail('');
    setNotes('');

    localStorage.removeItem(LS.name);
    localStorage.removeItem(LS.email);
    localStorage.removeItem(LS.notes);
  };

  const isDisabled = !!(nameErr || emailErr || notesErr || timeErr);

  return (
    <>
      <h2>Third Order Form</h2>
      <h3>Complete your order</h3>

      <form className={css.form} action={handleSubmit} noValidate>
        <ClientInfo
          nameValue={username}
          emailValue={email}
          nameError={nameErr}
          emailError={emailErr}
          onNameChange={handleNameChange}
          onEmailChange={handleEmailChange}
        />

        <DeliveryMethod />
        <DietaryRestrictions />
        <PreferredDeliveryTime error={timeErr} onErrorChange={setTimeErr} />
        <Notes value={notes} error={notesErr} onChange={handleNotesChange} />

        <Button
          text="Place order"
          variant="normal"
          type="submit"
          disabled={isDisabled}
        />
      </form>
    </>
  );
}
