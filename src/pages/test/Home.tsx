
import Header from "../../components/layout/Header";
import Main from "../../components/layout/Main";
import MainPage from "../MainPage";

export default function Home() {

  return (
    <>
      <Header />
      <Main id="main">
        <MainPage />
      </Main>
    </>
  )

}