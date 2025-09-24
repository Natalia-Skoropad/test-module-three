import { ValidatedTextarea } from '../../index';
import { validateMessage } from '../../utils/validation';
import css from './ThirdOrderForm.module.css';

// ===============================================================

type Props = {
  error: string;
  onErrorChange: (m: string) => void;
};

export default function Notes({ error, onErrorChange }: Props) {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Write to us</legend>

      <ValidatedTextarea
        name="notes"
        label="Notes"
        placeholder="Delivery notes…"
        rows={5}
        validator={validateMessage}
        externalError={error}
        onErrorChange={onErrorChange}
      />
    </fieldset>
  );
}
