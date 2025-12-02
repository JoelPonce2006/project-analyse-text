const boxCharacters = document.getElementById("boxCharacters");
const numberCharacters = document.getElementById("numberCharacters");
const numberWords = document.getElementById("numberWords");
const numberSentences = document.getElementById("numberSentences");
const excludeSpaces = document.getElementById("excludeSpaces");
const limitCharacter = document.getElementById("limitCharacter");
const limitCharacterText = document.getElementById("limitCharacterText");
const listLetters = document.getElementById("listLetters");
const lettersContainer = document.getElementById("letters-container");
const allLettersContainer = document.getElementById("all-letters-container");
const seeMoreLettersButton = document.getElementById("see-more-letters-button");

const maxVisibleLetters = 4;
let hasExcludeSpaces;
let text;
let hasLimitCharacter;
let limiteAEscribir;

excludeSpaces.addEventListener("change", (event) => {
  hasExcludeSpaces = event.target.checked;

  numberCharacters.innerText = hasExcludeSpaces
    ? text.replaceAll(" ", "").length
    : text.length;
});

boxCharacters.addEventListener("input", (event) => {
  text = event.target.value;
  let letterRecords = {}; // {h: 1, o: 1, l: 1, a: 1}

  console.log(text.split(""));
  text
    .replaceAll(" ", "")
    .split("")
    .forEach((letter) => {
      if (letter in letterRecords) {
        letterRecords[letter]++;
      } else {
        letterRecords[letter] = 1;
      }
    });

  const letters = Object.entries(letterRecords); //[[h, 2], [o, 1], [l, 1], [a, 1]]
  let result = "";
  let restResult = "";
  let lettersTotal = 0;

  const orderLetters = letters.sort((a, b) => b[1] - a[1]);

  orderLetters.forEach((letter, index) => {
    // [h, 1] <== letter
    lettersTotal = lettersTotal + letter[1];

    let width = (100 * letter[1]) / lettersTotal;

    const letterHtml =
      // result +
      `<div class="letters">
            <span class="letter-box">${letter[0]}</span>

            <div class="line-grey">
              <div class="line-purple" style="width: ${width}px"></div>
            </div>

            <span class="letter-quantity">${letter[1]}(${width.toFixed(
        2
      )}%)</span>
          </div>`;

    if (index < maxVisibleLetters) {
      result += letterHtml;
    } else {
      restResult += letterHtml;
    }
  });

  lettersContainer.innerHTML = result;
  allLettersContainer.innerHTML = restResult;
  result = "";

  if (orderLetters.length > maxVisibleLetters) {
    seeMoreLettersButton.style.display = "block";
    allLettersContainer.style.display = "none";
    seeMoreLettersButton.innerHTML = "See More";
    seeMoreLettersButton.dataset.visible = "false";
  } else {
    seeMoreLettersButton.style.display = "none";
    allLettersContainer.style.display = "none";
  }

  seeMoreLettersButton.addEventListener("click", () => {
    const isVisible = seeMoreLettersButton.dataset.visible === "true";

    if (isVisible) {
      allLettersContainer.style.display = "none";
      seeMoreLettersButton.innerHTML = "See more";
      seeMoreLettersButton.dataset.visible = "false";
    } else {
      allLettersContainer.style.display = "block";
      seeMoreLettersButton.innerHTML = "See less";
      seeMoreLettersButton.dataset.visible = "true";
    }
  });

  numberCharacters.innerText = hasExcludeSpaces
    ? text.replaceAll(" ", "").length
    : text.length;

  const words = text.split(" ").filter((element) => element.length > 0);

  numberWords.innerText = text.length > 0 ? words.length : 0;

  const sentence = text.split(".");

  numberSentences.innerText = sentence.length - 1;
});

limitCharacter.addEventListener("change", (event) => {
  hasLimitCharacter = event.target.checked;

  if (hasLimitCharacter === true) {
    limiteAEscribir = prompt("Ingrese la cantidad maxima:");
    console.log(limiteAEscribir);

    limitCharacterText.innerText = limiteAEscribir;
    boxCharacters.setAttribute("maxlength", limiteAEscribir);
  } else {
    boxCharacters.removeAttribute("maxlength");
    limitCharacterText.innerText = "";
  }
});
