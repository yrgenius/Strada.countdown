import { formatDistance, subDays } from "date-fns";

const input = document.querySelector('.form__input');
const button = document.querySelector('.form__btn');
const out = document.querySelector('.text__out');

button.addEventListener('click', buttonHandler);

function buttonHandler() {
    event.preventDefault();

    const selectDate = input.value | Date.now();
    out.textContent = selectDate;



    console.log(selectDate); //del
}