import Head from "next/head";
import App from "../components/App";

export default function Home() {
  return (
    <>
      <Head>
        <title>ERDC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="section">
        <h1 className="title">Bienvenido MrCano369</h1>
        <div className="columns">
          <App text="DailyActivityCheck" />
          <App text="ToDoTomorrow" />
          <App text="LinksStorage" />
          <App text="StudyDecks" />
        </div>
      </main>
    </>
  );
}
