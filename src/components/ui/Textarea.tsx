import styles from "./Textarea.module.css";

interface TextareaProps {

  error?: string;
  id?: string
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

}

export default function Textarea({ onChange, onBlur, error }: TextareaProps) {

  return (
    <>
      <textarea
        id="content"
        name="content"
        className={`${styles.textarea} ${error ? "error" : ""}`}
        onChange={onChange}
        onBlur={onBlur}
      >
      </textarea>
      {
        error && <p className="errorMessage">{error}</p>
      }
    </>
  )

}