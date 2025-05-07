import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Main from "../components/layout/Main";
import styles from "./ListPage.module.css";
import { useEffect, useRef, useState } from "react";
import { getList } from "../api/list";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import '../styles/swiper.css';


export default function ListPage() {

  interface Recipient {
    id: string;
    name: string;
    backgroundColor: string;
    backgroundImageURL: string;
    createdAt: string;
    messageCount: number;
    recentMessages: string[];
    reactionCount: number;
    topReactions: {
      emoji: string;
      count: number;
    }[];
  }

  const [listData, setListData] = useState<Recipient[]>([]);
  console.log(listData);

  useEffect(() => {
    async function fetchList() {
      try {
        const response = await getList();
        if (response) {
          setListData(response.results);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    }

    fetchList();
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Main id="sub">
      <Container>
        <h2 className={styles.title}>
          인기 롤링 페이퍼🔥
        </h2>
        <div className={styles.listBox}>
          <Swiper
            spaceBetween={22}
            slidesPerView={4}
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{ clickable: true }}
            loop={false}
          >
            {
              listData.map((data, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={styles.slide}
                  >
                    <Link to="/"
                      style={{ backgroundColor: `${data.backgroundColor}` }}
                      className={
                        `${data.backgroundColor === "beige" ? `${styles.beige}` : ""}
                    ${data.backgroundColor === "purple" ? `${styles.purple}` : ""}
                    ${data.backgroundColor === "blue" ? `${styles.blue}` : ""}
                    ${data.backgroundColor === "green" ? `${styles.green}` : ""}
                `
                      }
                    >
                      <div className={styles.textBox}>
                        <h3>
                          {data.name}
                        </h3>
                        <p>
                          <strong>{data.messageCount}</strong>명이 작성했어요!
                        </p>
                      </div>
                      <div className={styles.iconBox}>
                        {
                          data.topReactions.map((reaction, index) => {
                            return (
                              <span key={index}>
                                <em>{reaction.emoji}</em>
                                {reaction.count}
                              </span>
                            )
                          })
                        }
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          <div className={styles.control}>
            <button ref={prevRef} className={styles.prevBtn}>
              <span className="blind">이전버튼</span>
            </button>
            <button ref={nextRef} className={styles.nextBtn}>
              <span className="blind">다음버튼</span>
            </button>
          </div>
        </div>
      </Container>
    </Main>
  )

}