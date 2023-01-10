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

export const Home = () => {
  const { thema, setThemaContent } = useThemaContext();
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
  return (
    <div className="home">
      <div
        onClick={() => {
          // このテーマの切り替えはproviderの方のファイルに移動させる
          switch (thema.index) {
            case 1:
              setThemaContent(KokushiEnglish);
              return;
            case 2:
              setThemaContent(KokushiYokomoji);
              return;
            default:
              return;
          }
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
      <Button
        value="ミニテスト"
        onClick={() => {
          navigation("/word-card-web/training");
        }}
        classes={["home-button"]}
        bottomFix={true}
      />
    </div>
  );
};
