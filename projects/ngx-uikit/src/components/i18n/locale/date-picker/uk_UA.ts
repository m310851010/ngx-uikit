import CalendarLocale from '../calendar/uk_UA';
import TimePickerLocale from '../time-picker/uk_UA';

const locale = {
  lang: {
    ok: 'гаразд',
    placeholder: 'Оберіть дату',
    rangePlaceholder: ['Початкова дата', 'Кінцева дата'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
