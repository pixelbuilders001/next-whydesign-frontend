// Centralized Theme Configuration
// Change colors here to update the entire website theme

export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: '#fffbeb',   // amber-50
      100: '#fef3c7',  // amber-100
      200: '#fde68a',  // amber-200
      300: '#fcd34d',  // amber-300
      400: '#fbbf24',  // amber-400
      500: '#f59e0b',  // amber-500
      600: '#d97706',  // amber-600
      700: '#b45309',  // amber-700
      800: '#92400e',  // amber-800
      900: '#78350f',  // amber-900
    },
    secondary: {
      50: '#fef2f2',   // red-50
      100: '#fee2e2',  // red-100
      200: '#fecaca',  // red-200
      300: '#fca5a5',  // red-300
      400: '#f87171',  // red-400
      500: '#ef4444',  // red-500
      600: '#dc2626',  // red-600
      700: '#b91c1c',  // red-700
      800: '#991b1b',  // red-800
      900: '#7f1d1d',  // red-900
    },
    accent: {
      50: '#ecfdf5',   // green-50
      100: '#d1fae5',  // green-100
      200: '#a7f3d0',  // green-200
      300: '#6ee7b7',  // green-300
      400: '#34d399',  // green-400
      500: '#10b981',  // green-500
      600: '#059669',  // green-600
      700: '#047857',  // green-700
      800: '#065f46',  // green-800
      900: '#064e3b',  // green-900
    },
    // Neutral colors
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    // Background and foreground
    background: '#ffffff',
    foreground: '#171717',
    // Additional theme colors
    stone: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
    },
  },
  // Other theme properties can be added here
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
};

// CSS Custom Properties for easy access
export const cssVars = {
  '--color-primary-50': theme.colors.primary[50],
  '--color-primary-100': theme.colors.primary[100],
  '--color-primary-200': theme.colors.primary[200],
  '--color-primary-300': theme.colors.primary[300],
  '--color-primary-400': theme.colors.primary[400],
  '--color-primary-500': theme.colors.primary[500],
  '--color-primary-600': theme.colors.primary[600],
  '--color-primary-700': theme.colors.primary[700],
  '--color-primary-800': theme.colors.primary[800],
  '--color-primary-900': theme.colors.primary[900],
  '--color-secondary-50': theme.colors.secondary[50],
  '--color-secondary-100': theme.colors.secondary[100],
  '--color-secondary-200': theme.colors.secondary[200],
  '--color-secondary-300': theme.colors.secondary[300],
  '--color-secondary-400': theme.colors.secondary[400],
  '--color-secondary-500': theme.colors.secondary[500],
  '--color-secondary-600': theme.colors.secondary[600],
  '--color-secondary-700': theme.colors.secondary[700],
  '--color-secondary-800': theme.colors.secondary[800],
  '--color-secondary-900': theme.colors.secondary[900],
  '--color-accent-50': theme.colors.accent[50],
  '--color-accent-100': theme.colors.accent[100],
  '--color-accent-200': theme.colors.accent[200],
  '--color-accent-300': theme.colors.accent[300],
  '--color-accent-400': theme.colors.accent[400],
  '--color-accent-500': theme.colors.accent[500],
  '--color-accent-600': theme.colors.accent[600],
  '--color-accent-700': theme.colors.accent[700],
  '--color-accent-800': theme.colors.accent[800],
  '--color-accent-900': theme.colors.accent[900],
  '--color-gray-50': theme.colors.gray[50],
  '--color-gray-100': theme.colors.gray[100],
  '--color-gray-200': theme.colors.gray[200],
  '--color-gray-300': theme.colors.gray[300],
  '--color-gray-400': theme.colors.gray[400],
  '--color-gray-500': theme.colors.gray[500],
  '--color-gray-600': theme.colors.gray[600],
  '--color-gray-700': theme.colors.gray[700],
  '--color-gray-800': theme.colors.gray[800],
  '--color-gray-900': theme.colors.gray[900],
  '--color-background': theme.colors.background,
  '--color-foreground': theme.colors.foreground,
  '--color-stone-50': theme.colors.stone[50],
  '--color-stone-100': theme.colors.stone[100],
  '--color-stone-200': theme.colors.stone[200],
};