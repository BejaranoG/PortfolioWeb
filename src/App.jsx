import { useState, useEffect, useRef, useCallback } from "react";
<<<<<<< HEAD
import { Linkedin, Mail, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
=======
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, ArrowUpRight, ChevronDown, MousePointer2 } from "lucide-react";
>>>>>>> 7e2db378b5e18e899bea5c8ef450f5f651f6b2a9

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM — Futuristic Noir
   Deep dark base with warm amber + electric violet
   dual-accent system. Heavy use of CSS animations,
   animated gradients, and creative visual effects.
   Fonts: Outfit (display) + Manrope (body) + JetBrains Mono (code)
   ═══════════════════════════════════════════════════════ */

/* ── Global CSS with keyframe animations ───────────────
   All major animations are pure CSS for performance.
   ──────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --bg: #08080c;
    --bg2: #0f0f15;
    --surface: #13131a;
    --surface-hover: #1a1a24;
    --text: #eeeef0;
    --text-dim: #6e6e82;
    --text-muted: #3e3e52;
    --amber: #f59e0b;
    --violet: #8b5cf6;
    --rose: #f43f5e;
    --cyan: #06b6d4;
    --border: rgba(255,255,255,0.06);
    --gradient-1: linear-gradient(135deg, #f59e0b, #f43f5e, #8b5cf6);
    --gradient-2: linear-gradient(135deg, #8b5cf6, #06b6d4, #f59e0b);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); overflow-x: hidden; }
  ::selection { background: rgba(139,92,246,0.3); color: var(--text); }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.25); border-radius: 3px; }

  /* ── Aurora Background ──────────────────────── */
  @keyframes aurora {
    0%   { background-position: 0% 50%, 100% 50%, 50% 0%; }
    25%  { background-position: 100% 0%, 0% 100%, 50% 50%; }
    50%  { background-position: 100% 50%, 0% 50%, 50% 100%; }
    75%  { background-position: 0% 100%, 100% 0%, 50% 50%; }
    100% { background-position: 0% 50%, 100% 50%, 50% 0%; }
  }

  /* ── Floating animation ─────────────────────── */
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-12px) rotate(1deg); }
    66% { transform: translateY(6px) rotate(-1deg); }
  }

  /* ── Gradient text shimmer ──────────────────── */
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* ── Rotating border gradient ───────────────── */
  @keyframes rotateBorder {
    0% { --angle: 0deg; }
    100% { --angle: 360deg; }
  }

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  /* ── Pulse ring ─────────────────────────────── */
  @keyframes pulseRing {
    0% { transform: scale(1); opacity: 0.4; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  /* ── Slide in from various directions ───────── */
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(60px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeScale {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  /* ── Grain overlay ──────────────────────────── */
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }

  /* ── Marquee ────────────────────────────────── */
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ── Glow pulse ─────────────────────────────── */
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.15), 0 0 60px rgba(139,92,246,0.05); }
    50% { box-shadow: 0 0 30px rgba(139,92,246,0.25), 0 0 80px rgba(139,92,246,0.1); }
  }

  /* ── Line draw ──────────────────────────────── */
  @keyframes drawLine {
    from { width: 0; }
    to { width: 100%; }
  }

  /* ── Orbit tech pills ───────────────────────── */
  @keyframes orbit1 { 0% { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); } 100% { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); } }
  @keyframes orbit2 { 0% { transform: rotate(120deg) translateX(var(--orbit-r)) rotate(-120deg); } 100% { transform: rotate(480deg) translateX(var(--orbit-r)) rotate(-480deg); } }
