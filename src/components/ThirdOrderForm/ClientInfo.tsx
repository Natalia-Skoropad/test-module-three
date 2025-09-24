import { ValidatedInput } from '../../index';
import { validateName, validateEmail } from '../../utils/validation';
import css from './ThirdOrderForm.module.css';

// ===============================================================

type Props = {
  nameError: string;
  emailError: string;
  onNameErrorChange: (m: string) => void;
  onEmailErrorChange: (m: string) => void;
};

export default function ClientInfo({
  nameError,
  emailError,
  onNameErrorChange,
  onEmailErrorChange,
}: Props) {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Client info</legend>

      <ValidatedInput
        name="username"
        label="Name"
        placeholder="Enter your name"
        validator={validateName}
        externalError={nameError}
        onErrorChange={onNameErrorChange}
      />

      <ValidatedInput
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        validator={validateEmail}
        externalError={emailError}
        onErrorChange={onEmailErrorChange}
      />
    </fieldset>
  );
}
