import CalendarLocale from '../calendar/ca_ES';
import TimePickerLocale from '../time-picker/ca_ES';

const locale = {
  lang: {
    ok: 'determinar',
    placeholder: 'Seleccionar data',
    rangePlaceholder: ['Data inicial', 'Data final'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
