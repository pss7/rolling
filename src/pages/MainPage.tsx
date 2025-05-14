import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import styles from "./MainPage.module.css";

export default function MainPage() {

  const navigate = useNavigate();

  return (
    <Container>
      <div className={`${styles.mainBox} ${styles.mainBox01}`}>
        <div className={styles.textBox}>
          <span className={styles.point}>
            Point.01
          </span>
          <p className={styles.title}>
            누구나 손쉽게, 온라인 <br />
            롤링 페이퍼를 만들 수 있어요
          </p>
          <p className={styles.text}>
            로그인 없이 자유롭게 만들어요.
          </p>
        </div>
        {/* <div className={styles.imgBox}>
          <img src="/assets/images/main/point_img01.png" alt="" />
        </div> */}
      </div>
      <div className={`${styles.mainBox} ${styles.mainBox02}`}>
        {/* <div className={styles.imgBox}>
          <img src="/assets/images/main/point_img02.png" alt="" />
        </div> */}
        <div className={styles.textBox}>
          <span className={styles.point}>
            Point.02
          </span>
          <p className={styles.title}>
            서로에게 이모지로 감정을 <br />
            표현해보세요
          </p>
          <p className={styles.text}>
            롤링 페이퍼에 이모지를 추가할 수 있어요.
          </p>
        </div>
      </div>
      <Button
        text="구경해보기"
        className={styles.button}
        onClick={() => navigate("/list")}
      >
      </Button>
    </Container>
  )

}