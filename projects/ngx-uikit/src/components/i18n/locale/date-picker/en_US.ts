import CalendarLocale from '../calendar/en_US';
import TimePickerLocale from '../time-picker/en_US';

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
