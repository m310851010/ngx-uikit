
export interface NkI18n {
  locale?: string;
  Pagination: nkPaginationI18n;
  DatePicker: nkDatePickerI18n;
  TimePicker: nkTimePickerI18n;
  Calendar: nkCalendarI18n;
  Table: nkTableI18n;
  Modal: nkModalI18n;
  Confirm: nkConfirmI18n;
  Transfer: nkTransferI18n;
  Upload: nkUploadI18n;
  Empty: nkEmptyI18n;
}

export interface nkPaginationI18n {
  items_per_page: string;
  jump_to: string;
  jump_to_confirm: string;
  page: string;
}

export interface nkTableI18n {
  filterTitle: string;
  filterConfirm: string;
  filterReset: string;
  selectAll: string;
  selectInvert: string;
}

export interface nkTransferI18n {
  titles?: string[];
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
}
export interface nkUploadI18n {
  uploading: string;
  removeFile: string;
  uploadError: string;
  previewFile: string;
}

export interface nkEmptyI18n {
  description: string;
}

export interface nkModalI18n {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export interface  nkConfirmI18n {
  okText: string;
  cancelText: string;
}

export interface nkDatePickerI18n {
  lang: nkDatePickerLangI18n;
  timePickerLocale: nkTimePickerI18n;
}

export interface nkDatePickerLangI18n extends nkCalendarI18n {
  placeholder: string;
  rangePlaceholder: string[];
}

export interface nkTimePickerI18n {
  placeholder: string;
}

export interface nkCalendarI18n {
  today: string;
  now: string;
  backToToday: string;
  ok: string;
  clear: string;
  month: string;
  year: string;
  timeSelect: string;
  dateSelect: string;
  monthSelect: string;
  yearSelect: string;
  decadeSelect: string;
  yearFormat: string;
  monthFormat?: string;
  dateFormat: string;
  dayFormat: string;
  dateTimeFormat: string;
  monthBeforeYear?: boolean;
  previousMonth: string;
  nextMonth: string;
  previousYear: string;
  nextYear: string;
  previousDecade: string;
  nextDecade: string;
  previousCentury: string;
  nextCentury: string;
}

// tslint:disable-next-line:no-any
export type DateLocale = any;
// TODO: Implement this type definition when date-fns is stable
