import { ValidatedInput } from '../../index';
import css from './ThirdOrderForm.module.css';

// ===============================================================

type Props = {
  nameValue: string;
  emailValue: string;
  nameError: string;
  emailError: string;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
};

export default function ClientInfo({
  nameValue,
  emailValue,
  nameError,
  emailError,
  onNameChange,
  onEmailChange,
}: Props) {
  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>Client info</legend>

      <ValidatedInput
        name="username"
        label="Name"
        placeholder="Enter your name"
        value={nameValue}
        onChangeValue={onNameChange}
        error={nameError}
      />

      <ValidatedInput
        name="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={emailValue}
        onChangeValue={onEmailChange}
        error={emailError}
      />
    </fieldset>
  );
}