`;

// ─── Project Data ────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "NorthServices MXL",
    description: "Landing page promocional para un SaaS enfocado en clínicas y consultorios médicos. Facilita la gestión de citas, pacientes, facturación y administración integral del consultorio.",
    tags: ["React", "Tailwind CSS", "Landing Page", "SaaS"],
    accent: "var(--amber)",
    year: "2024",
    link: "https://northservicesmxl.netlify.app",
    num: "01",
  },
  {
    id: 2,
    title: "Rising Bakery",
    description: "E-commerce completo para una pastelería con carrito de compras, pasarelas de pago (tarjeta y OXXO), diseño de pasteles personalizados, gestión de pedidos y catálogo dinámico.",
    tags: ["React", "Node.js", "Stripe", "Pasarelas de Pago", "E-commerce"],
    accent: "var(--rose)",
    year: "2024",
    link: "https://risingbakery-production.up.railway.app/",
    num: "02",
  },
  {
    id: 3,
    title: "Synthwave Studio",
    description: "Entorno de programación creativa para arte generativo con renderizado WebGL y colaboración en tiempo real.",
    tags: ["Three.js", "WebGL", "TypeScript", "WebSocket"],
    accent: "var(--violet)",
    year: "2024",
    link: null,
    num: "03",
  },
  {
    id: 4,
    title: "Arcane Commerce",
    description: "Plataforma de e-commerce headless con renderizado edge ultra-rápido y experiencias de compra personalizadas.",
    tags: ["Next.js", "Stripe", "Tailwind", "Redis"],
    accent: "var(--cyan)",
    year: "2024",
    link: null,
    num: "04",
  },
];

const TECHNOLOGIES = [
  { name: "React", cat: "Frontend", icon: "⚛" },
  { name: "TypeScript", cat: "Lenguaje", icon: "TS" },
  { name: "Next.js", cat: "Framework", icon: "▲" },
  { name: "Node.js", cat: "Backend", icon: "⬢" },
  { name: "Tailwind", cat: "Estilos", icon: "🎨" },
  { name: "PostgreSQL", cat: "DB", icon: "🐘" },
  { name: "Three.js", cat: "3D", icon: "🌐" },
  { name: "GraphQL", cat: "API", icon: "◈" },
  { name: "Docker", cat: "DevOps", icon: "🐳" },
  { name: "Figma", cat: "Diseño", icon: "🎯" },
  { name: "Python", cat: "Lenguaje", icon: "🐍" },
  { name: "AWS", cat: "Nube", icon: "☁" },
  { name: "Git", cat: "Control", icon: "⑂" },
  { name: "Redis", cat: "Caché", icon: "⚡" },
  { name: "Vite", cat: "Build", icon: "⚡" },
  { name: "Stripe", cat: "Pagos", icon: "💳" },
];

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useStagger(count, threshold = 0.08) {
  const ref = useRef(null);
  const [items, setItems] = useState(new Set());
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          for (let i = 0; i < count; i++)
            setTimeout(() => setItems(p => new Set([...p, i])), i * 100);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [count, threshold]);
  return [ref, items];
}

function useMouse() {
  const pos = useRef({ x: 0, y: 0 });
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handler = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { forceUpdate(n => n + 1); ticking = false; });
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos.current;
}

/* ═══════════════════════════════════════════════════════
   AURORA BACKGROUND + GRAIN
   Multi-layered animated gradient background with
   film grain overlay for texture.
   ═══════════════════════════════════════════════════════ */
function AuroraBackground({ mouse }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {/* Aurora gradients */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.4,
        background: [
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.3), transparent)",
          "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(245,158,11,0.15), transparent)",
          "radial-gradient(ellipse 50% 60% at 20% 80%, rgba(6,182,212,0.12), transparent)",
        ].join(", "),
        animation: "aurora 20s ease-in-out infinite",
        backgroundSize: "200% 200%, 200% 200%, 200% 200%",
      }} />
      {/* Mouse-following spotlight */}
      <div style={{
        position: "absolute",
        left: mouse.x - 300,
        top: mouse.y - 300,
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(245,158,11,0.04) 40%, transparent 70%)",
        transition: "left 0.3s ease-out, top 0.3s ease-out",
        willChange: "left, top",
      }} />
      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: "-200%", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
        animation: "grain 8s steps(10) infinite",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   Thin animated gradient line at the top of the page
   ═══════════════════════════════════════════════════════ */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 9999,
      height: 2, width: `${progress}%`,
      background: "var(--gradient-1)",
      transition: "width 0.1s linear",
    }} />
  );
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION — glass morphism with animated indicator
   ═══════════════════════════════════════════════════════ */
function Navigation({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Portafolio", id: "portfolio" },
    { label: "Tecnologías", id: "technologies" },
    { label: "Contacto", id: "contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 1000,
      display: "flex", gap: 2, padding: "5px 6px", borderRadius: 50,
      background: scrolled ? "rgba(8,8,12,0.8)" : "rgba(8,8,12,0.4)",
      backdropFilter: "blur(24px) saturate(1.5)",
      border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
      boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
    }}>
      {links.map((l) => {
        const isActive = active === l.id;
        return (
          <button key={l.id}
            onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "10px 22px", borderRadius: 50, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
              fontFamily: "'Manrope', sans-serif",
              background: isActive
                ? "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(139,92,246,0.15))"
                : "transparent",
              color: isActive ? "var(--text)" : "var(--text-dim)",
              transition: "all 0.35s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => { if (!isActive) e.target.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { if (!isActive) e.target.style.color = "var(--text-dim)"; }}
          >
            {l.label}
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED TEXT — letter-by-letter reveal with gradient
   ═══════════════════════════════════════════════════════ */
function AnimatedHeading({ text, gradient, delay = 0, loaded }) {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.22em" }}>
      {text.split("").map((char, i) => (
        <span key={i} style={{
          display: char === " " ? "inline" : "inline-block",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0) rotateX(0)" : "translateY(50px) rotateX(-40deg)",
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + i * 0.035}s`,
          background: gradient ? "var(--gradient-1)" : "none",
          WebkitBackgroundClip: gradient ? "text" : "unset",
          WebkitTextFillColor: gradient ? "transparent" : "var(--text)",
          backgroundSize: gradient ? "200% auto" : "auto",
          animation: gradient && loaded ? "shimmer 4s linear infinite" : "none",
          animationDelay: `${delay + 1}s`,
        }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION — dramatic multi-layer entrance
   ═══════════════════════════════════════════════════════ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", position: "relative",
      padding: "0 24px", textAlign: "center", overflow: "hidden",
    }}>
      {/* Decorative rings */}
      <div style={{
        position: "absolute", width: "min(700px, 90vw)", height: "min(700px, 90vw)",
        borderRadius: "50%", border: "1px solid rgba(139,92,246,0.06)",
        opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.5s",
      }} />
      <div style={{
        position: "absolute", width: "min(500px, 70vw)", height: "min(500px, 70vw)",
        borderRadius: "50%", border: "1px solid rgba(245,158,11,0.06)",
        opacity: loaded ? 1 : 0, transition: "opacity 2s ease 0.8s",
      }} />

      {/* Main heading — animated letter reveal */}
      <h1 style={{
        fontSize: "clamp(2.6rem, 9vw, 7.5rem)", fontWeight: 900,
        fontFamily: "'Outfit', sans-serif", lineHeight: 1,
        letterSpacing: "-0.04em", margin: 0,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
      }}>
        <AnimatedHeading text="Creando" delay={0.1} loaded={loaded} />
        <AnimatedHeading text="Experiencias" delay={0.4} loaded={loaded} gradient />
        <AnimatedHeading text="Digitales" delay={0.8} loaded={loaded} />
      </h1>

      {/* Subtitle with line reveal */}
      <div style={{
        position: "relative", marginTop: 36, maxWidth: 560,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.4,0,0.2,1) 1.4s",
      }}>
        {/* Decorative line above subtitle */}
        <div style={{
          width: loaded ? 60 : 0, height: 2, margin: "0 auto 20px",
          background: "var(--gradient-1)", borderRadius: 2,
          transition: "width 0.8s ease 1.6s",
        }} />
        <p style={{
          fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "var(--text-dim)",
          fontFamily: "'Manrope', sans-serif", lineHeight: 1.8, fontWeight: 400,
        }}>
          Desarrollamos soluciones digitales a medida que impulsan el crecimiento de tu negocio — desde plataformas web hasta sistemas integrales de gestión.
        </p>
      </div>

      {/* CTA Button with animated gradient border */}
      <div style={{
        marginTop: 48,
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 1.8s",
      }}>
        <button
          onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            position: "relative", padding: "16px 40px", borderRadius: 50,
            border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(139,92,246,0.12))",
            color: "var(--text)", fontFamily: "'Manrope', sans-serif",
            fontSize: 14, fontWeight: 600, letterSpacing: "0.03em",
            display: "flex", alignItems: "center", gap: 10,
            transition: "all 0.35s ease",
            backdropFilter: "blur(10px)",
            outline: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(139,92,246,0.2))";
            e.currentTarget.style.outline = "1px solid rgba(255,255,255,0.15)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(139,92,246,0.12))";
            e.currentTarget.style.outline = "1px solid rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Ver Proyectos <ArrowRight size={15} />
        </button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        opacity: loaded ? 0.4 : 0, transition: "opacity 1s ease 2.2s",
      }}>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, var(--violet), transparent)",
          animation: "float 3s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MARQUEE — infinite scrolling text strip
   Creates visual rhythm between sections
   ═══════════════════════════════════════════════════════ */
