export default defineAppConfig({
  lazyCodeLoading: "requiredComponents",
  pages: ["pages/index/index"],
  subpackages: [
    {
      root: "pages/flowerDetail",
      name: "flowerDetail",
      pages: ["index"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
