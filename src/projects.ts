export type Project = {
  title: string;
  body: string;
  src: string;
  media?: "image" | "video";
  layout?: "phone" | "wide" | "aside";
  aspectRatio?: string;
};

/**
 * Web copies live in /frames/web (H.264, 30fps, no audio, under 5MB).
 * Set this to false to serve the original files in /frames instead.
 */
const useWebVideos = true;

function frame(file: string) {
  if (useWebVideos && file.endsWith(".mp4")) return `/frames/web/${file}`;
  return `/frames/${file}`;
}

export const projects: Project[] = [
  {
    title: "I typically design for desktop,",
    body: "Here's Grabbit, a creative tool I've been building.",
    src: frame("grabbit.mp4"),
    media: "video",
    layout: "wide",
  },
  {
    title: "But I'm a mobile designer at heart, too.",
    body: "Grabbit has a native iPhone app with zooming, annotation tools, and agentic organization.",
    src: frame("grabbit-iphone.mp4"),
    media: "video",
  },
  {
    title: "Annotating Screenshots and Captures",
    body: "Spotlighting information we care about",
    src: frame("annotating.mp4"),
    media: "video",
    layout: "aside",
  },
  {
    title: "Organization tools",
    body: "Organize media by project, and rename files",
    src: frame("organization.mp4"),
    media: "video",
    layout: "aside",
  },
  {
    title: "Organize with AI",
    body: "Powered by Apple FM and bring your own keys",
    src: frame("organize-ai.mp4"),
    media: "video",
    layout: "aside",
  },
  {
    title: "P.S., I've even got some android experience!",
    body: "Android Studio was my first start into designing products when I was in highschool.",
    src: frame("efcr.jpg"),
    aspectRatio: "9 / 16",
  },
  {
    title: "Tagalog Phrasebook",
    body: "Phrasebook for common Tagalog introductions",
    src: frame("tagalog.jpg"),
    layout: "aside",
    aspectRatio: "9 / 16",
  },
  {
    title: "ACT Timer",
    body: "Section timer for the ACT",
    src: frame("act-timer.jpg"),
    layout: "aside",
    aspectRatio: "9 / 16",
  },
];
