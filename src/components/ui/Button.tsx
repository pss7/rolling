import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({ variant = "primary", text, disabled, className, onClick }: ButtonProps) {

  return (
    <>
      <button
        className={`${styles.button} ${styles[variant]} ${className ? className : ""}`}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  )

}