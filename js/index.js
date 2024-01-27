

//datk mode
const inputEl = document.querySelector(".input");
const bodyEl = document.querySelector("body");
const postEl = document.querySelector(".home");
const headEl = document.querySelector(".home");
const footerEl = document.querySelector(".footer");

inputEl.checked = JSON.parse(localStorage.getItem("mode"));

updateBody();

function updateBody() {
  if (inputEl.checked) {
    bodyEl.style.background = "black";
    postEl.style.background = "black";
    footerEl.style.background = "white";
  } else {
    bodyEl.style.background = "white";
    postEl.style.background = "white";
    headEl.style.background = "black";
  }
}

inputEl.addEventListener("input", () => {
  updateBody();
  updateLocalStorage();
});

function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}
