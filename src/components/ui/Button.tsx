import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function Button({ variant = "primary", text, disabled }: ButtonProps) {

  return (
    <>
      <button
        className={`${styles.button} ${styles[variant]}`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  )

}