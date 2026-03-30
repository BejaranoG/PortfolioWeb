import { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, ChevronDown } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM — Light premium palette
   Warm off-white base, deep charcoal text, teal accent.
   Typography: Syne (display) + DM Sans (body).
   ═══════════════════════════════════════════════════════ */

const ACCENT = "#0d9488";
const ACCENT_LIGHT = "rgba(13,148,136,0.08)";
const ACCENT_MID = "rgba(13,148,136,0.15)";
const BG = "#fafaf9";
const SURFACE = "#ffffff";
const SURFACE_HOVER = "#f5f5f4";
const TEXT = "#1c1917";
const TEXT_DIM = "#78716c";
const BORDER = "rgba(0,0,0,0.06)";
const BORDER_HOVER = "rgba(13,148,136,0.25)";

// ─── Datos de Proyectos ──────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "NorthServices MXL",
    description: "Landing page promocional para un SaaS enfocado en clínicas y consultorios médicos. Facilita la gestión de citas, pacientes, facturación y administración integral del consultorio.",
    tags: ["React", "Tailwind CSS", "Landing Page", "SaaS"],
    color: "#0d9488",
    year: "2024",
    link: "https://northservicesmxl.netlify.app",
  },
  {
    id: 2,
    title: "Synthwave Studio",
    description: "Entorno de programación creativa para arte generativo con renderizado WebGL y colaboración en tiempo real.",
    tags: ["Three.js", "WebGL", "TypeScript", "WebSocket"],
    color: "#7c3aed",
    year: "2024",
    link: null,
  },
  {
    id: 3,
    title: "Arcane Commerce",
    description: "Plataforma de e-commerce headless con renderizado edge ultra-rápido y experiencias de compra personalizadas.",
    tags: ["Next.js", "Stripe", "Tailwind", "Redis"],
    color: "#d97706",
    year: "2024",
    link: null,
  },
  {
    id: 4,
    title: "Pulse Messenger",
    description: "App de mensajería con cifrado de extremo a extremo, canales efímeros y temas de interfaz adaptativos.",
    tags: ["React Native", "Firebase", "E2EE", "Zustand"],
    color: "#db2777",
    year: "2024",
    link: null,
  },
];

const TECHNOLOGIES = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Lenguaje" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "Tailwind CSS", category: "Estilos" },
  { name: "PostgreSQL", category: "Base de datos" },
  { name: "Three.js", category: "3D / WebGL" },
  { name: "GraphQL", category: "API" },
  { name: "Docker", category: "DevOps" },
  { name: "Figma", category: "Diseño" },
  { name: "Redis", category: "Caché" },
  { name: "Python", category: "Lenguaje" },
  { name: "AWS", category: "Nube" },
  { name: "Git", category: "Herramientas" },
  { name: "Framer Motion", category: "Animación" },
  { name: "Vite", category: "Herramientas" },
];

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL HOOKS
   Individual element observation for staggered entrance
   ═══════════════════════════════════════════════════════ */

// Observe a single element — triggers once
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Staggered reveal for child items in a container
function useStaggerReveal(count, threshold = 0.08) {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          for (let i = 0; i < count; i++) {
            setTimeout(() => setVisibleItems((prev) => new Set([...prev, i])), i * 90);
          }
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [count, threshold]);
  return [containerRef, visibleItems];
}

/* ═══════════════════════════════════════════════════════
   ANIMATED BACKGROUND — soft gradient orbs
   ═══════════════════════════════════════════════════════ */
function AnimatedBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", top: "-25%", right: "-15%", width: "55vw", height: "55vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 65%)",
        animation: "floatOrb1 28s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-25%", left: "-10%", width: "50vw", height: "50vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 65%)",
        animation: "floatOrb2 32s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes floatOrb1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-30px,50px) scale(1.08); } }
        @keyframes floatOrb2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.05); } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION — floating glass nav
   ═══════════════════════════════════════════════════════ */
