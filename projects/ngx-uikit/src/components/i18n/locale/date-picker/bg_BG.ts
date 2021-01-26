import CalendarLocale from '../calendar/bg_BG';
import TimePickerLocale from '../time-picker/bg_BG';

const locale = {
  lang: {
    ok: 'определяне на',
    placeholder: 'Избор на дата',
    rangePlaceholder: ['Начална', 'Крайна'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
