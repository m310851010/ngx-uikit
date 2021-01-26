import CalendarLocale from '../calendar/sk_SK';
import TimePickerLocale from '../time-picker/sk_SK';

const locale = {
  lang: {
    ok: 'ok',
    placeholder: 'Vybrať dátum',
    rangePlaceholder: ['Od', 'Do'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
