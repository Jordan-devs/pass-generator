const passwordEl = document.querySelector("#password");
const copy = document.querySelector(".copy");
const refresh = document.querySelector(".refresh");
const lengthText = document.querySelector("#lengthText");
const lengthEl = document.querySelector(".range");
const maxValue = parseInt(lengthEl.max);
const minValue = parseInt(lengthEl.min);
const upperCase = document.querySelector("#uppercase");
const lowerCase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const bars = document.querySelectorAll(".strength-bar .bar");

function slider() {
  let progress = ((lengthEl.value - minValue) / (maxValue - minValue)) * 100;
  lengthEl.style.background = `linear-gradient(to right, #e5e7eb ${progress}%, #212324 ${progress}%)`;
  lengthText.textContent = `Length: ${lengthEl.value}`;
  generatePassword();
}

function generatePassword() {
  let charset = "";
  let password = "";
  if (upperCase.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowerCase.checked) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numbers.checked) charset += "0123456789";
  if (symbols.checked) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  for (let i = 0; i < lengthEl.value; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  passwordEl.value = password; // Display password
  calculateStrength();
}

function calculateStrength() {
  let score = 0;
  if (passwordEl.value.length >= 8) score++;
  if (passwordEl.value.length >= 12) score++;
  if (/[a-z]/.test(passwordEl.value)) score++;
  if (/[A-Z]/.test(passwordEl.value)) score++;
  if (/[0-9]/.test(passwordEl.value)) score++;
  if (/[^a-zA-Z0-9]/.test(passwordEl.value)) score++;
  console.log(score);

  bars.forEach((bar, idx) => {
    if (idx < score) {
      bar.style.backgroundColor = "#43c537";
    } else {
      bar.style.backgroundColor = "#374151";
    }
  });
}

function copyToClipboard() {
  passwordEl.select();
  document.execCommand("copy");
}

copy.addEventListener("click", copyToClipboard);
refresh.addEventListener("click", generatePassword);
upperCase.addEventListener("change", generatePassword);
lowerCase.addEventListener("change", generatePassword);
numbers.addEventListener("change", generatePassword);
symbols.addEventListener("change", generatePassword);
lengthEl.addEventListener("input", slider);
window.onload = slider;
