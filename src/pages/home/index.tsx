import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "atom/text";
import { Spacer } from "atom/spacer";
import { Button } from "atom/button";
import { Question } from "types/types";
import "./index.scss";

export const Home = ({ data }: { data: Array<Question> }) => {
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
          <div className="toggle">▶</div>
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
      <Spacer height={50} />
      <Text type="title">【国試対策】長い横文字ドリル</Text>
      <Text type="subtitle">
        長い横文字の医学用語でめっちゃイキれるようになります
      </Text>
      <Spacer height={30} />
      {data.map((item, index) => (
        <ListNode key={index} question={item} />
      ))}
      <Button
        value="ミニテスト"
        onClick={() => {
          navigation("/training");
        }}
        classes={["home-button"]}
        bottomFix={true}
      />
    </div>
  );
};
