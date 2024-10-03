import { useEffect, useState } from "react";
import { Text } from "ui/atom/text";
import { Spacer } from "ui/atom/spacer";
import { Button } from "ui/atom/button";
import { Question, ThemaContent } from "types/types";
import "./index.scss";
import { Play } from "react-feather";
import { useThemaContext } from "component/thema-provider";
import { useTrainingContext } from "component/training-provider";
import { useSurfaceContext } from "component/surface-provider";
import { themaList } from "data/data";
import { Fade } from "ui/atom/fade";
import { ButtonBox } from "ui/molecule/button-box";

// import HerbalMedicine from "data/herbal-medicine.json";

// import Hangul from "data/hangul.json";
// import Hangul2 from "data/hangul2.json";
// import FrequentPhrase from "data/frequent-phrases.json";

// import KokushiYokomoji from "data/kokushi-yokomoji.json";
// import KokushiEnglish from "data/kokushi-english.json";
// import KokushiSign from "data/kokushi-sign.json";
// import KokushiDrug from "data/kokushi-drug.json";
// import KokushiDermadrome from "data/kokushi-dermadrome.json";
// import ResidentAnesthetic from "data/resident-anesthetic.json";

// import InteriorDesigner from "data/interior-designer.json";

export const Home = () => {
  const { thema, setThemaContent } = useThemaContext();
  const { setQuestionLength } = useTrainingContext();
  const { setSurface } = useSurfaceContext();
  useEffect(() => {
    setThemaContent(themaList[0]);
  }, []);
  useEffect(() => {
    document.title = !!thema ? thema.title : "";
  }, [thema]);
  const ListNode = ({ question }: { question: Question }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    const [classes, setClasses] = useState("list-node");
    useEffect(() => {
      if (isOpen) {
        setClasses("list-node open");
      } else {
        setClasses("list-node");
      }
    }, [isOpen]);
    return (
      <div className={classes}>
        <div className="node-head" onClick={handleClick}>
          <div className="toggle">
            <Play />
          </div>
          <Text type="head">{question.question}</Text>
        </div>
        <div className="node-body">
          {question.answer.map((item, index) => (
            <Text key={index} type="body">
              {item}
            </Text>
          ))}
        </div>
      </div>
    );
  };
  const setThema = (thema: ThemaContent) => {
    setThemaContent(thema);
    document.title = thema.title;
  };
  const [themaIndex, setThemaIndex] = useState(0);
  const changeThema = () => {
    setThemaIndex(themaIndex + 1 < themaList.length ? themaIndex + 1 : 0);
    setThema(themaList[themaIndex]);
  };
  const integrationThema = () => {
    let data: Array<Question> = [];
    themaList.forEach((e) => {
      data.push(...e.data);
    });
    setThema({
      title: "統合テスト",
      data: data,
    });
  };
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="home">
        <div
          onDoubleClick={() => {
            setQuestionLength(30);
            setSurface("training");
          }}
        >
          <Spacer height={50} />
          <Text type="title">{!!thema ? thema.title : ""}</Text>
          {/* <Text type="subtitle">
        長い横文字の医学用語でめっちゃイキれるようになります
      </Text> */}
          <Spacer height={30} />
        </div>
        {!!thema &&
          thema.data.map((item, index) => (
            <ListNode key={index} question={item} />
          ))}
        <Spacer height={120} />
        <div className="home-bottom-fixed">
          <Button
            onClick={() => {
              setIsActive(!isActive);
            }}
            classes={["home-button"]}
            color={"black"}
          >
            トレーニング
          </Button>
          <Button
            onClick={changeThema}
            classes={["home-button"]}
            color={"grey200"}
          >
            切り替える
          </Button>
          <Button
            onClick={() => {
              integrationThema();
              setIsActive(!isActive);
            }}
            classes={["home-button"]}
            color={"grey400"}
          >
            統合テスト
          </Button>
        </div>
      </div>
      <Fade
        isActive={isActive}
        onTap={() => {
          setIsActive(false);
        }}
      />
      <ButtonBox isActive={isActive}>
        <Button
          onClick={() => {
            setQuestionLength(5);
            setSurface("training");
          }}
          classes={["home-button"]}
          color={"black"}
        >
          5問
        </Button>
        <Button
          onClick={() => {
            setQuestionLength(10);
            setSurface("training");
          }}
          classes={["home-button"]}
          color={"grey100"}
        >
          15問
        </Button>
        <Button
          onClick={() => {
            setQuestionLength(10);
            setSurface("training");
          }}
          classes={["home-button"]}
          color={"grey200"}
        >
          25問
        </Button>
        <Button
          onClick={() => {
            setQuestionLength(9999);
            setSurface("training");
          }}
          classes={["home-button"]}
          color={"grey300"}
        >
          全問
        </Button>
        <Button
          onClick={() => {
            setIsActive(!isActive);
          }}
          classes={["home-button"]}
          color={"grey400"}
        >
          もどる
        </Button>
      </ButtonBox>
    </>
  );
};