function Marquee() {
  const [ref, visible] = useReveal(0.1);
  const text = "FRONTEND · BACKEND · UI/UX · E-COMMERCE · SAAS · WEB APPS · API · ";
  return (
    <div ref={ref} style={{
      overflow: "hidden", padding: "28px 0",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      opacity: visible ? 1 : 0, transition: "opacity 1s ease",
    }}>
      <div style={{
        display: "flex", whiteSpace: "nowrap",
        animation: "marquee 25s linear infinite",
      }}>
        {[...Array(3)].map((_, i) => (
          <span key={i} style={{
            fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)", fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.15em",
            paddingRight: 16,
          }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECT CARD — animated gradient border + glass effect
   Each card has a rotating conic-gradient border,
   glass-morphism interior, and smooth hover transforms.
   ═══════════════════════════════════════════════════════ */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => project.link && window.open(project.link, "_blank", "noopener,noreferrer")}
      style={{
        position: "relative", borderRadius: 24, padding: 1,
        background: hovered
          ? `conic-gradient(from var(--angle), ${project.accent}, var(--violet), ${project.accent})`
          : "var(--border)",
        animation: hovered ? "rotateBorder 3s linear infinite" : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0) scale(${hovered ? 1.02 : 1})`
          : "translateY(80px) scale(0.94)",
        transition: visible
          ? "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.6s ease, background 0.4s"
          : `all 0.8s cubic-bezier(0.4,0,0.2,1) ${index * 0.15}s`,
        cursor: project.link ? "pointer" : "default",
      }}
    >
      {/* Inner card with glass effect */}
      <div style={{
        borderRadius: 23, padding: "36px 32px",
        background: hovered
          ? `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.04), var(--surface))`
          : "var(--surface)",
        transition: "background 0.3s ease",
        position: "relative", overflow: "hidden",
      }}>
        {/* Number + year header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{
            fontSize: 48, fontWeight: 900, fontFamily: "'Outfit', sans-serif",
            color: "rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: "-0.04em",
          }}>
            {project.num}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {project.link && (
              <span style={{
                fontSize: 10, padding: "4px 10px", borderRadius: 50,
                background: `${project.accent}18`, color: project.accent,
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                EN VIVO
              </span>
            )}
            <span style={{
              fontSize: 11, color: "var(--text-muted)",
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
            }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800,
          fontFamily: "'Outfit', sans-serif", color: "var(--text)",
          margin: "0 0 12px", letterSpacing: "-0.02em",
          transition: "color 0.3s",
          ...(hovered ? {
            background: `linear-gradient(135deg, var(--text), ${project.accent})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          } : {}),
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7,
          fontFamily: "'Manrope', sans-serif", margin: "0 0 24px",
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              padding: "5px 14px", borderRadius: 50, fontSize: 11,
              color: hovered ? project.accent : "var(--text-dim)",
              border: `1px solid ${hovered ? `${project.accent}30` : "var(--border)"}`,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
              transition: "all 0.3s",
              background: hovered ? `${project.accent}08` : "transparent",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          color: hovered ? project.accent : "var(--text-dim)",
          transition: "color 0.3s",
        }}>
          <span style={{
            fontSize: 13, fontWeight: 700, fontFamily: "'Manrope', sans-serif",
            letterSpacing: "0.03em",
          }}>
            {project.link ? "Ver Proyecto" : "Próximamente"}
          </span>
          <ArrowUpRight size={14} style={{
            transition: "transform 0.3s",
            transform: hovered ? "translate(3px,-3px)" : "none",
          }} />
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
    <section id="portfolio" style={{ padding: "100px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Section label */}
      <div ref={ref} style={{
        display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
        opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <span style={{
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
          color: "var(--amber)", letterSpacing: "0.1em",
        }}>
          01
        </span>
        <div style={{ width: 40, height: 1, background: "var(--amber)", opacity: 0.4 }} />
        <span style={{
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
          color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          Proyectos
        </span>
      </div>

      {/* Heading */}
      <h2 style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
        fontFamily: "'Outfit', sans-serif", color: "var(--text)",
        margin: "0 0 60px", letterSpacing: "-0.03em", lineHeight: 1.1,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.15s",
      }}>
        Proyectos <br />
        <span style={{
          background: "var(--gradient-1)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Destacados
        </span>
      </h2>

      {/* Project grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
        gap: 20,
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TECH CARD — interactive pill with glow effect
   ═══════════════════════════════════════════════════════ */
function TechCard({ tech, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 24px", borderRadius: 16,
        background: hovered ? "var(--surface-hover)" : "var(--surface)",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.2)" : "var(--border)"}`,
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.06}s, background 0.3s, border-color 0.3s, box-shadow 0.3s`,
        boxShadow: hovered ? "0 8px 32px rgba(139,92,246,0.1)" : "none",
        animation: hovered ? "glowPulse 2s ease-in-out infinite" : "none",
      }}
    >
      {/* Icon circle */}
      <div style={{
        width: 36, height: 36, borderRadius: 10, display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: 16,
        background: hovered
          ? "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(139,92,246,0.15))"
          : "rgba(255,255,255,0.03)",
        transition: "all 0.3s",
        transform: hovered ? "rotate(-5deg) scale(1.1)" : "none",
      }}>
        {tech.icon}
      </div>
      <div>
        <div style={{
          fontSize: 14, fontWeight: 700, color: "var(--text)",
          fontFamily: "'Outfit', sans-serif",
        }}>
          {tech.name}
        </div>
        <div style={{
          fontSize: 11, color: hovered ? "var(--violet)" : "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
          transition: "color 0.3s",
        }}>
          {tech.cat}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TECHNOLOGIES SECTION
   ═══════════════════════════════════════════════════════ */
function TechnologiesSection() {
  const [ref, visible] = useReveal(0.1);
  const [gridRef, visibleItems] = useStagger(TECHNOLOGIES.length, 0.05);

  return (
    <section id="technologies" style={{ padding: "100px 24px 60px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Section label */}
      <div ref={ref} style={{
        display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
        opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <span style={{
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
          color: "var(--violet)", letterSpacing: "0.1em",
        }}>
          02
        </span>
        <div style={{ width: 40, height: 1, background: "var(--violet)", opacity: 0.4 }} />
        <span style={{
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
          color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          Stack
        </span>
      </div>

      <h2 style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
        fontFamily: "'Outfit', sans-serif", color: "var(--text)",
        margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s",
      }}>
        Tecnologías <br />
        <span style={{
          background: "var(--gradient-2)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          & Herramientas
        </span>
      </h2>

      <p style={{
        fontSize: 15, color: "var(--text-dim)", fontFamily: "'Manrope', sans-serif",
        lineHeight: 1.7, maxWidth: 480, margin: "0 0 48px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.3s",
      }}>
        Herramientas que uso para dar vida a cada proyecto. Siempre explorando nuevas tecnologías.
      </p>

      {/* Tech grid */}
      <div ref={gridRef} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
      }}>
        {TECHNOLOGIES.map((tech, i) => (
          <TechCard key={tech.name} tech={tech} index={i} visible={visibleItems.has(i)} />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION — with animated elements
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  const [ref, visible] = useReveal(0.1);
<<<<<<< HEAD
  const [linksRef, visibleLinks] = useStagger(2, 0.1);

  const socials = [
    { icon: Mail, label: "gerardoebr29@gmail.com", href: "mailto:gerardoebr29@gmail.com", accent: "var(--amber)" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/gerardo-bejarano-005156256/", accent: "var(--cyan)" },
=======
  const [linksRef, visibleLinks] = useStagger(3, 0.1);

  const socials = [
    { icon: Mail, label: "hello@yourdomain.com", href: "mailto:hello@yourdomain.com", accent: "var(--amber)" },
    { icon: Github, label: "GitHub", href: "https://github.com", accent: "var(--violet)" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", accent: "var(--cyan)" },
>>>>>>> 7e2db378b5e18e899bea5c8ef450f5f651f6b2a9
  ];

  return (
    <section id="contact" style={{ padding: "100px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Section label */}
      <div ref={ref} style={{
        display: "flex", alignItems: "center", gap: 16, marginBottom: 16,
        opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <span style={{
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
          color: "var(--rose)", letterSpacing: "0.1em",
        }}>
          03
        </span>
        <div style={{ width: 40, height: 1, background: "var(--rose)", opacity: 0.4 }} />
        <span style={{
          fontSize: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
          color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          Contacto
        </span>
      </div>

      <h2 style={{
        fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
        fontFamily: "'Outfit', sans-serif", color: "var(--text)",
        margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1,
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s",
      }}>
        Hablemos de tu <br />
        <span style={{
          background: "linear-gradient(135deg, var(--rose), var(--amber))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          próximo proyecto
        </span>
      </h2>

      <p style={{
        fontSize: 15, color: "var(--text-dim)", fontFamily: "'Manrope', sans-serif",
        lineHeight: 1.8, maxWidth: 520, margin: "0 0 48px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease 0.3s",
      }}>
        ¿Tienes un proyecto en mente o quieres colaborar? Siempre estoy abierto a discutir nuevas ideas y crear algo extraordinario juntos.
      </p>

      {/* Links */}
      <div ref={linksRef} style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 500 }}>
        {socials.map((s, i) => (
          <ContactLink key={s.label} social={s} index={i} visible={visibleLinks.has(i)} />
        ))}
      </div>
    </section>
  );
}

function ContactLink({ social, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const Icon = social.icon;

  return (
    <a
      href={social.href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "22px 0", borderBottom: "1px solid var(--border)",
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-50px)",
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s, padding-left 0.3s`,
        paddingLeft: hovered ? 16 : 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Icon with glow ring on hover */}
        <div style={{
          position: "relative", width: 36, height: 36, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? `${social.accent}15` : "rgba(255,255,255,0.03)",
          transition: "all 0.3s",
        }}>
          <Icon size={16} color={hovered ? social.accent : "var(--text-dim)"}
            style={{ transition: "color 0.3s" }}
          />
          {hovered && (
            <div style={{
              position: "absolute", inset: -4, borderRadius: 14,
              border: `1px solid ${social.accent}30`,
              animation: "pulseRing 1.5s ease-out infinite",
            }} />
          )}
        </div>
        <span style={{
          fontSize: 15, fontWeight: 600, fontFamily: "'Manrope', sans-serif",
          color: hovered ? "var(--text)" : "var(--text-dim)",
          transition: "color 0.3s",
        }}>
          {social.label}
        </span>
      </div>
      <ArrowUpRight size={14} color={hovered ? social.accent : "var(--text-muted)"}
        style={{
          transition: "all 0.3s",
          transform: hovered ? "translate(3px,-3px)" : "none",
        }}
      />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   BRAND MARK — "BejaranoG" fixed signature
   Vertically rotated on the left edge, always visible.
   Uses the gradient identity + subtle hover interaction.
   On mobile, sits horizontal at top-left instead.
   ═══════════════════════════════════════════════════════ */
function BrandMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Left vertical signature — desktop */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "fixed",
          left: 24,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "center center",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "default",
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Decorative line before */}
        <div style={{
          width: hovered ? 40 : 24,
          height: 1,
          background: hovered ? "var(--gradient-1)" : "rgba(255,255,255,0.12)",
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          borderRadius: 1,
        }} />

        {/* Name */}
        <span style={{
          fontSize: 12,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          ...(hovered
            ? {
                background: "var(--gradient-1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }
            : {
                color: "rgba(255,255,255,0.2)",
              }),
        }}>
          BejaranoG
        </span>

        {/* Decorative line after */}
        <div style={{
          width: hovered ? 40 : 24,
          height: 1,
          background: hovered ? "var(--gradient-1)" : "rgba(255,255,255,0.12)",
          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          borderRadius: 1,
        }} />
      </div>

      {/* Right side — vertical "PORTFOLIO · 2024" for visual balance */}
      <div style={{
        position: "fixed",
        right: 24,
        top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        transformOrigin: "center center",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{
          width: 24, height: 1,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 1,
        }} />
        <span style={{
          fontSize: 10,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.1)",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
        }}>
          Portfolio · 2024
        </span>
        <div style={{
          width: 24, height: 1,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 1,
        }} />
      </div>

      {/* Hide side marks on mobile, show small top-left mark instead */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="rotate(-90deg)"] { display: none !important; }
          div[style*="rotate(90deg)"] { display: none !important; }
        }
      `}</style>

      {/* Mobile brand — top left, horizontal */}
      <div style={{
        position: "fixed",
        top: 20,
        left: 16,
        zIndex: 999,
        display: "none",
      }}>
        <span style={{
          fontSize: 11,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: "var(--gradient-1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          BG
        </span>
      </div>
      <style>{`
        @media (max-width: 768px) {
          div[style*="top: 20"][style*="left: 16"] { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER — with animated gradient line
   ═══════════════════════════════════════════════════════ */
function Footer() {
  const [ref, visible] = useReveal(0.2);
  return (
    <footer ref={ref} style={{ padding: "40px 24px 48px", textAlign: "center", position: "relative" }}>
      {/* Animated gradient divider */}
      <div style={{
        width: visible ? "100%" : "0%", height: 1, margin: "0 auto 32px",
        background: "var(--gradient-1)", transition: "width 1.2s ease",
        maxWidth: 300,
      }} />
      {/* Brand in footer */}
      <span style={{
        fontSize: 18, fontFamily: "'Outfit', sans-serif", fontWeight: 800,
        letterSpacing: "0.1em", display: "inline-block", marginBottom: 12,
        background: "var(--gradient-1)", WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.4s",
      }}>
        BejaranoG
      </span>
      <p style={{
        fontSize: 12, color: "var(--text-muted)",
        fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em",
        opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
      }}>
        © 2024 — DISEÑADO Y DESARROLLADO CON PRECISIÓN
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [active, setActive] = useState("portfolio");
  const mouse = useMouse();

  useEffect(() => {
    const ids = ["portfolio", "technologies", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{
      background: "var(--bg)", minHeight: "100vh", color: "var(--text)",
      fontFamily: "'Manrope', sans-serif", overflowX: "hidden", position: "relative",
    }}>
      <style>{GLOBAL_CSS}</style>
      <AuroraBackground mouse={mouse} />
      <ScrollProgress />
      <Navigation active={active} />
      <BrandMark />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Marquee />
        <PortfolioSection />
        <TechnologiesSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
