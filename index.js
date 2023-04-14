import { formatDistanceToNowStrict, format, add, differenceInMilliseconds, startOfTomorrow } from "date-fns";
import { ru } from "date-fns/locale";

const input = document.querySelector('.form__input');
const button = document.querySelector('.form__btn');
const out = document.querySelector('.text__out');
const countdownText = document.querySelector('.text__countdown');
let runCountdown = false;

button.addEventListener('click', countdown);
input.addEventListener('change', buttonHandler);

function buttonHandler() {
    event.preventDefault();

    const now = new Date();
    const nextDay = startOfTomorrow();
    const selectedDate = getInputValue();

    const yearDiff = formatDistanceToNowStrict(selectedDate, { unit: "year", roundingMethod: "floor", locale: ru });
    const daysDiff = formatDistanceToNowStrict(selectedDate, { unit: "day", roundingMethod: "floor", locale: ru });
    const hourDiff = differenceInMilliseconds(nextDay, now);

    out.textContent = concatString(yearDiff, daysDiff, hourDiff);
}

function countdown() {
    if (!runCountdown) {
        runCountdown = !runCountdown;
        let timer = setInterval(go, 1000);
    }

}

function go() {
    const now = add(new Date(), { days: 1 });
    const date = getInputValue();
    const count = differenceInMilliseconds(date, now);
    const hours = Math.round((count / (1000 * 60)) % 24);
    const minutes = Math.round((count / 60000) % 60);
    const seconds = Math.round((count % 60000 / 1000));
    if (count > 0) countdownText.textContent = `${hours}:${minutes}:${seconds}`;
}

function getInputValue() {
    const now = new Date();
    const inputValue = (!input.value)
        ? format(now, 'yyyy-MM-dd')
        : input.value;
    return add(new Date(inputValue), { month: 1 });
}

function concatString(year, day, hour) {
    let out = '';
    let outHour = '';
    let arr = [year, day];
    arr.map((el => {
        if (parseInt(el)) out += el;
    }));
    if (hour) {
        outHour = Math.round(hour / (1000 * 60 * 60));
        switch (outHour) {
            case 1: outHour += ` час`;
                break;
            case 2:
            case 3:
            case 4: outHour += ` часa`;
                break;
            default: outHour += ` часов`;
        }
        out += ` ${outHour}`;
    }
    return out;
}