export const supportLanguages = [
  { name: 'Tiếng Việt', code: 'vi' },
  { name: 'English', code: 'en' },
];

export const languageMap = {
  en: {
    menu: {
      donate: 'Donate',
      setting: 'Setting',
      language: 'Language',
    },
    popup: {
      extension: 'Extension',
      translate: {
        buttonTranslate: 'Translate',
        placeHolder: 'Your translate result is here',
      },
      wordbook: {
        buttonBookmark: 'Saved words',
      },
      selectlang: {
        placeholder: {
          source: 'Translate from',
          target: 'Translate to',
        },
      },
    },
  },
  vi: {
    menu: {
      donate: 'Ủng hộ',
      setting: 'Cài đặt',
      language: 'Ngôn ngữ',
    },
    popup: {
      extension: 'Tiện ích',
      wordbook: {
        buttonBookmark: 'Sổ tay từ vựng',
      },
      translate: {
        buttonTranslate: 'Dịch',
        placeHolder: 'Kết quả dịch của bạn ở đây',
      },
      selectlang: {
        placeholder: {
          source: 'Dịch từ',
          target: 'Dịch sang',
        },
      },
    },
  },
};
