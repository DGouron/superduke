import React, { useState, useRef } from "react";
import OpenAIAPI from "react-openai-api";
import {
  CompletionPayload,
  CompletionResponse,
} from "react-openai-api/lib/esm/types";

interface IAppProps {
  apiKey: string;
  answerHandler: (openAIResponse: string) => void;
  questionHandler: (question: string) => void;
}

function SendMessage({ apiKey, answerHandler, questionHandler }: IAppProps) {
  const [promptMessage, setPromptMessage] = useState<string>("");
  const messageInputRef = useRef<HTMLInputElement>(null);

  const [payload, setPayload] = useState<CompletionPayload>({
    prompt: "",
    maxTokens: 50,
    temperature: 0.4,
    n: 1,
  });

  const changePromptMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromptMessage(event.target.value);
  };

  const submitPromptMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    questionHandler(promptMessage);
    answerHandler("...");
    setPayload({
      ...payload,
      prompt: promptMessage,
    });
    messageInputRef.current ? (messageInputRef.current.value = "") : null;
    messageInputRef.current?.focus();
  };

  const callbackResponse = (openAIResponse: CompletionResponse) => {
    setPromptMessage(`${promptMessage + openAIResponse.choices[0].text}`);
    answerHandler(openAIResponse.choices[0].text);
  };

  return (
    <section>
      {!!apiKey && !!payload.prompt && (
        <OpenAIAPI
          apiKey={apiKey}
          payload={payload}
          responseHandler={callbackResponse}
        />
      )}
      <form
        className="question__form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          submitPromptMessage(event)
        }
      >
        <input
          type="text"
          id="message"
          name="message"
          className="question__field"
          ref={messageInputRef}
          onChange={(e) => changePromptMessage(e)}
          placeholder="Ask me a question and press enter"
        />
      </form>
    </section>
  );
}

export default SendMessage;
