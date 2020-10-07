import { ValidationRules } from '../types';

/**
 * Utility function that checks form inputs against validation rules
 */
export const checkValidity = (value: any, rules: ValidationRules): boolean => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isNumber) {
    isValid = !isNaN(value) && !isNaN(parseFloat(value)) && isValid;
  }

  return isValid;
};

/**
 * Utility function that sorts arrays of objects by values that are strings
 */
export function sortArrayObject(key: string, array: any[], desc: boolean): any[] {
  let arrayCopy = [...array];

  if (desc) {
    arrayCopy.sort((a, b) => a[key].localeCompare(b[key], undefined, { numeric: true }));
  } else {
    arrayCopy.sort((a, b) => b[key].localeCompare(a[key], undefined, { numeric: true }));
  }
  return arrayCopy;
}
