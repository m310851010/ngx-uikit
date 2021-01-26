import CalendarLocale from '../calendar/fa_IR';
import TimePickerLocale from '../time-picker/fa_IR';

const locale = {
  lang: {
    ok: 'تعیین کردن',
    placeholder: 'انتخاب تاریخ',
    rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
