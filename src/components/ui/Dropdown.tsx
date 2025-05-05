import { useState } from "react";
import styles from "./Dropdown.module.css"

interface DropdownProps {

  label: string;
  disabled?: boolean;
  error?: string;
  option?: string[];

}

export default function Dropdown({ label, disabled, error, option = [] }: DropdownProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(label);

  function handleToggleDropdown() {

    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }

  }

  function handleOptionClick(value: string) {

    setSelectedValue(value);
    setIsOpen(false);

  }

  return (
    <>
      <div className={styles.dropdownBox}>
        <button
          className={`${styles.selectBtn} ${error ? "error" : ""} ${isOpen ? `${styles.active}` : ""}`}
          disabled={disabled}
          onClick={handleToggleDropdown}
        >
          {selectedValue}
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