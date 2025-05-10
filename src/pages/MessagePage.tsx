import { useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import Main from "../components/layout/Main";
import { useEffect, useState } from "react";
import { getMessage, getReaction, postReaction } from "../api/list";
import styles from "./MessagePage.module.css";
import dayjs from "dayjs";
import Header from "../components/layout/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MessagePage() {

  interface Recipient {
    id: string;
    name: string;
    backgroundColor: string;
    backgroundImageURL: string;
    createdAt: string;
    messageCount: number;
    recentMessages: {
      profileImageURL: string;
      sender: string;
      relationship: string;
      content: string;
      createdAt: string;
    }[];
    reactionCount: number;
    topReactions: {
      emoji: string;
      count: number;
    }[];
  }

  interface Reaction {
    emoji: string;
    count: string;
  }

  const { id } = useParams<{ id: string }>();
  const [messageListData, setMessageListData] = useState<Recipient | null>(null);
  const [emojiData, setEmojiData] = useState<Reaction[]>([]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  console.log(messageListData);

  useEffect(() => {

    async function fetchMessage() {

      if (!id) return;

      try {
        const response = await getMessage(id);
        if (response) {
          setMessageListData(response);
        }
      } catch (error) {
        console.error("롤링페이퍼 대상 불러오기 실패:", error);
      }
    }

    fetchMessage()

  }, [id])

  async function fetchReaction() {

    if (!id) return;

    try {
      const response = await getReaction(id);
      if (response) {
        setEmojiData(response.results);
      }
    } catch (error) {
      console.error("대상에게 단 리액션 불러오기 실패:", error);
    }

  }

  useEffect(() => {
    fetchReaction();
  }, [id]);

  async function submitReaction(emoji: string) {

    if (!id) return;
    
    try {
      const payload: { emoji: string; type: "increase" | "decrease" } = {
        emoji: emoji,
        type: "increase",
      };
      await postReaction(id, payload);
      fetchReaction();
    } catch (error) {
      console.error("리액션 등록 실패:", error);
    }

  }

  function handleToggle() {

    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

  }

  async function handleCopyUrl() {

    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL이 복사되었습니다.");
    } catch (error) {
      toast.error("URL 복사에 실패했습니다.");
    }

  }

  return (
    <>
      <Header />
      <header id={styles.messageHedaer}>
        <Container>
          <div className={styles.layoutBox}>
            <div className={styles.name}>
              To.{messageListData?.name}
            </div>

            <div className={styles.box}>
              <div className={styles.profileImageBox}>
                {
                  messageListData?.recentMessages && messageListData.recentMessages.length > 0 ? (
                    <>
                      {messageListData.recentMessages.slice(0, 3).map((data, index) => (
                        <div key={index} className={styles.profileImage}>
                          <img src={data.profileImageURL} alt="프로필이미지" />
                        </div>
                      ))}
                      <div className={styles.defaultImage}>
                        +{messageListData.messageCount >= 3 ? messageListData.messageCount - 3 : 0}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.defaultImage}>
                        <span className="blind">기본이미지</span>
                      </div>
                      <div className={styles.defaultImage}>
                        +0
                      </div>
                    </>
                  )
                }
              </div>
              <div className={styles.messageCountBox}>
                <span>
                  <strong>{messageListData?.messageCount}</strong>명이 작성했어요!
                </span>
              </div>
              <div className={styles.line}></div>
              <div className={styles.emojiListBox}>
                {
                  emojiData?.slice(0, 3).map((data, index) => {
                    return (
                      <div className={styles.emojiList} key={index}>
                        <div className={styles.emoji}>
                          {data.emoji}
                          <span>
                            {data.count}
                          </span>
                        </div>
                      </div>
                    )
                  })
                }
                <button
                  className={`${styles.emojiToggleBtn} ${isOpen ? `${styles.active}` : ""}`}
                  onClick={handleToggle}
                >
                  <span className="blind">이모지추가 버튼</span>
                </button>
                <div
                  className={`${styles.emojiaddList} ${isOpen ? `${styles.active}` : ""}`}
                >
                  {
                    emojiData?.map((data, index) => {
                      return (
                        <div className={styles.emojiadd} key={index}>
                          <button
                            className={styles.emoji}
                            onClick={() => submitReaction(data.emoji)}
                          >
                            {data.emoji}
                            <span>
                              {data.count}
                            </span>
                          </button>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.shareBox}>
                <button
                  className={styles.shareBtn}
                  onClick={handleCopyUrl}
                >
                  URL 공유
                </button>
              </div>
            </div>

          </div>
        </Container>
      </header>
      <Main
        id="sub"
        className={
          messageListData?.backgroundImageURL
            ? `${styles.messageBox} ${styles.backgroundImage}`
            : `${styles.messageBox} ${messageListData?.backgroundColor === "beige"
              ? styles.beige
              : messageListData?.backgroundColor === "purple"
                ? styles.purple
                : messageListData?.backgroundColor === "blue"
                  ? styles.blue
                  : messageListData?.backgroundColor === "green"
                    ? styles.green
                    : ""
            }`
        }
        style={
          messageListData?.backgroundImageURL
            ? {
              background: `url(${messageListData?.backgroundImageURL}) no-repeat center`,
              backgroundSize: "cover",
            }
            : {}
        }
      >
        <Container>
          <ul className={styles.messageList}>

            {
              messageListData?.recentMessages.map((data, index) => {
                return (
                  <li key={index}>
                    <div className={styles.messageTopBox}>
                      <div className={styles.imgBox}>
                        <img src={`${data.profileImageURL}`} alt="프로필이미지" />
                      </div>
                      <div className={styles.textBox}>
                        <span className={styles.name}>
                          From. {data.sender}
                        </span>
                        <span
                          className={
                            `
                         ${styles.relationship} 
                         ${data.relationship === "동료" ? `${styles.puple}` : ""}
                         ${data.relationship === "가족" ? `${styles.green}` : ""}
                         ${data.relationship === "친구" ? `${styles.blue}` : ""}
                         ${data.relationship === "지인" ? `${styles.beige}` : ""}
                        `
                          }
                        >
                          {data.relationship}
                        </span>
                      </div>
                    </div>
                    <p className={styles.messageContent}>
                      {data.content}
                    </p>
                    <span className={styles.date}>
                      {dayjs(data.createdAt).format("YYYY.MM.DD")}
                    </span>
                  </li>
                )
              })
            }
          </ul>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            closeButton={true}
            icon={false}
            toastStyle={{
              backgroundColor: "var(--primary)",
              color: "var(--white)",
            }}
          />
        </Container>
      </Main>
    </>
  )

}