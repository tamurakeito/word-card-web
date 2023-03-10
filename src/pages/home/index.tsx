import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "atom/text";
import { Spacer } from "atom/spacer";
import { Button } from "atom/button";
import { Question } from "types/types";
import "./index.scss";
import { Play } from "react-feather";
import { useThemaContext } from "component/thema-provider";
import KokushiYokomoji from "data/kokushi-yokomoji.json";
import KokushiEnglish from "data/kokushi-english.json";
import KokushiSign from "data/kokushi-sign.json";
import KokushiDrug from "data/kokushi-drug.json";
import KokushiDermadrome from "data/kokushi-dermadrome.json";
import { useTrainingContext } from "component/training-provider";
import { useSurfaceContext } from "component/surface-provider";

export const Home = () => {
  const { thema, setThemaContent } = useThemaContext();
  const { setQuestionLength } = useTrainingContext();
  const { setSurface } = useSurfaceContext();
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
  const navigation = useNavigate();
  const changeThema = () => {
    // このテーマの切り替えはproviderの方のファイルに移動させる
    switch (thema.index) {
      case 1:
        setThemaContent(KokushiEnglish);
        document.title = KokushiEnglish.title;
        return;
      case 2:
        setThemaContent(KokushiSign);
        document.title = KokushiSign.title;
        return;
      case 3:
        setThemaContent(KokushiDrug);
        document.title = KokushiDrug.title;
        return;
      case 4:
        setThemaContent(KokushiDermadrome);
        document.title = KokushiDermadrome.title;
        return;
      case 5:
        setThemaContent(KokushiYokomoji);
        document.title = KokushiYokomoji.title;
        return;
      default:
        return;
    }
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
