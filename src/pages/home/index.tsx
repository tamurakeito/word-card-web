import { useEffect, useState } from "react";
import { Text } from "atom/text";
import { Spacer } from "atom/spacer";
import { Button } from "atom/button";
import { Question, ThemaContent } from "types/types";
import "./index.scss";
import { Play } from "react-feather";
import { useThemaContext } from "component/thema-provider";
import { useTrainingContext } from "component/training-provider";
import { useSurfaceContext } from "component/surface-provider";

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

import KoreanWords1 from "data/korean-words1.json";

export const Home = () => {
  const { thema, setThemaContent } = useThemaContext();
  const { setQuestionLength } = useTrainingContext();
  const { setSurface } = useSurfaceContext();
  const themaList : Array<ThemaContent> = [
    KoreanWords1
  ];
  useEffect(() => {
    setThemaContent(themaList[0]);
  }, []);
  useEffect(() => {
    document.title = thema.title;
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
          {question.answer.map((item) => (
            <Text type="body">{item}</Text>
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
  return (
    <div className="home">
      <div
        onDoubleClick={() => {
          setQuestionLength(30);
          setSurface("training");
        }}
      >
        <Spacer height={50} />
        <Text type="title">{thema.title}</Text>
        {/* <Text type="subtitle">
          長い横文字の医学用語でめっちゃイキれるようになります
        </Text> */}
        <Spacer height={30} />
      </div>
      {thema.data.map((item, index) => (
        <ListNode key={index} question={item} />
      ))}
      <Spacer height={120} />
      <div className="home-bottom-fixed">
        <Button
          onClick={() => {
            setQuestionLength(10);
            setSurface("training");
          }}
          classes={["home-button"]}
          // bottomFix={true}
        >
          ミニテスト
        </Button>
        <Button onClick={changeThema} classes={["home-button"]} color={"grey"}>
          切り替える
        </Button>
      </div>
    </div>
  );
};
