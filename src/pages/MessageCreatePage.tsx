import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Input from "../components/ui/Input";
import styles from "./CreatePage.module.css";
import { getProfilimage } from "../api/list";

export default function MessageCreatePage() {

  interface ProfileImage {
    imageUrls: string;
  }

  const [profilImageData, getProfileImageData] = useState<ProfileImage[]>([]);
  const [selecteImage, setSelecteImage] = useState<string | null>(null);

  console.log(profilImageData);

  useEffect(() => {

    async function fetchProfileimage() {

      try {
        const response = await getProfilimage()
        if (response) {
          getProfileImageData(response.imageUrls);
        }
      } catch (error) {
        console.error("프로필이미지 불러오기 실패:", error);
      }

    }

    fetchProfileimage();

  }, [])

  function handleImageSelect(data: any) {
    setSelecteImage(data);
  }

  return (
    <>
      <Header />
      <Main id="sub">
        <Container className={styles.container}>
          <div className={styles.box}>
            <h2 className={styles.title}>From.</h2>
            <Input
              placeholder="이름을 입력해 주세요"
            />
          </div>
          <div className={styles.box}>
            <h2 className={styles.title}>프로필 이미지</h2>
            <div className={styles.profileImgBox}>
              <div className={styles.selectImgBox}>
                <img src={`${selecteImage ? `${selecteImage}` : "/public/assets/images/sub/default_img.svg"}`} alt="" />
              </div>
              <div className={styles.profileSelectBox}>
                <p>
                  프로필 이미지를 선택해주세요!
                </p>
                <div className={styles.selectImgList}>
                  {
                    profilImageData.map((data, index) => {
                      return (

                        <button
                          className={styles.selectButton}
                          key={index}
                          onClick={() => handleImageSelect(data)}
                        >
                          <img src={`${data}`} alt="프로필이미지" />
                        </button>

                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <h2 className={styles.title}>상대와의관계</h2>
          </div>
        </Container>
      </ Main>
    </>
  )

}