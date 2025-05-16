import style from "./Input.module.css";

interface InputProps {

  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

}

export default function Input({ id, placeholder, disabled, error, onChange, onBlur }: InputProps) {

  return (
    <>
      <input
        id={id}
        className={`${style.input} ${error ? "error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {
        error && <p className="errorMessage">{error}</p>
      }
    </>
  );
}
