export type DealType = {
  id?: number;
  institution: string;
  dealSize: string;
  dealType: string;
  isPublished: boolean;
};

export type DealsListType = {
  deals: DealType[];
};

export type InputType = {
  type: string;
  placeholder: string;
  value: string;
  validation: ValidationRules;
  valid: boolean;
  touched: boolean;
};

export type ValidationRules = {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isNumber?: boolean;
};
