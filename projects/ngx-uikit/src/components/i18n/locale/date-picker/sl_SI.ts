import CalendarLocale from '../calendar/sl_SI';
import TimePickerLocale from '../time-picker/sl_SI';

const locale = {
  lang: {
    ok: 'v redu',
    placeholder: 'Izberite datum',
    rangePlaceholder: ['Začetni datum', 'Končni datum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};
export default locale;
