import CalendarLocale from '../calendar/et_EE';
import TimePickerLocale from '../time-picker/et_EE';

const locale = {
  lang: {
    ok: 'määrata',
    placeholder: 'Vali kuupäev',
    rangePlaceholder: ['Algus kuupäev', 'Lõpu kuupäev'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
