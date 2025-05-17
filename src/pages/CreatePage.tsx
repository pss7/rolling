import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Input from "../components/ui/Input";
import styles from "./createPage.module.css";
import { getImage, postRecipient } from "../api/list";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {

  const navigate = useNavigate();

  const backgroundColor = ["beige", "purple", "blue", "green"];
  const [image, setImage] = useState<string[]>([]);
  const [selectOption, setSelectOption] = useState<"color" | "image">("color");
  const [selectBackground, setSelectBackground] = useState<{ type: "color" | "image", value: string } | null>(null);

  const [receiverName, setReceiverName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await getImage();
        if (response) {
          setImage(response.imageUrls);
          if (selectOption === "image" && response.imageUrls.length > 0) {
            setSelectBackground({ type: "image", value: response.imageUrls[0] });
          }
        }
      } catch (error) {
        console.error("이미지 불러오기 실패:", error);
      }
    }
    if (selectOption === "color") {
      setSelectBackground({ type: "color", value: backgroundColor[0] });
    } else {
      fetchImage();
    }
  }, [selectOption]);

  function handleSelect(type: "color" | "image", value: string) {
    setSelectBackground({ type, value });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReceiverName(e.target.value);
    setErrorMessage("");
  }

  function handleBlur() {
    if (receiverName.trim() === "") {
      setErrorMessage("값을 입력해 주세요.");
    }
  }

  async function handleCreateRecipient() {

    if (receiverName.trim() === "") {
      setErrorMessage("값을 입력해 주세요.");
      return;
    }

    if (!selectBackground?.value) {
      alert("배경을 선택해 주세요.");
      return;
    }

    const recipientData =
      selectBackground.type === "color"
        ? {
          name: receiverName,
          backgroundColor: selectBackground.value,
        }
        : {
          name: receiverName,
          backgroundColor: backgroundColor[0],    
          backgroundImageURL: selectBackground.value,
        };

    try {
      const response = await postRecipient(recipientData)
      console.log("롤링페이퍼 대상 생성 완료:", response);
      navigate("/list");
    } catch (error) {
      console.error("롤링페이퍼 대상 생성 실패:", error);
    }

  }

  return (
    <>
      <Header />
      <Main id="sub">
        <Container className={styles.container}>
          <div className={styles.box}>
            <h2 className={styles.title}>To.</h2>
            <Input
              value={receiverName}
              placeholder="받는 사람 이름을 입력해 주세요"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errorMessage}
            />
          </div>

          <div className={`${styles.box} ${styles.box02}`}>
            <h2 className={styles.title}>배경화면을 선택해주세요.</h2>
            <p className={styles.text}>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>

            <div className={styles.selectBtnBox}>
              <button
                className={`${styles.selectButton} ${selectOption === "color" ? styles.active : ""}`}
                onClick={() => setSelectOption("color")}
              >
                컬러
              </button>
              <button
                className={`${styles.selectButton} ${selectOption === "image" ? styles.active : ""}`}
                onClick={() => setSelectOption("image")}
              >
                이미지
              </button>
            </div>

            {
              selectOption === "color" && (
                <div className={styles.backgroundList}>
                  {backgroundColor.map((color, index) => {
                    return (
                      <button
                        key={index}
                        className={`
          ${styles.selectButton} 
          ${styles.colorButton} 
          ${color === "beige" ? styles.beige : ""}
          ${color === "purple" ? styles.purple : ""}
          ${color === "blue" ? styles.blue : ""}
          ${color === "green" ? styles.green : ""}
          ${selectBackground?.type === "color" &&
                            selectBackground.value === color
                            ? styles.active
                            : ""
                          }
        `}
                        onClick={() => handleSelect("color", color)}
                      />
                    )
                  })}
                </div>
              )
            }

            {
              selectOption === "image" && (
                <div className={styles.backgroundList}>
                  {image.map((imageUrl) => {
                    return (
                      <button
                        key={imageUrl}
                        className={`
          ${styles.selectButton} 
          ${selectBackground?.type === "image" && selectBackground.value === imageUrl ? styles.active : ""}
        `}
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        onClick={() => handleSelect("image", imageUrl)}
                      />
                    )
                  })}
                </div>
              )
            }

          </div>
          <Button
            text="생성하기"
            onClick={handleCreateRecipient}
            disabled={receiverName.trim() === ""}
          />
        </Container>
      </Main>
    </>
  );
}
