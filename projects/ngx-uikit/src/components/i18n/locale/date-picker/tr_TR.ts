import CalendarLocale from '../calendar/en_US';
import TimePickerLocale from '../time-picker/tr_TR';

// Merge into a locale object
const locale = {
  lang: {
    ok: 'tamam',
    placeholder: 'Tarih Seç',
    rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
