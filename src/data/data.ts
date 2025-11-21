import { ThemaContent } from "../types/types";
import KesyouhinKenteiLv01 from "./json/kesyouhin-kentei-lv01.json"
import KesyouhinKenteiLv02 from "./json/kesyouhin-kentei-lv02.json"

const filterEmptyData = (thema: ThemaContent): ThemaContent => ({
  ...thema,
  data: thema.data.filter(item =>
    item.question.trim() !== "" &&
    item.answer.length > 0 &&
    item.answer.some(ans => ans.trim() !== "")
  )
});

export const themaList: Array<ThemaContent> = [
  KesyouhinKenteiLv01,
  KesyouhinKenteiLv02
].map(filterEmptyData);
