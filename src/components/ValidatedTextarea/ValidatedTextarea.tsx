import { useId } from 'react';
import { FieldError } from '../../index';
import css from './ValidatedTextarea.module.css';

//===============================================================

interface ValidatedTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  srOnlyLabel?: boolean;
  rows?: number;

  value: string;
  onChangeValue: (v: string) => void;

  error?: string;
}

export default function ValidatedTextarea({
  name,
  label,
  placeholder,
  srOnlyLabel,
  rows = 5,
  value,
  onChangeValue,
  error = '',
}: ValidatedTextareaProps) {
  const uid = useId();
  const textareaId = `${uid}-${name}`;
  const errorId = `${textareaId}-error`;

  return (
    <div className={css.field}>
      <label
        htmlFor={textareaId}
        className={srOnlyLabel ? 'visually-hidden' : css.label}
      >
        {label}
      </label>

      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={e => onChangeValue(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${css.textarea} ${error ? css.textareaError : ''}`}
      />

      <FieldError id={errorId} message={error} />
    </div>
  );
}
