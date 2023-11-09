module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter']
      },
      height: {
        '128': '32rem',
      }
    },
  },
  safelist: ['text-emerald-800', 'bg-emerald-100', 'text-gray-800', 'bg-gray-100'],
  plugins: [],
  mode: 'jit'
}
