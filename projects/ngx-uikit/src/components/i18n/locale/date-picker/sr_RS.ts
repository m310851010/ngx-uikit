import CalendarLocale from '../calendar/sr_RS';
import TimePickerLocale from '../time-picker/sr_RS';

const locale = {
  lang: {
    ok: 'ok',
    placeholder: 'Izaberite datum',
    rangePlaceholder: ['Početni datum', 'Krajnji datum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
