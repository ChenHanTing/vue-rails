class Filter {
  constructor(textbox, inputFilter) {
    this.textbox = textbox;
    this.inputFilter = inputFilter;
  }

  setInputFilter() {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop"
    ].forEach(function(event) {
      this.textbox.addEventListener(event, function() {
        if (this.inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
}

export default Filter;
