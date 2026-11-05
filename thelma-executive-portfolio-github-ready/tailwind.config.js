/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        awardGold: '#F59E0B',
        execBlue: '#2563EB',
        roiEmerald: '#10B981',
        deepSlate: '#0F172A',
        alabaster: '#F8FAFC',
      },
    },
  },
  plugins: [],
}
