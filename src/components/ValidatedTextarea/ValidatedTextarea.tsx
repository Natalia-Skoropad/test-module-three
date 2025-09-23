import { useEffect, useId, useState } from 'react';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';

import { FieldError } from '../../index';

import clsx from 'clsx';
import css from './ValidatedTextarea.module.css';

//===============================================================

type Validator = (value: string) => string | null;

type Props = {
  name: string;
  label: string;
  validator: Validator;
  externalError?: string;
  onErrorChange?: (message: string) => void;
  srOnlyLabel?: boolean;
  placeholder?: string;
  id?: string;
  rows?: number;
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onInput' | 'name' | 'id' | 'placeholder' | 'rows'
>;

function ValidatedTextarea({
  name,
  label,
  validator,
  externalError,
  onErrorChange,
  srOnlyLabel,
  placeholder,
  id,
  rows = 5,
  ...rest
}: Props) {
  const uid = useId();
  const textareaId = id ?? `${uid}-${name}`;
  const errorId = `${textareaId}-error`;

  const [error, setError] = useState<string>(externalError ?? '');

  useEffect(() => {
    setError(externalError ?? '');
  }, [externalError]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const next = validator(e.target.value) ?? '';
    setError(next);
    onErrorChange?.(next);
  };

  return (
    <div className={css.field}>
      <label
        htmlFor={textareaId}
        className={srOnlyLabel ? css.srOnly : css.label}
      >
        {label}
      </label>

      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        rows={rows}
        onInput={handleInput}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={clsx(css.textarea, error && css.textareaError)}
        {...rest}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}

export default ValidatedTextarea;
