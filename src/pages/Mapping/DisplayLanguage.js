export const supportLanguages = [
  { name: 'Tiếng Việt', code: 'vi' },
  { name: 'English', code: 'en' },
];

export const languageMap = {
  en: {
    savedWords: {
      title: 'Saved words',
      example: 'Example',
      dictionary: 'Dictionary',
      saved: 'Saved',
      words: 'words',
      delete: {
        yes: 'Yes',
        no: 'No',
        title: 'Delete this word?',
      },
    },
    options: {
      title: 'Options',
      save: 'Save',
      saved: 'Saved',
      settings: [
        {
          description:
            'Hide EVTD icon for translate and use context menu instead',
          title: 'Hide Translate Button',
          key: 'hideTranslateButton',
        },
        {
          description:
            'If enabled you can use your keyboard to translate hover text on screen',
          title: 'Crtl + Shift + X to translate',
          key: 'translateHotkey',
        },
        {
          description:
            'If your hover text is a word or paragraph less than 50 characters you can see the translation in a popup',
          title: 'Show pretranslated popup',
          key: 'ispreTranslate',
        },

        {
          description: 'If enabled, you can use pomodoro as window popup',
          title: 'Open Pomodoro in Windowed size',
          key: 'isPomodoroWindowPopup',
        },
      ],
    },
    pomodoro: {
      shortBreak: 'Short break',
      longBreak: 'Long break',
      focus: 'Focus',
    },
    menu: {
      introduce: 'About us',
      donate: 'Donate',
      setting: 'Setting',
      language: 'Language',
    },
    context: {
      selection: 'Translate "%s with EVTD"',
      resume: 'Resume EVTD popup on this page',
      pause: 'Pause EVTD popup on this page',
    },

    popup: {
      extension: 'Extension',
      translate: {
        buttonTranslate: 'Translate',
        placeHolder: 'Your translate result is here',
      },
      selectlang: {
        placeholder: {
          search: 'Search',
          source: 'Translate from',
          target: 'Translate to',
        },
      },
    },
    language: 'English',
  },
  vi: {
    language: 'Tiếng Việt',
    options: {
      title: 'Cài đặt',
      save: 'Lưu',
      saved: 'Đã lưu',
      settings: [
        {
          description:
            'Ẩn biểu tượng EVTD để dịch và use thay vào đó dùng menu khi ấn chuột phải',
          title: 'Ẩn nút dịch EVTD',
          key: 'hideTranslateButton',
        },
        {
          description:
            'Nếu được bật, bạn có thể sử dụng bàn phím để dịch văn bản trên màn hình',
          title: 'Ấn Crtl + Shift + X để dịch',
          key: 'translateHotkey',
        },
        {
          description: 'Xem trước kết quả dịch khi chọn văn bản < 50 kí tự',
          title: 'Hiển thị bản dịch trước',
          key: 'ispreTranslate',
        },
        {
          description:
            'Nếu được bật, bạn có thể sử dụng pomodoro như một cửa sổ window',
          title: 'Mở cửa sổ window',
          key: 'isPomodoroWindowPopup',
        },
      ],
    },
    savedWords: {
      title: 'Từ đã lưu',
      example: 'Ví dụ',
      dictionary: 'Từ điển',
      saved: 'Đã lưu',
      words: 'từ',
      delete: {
        yes: 'Có',
        no: 'Không',
        title: 'Bạn có muốn xóa từ này?',
      },
    },
    pomodoro: {
      shortBreak: 'Nghỉ ngắn',
      longBreak: 'Nghỉ dài',
      focus: 'Tập trung',
    },
    menu: {
      introduce: 'Giới thiệu',
      donate: 'Ủng hộ',
      setting: 'Cài đặt',
      language: 'Ngôn ngữ',
    },
    context: {
      selection: 'Dịch "%s với EVTD"',
      resume: 'Bật EVTD trên trang này',
      pause: 'Dừng EVTD trên trang này',
    },

    popup: {
      extension: 'Tiện ích',
      translate: {
        buttonTranslate: 'Dịch',
        placeHolder: 'Kết quả dịch của bạn ở đây',
      },
      selectlang: {
        placeholder: {
          search: 'Tìm kiếm',
          source: 'Dịch từ',
          target: 'Dịch sang',
        },
      },
    },
  },
};
