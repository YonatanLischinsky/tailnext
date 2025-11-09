import en from '~/translations/en.json';
import he from '~/translations/he.json';

// Define a recursive type for translation objects
type TranslationValue = string | undefined | { [key: string]: TranslationValue } | TranslationValue[];
type TranslationType = { [key: string]: TranslationValue };

const translations: Record<string, TranslationType> = {
  en,
  he,
};

export const getTranslation = (lang: string, key: string) => {
  const keys = key.split('.');
  let result: TranslationValue | undefined = translations[lang];

  for (let i = 0; i < keys.length; i++) {
    if (result && typeof result === 'object' && keys[i] in result) {
      result = (result as { [key: string]: TranslationValue })[keys[i]];
    } else {
      return key; // Return original key if path is not found
    }
  }

  if (typeof result === 'string') {
    return result;
  }
  return key; // If result is not a string (e.g., undefined or an object), return the original key
};
