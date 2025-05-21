import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Input from "../components/ui/Input";
import styles from "./CreatePage.module.css";
import { getProfilimage } from "../api/list";
import Dropdown from "../components/ui/Dropdown";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";

export default function MessageCreatePage() {

  const [profilImageData, setProfileImageData] = useState<string[]>([]);
  const relationshipOption = ["친구", "지인", "동료", "가족"];
  const [relationshipData, setRelationshipData] = useState(relationshipOption[0]);
  const fontOption = ["Noto Sans", "Pretendard", "나눔명조", "나눔손글씨 손편지체"]
  const [fontData, setFontData] = useState(fontOption[0]);
  const [selecteImage, setSelecteImage] = useState<string | null>(null);
  const [name, setName] = useState("")
  const [content, setContent] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorContentMessage, setErrorContentMessage] = useState("");

  useEffect(() => {

    async function fetchProfileimage() {

      try {
        const response = await getProfilimage()
        if (response) {
          setProfileImageData(response.imageUrls);
          setSelecteImage(response.imageUrls[0]);
        }
      } catch (error) {
        console.error("프로필이미지 불러오기 실패:", error);
      }

    }

    fetchProfileimage();

  }, [])

  function handleImageSelect(data: string) {
    setSelecteImage(data);
  }

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setErrorNameMessage("");
  }

  function handleNameBlur() {
    if (name.trim() === "") {
      setErrorNameMessage("이름을 입력해 주세요.");
    }
  }

  function handleContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    setErrorContentMessage("");
  }

  function handleContentBlur() {
    if (content.trim() === "") {
      setErrorContentMessage("내용을 입력해 주세요.");
    }
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
              onChange={handleName}
              onBlur={handleNameBlur}
              error={errorNameMessage}
            />
          </div>
          <div className={styles.box}>
            <h2 className={styles.title}>프로필 이미지</h2>
            <div className={styles.profileImgBox}>
              <div className={styles.selectImgBox}>
                <img src={`${selecteImage}`} alt="프로필이미지" />
              </div>
              <div className={styles.profileSelectBox}>
                <p>
                  프로필 이미지를 선택해주세요!
                </p>
                <div className={styles.selectImgList}>
                  {
                    profilImageData.map((data: string, index) => {
                      return (

                        <button
                          className={`${styles.selectButton} ${selecteImage === data ? `${styles.active}` : ""}`}
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
            <Dropdown
              className={styles.dropdownBox}
              value={relationshipData}
              option={relationshipOption}
              onSelect={setRelationshipData}
            />
          </div>
          <div className={styles.box}>
            <h2 className={styles.title}>내용을 입력해주세요</h2>
            <Textarea
              onChange={handleContent}
              onBlur={handleContentBlur}
              error={errorContentMessage}
            />
          </div>
          <div className={styles.box}>
            <h2 className={styles.title}>폰트 선택</h2>
            <Dropdown
              className={styles.dropdownBox}
              value={fontData}
              option={fontOption}
              onSelect={setFontData}
            />
          </div>
          <Button
            text="생성하기"
            disabled={
              name.trim() === "" || content.trim() === ""
            }
          />
        </Container>
      </ Main>
    </>
  )

}