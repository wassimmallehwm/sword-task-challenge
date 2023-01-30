module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#e6ecee',
          100: '#b5c6cd',
          200: '#84a1ac',
          300: '#527b8b',
          400: '#21556a',
          500: '#084259',
          600: '#073b50'
        },
        'secondary': {
          50: '#f4e6eb',
          100: '#ddb3c2',
          200: '#c6819a',
          300: '#af4f72',
          400: '#981c49',
          500: '#8C0335',
          600: '#7e0330'
        } 
      }
    },
  },
  safelist: [
    {
      pattern: /bg-(primary|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /text-(primary|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /border-(primary|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /ring-(primary|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /opacity-(50|60|70|80|90)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
  ],
  variants: {
    animation: ["motion-safe"],
    extend: {},
  },
  plugins: [],
}
