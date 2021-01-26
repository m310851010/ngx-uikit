import CalendarLocale from '../calendar/pt_BR';
import TimePickerLocale from '../time-picker/pt_BR';

const locale = {
  lang: {
    ok: 'Está bem',
    placeholder: 'Selecionar data',
    rangePlaceholder: ['Data de início', 'Data de fim'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
