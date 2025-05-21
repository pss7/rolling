import { useState } from "react";
import styles from "./Dropdown.module.css"

interface DropdownProps {

  value?: string;
  disabled?: boolean;
  error?: string;
  option?: string[];
  className?: string;
  onSelect?: (value: string) => void;
}

export default function Dropdown({ onSelect, className, disabled, error, option = [], value }: DropdownProps) {

  const [isOpen, setIsOpen] = useState(false);

  function handleToggleDropdown() {

    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }

  }

  function handleOptionClick(value: string) {

    setIsOpen(false);
    if (onSelect) onSelect(value);

  }

  return (
    <>
      <div className={`${styles.dropdownBox} ${className ? className : ""}`}>
        <button
          className={`${styles.selectBtn} ${error ? "error" : ""} ${isOpen ? `${styles.active}` : ""}`}
          disabled={disabled}
          onClick={handleToggleDropdown}
        >
          {value}
        </button>
        <ul className={`${styles.optionList} ${isOpen ? `${styles.active}` : ""}`}>
          {
            option.map((opt, idx) => {
              return (
                <li key={idx}>
                  <button
                    className={styles.optionBtn}
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
      {
        error && <p className="errorMessage">{error}</p>
      }
    </>
  )

}