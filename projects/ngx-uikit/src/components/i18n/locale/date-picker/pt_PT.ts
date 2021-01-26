import CalendarLocale from '../calendar/pt_PT';
import TimePickerLocale from '../time-picker/pt_PT';

const locale = {
  lang: {
    ok: 'Está bem',
    placeholder: 'Data',
    rangePlaceholder: ['Data inicial', 'Data final'],
    ...CalendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  },
};

export default locale;
