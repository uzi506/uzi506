export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
module.exports = {
  // ... إعدادات أخرى
  experimental: {
    serverComponentsExternalPackages: ["netlify"],
  },
};