import en from '~/translations/en.json';
import he from '~/translations/he.json';

const translations = {
  en,
  he,
};

export const getTranslation = (lang: string, key: string) => {
  const keys = key.split('.');
  let result = translations[lang];

  for (let i = 0; i < keys.length; i++) {
    if (result && typeof result === 'object' && keys[i] in result) {
      result = result[keys[i]];
    } else {
      return key; // Return original key if path is not found
    }
  }

  return result || key;
};
