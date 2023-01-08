import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "types/types";
import { Text } from "atom/text";
import { Button } from "atom/button";
import "./index.scss";

export const Training = ({ data }: { data: Array<Question> }) => {
  const RandomSampling = (data: Array<Question>): Array<Question> => {
    // const [arr, setArr] = useState<Array<Question>>(data);
    const arr: Array<Question> = [];
    data.map((item, index) => {
      arr[index] = item;
      return undefined;
    });
    const length = arr.length;
    const resultLength = length < 10 ? length : 10;

    for (let i = 0; i < resultLength; i++) {
      const randomIdx = Math.floor(Math.random() * length);
      let tmpStorage = arr[i];
      arr[i] = arr[randomIdx];
      arr[randomIdx] = tmpStorage;
    }
    return arr.slice(0, resultLength);
  };

  const Card = ({ question }: { question: Question }) => {
    const [isAnswer, setIsAnswer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    return isHidden ? (
      <></>
    ) : !isAnswer ? (
      <div
        className="disease"
        onClick={() => {
          setIsAnswer(true);
        }}
      >
        <div className="card">
          <Text type="title">{question.question}</Text>
        </div>
      </div>
    ) : (
      <div
        className="comment"
        onClick={() => {
          setIsHidden(true);
        }}
      >
        <div className="card">
          <span>
            {question.answer.map((item) => (
              <Text type="comment">{item}</Text>
            ))}
          </span>
        </div>
      </div>
    );
  };

  const navigation = useNavigate();

  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="training">
      <div>
        {!isStarted ? (
          <div className="cover" onClick={() => setIsStarted(true)}>
            <div>
              <Text type="title">ミニテスト 10問</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        ) : (
          <div
            className="retry"
            onClick={() => {
              navigation("/word-card-web/training");
            }}
          >
            <div>
              <Text type="title">再トライ</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        )}
        {RandomSampling(data).map((item, index) => (
          <Card key={index} question={item} />
        ))}
      </div>
      <Button
        value="もどる"
        onClick={() => {
          navigation("/word-card-web");
        }}
        bottomFix={true}
      />
    </div>
  );
};
