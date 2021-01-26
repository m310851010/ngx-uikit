import Calendar from './calendar/cs_CZ';
import DatePicker from './date-picker/cs_CZ';
import Pagination from './pagination/cs_CZ';
import TimePicker from './time-picker/cs_CZ';

export default {
  locale: 'cs',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'Potvrdit',
    filterReset: 'Obnovit',
    selectAll: 'Vyberte aktuální stránku',
    selectInvert: 'Invertovat aktuální stránku',
    sortTitle: 'Třídit',
  },
  Modal: {
    okText: 'Ok',
    cancelText: 'Storno',
    justOkText: 'Ok',
  },
  Confirm: {
    okText: 'Ok',
    cancelText: 'Storno',
  },
  Transfer: {
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek',
  },
  Upload: {
    uploading: 'Nahrávání...',
    removeFile: 'Odstranit soubor',
    uploadError: 'Chyba při nahrávání',
    previewFile: 'Zobrazit soubor',
  },
  Empty: {
    description: 'Žádná data',
  },
};
