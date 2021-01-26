import CalendarLocale from '../calendar/de_DE';
import TimePickerLocale from '../time-picker/de_DE';

const locale = {
  lang: {
    ok: 'bestimmen',
    placeholder: 'Datum auswählen',
    rangePlaceholder: ['Startdatum', 'Enddatum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
