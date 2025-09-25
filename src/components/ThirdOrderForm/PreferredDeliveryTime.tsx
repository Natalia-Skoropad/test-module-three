import { useId } from 'react';
import type { ChangeEvent } from 'react';
import { FieldError } from '../../index';

import css from './ThirdOrderForm.module.css';

// ===============================================================

type Props = {
  error: string;
  onErrorChange: (m: string) => void;
};

export default function PreferredDeliveryTime({ error, onErrorChange }: Props) {
  const uid = useId();
  const selectId = `${uid}-deliveryTime`;
  const errorId = `${selectId}-error`;

  const validateTime = (v: string) => (v ? '' : 'Please choose delivery time');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onErrorChange(validateTime(e.target.value));
  };

  const handleBlur = (e: ChangeEvent<HTMLSelectElement>) => {
    onErrorChange(validateTime(e.target.value));
  };

  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Preferred delivery time</legend>

      <div className={css.field}>
        <select
          id={selectId}
          name="deliveryTime"
          defaultValue=""
          className={`${css.select} ${error ? css.selectError : ''}`}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        >
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </select>

        <FieldError id={errorId} message={error} />
      </div>
    </fieldset>
  );
}
