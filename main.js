const boxCharacters = document.getElementById("boxCharacters");
const numberCharacters = document.getElementById("numberCharacters");
const numberWords = document.getElementById("numberWords");
const numberSentences = document.getElementById("numberSentences");
const excludeSpaces = document.getElementById("excludeSpaces");
const limitCharacter = document.getElementById("limitCharacter");
const limitCharacterText = document.getElementById("limitCharacterText");
const listLetters = document.getElementById("listLetters");
const lettersContainer = document.getElementById("letters-container");

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
  let lettersTotal = 0;

  letters.forEach((letter) => {
    lettersTotal = lettersTotal + letter[1];
  });

  letters.forEach((letter) => {
    //100 / 5 = 20

    let width = (100 * letter[1]) / lettersTotal;
    // [h, 1]
    result =
      result +
      `<div class="letters">
            <span>${letter[0]}</span>

            <div class="line-grey">
              <div class="line-purple" style="width: ${width}px"></div>
            </div>

            <span class="letter-quantity">${letter[1]}(${width.toFixed(
        2
      )}%)</span>
          </div>`;
  });

  lettersContainer.innerHTML = result;
  result = "";

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
