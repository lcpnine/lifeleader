export enum MandalaTheme {
  DEFAULT = 'Default',
  DARK = 'Dark',
  LIGHT = 'Light',
  NATURE = 'Nature',
  FUTURISTIC = 'Futuristic',
  OCEAN = 'Ocean',
  SUNSET = 'Sunset',
  SPACE = 'Space',
  PASTEL = 'Pastel',
  MONOCHROME = 'Monochrome',
}

export const MANDALA_THEMES = {
  [MandalaTheme.DEFAULT]: {
    borderColor: 'border-gray-200',
    highlightBorder: 'border-blue-300',
    backgroundColor: 'bg-white',
    defualtTextColor: 'text-black',
    centerGridCenterSquareTextColor: 'text-black',
    edgeGridCenterSquareTextColor: 'text-gray-600',
    gridBorder: 'border border-gray-200',
  },
  [MandalaTheme.DARK]: {
    borderColor: 'border-slate-400',
    highlightBorder: 'border-yellow-300',
    backgroundColor: 'bg-gray-800',
    defualtTextColor: 'text-white',
    centerGridCenterSquareTextColor: 'text-white',
    edgeGridCenterSquareTextColor: 'text-gray-300',
    gridBorder: 'border-2 border-gray-700',
  },
  [MandalaTheme.LIGHT]: {
    borderColor: 'border-yellow-200',
    highlightBorder: 'border-purple-500',
    backgroundColor: 'bg-yellow-100',
    defualtTextColor: 'text-gray-800',
    centerGridCenterSquareTextColor: 'text-gray-800',
    edgeGridCenterSquareTextColor: 'text-gray-300',
    gridBorder: 'border border-yellow-200',
  },
  [MandalaTheme.NATURE]: {
    borderColor: 'border-green-200',
    highlightBorder: 'border-red-500',
    backgroundColor: 'bg-green-100',
    defualtTextColor: 'text-green-800',
    centerGridCenterSquareTextColor: 'text-green-800',
    edgeGridCenterSquareTextColor: 'text-green-300',
    gridBorder: 'border border-green-300',
  },
  [MandalaTheme.FUTURISTIC]: {
    borderColor: 'border-blue-200',
    highlightBorder: 'border-orange-500',
    backgroundColor: 'bg-blue-100',
    defualtTextColor: 'text-blue-800',
    centerGridCenterSquareTextColor: 'text-blue-800',
    edgeGridCenterSquareTextColor: 'text-blue-300',
    gridBorder: 'border-2 border-blue-400',
  },
  [MandalaTheme.OCEAN]: {
    borderColor: 'border-cyan-200',
    highlightBorder: 'border-pink-500',
    backgroundColor: 'bg-cyan-100',
    defualtTextColor: 'text-cyan-800',
    centerGridCenterSquareTextColor: 'text-cyan-900',
    edgeGridCenterSquareTextColor: 'text-cyan-300',
    gridBorder: 'border border-cyan-300',
  },
  [MandalaTheme.SUNSET]: {
    borderColor: 'border-red-200',
    highlightBorder: 'border-teal-500',
    backgroundColor: 'bg-orange-100',
    defualtTextColor: 'text-red-800',
    centerGridCenterSquareTextColor: 'text-red-900',
    edgeGridCenterSquareTextColor: 'text-red-gray-300',
    gridBorder: 'border border-red-300',
  },
  [MandalaTheme.SPACE]: {
    borderColor: 'border-indigo-700',
    highlightBorder: 'border-yellow-300',
    backgroundColor: 'bg-black',
    defualtTextColor: 'text-indigo-200',
    centerGridCenterSquareTextColor: 'text-purple-300',
    edgeGridCenterSquareTextColor: 'text-purple-200',
    gridBorder: 'border-2 border-indigo-600',
  },
  [MandalaTheme.PASTEL]: {
    borderColor: 'border-pink-200',
    highlightBorder: 'border-green-500',
    backgroundColor: 'bg-pastel-pink',
    defualtTextColor: 'text-pastel-green',
    centerGridCenterSquareTextColor: 'text-pastel-blue',
    edgeGridCenterSquareTextColor: 'text-pastel-yellow',
    gridBorder: 'border border-pink-200',
  },
  [MandalaTheme.MONOCHROME]: {
    borderColor: 'border-black',
    highlightBorder: 'border-white',
    backgroundColor: 'bg-gray-200',
    defualtTextColor: 'text-gray-600',
    centerGridCenterSquareTextColor: 'text-gray-900',
    edgeGridCenterSquareTextColor: 'text-gray-800',
    gridBorder: 'border border-black',
  },
}
