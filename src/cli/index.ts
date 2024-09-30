import { Question } from "../types/types";
import { themaList } from "../data/data";
import { readLineAsync } from "./common/stdin";

const getRandomItems = (
  arr: Array<Question>,
  count: number
): Array<Question> => {
  const len = arr.length;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count < len ? count : len);
};

const chooseData = async () => {
  themaList.forEach((e, index) => {
    console.log(`${index + 1}: ${e.title}`);
  });
  console.log(`${themaList.length + 1}: 全ての問題`);
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

const chooseMode = async (data: Array<Question>) => {
  console.log("1: 5問テスト");
  console.log("2: 10問テスト");
  console.log("3: 全問テスト");
  let array: Array<Question> | undefined = undefined;
  const input = await readLineAsync(">> ");
  console.log("");
  if (!isNaN(Number(input))) {
    if (Number(input) === 1) {
      array = getRandomItems(data, 5);
    } else if (Number(input) === 2) {
      array = getRandomItems(data, 10);
    } else if (Number(input) === 3) {
      array = data;
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

const trainingData = async (dialog: Question): Promise<boolean> => {
  await prompt("\x1b[36mQ." + dialog.question);
  console.log("\x1b[35mA.\x1b[0m");
  dialog.answer.forEach((answer: string) => {
    console.log(answer);
  });
  const input = await readLineAsync("[l/p] >> ");
  return input === "l";
};

const main = async () => {
  let originalData: Array<Question>;
  let selectedData: Array<Question>;
  console.log("問題を選択してください");
  for (;;) {
    const response = await chooseData();
    if (response !== undefined) {
      originalData = response;
      break;
    }
    console.log("");
  }

  console.log("モードを選択してくださ");
  for (;;) {
    const response = await chooseMode(originalData);
    if (response !== undefined) {
      selectedData = response;
      break;
    }
    console.log("");
  }

  console.log(
    "↓↓↓Enterキーを押して操作してください↓↓↓\n(正解なら'l+Enter' 不正解なら'p+Enter')"
  );

  let count = 0;
  for (;;) {
    if (selectedData.length > 0) {
      const dialog = selectedData[count];
      const result = await trainingData(dialog);
      if (result) {
        console.log("-> ○");
        selectedData.splice(count, 1);
        if (selectedData.length % 5 === 0 && selectedData.length > 0) {
          console.log(`\n残り${selectedData.length}問！`);
        }
        selectedData.sort(() => 0.5 - Math.random());
      } else {
        console.log("-> ×");
        if (selectedData.length - 1 > count) {
          count += 1;
        } else {
          selectedData.sort(() => 0.5 - Math.random());
          count = 0;
        }
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
