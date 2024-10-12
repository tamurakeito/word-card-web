import { Question } from "../types/types";
import { themaList } from "../data/data";
import { readLineAsync } from "./common/stdin";

// import readline from "readline";
import { exec } from "child_process";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // コマンドキーが押されているかをトラックするフラグ
// let isCommandPressed = false;

// // 標準入力の設定
// process.stdin.setRawMode(true);
// process.stdin.resume();
// process.stdin.setEncoding("utf8");

const shuffleItems = (arr: Array<Question>): Array<Question> => {
  return [...arr].sort(() => 0.5 - Math.random());
};

const getRandomItems = (
  arr: Array<Question>,
  count: number
): Array<Question> => {
  const shuffled = shuffleItems(arr);
  return shuffled.slice(0, Math.min(count, arr.length));
};

const chooseData = async (args?: number) => {
  const len = themaList.length;
  let array: Array<Question> | undefined = undefined;
  if (args !== undefined && 1 <= args && args <= len + 1) {
    const thema = themaList[args - 1];
    array = thema.data;
    console.log(`>> ${args}: ${thema.title}\n`);
  } else {
    themaList.forEach((e, index) => {
      console.log(`${index + 1}: ${e.title}`);
    });
    console.log(`${len + 1}: 全ての問題`);
    const input = await readLineAsync(">> ");
    console.log("");
    if (!isNaN(Number(input))) {
      if (0 < Number(input) && Number(input) <= len) {
        array = themaList[Number(input) - 1].data;
      } else if (Number(input) === len + 1) {
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
  }
  return array;
};

const chooseMode = async (data: Array<Question>, args?: number) => {
  let array: Array<Question> | undefined = undefined;
  const modeList = [
    "5問テスト",
    "15問テスト",
    "25問テスト",
    `全問テスト（${data.length}問）`,
    "display all recorded words",
  ];

  const setMode = (number: number) => {
    if (number === 1) {
      array = getRandomItems(data, 5);
    } else if (number === 2) {
      array = getRandomItems(data, 15);
    } else if (number === 3) {
      array = getRandomItems(data, 25);
    } else if (number === 4) {
      array = shuffleItems(data);
    } else if (number === 5) {
      data.forEach((item) => {
        console.log(`\x1b[36m${item.question}\x1b[0m ${item.answer}`);
      });
      return;
    } else {
      console.log("正しい番号を選択してください。");
    }
  };

  if (args !== undefined && 1 <= args && args <= modeList.length) {
    const mode = modeList[args - 1];
    console.log(`>> ${args}: ${mode}\n`);
    setMode(args);
  } else {
    modeList.forEach((mode, index) => {
      console.log(`${index + 1}: ${mode}`);
    });
    const input = await readLineAsync(">> ");
    console.log("");
    if (!isNaN(Number(input))) {
      setMode(Number(input));
    } else {
      console.log("番号を選択してください。");
    }
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
  for (;;) {
    const input = await readLineAsync("[l/p] >> ");
    if (input === "c") {
      exec(`echo "${dialog.question}" | pbcopy`);
      console.log("Copied to clipboard.");
    } else {
      return input === "l";
    }
  }
};

const main = async () => {
  const argsThema = process.argv[2];
  const argsMode = process.argv[3];

  let originalData: Array<Question>;
  let selectedData: Array<Question>;
  console.log("問題を選択してください");
  for (;;) {
    const response = await chooseData(Number(argsThema));
    if (response !== undefined) {
      originalData = response;
      break;
    }
    console.log("");
  }

  console.log("モードを選択してください");
  for (;;) {
    const response = await chooseMode(originalData, Number(argsMode));
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
      // // キー入力をリッスン
      // process.stdin.on("data", (key: Buffer) => {
      //   const keyString = key.toString(); // Bufferをstringに変換
      //   if (keyString === "\u001b") {
      //     // Commandキーが押されるとき (MacのCommandキーが押された際はエスケープシーケンスが発生)
      //     isCommandPressed = true;
      //   }
      //   if (keyString === "c" && isCommandPressed) {
      //     // Command + Cを感知した場合
      //     console.log("Command + C detected!");
      //     exec(`echo "${selectedData[count].question}" | pbcopy`);
      //     isCommandPressed = false; // リセット
      //   }
      // });

      const result = await trainingData(dialog);
      if (result) {
        console.log("-> ○");
        selectedData.splice(count, 1);
        if (selectedData.length % 5 === 0 && selectedData.length > 0) {
          console.log(`\n残り${selectedData.length}問！`);
        }
        selectedData = shuffleItems(selectedData);
        count = 0;
      } else {
        console.log("-> ×");
        if (selectedData.length - 1 > count) {
          count += 1;
        } else {
          selectedData = shuffleItems(selectedData);
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
