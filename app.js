let output = document.getElementById("output");
let copy_elem = document.getElementById("copy");
let range = document.getElementById("range");
let range_val = document.getElementById("len");
let ch_bx = document.querySelectorAll(".ch-bx");
let spans = document.querySelectorAll("#indicator span");
let indicator_msg = document.querySelector("#indicator b");
let gen_btn = document.getElementById("gen");
let obj = {
  upper: true,
  lower: false,
  num: false,
  sym: false,
  len: 8,
};
let setIndicator = () => {
  for (let i = 0; i < 4; i++) {
    spans[i].classList.remove("active");
  }
  let count = 0;
  ch_bx.forEach((elem) => {
    if (elem.checked) {
      count++;
    }
  });
  switch (count) {
    case 0 || 1:
      indicator_msg.innerText = "weak";
      break;
    case 2:
      indicator_msg.innerText = "good";
      break;
    case 3:
      indicator_msg.innerText = "strong";
      break;
    case 4:
      indicator_msg.innerText = "Secured";
      break;
  }
  for (let i = 0; i < count; i++) {
    spans[i].classList.add("active");
  }
};
let randIndex = (str_len) => {
  return Math.floor(Math.random() * str_len);
};
let generate = () => {
  output.value = "";
  let { upper, lower, num, sym, len } = obj;
  let str = "";
  for (let i = 0; i < len; i++) {
    if (upper) {
      let a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      str += a.split("")[randIndex(a.length)];
    }
    if (lower) {
      let b = "abcdefghijklmnopqrstuvwxyz";
      str += b.split("")[randIndex(b.length)];
    }
    if (num) {
      let c = "0123456789";
      str += c.split("")[randIndex(c.length)];
    }
    if (sym) {
      let d = "~!@#$%^&*()_-+={}[]:;/?|";
      str += d.split("")[randIndex(d.length)];
    }
    if (str.length >= len) {
      output.value = str.substr(0, len);
      break;
    }
  }
  range_val.innerText = range.value;
  setIndicator();
};
//when page load first time
generate();
//copy text
copy_elem.onclick = () => {
  navigator.clipboard.writeText(output.value);
};
range.onchange = () => {
  obj.len = range.value;
  generate();
};
ch_bx.forEach((elem) => {
  elem.onclick = () => {
    obj[elem.dataset.s] = elem.checked;
    generate();
  };
});
gen_btn.onclick = generate;
