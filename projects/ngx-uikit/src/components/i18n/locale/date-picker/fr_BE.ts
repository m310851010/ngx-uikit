import CalendarLocale from '../calendar/fr_BE';
import TimePickerLocale from '../time-picker/fr_BE';

const locale = {
  lang: {
    ok: 'D\'accord',
    placeholder: 'Sélectionner une date',
    rangePlaceholder: ['Date de début', 'Date de fin'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
