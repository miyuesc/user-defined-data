const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: IS_PROD ? "././" : "/"
};
