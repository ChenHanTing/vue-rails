import Tool from "./tool";
import Bank from "./bank_branch";
import SelectOpts from "./select_options";

const BankOptions = (bank, branch) => {
  const { reducedFilter, getEle } = Tool;
  const bankNum = Bank["bank"].map(e => {
    return e[0];
  });
  const bankOptStr = Bank["bank"].map(e => {
    return e.join(" ");
  });

  new SelectOpts(
    bank,
    ["請選擇", ...bankOptStr],
    [null, ...bankNum]
  ).appendOpt();

  getEle(bank).addEventListener("change", e => {
    const branchOpt = reducedFilter(
      Bank["branch"][e.target.value],
      ["機構代號", "機構名稱"],
      item => item["機構代號"] !== ""
    ).map(e => {
      return [e["機構代號"], e["機構名稱"]];
    });
    const branchOptStr = branchOpt.map(e => {
      return e.join(" ").trim();
    });
    const branchNum = branchOpt.map(e => {
      return e[0];
    });

    new SelectOpts(branch, branchOptStr, branchNum).changeOpt();
  });
};

export default BankOptions;
