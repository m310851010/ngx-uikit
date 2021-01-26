import CalendarLocale from '../calendar/en_US';
import TimePickerLocale from '../time-picker/en_US';

const locale = {
  lang: {
    ok: 'mục đích',
    placeholder: 'Chọn thời điểm',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
