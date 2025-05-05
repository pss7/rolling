import style from "./Input.module.css";

interface InputProps {

  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string

}

export default function Input({ id, placeholder, disabled, error }: InputProps) {

  return (
    <>
      <input
        id={id}
        className={`${style.input} ${error ? "error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
      />
      {
        error && <p className="errorMessage">{error}</p>
      }
    </>
  );
}
