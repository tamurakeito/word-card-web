import "./index.scss";
import { useEffect, useRef, useState } from "react";
import { ModeType, ModeTypes, Question } from "../../types/types";
import { Text } from "../../ui/atom/text";
import { Button } from "../../ui/atom/button";
import { useThemaContext } from "../../component/thema-provider";
import { useTrainingContext } from "../../component/training-provider";
import { Circle, X } from "react-feather";
import { useSurfaceContext } from "../../component/surface-provider";
import { MinimumButton } from "../../ui/atom/minimum-button";
import { Center } from "../../ui/atom/center";
import { CopyClipboard } from "../../ui/molecule/copy-clipboard";

export const Training = ({ mode }: { mode: ModeType }) => {
  const { thema } = useThemaContext();
  const { questionLength } = useTrainingContext();
  const { setSurface } = useSurfaceContext();
  const [questionArray, setQuestionArray] = useState<Array<Question>>([]);
  const [originalArr, setOriginalArr] = useState<Array<Question>>([]);

  // 配列からランダムに抽出する
  const RandomSampling = (arr: Array<Question>) => {
    const length = Math.min(arr.length, 10);

    for (let i = 0; i < length; i++) {
      const randomIdx = Math.floor(Math.random() * length);
      let tmpStorage = arr[i];
      arr[i] = arr[randomIdx];
      arr[randomIdx] = tmpStorage;
    }
    setQuestionArray(arr.slice(0, length));
  };

  const getRandomItems = (
    arr: Array<Question>,
    count: number
  ): Array<Question> => {
    const len = arr.length;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count < len ? count : len);
  };

  useEffect(() => {
    const arr: Array<Question> = thema
      ? getRandomItems(thema.data, questionLength)
      : [];
    setOriginalArr(arr);
  }, []);

  // 配列から要素を抜く
  // 正解した場合に問題配列から削除する処理に用いる
  const DeleteQuestion = async (arr: Array<Question>, question: string) => {
    const Arr = arr.filter((data) => data.question !== question && data);
    RandomSampling(Arr);
    setOriginalArr(Arr);
  };

  const divRef = useRef<HTMLDivElement>(null);

  const Card = ({
    question,
    isLast,
    divRef,
  }: {
    question: Question;
    isLast: boolean;
    divRef: React.RefObject<HTMLDivElement>;
  }) => {
    const [isAnswer, setIsAnswer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const handleClick = (arr: Array<Question>) => {
      setIsHidden(true);
      isLast && RandomSampling(arr);
    };

    // 多分だけど、questionArrをひとつずつ減らしていけばいいんだと思う

    useEffect(() => {
      if (divRef.current) {
        divRef.current.focus();
      }
    }, [isHidden]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isAnswer) {
        if (event.key === "Enter") {
          setIsAnswer(true);
        }
      } else {
        if (event.key === "Enter") {
          handleClick(originalArr);
        } else if (event.key === "l") {
          DeleteQuestion(originalArr, question.question);
        }
      }
    };

    return isHidden ? (
      <></>
    ) : (
      <div ref={divRef} tabIndex={0} onKeyDown={handleKeyDown}>
        {!isAnswer ? (
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
              // handleClick(originalArr);
            }}
          >
            <div className={"card"}>
              <span>
                <CopyClipboard content={question.question}>
                  <Text type="title">{question.question}</Text>
                  {question.answer.map((item, index) => (
                    <Text key={index} type="comment">
                      {item}
                    </Text>
                  ))}
                </CopyClipboard>
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
        )}
      </div>
    );
  };
  const MinimumCard = ({
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
    ) : (
      <div className={"minimum-card"}>
        {!isAnswer ? (
          <Center>
            <MinimumButton
              label={question.question}
              onClick={() => {
                setIsAnswer(true);
              }}
            />
          </Center>
        ) : (
          <>
            <Center>
              {question.question}
              {question.answer.map((item, index) => (
                <span key={index}> {item} </span>
              ))}
            </Center>
            <Center>
              <MinimumButton
                label={"○"}
                onClick={() => {
                  DeleteQuestion(originalArr, question.question);
                }}
              />
              <MinimumButton
                label={"×"}
                onClick={() => {
                  handleClick(originalArr);
                }}
              />
            </Center>
          </>
        )}
      </div>
    );
  };

  const [isStarted, setIsStarted] = useState(false);

  return mode === ModeTypes.default ? (
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
              <Text type="title">トレーニング：{originalArr.length}問</Text>
              <Text type="subtitle">tap!</Text>
            </div>
          </div>
        ) : originalArr.length > 0 ? (
          <>
            <div className="remaining-questions">
              <Text type="head">のこり{originalArr.length}問</Text>
              <Button
                onClick={() => {
                  setSurface("home");
                }}
              >
                もどる
              </Button>
            </div>
            {questionArray.map((item, index) => (
              <Card
                key={index}
                question={item}
                isLast={index > 0 ? false : true}
                divRef={divRef}
              />
            ))}
          </>
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
      </div>
    </div>
  ) : (
    <div className={"minimum"}>
      {!isStarted ? (
        <Center>
          <MinimumButton
            label={`training: ${originalArr.length} Q's  >> start`}
            onClick={() => {
              RandomSampling(originalArr);
              setIsStarted(true);
            }}
          />
        </Center>
      ) : originalArr.length > 0 ? (
        <>
          <div className={"minimum-button-area"}>
            rest {originalArr.length}
            <MinimumButton
              label={"back"}
              onClick={() => {
                setSurface("home");
              }}
            />
          </div>
          <Center>
            {questionArray.map((item, index) => (
              <MinimumCard key={index} question={item} isLast={index === 0} />
            ))}
          </Center>
        </>
      ) : (
        <MinimumButton
          label={"end."}
          onClick={() => {
            setSurface("home");
          }}
        />
      )}
    </div>
  );
};
