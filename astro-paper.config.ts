import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://blog.yulkang.com/",
    title: "yul's blog",
    description:
      "Notes on graphics and rendering — C++, OpenGL, and contributing to MapLibre Native.",
    author: "Yul Kang",
    profile: "https://github.com/kangyul",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Seoul",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/kangyul" },
    { name: "mail", url: "mailto:yulkangdev@gmail.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
