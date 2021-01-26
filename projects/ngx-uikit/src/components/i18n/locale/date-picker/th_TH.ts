import CalendarLocale from '../calendar/th_TH';
import TimePickerLocale from '../time-picker/th_TH';

const locale = {
  lang: {
    ok: 'ตกลง',
    placeholder: 'เลือกวันที่',
    rangePlaceholder: ['วันเริ่มต้น', 'วันสิ้นสุด'],
    ...CalendarLocale
  },
  timePickerLocale: {...TimePickerLocale}
};
export default locale;
