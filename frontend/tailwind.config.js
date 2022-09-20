module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  plugins: [require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter', serif",
      },
      display: ["group-hover"],
    },
    color: {
      "i-white": "#f3f2eb",
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

// border-top-right-radius: 20px;
//     background-image: linear-gradient(to top, #f3f2eb, #f9f4f0, #fcf7f7, #fcfafc, #fefefe);
