import CalendarLocale from '../calendar/es_ES';
import TimePickerLocale from '../time-picker/es_ES';

const locale = {
  lang: {
    ok: 'determinar',
    placeholder: 'Seleccionar fecha',
    rangePlaceholder: ['Fecha inicial', 'Fecha final'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
