import React from "react";
import "../../App.css";

interface IAppProps {
  answer: string;
  question: string;
}
function ShowAnswer({ answer, question }: IAppProps) {
  let answerArray = answer.split("\n");
  answerArray = answerArray.filter((item) => item !== "");

  console.log(answerArray);
  return (
    <section>
      <h2>Moi : {question}</h2>
      {answerArray && answerArray.length > 0 ? (
        <h2>Superduke : {answerArray[0]}</h2>
      ) : (
        <h2>...</h2>
      )}
    </section>
  );
}

export default ShowAnswer;
