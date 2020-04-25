import BB from "./bank.json";
import Tool from "./tool";

const Branch = Tool.groupBy(BB, "\u7e3d\u6a5f\u69cb\u4ee3\u865f");
const Bank = Object.keys(Branch).map(ele => {
  return [Branch[ele][0]["總機構代號"], Branch[ele][0]["機構名稱"]];
});

export default { bank: Bank, branch: Branch };
