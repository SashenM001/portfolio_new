"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects, type ProjectCategory } from "@/lib/data";

const categories: ProjectCategory[] = ["All", "Web Dev", "ML / AI", "Security", "Embedded"];

const categoryColors: Record<string, string> = {
  "Web Dev": "#3b82f6",
  "ML / AI": "#a78bfa",
  "Security": "#34d399",
  "Embedded": "#fb923c",
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 3D tilt toward the cursor, spring-smoothed
  const tiltX = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    if (reduceMotion) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-py * 10);
    tiltY.set(px * 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="group spotlight-card relative flex flex-col p-6 rounded-2xl h-full transition-[border-color,box-shadow] duration-300"
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? categoryColors[project.category] + "60" : "var(--border)"}`,
        boxShadow: hovered
          ? `var(--shadow-card-hover), 0 0 0 1px ${categoryColors[project.category]}30`
          : "var(--shadow-card)",
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{
            background: "var(--accent-subtle)",
            color: "var(--accent)",
            border: "1px solid var(--accent-glow)",
          }}
        >
          <Star size={9} fill="currentColor" />
          Featured
        </div>
      )}

      {/* Category dot */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: categoryColors[project.category] }}
        />
        <span className="text-xs font-medium" style={{ color: categoryColors[project.category] }}>
          {project.category}
        </span>
      </div>

      <h3
        className="text-base font-semibold mb-2 leading-snug"
        style={{
          color: "var(--foreground)",
          // Title floats above the card surface while tilting
          transform: hovered ? "translateZ(28px)" : "translateZ(0px)",
          transition: "transform 0.3s ease",
        }}
      >
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full text-[11px] font-medium"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            {t}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-medium"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.github ? (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2.5 rounded-full transition-colors duration-200"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            aria-label={`View source code of ${project.title} on GitHub`}
          >
            <GithubIcon size={12} />
            Code
          </motion.a>
        ) : (
          <span
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2.5 rounded-full"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            Research
          </span>
        )}
        {project.demo && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2.5 rounded-full transition-shadow duration-200 hover:shadow-[0_4px_16px_var(--accent-glow)]"
            style={{ background: "var(--accent)", color: "#fff" }}
            aria-label={`Open live demo of ${project.title}`}
          >
            <ExternalLink size={12} />
            Live
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 35 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ transformPerspective: 800, transformOrigin: "bottom" }}
          className="mb-14"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{
              background: "var(--accent-subtle)",
              color: "var(--accent)",
              border: "1px solid var(--accent-glow)",
            }}
          >
            Projects
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
              Things I&apos;ve built
            </h2>
            <span className="text-sm tabular-nums" style={{ color: "var(--muted)" }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        <LayoutGroup>
          {/* Filter tabs — active pill morphs between buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.96 }}
                  role="tab"
                  aria-selected={isActive}
                  className="relative px-5 py-2.5 min-h-11 rounded-full text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive ? "#fff" : "var(--muted)",
                    border: `1px solid ${isActive ? "transparent" : "var(--border)"}`,
                    background: isActive ? "transparent" : "var(--surface)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 4px 16px var(--accent-glow)",
                      }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Grid — cards glide to their new positions when the filter changes */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
