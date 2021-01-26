import CalendarLocale from '../calendar/cs_CZ';
import TimePickerLocale from '../time-picker/cs_CZ';

const locale = {
  lang: {
    ok: 'určit',
    placeholder: 'Vybrat datum',
    rangePlaceholder: ['Od', 'Do'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
