module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors here
        // For example:
        // 'Base-White': '#FFF',
      },
      boxShadow: {
        // Define shadow variants here
        // For example:
        'shadow-xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      },
    },
  },
  // You can enable additional plugins here
  // plugins: [require("daisyui")],
}
