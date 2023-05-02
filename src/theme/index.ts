import { extendTheme } from 'native-base'

export const THEME = extendTheme({
    colors: {
        green: {
            700: '#639339',
            500: '#CBE4B4',
            100: '#E5F0DB',
        },
        gray: {
            700: '#FAFAFA',
            600: '#DDDEDF',
            500: '#DDDEDF',
            400: '#B9BBBC',
            300: '#5C6265',
            200: '#333638',
            100: '#1B1D1E'
        },
        white: '#FFFFFF',
        red: {
            700: '#BF3B44',
            500: '#F3BABD',
            100: '#F4E6E7',
        }
    },
    fonts: {
        heading: 'NunitoSans_400Regular',
        body: 'NunitoSans_700Bold',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
    },
    sizes: {
        14: 56,
        33: 148,
    }
})