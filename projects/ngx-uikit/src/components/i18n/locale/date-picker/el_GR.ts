import CalendarLocale from '../calendar/el_GR';
import TimePickerLocale from '../time-picker/el_GR';

const locale = {
  lang: {
    ok: 'καθορίσει',
    placeholder: 'Επιλέξτε ημερομηνία',
    rangePlaceholder: ['Αρχική ημερομηνία', 'Τελική ημερομηνία'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
