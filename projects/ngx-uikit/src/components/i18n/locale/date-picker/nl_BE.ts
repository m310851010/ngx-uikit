import CalendarLocale from '../calendar/nl_BE';
import TimePickerLocale from '../time-picker/nl_BE';

const locale = {
  lang: {
    ok: 'ok',
    placeholder: 'Selecteer datum',
    rangePlaceholder: ['Begin datum', 'Eind datum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
