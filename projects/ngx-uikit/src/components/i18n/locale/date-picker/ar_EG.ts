import CalendarLocale from '../calendar/ar_EG';
import TimePickerLocale from '../time-picker/ar_EG';

const locale = {
  lang: {
    ok: 'تحديد',
    placeholder: 'اختيار التاريخ',
    rangePlaceholder: ['البداية', 'النهاية'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
