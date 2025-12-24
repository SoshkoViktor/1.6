const btnWrapper = document.getElementById("btn-wrapper");
const logo = document.querySelector(".logo");

const resetFilter = () => {
  const cards = document.querySelectorAll(".card");

  for (el of cards) {
    el.classList.remove("hidden");
  }
};

const buttonHandler = (e) => {
  if (e.target.classList.contains("button")) {
    if (e.target.classList.contains("active")) {
      return;
    }

    const activeButton = document.querySelector(".button.active");
    activeButton?.classList.remove("active");
    e.target.classList.add("active");

    const name = e.target.dataset.name;
    const cards = document.querySelectorAll(".card");

    for (el of cards) {
      el.dataset.name == name
        ? el.classList.remove("hidden")
        : el.classList.add("hidden");
    }
  }
};

btnWrapper.addEventListener("click", buttonHandler);
logo.addEventListener("click", resetFilter);
