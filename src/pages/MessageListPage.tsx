import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import Main from "../components/layout/Main";
import { useEffect, useState } from "react";
import { getMessage, getReaction, getDetail, postReaction, deleteRecipient } from "../api/list";
import styles from "./MessageListPage.module.css";
import dayjs from "dayjs";
import Header from "../components/layout/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageModal from "../components/ui/MessageModal";
import Button from "../components/ui/Button";
import DeleteConfirmModal from "../components/ui/DeleteConfirmModal";

export default function MessageListPage() {

  const emoji = [
    { emoji: "👍", count: 0 },
    { emoji: "😍", count: 0 },
    { emoji: "🥴", count: 0 },
    { emoji: "😅", count: 0 },
    { emoji: "🥹", count: 0 },
    { emoji: "🎉", count: 0 },
    { emoji: "👻", count: 0 },
    { emoji: "👿", count: 0 },
  ];

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

  interface Reaction {
    emoji: string;
    count: string;
  }

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messageListData, setMessageListData] = useState<Message[]>([]);
  const [detailListData, setDetailListData] = useState<Recipient | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [emojiData, setEmojiData] = useState<Reaction[]>([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);

  const mergedEmoji = emoji.map(e => {
    const match = emojiData.find(d => d.emoji === e.emoji);
    return {
      emoji: e.emoji,
      count: match ? Number(match.count) : 0,
    };
  });

  const topThreeEmoji = [...mergedEmoji]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  useEffect(() => {

    async function fetchMessage() {

      if (!id) return;

      try {
        const response = await getMessage(id);
        if (response) {
          setMessageListData(response.results);
        }
      } catch (error) {
        console.error("롤링페이퍼 대상 불러오기 실패:", error);
      }
    }

    fetchMessage()

  }, [id])

  useEffect(() => {

    async function fetchListDetail() {

      if (!id) return;

      try {
        const response = await getDetail(id);
        if (response) {
          setDetailListData(response);
        }
      } catch (error) {
        console.error("롤링페이퍼 대상 불러오기 실패:", error);
      }
    }

    fetchListDetail()

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

    if (isEmojiOpen) {
      setIsEmojiOpen(false);
    } else {
      setIsEmojiOpen(true);
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

  function handleModal(message: Message) {

    setSelectedMessage(message);
    setIsMessageModalOpen(true);

  }

  async function handleDeleteRecipient() {
    if (!id) return;
    try {
      await deleteRecipient(id);
      toast.success("삭제가 완료되었습니다.");
      navigate("/list");
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
    }
  }

  return (
    <>
      <Header />
      <div id={styles.messageHeader}>
        <Container>
          <div className={styles.layoutBox}>
            <div className={styles.name}>
              To.{detailListData?.name}
            </div>

            <div className={styles.box}>
              <div className={styles.profileImageBox}>
                {
                  detailListData?.recentMessages && detailListData.recentMessages.length > 0 ? (
                    <>
                      {detailListData.recentMessages.slice(0, 3).map((data, index) => (
                        <div key={index} className={styles.profileImage}>
                          <img src={data.profileImageURL} alt="프로필이미지" />
                        </div>
                      ))}
                      <div className={styles.defaultImage}>
                        +{detailListData.messageCount >= 3 ? detailListData.messageCount - 3 : 0}
                      </div>
                    </>
                  ) : (
                    <div className={styles.defaultImage}>
                      +0
                    </div>
                  )
                }
              </div>
              <div className={styles.messageCountBox}>
                <span>
                  <strong>{detailListData?.messageCount}</strong>명이 작성했어요!
                </span>
              </div>
              <div className={styles.line}></div>
              <div className={styles.emojiListBox}>
                {
                  topThreeEmoji.map((data, index) => {
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
                  className={`${styles.emojiToggleBtn} ${isEmojiOpen ? `${styles.active}` : ""}`}
                  onClick={handleToggle}
                >
                  <span className="blind">이모지추가 버튼</span>
                </button>
                <div
                  className={`${styles.emojiaddList} ${isEmojiOpen ? `${styles.active}` : ""}`}
                >
                  {
                    mergedEmoji.map((data, index) => {
                      return (
                        <div className={styles.emojiadd} key={index}>
                          <button
                            className={styles.emoji}
                            onClick={() => submitReaction(data.emoji)}
                          >
                            {data.emoji}
                            <span>{data.count}</span>
                          </button>
                        </div>
                      );
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
      </div>
      <Main
        id="sub"
        className={
          detailListData?.backgroundImageURL
            ? `${styles.messageBox} ${styles.backgroundImage}`
            : `${styles.messageBox} ${detailListData?.backgroundColor === "beige"
              ? styles.beige
              : detailListData?.backgroundColor === "purple"
                ? styles.purple
                : detailListData?.backgroundColor === "blue"
                  ? styles.blue
                  : detailListData?.backgroundColor === "green"
                    ? styles.green
                    : ""
            }`
        }
        style={
          detailListData?.backgroundImageURL
            ? {
              background: `url(${detailListData?.backgroundImageURL}) no-repeat center`,
              backgroundSize: "cover",
            }
            : {}
        }
      >
        <Container>
          <ul className={styles.messageList}>
            <li className={styles.link}>
              <Link to={`/message-create/${id}`}>
                <span className="blind">
                  롤링페이퍼 작성 페이지로 이동
                </span>
              </Link>
            </li>
            {
              messageListData?.map((data, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleModal(data)}>
                    <div className={styles.messageTopBox}>
                      <div className={styles.imgBox}>
                        <img src={`${data.profileImageURL}`} alt="프로필이미지" />
                      </div>
                      <div className={styles.textBox}>
                        <span className={styles.name}>
                          From. <strong>{data.sender}</strong>
                        </span>
                        <span
                          className={
                            `
                         ${styles.relationship} 
                         ${data.relationship === "동료" ? `${styles.purple}` : ""}
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
                    <p
                      className={styles.messageContent}
                      style={{ fontFamily: `${data.font}` }}
                    >
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
          <div className={styles.btnBox}>
            <Button
              text="삭제하기"
              className={styles.deleteBtn}
              variant="primary"
              onClick={() => setShowDeleteModal(true)}
            >
            </Button>
          </div>
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

        <MessageModal
          isActive={isMessageModalOpen}
          message={selectedMessage}
          onClose={() => setIsMessageModalOpen(false)}
        />

        <DeleteConfirmModal
          isActive={showDeleteModal}
          onDelete={handleDeleteRecipient}
          onCancel={() => setShowDeleteModal(false)}
        />

      </Main >
    </>
  )

}