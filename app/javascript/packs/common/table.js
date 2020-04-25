function Table(ele, cells) {
  this.ele = ele;
  this.cells = cells;
  this.select =
    typeof this.ele === "object" ? this.ele : document.getElementById(this.ele);
}

Table.prototype.createRow = function() {
  const row = this.select.insertRow(-1);

  this.cells.forEach((ele, index) => {
    row.insertCell(index).innerHTML = ele;
  });
};

Table.prototype.deleteRow = function() {
  for (let i = this.select.rows.length - 1; i > 0; i--) {
    this.select.deleteRow(i);
  }
};

export default Table;
