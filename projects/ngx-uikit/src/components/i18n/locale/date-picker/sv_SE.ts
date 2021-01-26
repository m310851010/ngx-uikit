import CalendarLocale from '../calendar/sv_SE';
import TimePickerLocale from '../time-picker/sv_SE';

const locale = {
  lang: {
    ok: 'ok',
    placeholder: 'Välj datum',
    rangePlaceholder: ['Startdatum', 'Slutdatum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};
export default locale;
