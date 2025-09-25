import { useId } from 'react';
import { FieldError } from '../../index';

import css from './ValidatedInput.module.css';

//===============================================================

interface ValidatedInputProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  srOnlyLabel?: boolean;

  value: string;
  onChangeValue: (v: string) => void;

  error?: string;
}

export default function ValidatedInput({
  name,
  label,
  type = 'text',
  placeholder,
  srOnlyLabel,
  value,
  onChangeValue,
  error = '',
}: ValidatedInputProps) {
  const uid = useId();
  const inputId = `${uid}-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={css.field}>
      <label
        className={srOnlyLabel ? 'visually-hidden' : css.label}
        htmlFor={inputId}
      >
        {label}
      </label>

      <input
        className={`${css.input} ${error ? css.inputError : ''}`}
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChangeValue(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}
