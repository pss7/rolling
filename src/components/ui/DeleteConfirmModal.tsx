import Button from "./Button";
import styles from "./DeleteConfirmModal.module.css";

interface DeleteConfirmModalProps {
  isActive: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ isActive, onDelete, onCancel }: DeleteConfirmModalProps) {

  return (
    <div className={`${styles.modalWrap} ${isActive ? `${styles.active}` : ""}`}>
      <div className={styles.modalBox}>
        <p>
          정말 삭제하시겠습니까?
        </p>
        <div className={styles.btnBox}>
          <Button
            variant="secondary"
            text="취소"
            className={styles.button}
            onClick={onCancel}
          />
          <Button
            variant="primary"
            text="삭제"
            className={styles.button}
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  )

}