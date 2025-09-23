export const LENGTH = {
  topic: { min: 2, max: 50 },
  name: { min: 2, max: 20 },
  message: { min: 10, max: 300 },
};

export function validateRequiredLength(
  value: string,
  min: number,
  max: number
): string | null {
  const length = value.trim().length;
  if (length === 0) return 'This field is required';
  if (length < min) return `Enter at least ${min} characters`;
  if (length > max) return `Enter at most ${max} characters`;
  return null;
}

export function validateName(value: string): string | null {
  return validateRequiredLength(value, LENGTH.name.min, LENGTH.name.max);
}

export function validateMessage(value: string): string | null {
  const { min, max } = LENGTH.message;
  return validateRequiredLength(value, min, max);
}

export function validateTopic(value: string): string | null {
  return validateRequiredLength(value, LENGTH.topic.min, LENGTH.topic.max);
}

export function readString(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === 'string' ? raw : '';
}

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (v.length === 0) return 'This field is required';
  if (v.length > 100) return 'Enter at most 100 characters';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(v) ? null : 'Enter a valid email address';
}
