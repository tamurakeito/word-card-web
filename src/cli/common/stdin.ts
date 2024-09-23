import readline from "readline";

/**
 * 標準入力を取得する
 */
export async function readLineAsync(
  question: string,
  options: { repeatUntilInput: boolean } = { repeatUntilInput: true }
): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const value: string = await new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });

  // if (value.trim() !== "" || !options.repeatUntilInput) {
  //   return value;
  // } else {
  //   return await readLineAsync(question);
  // }
  return value;
}
