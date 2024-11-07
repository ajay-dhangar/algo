const Joi = require("joi");

module.exports = function (context, options) {
  return {
    name: "my-plugin",
    // lifecycle methods
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "meta",
            attributes: {
              "og:description": "My custom OG: Description",
            },
          },
        ],
      };
    },
    extendCli(cli) {
      cli
        .command("my-command action")
        .description("This is a custom command")
        .action(() => {
          console.log("Hello World! - This is a custom command!");
          console.log("Plugin options:", options);
        });
    },
    configurePostCss(postcssOptions) {
      // Add Tailwind CSS and other PostCSS plugins
      postcssOptions.plugins = [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
      ];
      return postcssOptions;
    },
  };
};

module.exports.validateOptions = ({ validate, options }) => {
  const joiSchema = Joi.object({
    settings: Joi.string().alphanum().min(3).max(30).required(),
    api: Joi.string().required(),
    keys: Joi.string().min(2).required(),
  });

  const validateOptions = validate(joiSchema, options);

  return validateOptions;
};