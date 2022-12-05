import { useState } from "react";
import dukeLogo from "./assets/dukes/duke3.webp";
import "./App.css";
import Duke from "./components/Duke";
import SendMessage from "./components/form/SendMessage";
import ShowAnswer from "./components/answer/ShowAnswer";
import Footer from "./components/footer/Footer";

function App() {
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  let faviconLink = document.querySelector(
    "link[rel*='icon']"
  ) as HTMLLinkElement;
  faviconLink.href = dukeLogo;
  const apiKey = (import.meta.env.VITE_OPENAI_API_KEY as string) || "";

  const answerHandler = (openAIResponse: string) => {
    setAnswer(openAIResponse);
  };

  const questionHandler = (question: string) => {
    setQuestion(question);
  };

  return (
    <div className="app">
      <main>
        <h1>Superduke ! </h1>
        <Duke />
        <ShowAnswer answer={answer} question={question} />
        <SendMessage
          apiKey={apiKey}
          answerHandler={answerHandler}
          questionHandler={questionHandler}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
