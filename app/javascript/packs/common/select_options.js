class SelectOpts {
  constructor(ele, text, value) {
    this.ele = ele;
    this.text = text || null;
    this.value = value || null;
    this.select =
      typeof this.ele === "object"
        ? this.ele
        : document.getElementById(this.ele);
  }

  appendOpt() {
    this.value.forEach((_, index) => {
      const option = document.createElement("option");
      option.text = this.text[index];
      option.value = this.value[index];

      this.select.appendChild(option);
    });
  }

  removeOpt() {
    let i,
      L = this.select.options.length - 1;
    for (i = L; i >= 0; i--) {
      this.select.remove(i);
    }
  }

  changeOpt() {
    this.removeOpt();
    this.appendOpt();
  }
}

export default SelectOpts;
