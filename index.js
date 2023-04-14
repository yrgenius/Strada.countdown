import { formatDistanceStrict, format, add } from "date-fns";
import { ru } from "date-fns/locale";

const input = document.querySelector('.form__input');
const button = document.querySelector('.form__btn');
const out = document.querySelector('.text__out');

button.addEventListener('click', buttonHandler);

function buttonHandler() {
    event.preventDefault();

    const now = new Date();
    const inputValue = (!input.value)
        ? format(now, 'yyyy-MM-dd')
        : input.value;
    const dateDiff = formatDistanceStrict(new Date(...inputValue.split('-')), now, { locale: ru });

    out.textContent = dateDiff;
}