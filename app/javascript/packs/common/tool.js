class Tool {
  // Tool.findCommon(["apple", "apple pie"]);
  // => "apple"
  static findCommon(arr1) {
    let arr = arr1.concat().sort(),
      a1 = arr[0],
      a2 = arr[arr.length - 1],
      L = a1.length,
      i = 0;
    while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
    return a1.substring(0, i);
  }

  // hide(document.querySelectorAll('img')); => Hides all <img> elements on the page
  // show(...document.querySelectorAll('img')); => Shows all <img> elements on the page
  static hide = (...el) => [...el].forEach(e => (e.style.display = "none"));
  static show = (...el) => [...el].forEach(e => (e.style.display = "block"));

  // "qwer" => document.getElementById("qwer")
  // document.getElementById("qwer") => 不變
  static getEle = ele =>
    typeof ele === "object" ? ele : document.getElementById(ele);

  static alpArray = num => {
    return Array(Number(num))
      .fill()
      .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));
  };

  // const data = [{id: 1, name: 'john', age: 24},{id: 2, name: 'mike', age: 50}]
  // reducedFilter(data, ['id', 'name'], item => item.age > 24);
  // => [{ id: 2, name: 'mike'}]
  static reducedFilter = (data, keys, fn) => {
    if (fn === undefined) {
      return data.map(el =>
        keys.reduce((acc, key) => {
          acc[key] = el[key];
          return acc;
        }, {})
      );
    } else {
      return data.filter(fn).map(el =>
        keys.reduce((acc, key) => {
          acc[key] = el[key];
          return acc;
        }, {})
      );
    }
  };

  // mapObject([1, 2, 3], a => a * a);
  // => { 1: 1, 2: 4, 3: 9 }
  static mapObject = (arr, fn) =>
    arr.reduce((acc, el, i) => {
      acc[el] = fn(el, i, arr);
      return acc;
    }, {});

  // zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c);
  // => [111,222]
  //
  // zipWith([1, 2, 3], [10, 20], [100, 200],
  // (a, b, c) => (a != null ? a : 'a') + (b != null ? b : 'b') + (c != null ? c : 'c')
  // => [111, 222, '3bc']
  static zipWith = (...array) => {
    const fn =
      typeof array[array.length - 1] === "function" ? array.pop() : undefined;
    return Array.from(
      { length: Math.max(...array.map(a => a.length)) },
      (_, i) => (fn ? fn(...array.map(a => a[i])) : array.map(a => a[i]))
    );
  };

  static groupBy = (array, prop) => {
    return array.reduce(function(groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  };

  // alpA(3);
  // => ['A', 'B', 'C']
  //
  // alpA(4);
  // => ['A', 'B', 'C', 'D']
  static alpA = num =>
    Array(Number(num))
      .fill()
      .map((_, i) => String.fromCharCode("A".charCodeAt(0) + i));

  // 防呆
  static setInputFilter = (textbox, inputFilter) => {
    const ele =
      typeof textbox === "object" ? textbox : document.getElementById(textbox);
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
      ele.addEventListener(event, function() {
        if (inputFilter(this.value)) {
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
  };

  // 常見防呆
  static CommonFilter = (mode, ele, limit = Infinity) => {
    const { setInputFilter } = this;
    switch (mode) {
      case "integer":
        setInputFilter(ele, value => {
          return /^-?\d*$/.test(value);
        });
        break;
      case "zero_and_positive_integer":
        setInputFilter(ele, value => {
          return /^\d*$/.test(value);
        });
        break;
      case "positive_integer":
        setInputFilter(ele, value => {
          return /^\d*$/.test(value) && (value === "" || parseInt(value) > 0);
        });
        break;
      case "integer_with_upperlimit":
        setInputFilter(ele, value => {
          return (
            /^\d*$/.test(value) &&
            (value === "" || (parseInt(value) > 0 && parseInt(value) < limit))
          );
        });
        break;
      case "alphabet_only":
        this.setInputFilter(ele, value => {
          return /^[a-z]*$/i.test(value);
        });
        break;
    }
  };
}

export default Tool;
