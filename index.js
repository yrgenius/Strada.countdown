import { formatDistanceToNowStrict, format, add, differenceInMilliseconds, startOfTomorrow } from "date-fns";
import { ru } from "date-fns/locale";

const input = document.querySelector('.form__input');
const button = document.querySelector('.form__btn');
const out = document.querySelector('.text__out');

button.addEventListener('click', buttonHandler);

function buttonHandler() {
    event.preventDefault();

    const now = new Date();
    const nextDay = startOfTomorrow();
    const inputValue = (!input.value)
        ? format(now, 'yyyy-MM-dd')
        : input.value;
    const selectedDate = add(new Date(inputValue), { month: 1 });

    const yearDiff = formatDistanceToNowStrict(selectedDate, { unit: "year", roundingMethod: "floor", locale: ru });
    const daysDiff = formatDistanceToNowStrict(selectedDate, { unit: "day", roundingMethod: "floor", locale: ru });
    const hourDiff = differenceInMilliseconds(nextDay, now);

    out.textContent = concatString(yearDiff, daysDiff, hourDiff);
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