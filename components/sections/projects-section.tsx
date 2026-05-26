"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col p-6 rounded-2xl h-full transition-all duration-300"
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? categoryColors[project.category] + "60" : "var(--border)"}`,
        boxShadow: hovered
          ? `0 8px 40px ${categoryColors[project.category]}20, 0 0 0 1px ${categoryColors[project.category]}40`
          : "none",
        transform: hovered ? "translateY(-4px)" : "none",
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
        style={{ color: "var(--foreground)" }}
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
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
          style={{
            background: "var(--background)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        >
          <GithubIcon size={12} />
          Code
        </motion.a>
        {project.demo && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
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
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
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
              Things I've built
            </h2>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "var(--accent)" : "var(--surface)",
                color: activeCategory === cat ? "#fff" : "var(--muted)",
                border: `1px solid ${activeCategory === cat ? "var(--accent)" : "var(--border)"}`,
                boxShadow: activeCategory === cat ? "0 4px 16px var(--accent-glow)" : "none",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
