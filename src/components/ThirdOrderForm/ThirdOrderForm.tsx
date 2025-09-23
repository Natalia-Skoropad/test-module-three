import { useId, useRef, useState } from 'react';
import type { JSX, ChangeEvent } from 'react';

import {
  Button,
  ValidatedInput,
  ValidatedTextarea,
  FieldError,
} from '../../index';

import {
  readString,
  validateName,
  validateEmail,
  validateMessage,
} from '../../utils/validation';

import css from './ThirdOrderForm.module.css';

// ===============================================================

interface OrderData {
  username: string;
  email: string;
  delivery: string;
  deliveryTime: string;
  restrictions: string[];
  notes: string;
}

export default function ThirdOrderForm(): JSX.Element {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  // стани помилок (для submit + live)
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [notesErr, setNotesErr] = useState('');
  const [timeErr, setTimeErr] = useState('');

  const timeId = `${uid}-deliveryTime`;
  const timeErrId = `${timeId}-error`;

  const validateTime = (v: string) => (v ? '' : 'Please choose delivery time');

  const handleTimeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setTimeErr(validateTime(e.target.value));
  };

  const handleOrder = (fd: FormData): void => {
    const order: OrderData = {
      username: readString(fd, 'username'),
      email: readString(fd, 'email'),
      delivery: readString(fd, 'delivery') || 'pickup',
      deliveryTime: readString(fd, 'deliveryTime'),
      restrictions: fd.getAll('restrictions').filter(Boolean) as string[],
      notes: readString(fd, 'notes'),
    };

    // фінальна перевірка (використовуємо поточні помилки або перевіряємо значення)
    const finalNameErr = nameErr || validateName(order.username);
    const finalEmailErr = emailErr || validateEmail(order.email);
    const finalNotesErr = notesErr || validateMessage(order.notes);
    const finalTimeErr = timeErr || validateTime(order.deliveryTime);

    if (finalNameErr || finalEmailErr || finalNotesErr || finalTimeErr) {
      setNameErr(finalNameErr ?? '');
      setEmailErr(finalEmailErr ?? '');
      setNotesErr(finalNotesErr ?? '');
      setTimeErr(finalTimeErr ?? '');
      return;
    }

    // тут можна надіслати order на сервер
    console.log('Order placed:', {
      ...order,
      username: order.username.trim(),
      email: order.email.trim(),
      notes: order.notes.trim(),
    });

    // очистка форми та помилок
    formRef.current?.reset();
    setNameErr('');
    setEmailErr('');
    setNotesErr('');
    setTimeErr('');
  };

  return (
    <>
      <h2>Third Order Form</h2>
      <h3>Complete your order</h3>

      <form ref={formRef} className={css.form} action={handleOrder} noValidate>
        {/* 1) Client info */}
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client info</legend>

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
        </fieldset>

        {/* 2) Delivery method */}
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Delivery method</legend>

          <label className={css.option}>
            <input type="radio" name="delivery" value="pickup" defaultChecked />
            Pickup
          </label>
          <label className={css.option}>
            <input type="radio" name="delivery" value="courier" />
            Courier
          </label>
          <label className={css.option}>
            <input type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
        </fieldset>

        {/* 3) Dietary restrictions */}
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Dietary restrictions</legend>

          <label className={css.option}>
            <input type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label className={css.option}>
            <input type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label className={css.option}>
            <input type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Preferred delivery time</legend>
          <div className={css.field}>
            <select
              id={timeId}
              name="deliveryTime"
              defaultValue=""
              className={css.select}
              onInput={handleTimeInput}
              aria-invalid={!!timeErr}
              aria-describedby={timeErr ? timeErrId : undefined}
            >
              <option value="">-- Choose delivery time --</option>
              <option value="morning">Morning (8:00–12:00)</option>
              <option value="afternoon">Afternoon (12:00–16:00)</option>
              <option value="evening">Evening (16:00–20:00)</option>
            </select>
            <FieldError id={timeErrId} message={timeErr} />
          </div>
        </fieldset>

        {/* 5) Notes */}
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Write to us</legend>
          <ValidatedTextarea
            name="notes"
            label="Notes"
            placeholder="Delivery notes…"
            rows={5}
            validator={validateMessage}
            externalError={notesErr}
            onErrorChange={setNotesErr}
          />
        </fieldset>
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
