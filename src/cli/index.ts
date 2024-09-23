import { Question } from "../types/types";
import { themaList } from "../data/data";
import { readLineAsync } from "./common/stdin";

const chooseData = async () => {
  themaList.forEach((e, index) => {
    console.log(`${index + 1}: ${e.title}`);
  });
  console.log(`${themaList.length + 1}: 統合テスト`);
  let array: Array<Question> | undefined = undefined;
  const input = await readLineAsync(">> ");
  console.log("");
  if (!isNaN(Number(input))) {
    if (0 < Number(input) && Number(input) <= themaList.length) {
      array = themaList[Number(input) - 1].data;
    } else if (Number(input) === themaList.length + 1) {
      array = [];
      themaList.forEach((e) => {
        array = array !== undefined ? [...array, ...e.data] : e.data;
      });
    } else {
      console.log("正しい番号を選択してください。");
    }
  } else {
    console.log("番号を選択してください。");
  }
  return array;
};

const prompt = async (msg: string): Promise<string> => {
  const answer: string = await readLineAsync(msg, { repeatUntilInput: true });
  return answer.trim();
};

const trainingData = async (
  index: number,
  dialog: Question
): Promise<boolean> => {
  await prompt("\x1b[36mQ." + dialog.question);
  console.log("\x1b[35mA.\x1b[0m");
  dialog.answer.forEach((answer: string) => {
    console.log(answer);
  });
  const input = await readLineAsync("[l/p] >> ");
  return input === "l";
};

const main = async () => {
  console.log("問題を選択してください");
  let data: Array<Question>;
  for (;;) {
    const response = await chooseData();
    if (response !== undefined) {
      data = response;
      break;
    }
    console.log("");
  }
  console.log(
    "↓↓↓Enterキーを押して操作してください↓↓↓\n(正解なら'l+Enter' 不正解なら'p+Enter')"
  );

  for (;;) {
    if (data.length > 0) {
      const index = Math.floor(Math.random() * data.length);
      const dialog = data[index];
      const result = await trainingData(index, dialog);
      if (result) {
        console.log("-> ○");
        data.splice(index, 1);
      } else {
        console.log("-> ×");
      }
      console.log("");
    } else {
      console.log("おわり！");
      return;
    }
  }
};

(async () => {
  await main();
})();
