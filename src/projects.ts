export type Project = {
  title: string;
  body: string;
  src: string;
  media?: "image" | "video";
  layout?: "phone" | "wide" | "aside";
  aspectRatio?: string;
};

export const projects: Project[] = [
  {
    title: "I typically design for desktop,",
    body: "Here's Grabbit, a creative tool I've been building",
    src: "/frames/grabbit.mp4",
    media: "video",
    layout: "wide",
  },
  {
    title: "But I'm a mobile designer at heart, too.",
    body: "Grabbit has a native iPhone app with zooming, annotation tools, and agentic organization.",
    src: "/frames/grabbit-iphone.mp4",
    media: "video",
  },
  {
    title: "Annotating Screenshots and Captures",
    body: "Spotlighting information we care about",
    src: "/frames/annotating.mp4",
    media: "video",
    layout: "aside",
  },
  {
    title: "Organization tools",
    body: "Organize media by project, and rename files",
    src: "/frames/organization.mp4",
    media: "video",
    layout: "aside",
  },
  {
    title: "Organize with AI",
    body: "Powered by Apple FM and bring your own keys",
    src: "/frames/organize-ai.mp4",
    media: "video",
    layout: "aside",
  },
  {
    title: "P.S., I've even got some android experience.",
    body: "Android Studio was my first start into designing products when I was in highschool!",
    src: "/frames/efcr.jpg",
    aspectRatio: "9 / 16",
  },
  {
    title: "Tagalog Phrasebook",
    body: "Phrasebook for common Tagalog introductions",
    src: "/frames/tagalog.jpg",
    layout: "aside",
    aspectRatio: "9 / 16",
  },
  {
    title: "ACT Timer",
    body: "Section timer for the ACT",
    src: "/frames/act-timer.jpg",
    layout: "aside",
    aspectRatio: "9 / 16",
  },
];
