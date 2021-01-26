import CalendarLocale from '../calendar/is_IS';
import TimePickerLocale from '../time-picker/is_IS';

const locale = {
  lang: {
    ok: 'Allt í lagi',
    placeholder: 'Veldu dag',
    rangePlaceholder: ['Upphafsdagur', 'Lokadagur'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
