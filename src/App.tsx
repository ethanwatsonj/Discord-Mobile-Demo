import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects, type Project } from "./projects";

function rowsOf(items: Project[]) {
  const rows: Array<{ kind: "single"; project: Project } | { kind: "phones"; projects: Project[] }> = [];
  for (const project of items) {
    const previous = rows.at(-1);
    if (project.layout === "aside" && previous?.kind === "phones") {
      previous.projects.push(project);
      continue;
    }
    if (project.layout === "wide") {
      rows.push({ kind: "single", project });
      continue;
    }
    rows.push({ kind: "phones", projects: [project] });
  }
  return rows;
}

function Copy({ project }: { project: Project }) {
  return (
    <div className="card-copy">
      <h2 className="text-[20px] leading-[1.2] font-medium text-[hsl(0_0%_90%)]">{project.title}</h2>
      <p className="mt-1 max-w-[810px] text-[18px] leading-[1.4] font-normal text-[hsl(0_0%_70%)]">{project.body}</p>
    </div>
  );
}

function Frame({
  project,
  wide,
  paused = false,
  onHover,
  onLeave,
}: {
  project: Project;
  wide?: boolean;
  paused?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [readySrc, setReadySrc] = useState<string | null>(null);
  const loaded = readySrc === project.src;

  useEffect(() => {
    if (project.media === "video") {
      const el = video.current;
      if (el && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setReadySrc(project.src);
      return;
    }
    const el = image.current;
    if (el?.complete && el.naturalWidth > 0) setReadySrc(project.src);
  }, [project.media, project.src]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (paused) {
      el.pause();
      return;
    }
    void el.play().catch(() => {});
  }, [paused]);

  const frameStyle = wide
    ? undefined
    : ({ "--frame-ratio": project.aspectRatio ?? "1206 / 2622" } as CSSProperties);

  return (
    <article
      className={wide ? "card card-wide" : paused ? "card opacity-80 transition-opacity" : "card transition-opacity"}
      style={frameStyle}
      onPointerEnter={onHover}
      onPointerLeave={onLeave}
    >
      {wide ? <Copy project={project} /> : null}
      <div className={wide ? "card-stage mt-4" : "card-stage"}>
        <div className="card-frame">
          {loaded ? null : <div className="media-skeleton" aria-hidden />}
          {project.media === "video" ? (
            <video
              ref={video}
              src={project.src}
              className={`${wide ? "block h-full w-full object-contain" : "block h-full w-full object-cover"} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setReadySrc(project.src)}
              onError={() => setReadySrc(project.src)}
            />
          ) : (
            <img
              ref={image}
              src={project.src}
              alt=""
              className={`block h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setReadySrc(project.src)}
              onError={() => setReadySrc(project.src)}
            />
          )}
        </div>
      </div>
    </article>
  );
}

function PhoneRow({ projects: row }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="phone-row">
      <Copy project={row[0]} />
      <div className="phone-frames">
        {row.map((project) => (
          <Frame
            key={project.src}
            project={project}
            paused={hovered !== null && hovered !== project.src}
            onHover={() => setHovered(project.src)}
            onLeave={() => setHovered((current) => (current === project.src ? null : current))}
          />
        ))}
      </div>
    </div>
  );
}

function wheelDistance(event: WheelEvent) {
  const dominant = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return dominant * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return dominant * window.innerWidth;
  return dominant;
}

export function App() {
  const header = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scroller.current;
    const head = header.current;
    if (!el || !head) return;

    const onWheel = (event: WheelEvent) => {
      if (getComputedStyle(el).flexDirection === "column") return;
      const distance = wheelDistance(event);
      if (distance === 0) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const next = Math.min(max, Math.max(0, el.scrollLeft + distance));
      if (next === el.scrollLeft) return;
      event.preventDefault();
      el.scrollLeft = next;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    head.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      head.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="flex h-dvh flex-col bg-[hsl(0_0%_10%)]">
      <header ref={header} className="site-header flex shrink-0 items-center gap-4 px-16 pt-16">
        <h1 className="text-[40px] leading-none font-medium text-[hsl(0_0%_90%)]">Hi Kiersten!</h1>
        <img src="/ant.gif" alt="" className="h-10 w-auto mix-blend-lighten" />
      </header>
      <main
        ref={scroller}
        className="scroller box-border flex min-h-0 flex-1 items-stretch gap-10 overflow-x-auto overflow-y-hidden px-16 pt-8 pb-16"
      >
      {rowsOf(projects).map((row) =>
        row.kind === "single" ? (
          <Frame key={row.project.src} project={row.project} wide />
        ) : (
          <PhoneRow key={row.projects[0].src} projects={row.projects} />
        ),
      )}
      </main>
    </div>
  );
}
