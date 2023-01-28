module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'homePage': "url('http://localhost:4000/api/settings/cover')"
      }),
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
        },
        'success': {
          50: '#eafaee',
          100: '#c1f0cc',
          200: '#98e6aa',
          300: '#46d366',
          400: '#28a745',
          500: '#22903c',
          600: '#19672b'
        }  
      }
    },
  },
  safelist: [
    {
      pattern: /bg-(primary|success|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /text-(primary|success|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /border-(primary|success|secondary|slate)-(50|100|200|300|400|500|600)/,
      variants: ['sm', 'md', 'lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /ring-(primary|success|secondary|slate)-(50|100|200|300|400|500|600)/,
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
