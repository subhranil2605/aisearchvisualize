const optionMenu = document.querySelector(".select-algo");
const selectBtn = optionMenu.querySelector(".algo");
const options = optionMenu.querySelectorAll(".option");
let sBtnText = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtnText.innerText = selectedOption;
    optionMenu.classList.remove("active");
    // console.log(selectedOption);
  });
});


