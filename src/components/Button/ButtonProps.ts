export interface ButtonProps {
  variant?: 'normal' | 'reset';
  text: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}
