import CalendarLocale from '../calendar/ja_JP';
import TimePickerLocale from '../time-picker/ja_JP';

const locale = {
  lang: {
    ok: '決定する',
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日付', '終了日付'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
