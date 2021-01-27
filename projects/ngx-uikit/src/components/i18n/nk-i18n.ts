
export interface NkI18n {
  locale?: string;
  Pagination: NkPaginationI18n;
  DatePicker: NkDatePickerI18n;
  TimePicker: NkTimePickerI18n;
  Calendar: NkCalendarI18n;
  Table: NkTableI18n;
  Modal: NkModalI18n;
  Confirm: NkConfirmI18n;
  Transfer: NkTransferI18n;
  Upload: NkUploadI18n;
  Empty: NkEmptyI18n;
}

export interface NkPaginationI18n {
  items_per_page: string;
  jump_to: string;
  jump_to_confirm: string;
  page: string;
}

export interface NkTableI18n {
  filterTitle: string;
  filterConfirm: string;
  filterReset: string;
  selectAll: string;
  selectInvert: string;
}

export interface NkTransferI18n {
  titles?: string[];
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
}
export interface NkUploadI18n {
  uploading: string;
  removeFile: string;
  uploadError: string;
  previewFile: string;
}

export interface NkEmptyI18n {
  description: string;
}

export interface NkModalI18n {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export interface NkConfirmI18n {
  okText: string;
  cancelText: string;
}

export interface NkDatePickerI18n {
  lang: NkDatePickerLangI18n;
  timePickerLocale: NkTimePickerI18n;
}

export interface NkDatePickerLangI18n extends NkCalendarI18n {
  placeholder: string;
  rangePlaceholder: string[];
}

export interface NkTimePickerI18n {
  placeholder: string;
}

export interface NkCalendarI18n {
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
