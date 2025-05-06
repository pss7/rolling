import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Main from "../components/layout/Main";
import styles from "./ListPage.module.css";
import { useEffect, useState } from "react";
import { getList } from "../api/list";

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

  return (
    <Main id="sub">
      <Container>
        <h2 className={styles.title}>
          인기 롤링 페이퍼🔥
        </h2>
        <div className={styles.listBox}>
          {
            listData.map((data, index) => {
              return (
                <Link to="/" key={index}>
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
              )
            })
          }

        </div>
      </Container>
    </Main>
  )

}