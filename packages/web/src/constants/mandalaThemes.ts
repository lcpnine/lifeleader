export const enum MandalaTheme {
  DEFAULT = 'default',
  DARK = 'dark',
  LIGHT = 'light',
  NATURE = 'nature',
  FUTURISTIC = 'futuristic',
}

export const MANDALA_THEMES = {
  [MandalaTheme.DEFAULT]: {
    borderColor: 'border-gray-200',
    backgroundColor: 'bg-white',
    textColor: 'text-black',
  },
  [MandalaTheme.DARK]: {
    borderColor: 'border-gray-700',
    backgroundColor: 'bg-gray-800',
    textColor: 'text-white',
  },
  [MandalaTheme.LIGHT]: {
    borderColor: 'border-yellow-200',
    backgroundColor: 'bg-yellow-100',
    textColor: 'text-gray-800',
  },
  [MandalaTheme.NATURE]: {
    borderColor: 'border-green-200',
    backgroundColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  [MandalaTheme.FUTURISTIC]: {
    borderColor: 'border-blue-200',
    backgroundColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
}
