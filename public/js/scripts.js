"use strict";

const mainCard = document.querySelectorAll(".main-card");
const postProblemButton = document.querySelector(".post-prob-button");
const postExpertButton = document.querySelector(".post-expert-button");
const postProblemDiv = document.querySelector(".post-prob-div");
const postExpertDiv = document.querySelector(".post-expert-div");
const closeButton2 = document.querySelector(".close2");
const closeButton1 = document.querySelector(".close1");
const probCard1 = document.querySelector(".prob-card1");
const probCard2 = document.querySelector(".prob-card2");
const overlay = document.querySelector(".overlay");

for (let card of mainCard) {
  card.addEventListener("mouseenter", () => {
    card.classList.add("shadow", "mouseover");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("shadow", "mouseover");
  });
}

postProblemButton.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  postProblemDiv.classList.remove("hidden");
  postProblemDiv.classList.add("shadow");
});

closeButton1.addEventListener("click", () => {
  overlay.classList.add("hidden");
  postProblemDiv.classList.add("hidden");
  postProblemDiv.classList.remove("shadow");
});

closeButton2.addEventListener("click", () => {
  overlay.classList.add("hidden");
  postExpertDiv.classList.add("hidden");
  postExpertDiv.classList.remove("shadow");
});

postExpertButton.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  postExpertDiv.classList.remove("hidden");
  postExpertDiv.classList.add("shadow");
});