function Navigation({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Portafolio", id: "portfolio" },
    { label: "Tecnologías", id: "technologies" },
    { label: "Contacto", id: "contact" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
      display: "flex", gap: 4, padding: "6px 8px", borderRadius: 50,
      background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
      border: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    }}>
      {links.map((l) => {
        const isActive = activeSection === l.id;
        return (
          <button key={l.id} onClick={() => scrollTo(l.id)}
            style={{
              padding: "8px 20px", borderRadius: 50, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 500, letterSpacing: "0.02em",
              fontFamily: "'DM Sans', sans-serif",
              background: isActive ? ACCENT_LIGHT : "transparent",
              color: isActive ? ACCENT : TEXT_DIM,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { if (!isActive) e.target.style.color = TEXT; }}
            onMouseLeave={(e) => { if (!isActive) e.target.style.color = TEXT_DIM; }}
          >
            {l.label}
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION — cascading entrance
   ═══════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const scrollDown = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", position: "relative",
      padding: "0 24px", textAlign: "center",
    }}>
      {/* Status badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 16px 6px 12px", borderRadius: 50,
        border: `1px solid ${BORDER}`, marginBottom: 32,
        background: SURFACE,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s",
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: "50%", background: ACCENT,
          boxShadow: `0 0 8px ${ACCENT}80`,
          animation: "pulse 2s ease-in-out infinite",
        }} />
        <span style={{ fontSize: 12, color: TEXT_DIM, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
          Disponible para trabajar
        </span>
      </div>

      {/* Main heading */}
      <h1 style={{
        fontSize: "clamp(2.8rem, 8vw, 7rem)", fontWeight: 700,
        fontFamily: "'Syne', sans-serif", lineHeight: 1.05, color: TEXT,
        margin: 0, letterSpacing: "-0.03em",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.4,0,0.2,1) 0.4s",
      }}>
        Creando Experiencias
        <br />
        <span style={{ color: ACCENT }}>Digitales</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: "clamp(1rem, 2vw, 1.2rem)", color: TEXT_DIM,
        fontFamily: "'DM Sans', sans-serif", maxWidth: 540,
        lineHeight: 1.7, margin: "28px 0 0", fontWeight: 400,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.4,0,0.2,1) 0.7s",
      }}>
        Desarrollador full-stack enfocado en construir aplicaciones web hermosas, eficientes y centradas en el usuario.
      </p>

      {/* Scroll indicator */}
      <button onClick={scrollDown} style={{
        position: "absolute", bottom: 48, border: "none", background: "transparent",
        cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.5 : 0, transition: "all 1s ease 1.2s",
      }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.5}
      >
        <span style={{ fontSize: 11, color: TEXT_DIM, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <ChevronDown size={16} color={TEXT_DIM} style={{ animation: "bobDown 2s ease-in-out infinite" }} />
      </button>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes bobDown { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADER — animated label + title
   ═══════════════════════════════════════════════════════ */
function SectionHeader({ label, title, visible, refProp }) {
  return (
    <div ref={refProp} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
      <span style={{
        fontSize: 13, fontWeight: 600, color: ACCENT,
        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em",
        opacity: visible ? 0.7 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {label}
      </span>
      <h2 style={{
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700,
        fontFamily: "'Syne', sans-serif", color: TEXT,
        margin: 0, letterSpacing: "-0.02em",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s",
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT CARD — individual scroll reveal + 3D tilt
   Each card has its own IntersectionObserver
   ═══════════════════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  // Per-card scroll reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  const handleClick = () => {
    if (project.link) window.open(project.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: "relative", borderRadius: 20, overflow: "hidden",
        background: SURFACE,
        border: `1px solid ${hovered ? BORDER_HOVER : BORDER}`,
        transform: visible
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`
          : `translateY(70px) scale(0.96)`,
        opacity: visible ? 1 : 0,
        transition: visible
          ? "transform 0.2s ease-out, opacity 0.6s ease, box-shadow 0.3s ease, border-color 0.3s"
          : `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s`,
        cursor: project.link ? "pointer" : "default",
        boxShadow: hovered
          ? `0 20px 60px -15px ${project.color}20, 0 0 0 1px ${project.color}15`
          : "0 2px 12px rgba(0,0,0,0.04)",
        willChange: "transform, opacity",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${project.color}, transparent)`
          : `linear-gradient(90deg, transparent, ${project.color}30, transparent)`,
        transition: "background 0.4s ease",
      }} />

      <div style={{ padding: "32px 28px" }}>
        {/* Year + Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{
            fontSize: 11, color: project.color, fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase", opacity: 0.9,
          }}>
            {project.year}
          </span>
          {project.link && (
            <span style={{
              fontSize: 10, color: ACCENT, fontFamily: "'DM Sans', sans-serif",
              padding: "2px 8px", borderRadius: 50, background: ACCENT_LIGHT,
              fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              En vivo
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)", fontWeight: 700,
          fontFamily: "'Syne', sans-serif", color: TEXT,
          margin: "0 0 10px", letterSpacing: "-0.02em",
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 14, color: TEXT_DIM, lineHeight: 1.65,
          fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px",
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              padding: "4px 12px", borderRadius: 50, fontSize: 11,
              color: TEXT_DIM, border: `1px solid ${BORDER}`,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              background: hovered ? `${project.color}08` : "transparent",
              transition: "background 0.3s",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontSize: 13, fontWeight: 600, color: hovered ? project.color : TEXT_DIM,
            fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s",
          }}>
            {project.link ? "Ver Proyecto" : "Próximamente"}
          </span>
          <ArrowUpRight size={14} color={hovered ? project.color : TEXT_DIM}
            style={{ transition: "color 0.3s, transform 0.3s", transform: hovered ? "translate(2px,-2px)" : "none" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTFOLIO SECTION
   ═══════════════════════════════════════════════════════ */
function PortfolioSection() {
  const [ref, visible] = useReveal(0.05);

  return (
    <section id="portfolio" style={{ padding: "120px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="01" title="Proyectos Destacados" visible={visible} refProp={ref} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
        gap: 24, marginTop: 56,
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TECH PILL — stagger-revealed on scroll
   ═══════════════════════════════════════════════════════ */
function TechPill({ tech, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "14px 24px", borderRadius: 60,
        background: hovered ? SURFACE_HOVER : SURFACE,
        border: `1px solid ${hovered ? BORDER_HOVER : BORDER}`,
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.92)",
        transition: `opacity 0.5s cubic-bezier(0.4,0,0.2,1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.05}s, background 0.25s, border-color 0.25s, box-shadow 0.25s`,
        boxShadow: hovered ? `0 8px 24px -8px ${ACCENT}18` : "0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      <span style={{
        fontSize: 15, fontWeight: 600, color: TEXT,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {tech.name}
      </span>
      <span style={{
        fontSize: 11, color: hovered ? ACCENT : TEXT_DIM,
        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        opacity: hovered ? 1 : 0.6,
        transition: "all 0.25s",
      }}>
        {tech.category}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TECHNOLOGIES SECTION
   ═══════════════════════════════════════════════════════ */
function TechnologiesSection() {
  const [headerRef, headerVisible] = useReveal(0.15);
  const [pillsRef, visiblePills] = useStaggerReveal(TECHNOLOGIES.length, 0.08);

  return (
    <section id="technologies" style={{ padding: "100px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="02" title="Tecnologías" visible={headerVisible} refProp={headerRef} />
      <p style={{
        fontSize: 15, color: TEXT_DIM, fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.7, maxWidth: 500, margin: "20px 0 48px",
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.3s",
      }}>
        Herramientas y tecnologías que uso para dar vida a las ideas. Siempre explorando, siempre aprendiendo.
      </p>
      <div ref={pillsRef} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {TECHNOLOGIES.map((tech, i) => (
          <TechPill key={tech.name} tech={tech} index={i} visible={visiblePills.has(i)} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  const [ref, visible] = useReveal(0.1);
  const [linkRef, visibleLinks] = useStaggerReveal(3, 0.12);

  const socials = [
    { icon: Mail, label: "hello@yourdomain.com", href: "mailto:hello@yourdomain.com" },
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <section id="contact" style={{ padding: "120px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="03" title="Contacto" visible={visible} refProp={ref} />

      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr", gap: 48 }}>
        <p style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: TEXT_DIM,
          fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, maxWidth: 560,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          ¿Tienes un proyecto en mente o quieres colaborar? Siempre estoy abierto a discutir nuevas ideas y oportunidades.
        </p>

        <div ref={linkRef} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {socials.map((s, i) => (
            <ContactLink key={s.label} social={s} index={i} visible={visibleLinks.has(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactLink({ social, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const Icon = social.icon;

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 0", borderBottom: `1px solid ${BORDER}`,
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-40px)",
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s, padding 0.3s`,
        paddingLeft: hovered ? 12 : 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Icon size={18} color={hovered ? ACCENT : TEXT_DIM} style={{ transition: "color 0.25s" }} />
        <span style={{
          fontSize: 16, fontWeight: 500, color: hovered ? TEXT : TEXT_DIM,
          fontFamily: "'DM Sans', sans-serif", transition: "color 0.25s",
        }}>
          {social.label}
        </span>
      </div>
      <ExternalLink size={14} color={hovered ? ACCENT : TEXT_DIM}
        style={{ transition: "color 0.25s, transform 0.25s", transform: hovered ? "translate(2px,-2px)" : "none" }}
      />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  const [ref, visible] = useReveal(0.2);
  return (
    <footer ref={ref} style={{
      padding: "48px 24px", textAlign: "center",
      borderTop: `1px solid ${BORDER}`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease",
    }}>
      <p style={{
        fontSize: 12, color: TEXT_DIM,
        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em",
      }}>
        © 2024 — Diseñado y desarrollado con precisión
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [activeSection, setActiveSection] = useState("portfolio");

  useEffect(() => {
    const sections = ["portfolio", "technologies", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{
      background: BG, minHeight: "100vh", color: TEXT,
      fontFamily: "'DM Sans', sans-serif",
      overflowX: "hidden", position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${BG}; }
        ::selection { background: ${ACCENT_MID}; color: ${TEXT}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: rgba(13,148,136,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(13,148,136,0.35); }
      `}</style>

      <AnimatedBackground />
      <Navigation activeSection={activeSection} />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <PortfolioSection />
        <TechnologiesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
