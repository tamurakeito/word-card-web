import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Question } from "types/types";
import { Text } from "atom/text";
import { Button } from "atom/button";
import "./index.scss";
import { useThemaContext } from "component/thema-provider";
import { useTrainingContext } from "component/training-provider";
import { Circle, X } from "react-feather";

export const Training = () => {
  const { thema } = useThemaContext();
  const { questionLength } = useTrainingContext();
  const [questionArray, setQuestionArray] = useState<Array<Question>>([]);
  const [originalArr, setOriginalArr] = useState<Array<Question>>([]);
  const RandomSampling = () => {
    const length = originalArr.length;
    const resultLength = length < questionLength ? length : questionLength;

    for (let i = 0; i < resultLength; i++) {
      const randomIdx = Math.floor(Math.random() * length);
      let tmpStorage = originalArr[i];
      originalArr[i] = originalArr[randomIdx];
      originalArr[randomIdx] = tmpStorage;
    }
    setQuestionArray(originalArr.slice(0, resultLength));
  };
  useEffect(() => {
    const arr: Array<Question> = [];
    thema.data.map((item, index) => {
      arr[index] = item;
      return undefined;
    });
    setOriginalArr(arr);
  }, []);

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
            <Text type="title">{question.question}</Text>
            {question.answer.map((item) => (
              <Text type="comment">{item}</Text>
            ))}
            <div className="button-right-wrong">
              <Circle
                className="right"
                color="#aaccff"
                onClick={() => {
                  setOriginalArr(
                    originalArr.filter(
                      (data) => data.question !== question.question && data
                    )
                  );
                  // setIsHidden(true);
                  RandomSampling();
                }}
              />
              <X
                className="wrong"
                color="#ffaaaa"
                onClick={() => {
                  setIsHidden(true);
                }}
              />
            </div>
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
          <div
            className="cover"
            onClick={() => {
              RandomSampling();
              setIsStarted(true);
            }}
          >
            <div>
              <Text type="title">ミニテスト 10問</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        ) : originalArr.length > 0 ? (
          <div
            className="retry"
            onClick={() => {
              RandomSampling();
            }}
          >
            <div>
              <Text type="title">再トライ</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        ) : (
          <div
            className="retry"
            onClick={() => {
              navigation("/word-card-web");
            }}
          >
            <div>
              <Text type="title">おわり！</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        )}
        {questionArray.map((item, index) => (
          <Card key={index} question={item} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigation("/word-card-web");
        }}
        bottomFix={true}
      >
        もどる
      </Button>
    </div>
  );
};
