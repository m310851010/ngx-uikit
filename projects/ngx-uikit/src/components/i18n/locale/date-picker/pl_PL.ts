import CalendarLocale from '../calendar/pl_PL';
import TimePickerLocale from '../time-picker/pl_PL';

const locale = {
  lang: {
    ok: 'dobrze',
    placeholder: 'Wybierz datę',
    rangePlaceholder: ['Data początkowa', 'Data końcowa'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
