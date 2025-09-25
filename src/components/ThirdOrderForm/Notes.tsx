import { ValidatedTextarea } from '../../index';
import css from './ThirdOrderForm.module.css';

// ===============================================================

type Props = {
  value: string;
  error: string;
  onChange: (v: string) => void;
};

export default function Notes({ value, error, onChange }: Props) {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Write to us</legend>

      <ValidatedTextarea
        name="notes"
        label="Notes"
        placeholder="Delivery notes…"
        rows={5}
        value={value}
        onChangeValue={onChange}
        error={error}
      />
    </fieldset>
  );
}
