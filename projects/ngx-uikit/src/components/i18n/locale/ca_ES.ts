import Calendar from './calendar/ca_ES';
import DatePicker from './date-picker/ca_ES';
import Pagination from './pagination/ca_ES';
import TimePicker from './time-picker/ca_ES';

export default {
  locale: 'ca',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtrar Menu',
    filterConfirm: 'OK',
    filterReset: 'Restablir',
    selectAll: 'Seleccioneu la pàgina actual',
    selectInvert: 'Inverteix la pàgina actual',
    sortTitle: 'Ordena',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel·lar',
    justOkText: 'OK',
  },
  Confirm: {
    okText: 'OK',
    cancelText: 'Cancel·lar',
  },
  Transfer: {
    searchPlaceholder: 'Cercar aquí',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Upload: {
    uploading: 'S\'està penjant ...',
    removeFile: 'Elimina el fitxer',
    uploadError: 'Error de pujada',
    previewFile: 'Vista prèvia del fitxer',
  },
  Empty: {
    description: 'Sense dades',
  },
};
