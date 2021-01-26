import CalendarLocale from '../calendar/nb_NO';
import TimePickerLocale from '../time-picker/nb_NO';

const locale = {
  lang: {
    ok: 'ok',
    placeholder: 'Velg dato',
    rangePlaceholder: ['Startdato', 'Sluttdato'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
