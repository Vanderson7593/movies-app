/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Montserrat_600SemiBold',
        subtitle: 'Montserrat_500Medium',
        body: 'Montserrat_400Regular',
        bold: 'Montserrat_700Bold',
      },
    },
  },
  plugins: [],
};
