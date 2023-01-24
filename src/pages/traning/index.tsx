import { useEffect, useState } from "react";
import { Question } from "types/types";
import { Text } from "atom/text";
// import { Button } from "atom/button";
import "./index.scss";
import { useThemaContext } from "component/thema-provider";
import { useTrainingContext } from "component/training-provider";
import { Circle, X } from "react-feather";
import { useSurfaceContext } from "component/surface-provider";

export const Training = () => {
  const { thema } = useThemaContext();
  const { questionLength } = useTrainingContext();
  const { setSurface } = useSurfaceContext();
  const [questionArray, setQuestionArray] = useState<Array<Question>>([]);
  const [originalArr, setOriginalArr] = useState<Array<Question>>([]);

  // 配列からランダムに抽出する
  const RandomSampling = (arr: Array<Question>) => {
    const length = arr.length;
    const resultLength = length < questionLength ? length : questionLength;

    for (let i = 0; i < resultLength; i++) {
      const randomIdx = Math.floor(Math.random() * length);
      let tmpStorage = arr[i];
      arr[i] = arr[randomIdx];
      arr[randomIdx] = tmpStorage;
    }
    setQuestionArray(arr.slice(0, resultLength));
  };

  useEffect(() => {
    const arr: Array<Question> = [];
    thema.data.map((item, index) => {
      arr[index] = item;
      return undefined;
    });
    setOriginalArr(arr);
  }, []);

  // 配列から要素を抜く
  // 正解した場合に問題配列から削除する処理に用いる
  const DeleteQuestion = async (arr: Array<Question>, question: string) => {
    const Arr = arr.filter((data) => data.question !== question && data);
    RandomSampling(Arr);
    setOriginalArr(Arr);
  };

  const Card = ({
    question,
    isLast,
  }: {
    question: Question;
    isLast: boolean;
  }) => {
    const [isAnswer, setIsAnswer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const handleClick = (arr: Array<Question>) => {
      setIsHidden(true);
      isLast && RandomSampling(arr);
    };
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
          handleClick(originalArr);
        }}
      >
        <div className="card">
          <span>
            <Text type="title">{question.question}</Text>
            {question.answer.map((item, index) => (
              <Text key={index} type="comment">
                {item}
              </Text>
            ))}
            <div className="button-right-wrong">
              <Circle
                className="right"
                color="#aaccff"
                onClick={() => {
                  DeleteQuestion(originalArr, question.question);
                }}
              />
              <X
                className="wrong"
                color="#ffaaaa"
                onClick={() => {
                  handleClick(originalArr);
                }}
              />
            </div>
          </span>
        </div>
      </div>
    );
  };

  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="training">
      <div>
        {!isStarted ? (
          <div
            className="cover"
            onClick={() => {
              RandomSampling(originalArr);
              setIsStarted(true);
            }}
          >
            <div>
              <Text type="title">ミニテスト {originalArr.length}問</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        ) : originalArr.length > 0 ? (
          <div className="remaining-questions">
            <Text type="head">のこり{originalArr.length}問</Text>
          </div>
        ) : (
          <div
            className="retry"
            onClick={() => {
              setSurface("home");
            }}
          >
            <div>
              <Text type="title">おわり！</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        )}
        {questionArray.map((item, index) => (
          <Card key={index} question={item} isLast={index > 0 ? false : true} />
        ))}
      </div>
      {/* <Button
        onClick={() => {
          setSurface("home");
        }}
        bottomFix={true}
      >
        もどる
      </Button> */}
    </div>
  );
};
