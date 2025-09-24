import { useState } from 'react';
import { Button } from '../../index';

import {
  readString,
  validateName,
  validateEmail,
  validateMessage,
} from '../../utils/validation';

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

export default function ThirdOrderForm() {
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [notesErr, setNotesErr] = useState('');
  const [timeErr, setTimeErr] = useState('');

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
  };

  return (
    <>
      <h2>Third Order Form</h2>
      <h3>Complete your order</h3>

      <form className={css.form} action={handleSubmit} noValidate>
        <ClientInfo
          nameError={nameErr}
          emailError={emailErr}
          onNameErrorChange={setNameErr}
          onEmailErrorChange={setEmailErr}
        />

        <DeliveryMethod />

        <DietaryRestrictions />

        <PreferredDeliveryTime error={timeErr} onErrorChange={setTimeErr} />

        <Notes error={notesErr} onErrorChange={setNotesErr} />

        <Button
          text="Place order"
          variant="normal"
          type="submit"
          disabled={!!(nameErr || emailErr || notesErr || timeErr)}
        />
      </form>
    </>
  );
}
