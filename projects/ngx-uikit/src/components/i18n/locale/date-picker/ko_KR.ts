import CalendarLocale from '../calendar/ko_KR';
import TimePickerLocale from '../time-picker/ko_KR';

const locale = {
  lang: {
    ok: '확인',
    placeholder: '날짜 선택',
    rangePlaceholder: ['시작일', '종료일'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
