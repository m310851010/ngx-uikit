import CalendarLocale from '../calendar/zh_CN';
import TimePickerLocale from '../time-picker/zh_CN';

const locale = {
  lang: {
    ok: '确 定',
    placeholder: '请选择日期',
    rangePlaceholder: ['开始日期', '结束日期'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
