import CalendarLocale from '../calendar/zh_TW';
import TimePickerLocale from '../time-picker/zh_TW';

const locale = {
  lang: {
    ok: '確 定',
    placeholder: '請選擇日期',
    rangePlaceholder: ['開始日期', '結束日期'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
