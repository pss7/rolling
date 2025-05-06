import { Link } from "react-router-dom";
import Container from "./Container";
import styles from "./Header.module.css";

export default function Header() {

  return (
    <header id={styles.header}>
      <Container>
        <div className={styles.layoutBox}>
          <div className={styles.logoBox}>
            <h1>
              <Link to="/">
                <img src="/assets/images/common/logo.svg" alt="Rolling" />
              </Link>
            </h1>
          </div>
          <Link to="/" className={styles.rollingAddLink}>
            롤링 페이퍼 만들기
          </Link>
        </div>
      </Container>
    </header>
  )

}