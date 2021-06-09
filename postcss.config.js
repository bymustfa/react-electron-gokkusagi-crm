module.exports = {
  plugins: [
    require("postcss-custom-properties")({
      preserve: false,
      importFrom: ["src/styles/plugins/fullcalendar.bundle.css"],
    }),
    require("postcss-calc"),
  ],
};
