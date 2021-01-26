import CalendarLocale from '../calendar/fi_FI';
import TimePickerLocale from '../time-picker/fi_FI';

const locale = {
  lang: {
    ok: 'määrittää',
    placeholder: 'Valitse päivä',
    rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
