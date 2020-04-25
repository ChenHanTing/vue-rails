import TaiwanDistricts from "./taiwan_districts.json";
import SelectOpts from "./select_options";

const domDistrict = (city, district, zip_hidden, zipcode) => {
  // 選城市的動作觸發
  document.getElementById(city).addEventListener("change", e => {
    const so = new SelectOpts(district);
    so.removeOpt();

    for (let ele of TaiwanDistricts) {
      if (ele["name"] === e.target.value) {
        const ds = ele["districts"].map(e => e["name"]);
        so.text = ["請選擇區域", ...ds];
        so.value = ["", ...ds];
        so.appendOpt();
      }
    }
  });

  // 選地區的動作觸發
  document.getElementById(district).addEventListener("change", e => {
    const z = document.getElementById(zip_hidden);
    const zc = document.getElementById(zipcode);
    const c = document.getElementById(city).value;
    const d = e.target.value;

    for (let ele of TaiwanDistricts) {
      if (ele["name"] === c) {
        for (let e of ele["districts"]) {
          if (e["name"] === d) {
            zc.textContent = e["zip"];
            z.value = e["zip"];
          }
        }
      }
    }
  });
};

export default domDistrict;
