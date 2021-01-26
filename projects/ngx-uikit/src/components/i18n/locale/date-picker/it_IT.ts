import CalendarLocale from '../calendar/it_IT';
import TimePickerLocale from '../time-picker/it_IT';

const locale = {
  lang: {
    ok: 'determinare',
    placeholder: 'Selezionare la data',
    rangePlaceholder: ['Data d\'inizio', 'Data di fine'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
