import { useEffect, useId, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

import { FieldError } from '../../index';

import clsx from 'clsx';
import css from './ValidatedInput.module.css';

//===============================================================

type Validator = (value: string) => string | null;

type Props = {
  name: string;
  label: string;
  validator: Validator;
  externalError?: string;
  onErrorChange?: (message: string) => void;
  srOnlyLabel?: boolean;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  id?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onInput' | 'name' | 'type' | 'id' | 'placeholder'
>;

function ValidatedInput({
  name,
  label,
  validator,
  externalError,
  onErrorChange,
  srOnlyLabel,
  type = 'text',
  placeholder,
  id,
  ...rest
}: Props) {
  const uid = useId();
  const inputId = id ?? `${uid}-${name}`;
  const errorId = `${inputId}-error`;

  const [error, setError] = useState<string>(externalError ?? '');

  useEffect(() => {
    setError(externalError ?? '');
  }, [externalError]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const next = validator(e.target.value) ?? '';
    setError(next);
    onErrorChange?.(next);
  };

  return (
    <div className={css.field}>
      <label htmlFor={inputId} className={srOnlyLabel ? css.srOnly : css.label}>
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        onInput={handleInput}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={clsx(css.input, error && css.inputError)}
        {...rest}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default ValidatedInput;
