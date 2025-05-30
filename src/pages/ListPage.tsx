import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Main from "../components/layout/Main";
import styles from "./ListPage.module.css";
import { useEffect, useRef, useState } from "react";
import { getList } from "../api/list";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import '../styles/swiper.css';
import Header from "../components/layout/Header";


export default function ListPage() {

  interface Recipient {
    id: string;
    name: string;
    backgroundColor: string;
    backgroundImageURL: string;
    createdAt: string;
    messageCount: number;
    recentMessages: {
      profileImageURL: string;
    }[];
    reactionCount: number;
    topReactions: {
      emoji: string;
      count: number;
    }[];
  }

  const [count, setCount] = useState<number | null>(null);
   console.log(count); 
  const [listData, setListData] = useState<Recipient[]>([]);
  console.log(listData);
  const [sortedListData, setSortedListData] = useState<Recipient[]>([]);

  useEffect(() => {

    async function fetchInitial() {
      try {
        const response = await getList();
        if (response) {
          setCount(response.count);
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    }

    fetchInitial();
  }, [])

  useEffect(() => {

    async function fetchList() {
      try {
        const response = await getList(count);
        if (response) {
          //인기순정렬
          const sortedData = response.results.sort((a: Recipient, b: Recipient) => b.messageCount - a.messageCount);

          //인기순 8개 정렬
          const popularity = sortedData.slice(0, 8);
          setSortedListData(popularity);

          //최근 등록된 순 정렬
          const sortedRecentData = response.results.sort(
            (a: Recipient, b: Recipient) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setListData(sortedRecentData);

        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    }

    fetchList();

  }, [count]);

  const prevRef01 = useRef(null);
  const nextRef01 = useRef(null);
  const prevRef02 = useRef(null);
  const nextRef02 = useRef(null);

  return (
    <>
      <Header />
      <Main id="sub">
        <Container>
          <div className={styles.box}>
            <h2 className={styles.title}>
              인기 롤링 페이퍼🔥
            </h2>
            <div className={styles.listBox}>
              <Swiper
                slidesPerView="auto"
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef01.current,
                  nextEl: nextRef01.current,
                }}
                pagination={{ clickable: true }}
                loop={false}
                breakpoints={{
                  767: {
                    spaceBetween: 22,
                  },
                  0: {
                    spaceBetween: 15,
                  },
                }}
              >
                {
                  sortedListData.map((data, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className={styles.slide}
                      >
                        <Link to={`/message-list/${data.id}`}
                          className={
                            data.backgroundImageURL
                              ? styles.backgroundImage
                              : `${data.backgroundColor === "beige" ? styles.beige : ""}
       ${data.backgroundColor === "purple" ? styles.purple : ""}
       ${data.backgroundColor === "blue" ? styles.blue : ""}
       ${data.backgroundColor === "green" ? styles.green : ""}`
                          }
                          style={
                            data.backgroundImageURL
                              ? {
                                background: `url(${data.backgroundImageURL}) no-repeat center`,
                                backgroundSize: "cover",
                              }
                              : {}
                          }
                        >
                          <div className={styles.textBox}>
                            <h3>
                              To.{data.name}
                            </h3>
                            <div className={styles.profileImageBox}>
                              {
                                data.recentMessages.length > 0 ? (
                                  <>
                                    {
                                      data.recentMessages.map((message, index) => {
                                        return (
                                          <div className={styles.profileImage} key={index}>
                                            <img src={message.profileImageURL} alt="프로필이미지" />
                                          </div>
                                        );
                                      })
                                    }
                                    <div className={styles.defaultImage}>
                                      +{data.messageCount >= 3 ? Number(data.messageCount - 3) : 0}
                                    </div>
                                  </>
                                ) : (
                                  <div className={styles.defaultImage}>
                                    +{data.messageCount >= 3 ? Number(data.messageCount - 3) : 0}
                                  </div>
                                )
                              }
                            </div>
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
                <button ref={prevRef01} className={styles.prevBtn}>
                  <span className="blind">이전버튼</span>
                </button>
                <button ref={nextRef01} className={styles.nextBtn}>
                  <span className="blind">다음버튼</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.box}>
            <h2 className={styles.title}>
              최근에 만든 롤링 페이퍼 ⭐️️
            </h2>
            <div className={styles.listBox}>
              <Swiper
                slidesPerView="auto"
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef02.current,
                  nextEl: nextRef02.current,
                }}
                pagination={{ clickable: true }}
                loop={false}
                breakpoints={{
                  767: {
                    spaceBetween: 22,
                  },
                  0: {
                    spaceBetween: 15,
                  },
                }}
              >
                {
                  listData.map((data, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className={styles.slide}
                      >
                        <Link to={`/message-list/${data.id}`}
                          className={
                            data.backgroundImageURL
                              ? styles.backgroundImage
                              : `${data.backgroundColor === "beige" ? styles.beige : ""}
       ${data.backgroundColor === "purple" ? styles.purple : ""}
       ${data.backgroundColor === "blue" ? styles.blue : ""}
       ${data.backgroundColor === "green" ? styles.green : ""}`
                          }
                          style={
                            data.backgroundImageURL
                              ? {
                                background: `url(${data.backgroundImageURL}) no-repeat center`,
                                backgroundSize: "cover",
                              }
                              : {}
                          }
                        >
                          <div className={styles.textBox}>
                            <h3>
                              {data.name}
                            </h3>
                            <div className={styles.profileImageBox}>
                              {
                                data.recentMessages.length > 0 ? (
                                  <>
                                    {
                                      data.recentMessages.map((message, index) => {
                                        return (
                                          <div className={styles.profileImage} key={index}>
                                            <img src={message.profileImageURL} alt="프로필이미지" />
                                          </div>
                                        );
                                      })
                                    }
                                    <div className={styles.defaultImage}>
                                      +{data.messageCount >= 3 ? Number(data.messageCount - 3) : 0}
                                    </div>
                                  </>
                                ) : (
                                  <div className={styles.defaultImage}>
                                    +0
                                  </div>
                                )
                              }
                            </div>
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
                <button ref={prevRef02} className={styles.prevBtn}>
                  <span className="blind">이전버튼</span>
                </button>
                <button ref={nextRef02} className={styles.nextBtn}>
                  <span className="blind">다음버튼</span>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Main>
    </>
  )

}