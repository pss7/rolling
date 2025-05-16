import Button from "./Button";
import styles from "./MessageModal.module.css";
import dayjs from "dayjs";

interface Message {
  id: string;
  recipientId: string;
  sender: string;
  profileImageURL: string;
  relationship: string;
  content: string;
  font: string;
  createdAt: string;
}

interface MessageModalProps {
  message: Message | null;
  isActive: boolean;
  onClose: () => void;
}

export default function MessageModal({ isActive, message, onClose }: MessageModalProps) {
  return (
    <div
      className={`${styles.modalWrap} ${isActive ? styles.active : ""}`}
      onClick={onClose}
    >
      <div
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()}
      >
        {message && (
          <>
            <div className={styles.modalTop}>
              <div className={styles.imgBox}>
                <img src={message.profileImageURL} alt="프로필이미지" />
              </div>
              <div className={styles.textBox}>
                <div className={styles.box}>
                  <span className={styles.name}>
                    From.<strong>{message.sender}</strong>
                  </span>
                  <span
                    className={`
                      ${styles.relationship} 
                      ${message.relationship === "동료" ? styles.purple : ""}
                      ${message.relationship === "가족" ? styles.green : ""}
                      ${message.relationship === "친구" ? styles.blue : ""}
                      ${message.relationship === "지인" ? styles.beige : ""}
                    `}
                  >
                    {message.relationship}
                  </span>
                </div>
                <span className={styles.date}>
                  {dayjs(message.createdAt).format("YYYY.MM.DD")}
                </span>
              </div>
            </div>
            <p
              className={styles.modalContentBox}
              style={{ fontFamily: message.font }}
            >
              {message.content}
            </p>
            <Button
              className={styles.button}
              variant="primary"
              text="확인"
              onClick={onClose}
            />
          </>
        )}
      </div>
    </div>
  );
}
