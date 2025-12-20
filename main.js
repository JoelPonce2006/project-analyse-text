const textAreaValue = document.getElementById("box-value");
const textAreaPeople = document.getElementById("box-people");
const buttonCustom = document.getElementById("button-custom");
const buttonReset = document.getElementById("button-reset");
const tipButtons = document.querySelectorAll(".buttons-porcentage");
const tipAmountValue = document.getElementById("tipAmount-value");
const totalPersonValue = document.getElementById("totalPerson-value");

let valuePorcentage = 0;
let bill = 0;
let numberOfPeople = 0;

textAreaValue.addEventListener("input", (event) => {
  bill = parseFloat(textAreaValue.value);
  calculation();
});

textAreaPeople.addEventListener("input", (event) => {
  numberOfPeople = parseFloat(textAreaPeople.value);
  calculation();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let textValue = event.target.textContent;
    let cleanValue = textValue.replace("%", "");

    valuePorcentage = parseFloat(cleanValue);
    console.log(valuePorcentage);

    calculation();
  });
});

function calculation() {
  if (bill > 0 && numberOfPeople > 0 && valuePorcentage >= 0) {
    const TotalTip = bill * (valuePorcentage / 100);
    const tipPorPerson = TotalTip / numberOfPeople;
    const totalPorPerson = (bill + TotalTip) / numberOfPeople;

    console.log(totalPorPerson);
    console.log(tipPorPerson);

    tipAmountValue.innerHTML = tipPorPerson.toFixed(2);
    totalPersonValue.innerHTML = totalPorPerson.toFixed(2);
  } else {
    tipAmountValue.innerHTML = "$0.00";
    totalPersonValue.innerHTML = "$0.00";
  }

  console.log(bill);
}

buttonReset.addEventListener("click", () => {
  bill = 0;
  valuePorcentage = 0;
  numberOfPeople = 0;
  textAreaValue.value = "";
  textAreaPeople.value = "";
  tipAmountValue.textContent = "$0.00";
  totalPersonValue.textContent = "$0.00";
});
