export enum SUPPORTING_LANGUAGES {
  en = 'en',
  ko = 'ko',
  'zh-Hant' = 'zh-Hant',
}

export enum LANGUAGE_NAMES_SHORT {
  en = 'English',
  ko = '한국어',
  'zh-Hant' = '中文(繁體)',
}

export const COMMON_TRANSLATIONS = {
  en: {
    NeedToSignIn: 'You need to sign in to access this service.',
    ServerError: 'A server error has occurred. Please try again later.',
    loading: 'Loading...',
    redirecting: 'Redirecting...',
  },
  ko: {
    NeedToSignIn: '이 서비스는 로그인이 필요합니다.',
    ServerError: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
    loading: '로딩 중...',
    redirecting: '잠시 후 이동합니다...',
  },
  'zh-Hant': {
    NeedToSignIn: '此服務需要登入。',
    ServerError: '伺服器錯誤。請稍後再試。',
    loading: '載入中...',
    redirecting: '正在重定向...',
  },
}
