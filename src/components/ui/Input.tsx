import style from "./Input.module.css";

interface InputProps {

  placeholder?: string;
  disabled?: boolean;
  error?: string;
  id?: string
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

}

export default function Input({ id, placeholder, disabled, error, value, onChange, onBlur }: InputProps) {

  return (
    <>
      <input
        id={id}
        className={`${style.input} ${error ? "error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {
        error && <p className="errorMessage">{error}</p>
      }
    </>
  );
}
