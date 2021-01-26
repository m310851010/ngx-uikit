import CalendarLocale from '../calendar/nl_NL';
import TimePickerLocale from '../time-picker/nl_NL';

const locale = {
  lang: {
    ok: 'OK',
    placeholder: 'Selecteer datum',
    rangePlaceholder: ['Begin datum', 'Eind datum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
