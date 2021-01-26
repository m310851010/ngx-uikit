import CalendarLocale from '../calendar/en_GB';
import TimePickerLocale from '../time-picker/en_GB';

const locale = {
  lang: {
    ok: 'OK',
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
