import { extendTheme } from '@chakra-ui/react';

// Thème personnalisé pour Compty
const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe5e5',
      100: '#ffb8b8',
      200: '#ff8a8a',
      300: '#ff5c5c',
      400: '#ff2e2e', // Couleur principale rouge
      500: '#e62929',
      600: '#b32020',
      700: '#801717',
      800: '#4d0e0e',
      900: '#1a0505',
    },
    primary: {
      50: '#ffe5e5',
      100: '#ffb8b8',
      200: '#ff8a8a',
      300: '#ff5c5c',
      400: '#ff2e2e',
      500: '#e62929',
      600: '#b32020',
      700: '#801717',
      800: '#4d0e0e',
      900: '#1a0505',
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
      // Style global pour les Box/Container
      '.chakra-box, .chakra-container': {
        '&[data-card="true"]': {
          bg: 'red.50',
        },
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
      },
      variants: {
        solid: {
          bg: 'linear-gradient(to right, var(--chakra-colors-red-400), var(--chakra-colors-red-500))',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(to right, var(--chakra-colors-red-500), var(--chakra-colors-red-600))',
          },
        },
        ghost: {
          _hover: {
            bg: 'red.50',
          },
          _active: {
            bg: 'red.100',
          },
        },
      },
      defaultProps: {
        colorScheme: 'red',
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'xl',
            borderColor: 'gray.300',
            _focus: {
              borderColor: 'red.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-red-400)',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'red.50',
          borderRadius: '3xl',
          boxShadow: '2xl',
          border: '1px',
          borderColor: 'red.100',
        },
      },
    },
    Box: {
      variants: {
        card: {
          bg: 'red.50',
          borderRadius: 'xl',
          p: 6,
          boxShadow: 'sm',
          border: '1px',
          borderColor: 'red.100',
        },
      },
    },
    Menu: {
      baseStyle: {
        list: {
          borderRadius: 'xl',
          boxShadow: 'xl',
          border: '1px',
          borderColor: 'gray.100',
        },
        item: {
          _hover: {
            bg: 'red.50',
          },
          _focus: {
            bg: 'red.50',
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: '2xl',
        },
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
