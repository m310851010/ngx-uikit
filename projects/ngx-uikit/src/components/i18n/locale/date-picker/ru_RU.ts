import CalendarLocale from '../calendar/ru_RU';
import TimePickerLocale from '../time-picker/ru_RU';

const locale = {
  lang: {
    ok: 'Хорошо',
    placeholder: 'Выберите дату',
    rangePlaceholder: ['Начальная дата', 'Конечная дата'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
