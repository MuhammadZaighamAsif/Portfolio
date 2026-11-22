import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { meta, stats } from "@/data/portfolio";
import { showAchievement } from "@/lib/achievement";
import { EASE, gsap, splitWords, useGsap } from "@/lib/animations";
import { scrollToSection } from "@/lib/motion";
import { useMagnetic } from "@/lib/pointerFx";
import ProfilePhoto from "./ProfilePhoto";
import RoleRotator from "./RoleRotator";
import "@/styles/hero.css";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  useMagnetic(primaryRef, 0.22);

  useGsap(rootRef, (helpers, root) => {
    const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

    const tl = gsap.timeline({ defaults: { ease: EASE.out } });
    const show = (targets: gsap.TweenTarget, from: gsap.TweenVars, dur: number, at: number, extra: gsap.TweenVars = {}) =>
      tl.fromTo(
        targets,
        { opacity: 0, ...from },
        { opacity: 1, y: 0, x: 0, scale: 1, duration: dur, clearProps: "opacity,transform", ...extra },
        at
      );

    // Background fades up first, then everything else is choreographed top → bottom.
    tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 1.4, ease: EASE.outSoft, clearProps: "opacity" }, 0);
    show(".hero-badge", { y: 14 }, 0.7, 0.05);

    // Name: each word slides up from behind its own clip mask (no bounce).
    tl.fromTo(
      q(".hero-word-inner"),
      { yPercent: 115, rotate: 4 },
      { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.09, ease: EASE.expo, clearProps: "transform" },
      0.14
    );

    show(".hero-role", { y: 16 }, 0.8, 0.62);
    show(".hero-lede", { y: 18 }, 0.8, 0.74);
    show(q(".hero-cta"), { y: 20 }, 0.7, 0.86, { stagger: 0.08 });
    show(".hero-meta", { y: 16 }, 0.7, 1.0);
    show(q(".hero-stat"), { y: 18 }, 0.7, 1.1, { stagger: 0.07 });

    // Counters run inside the same timeline so they start exactly as the stats appear.
    q(".hero-stat-value[data-count]").forEach((el, i) => {
      const to = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "";
      const state = { v: 0 };
      el.textContent = `0${suffix}`;
      tl.to(
        state,
        {
          v: to,
          duration: 0.95,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = `${to}${suffix}`;
          },
        },
        1.15 + i * 0.07
      );
    });

    // Photo: plate scales in, photo wipes up inside its frame while slowly settling, glow fades up.
    show(".hp-stage", { y: 28, scale: 0.94 }, 1.3, 0.22, { ease: EASE.expo });
    tl.fromTo(
      ".hp-frame",
      { clipPath: "inset(100% 0% 0% 0% round 50% 50% 28px 28px / 34% 34% 28px 28px)" },
      { clipPath: "inset(0% 0% 0% 0% round 50% 50% 28px 28px / 34% 34% 28px 28px)", duration: 1.25, ease: EASE.inOut, clearProps: "clipPath" },
      0.3
    );
    tl.fromTo(".hp-frame img", { scale: 1.22 }, { scale: 1, duration: 1.8, ease: EASE.out, clearProps: "transform" }, 0.3);
    tl.fromTo(".hp-glow", { opacity: 0 }, { opacity: 0.55, duration: 1.5, ease: EASE.outSoft, clearProps: "opacity" }, 0.35);
    show(q(".hp-chip"), { y: 14, scale: 0.9 }, 0.8, 1.15, { stagger: 0.12 });
    show(".hero-cue", { y: -8 }, 0.8, 1.7, { ease: EASE.outSoft });

    // Scroll: the photo drifts slightly slower than the page.
    helpers.parallax(root.querySelector(".hp"), 56, root);
  });

  // The counters overwrite textContent; restore the real values if the effect is torn down mid-count.
  useLayoutEffect(() => {
    const root = rootRef.current;
    return () => {
      root?.querySelectorAll<HTMLElement>(".hero-stat-value[data-count]").forEach((el) => {
        el.textContent = `${el.dataset.count ?? ""}${el.dataset.suffix ?? ""}`;
      });
    };
  }, []);

  return (
    <section ref={rootRef} id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aurora" />
        <div className="hero-beam hero-beam--a" />
        <div className="hero-beam hero-beam--b" />
        <div className="hero-dots" />
      </div>

      <div className="container-custom hero-inner">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="status-dot" aria-hidden="true" />
            {meta.availability}
          </p>

          <h1 id="hero-title" className="hero-name">
            {splitWords(meta.name).map((word, i, all) => (
              <span key={`${word}-${i}`}>
                <span className="hero-word">
                  <span className="hero-word-inner">{word}</span>
                </span>
                {i < all.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <RoleRotator />

          <p className="hero-lede">{meta.tagline}</p>

          <div className="hero-ctas">
            <div className="hero-cta">
              <button
                ref={primaryRef}
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => scrollToSection("projects")}
              >
                View my work
                <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
              </button>
            </div>
            <div className="hero-cta">
              <a
                href="/resume.pdf"
                download="Zaigham_Resume.pdf"
                className="btn btn-secondary btn-lg"
                onClick={() => showAchievement("Resume downloaded", "Thanks for checking out my work!")}
              >
                <Download size={17} aria-hidden="true" />
                Download CV
              </a>
            </div>
            <div className="hero-cta">
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => scrollToSection("contact")}>
                Get in touch
              </button>
            </div>
          </div>

          <div className="hero-meta">
            <div className="hero-socials">
              <a href={meta.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub (opens in a new tab)">
                <Github size={18} aria-hidden="true" />
              </a>
              <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn (opens in a new tab)">
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </div>
            <ul className="hero-meta-list">
              <li>
                <MapPin size={16} aria-hidden="true" />
                {meta.location}
              </li>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${meta.email}`}>{meta.email}</a>
              </li>
            </ul>
          </div>

          <ul className="hero-stats" aria-label="At a glance">
            {stats.map((s) => (
              <li key={s.label} className="hero-stat">
                <span
                  className="hero-stat-value"
                  data-count={"noCount" in s && s.noCount ? undefined : s.value}
                  data-suffix={s.suffix}
                >
                  {`${s.value}${s.suffix}`}
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ProfilePhoto />
      </div>

      <button type="button" className="hero-cue" aria-label="Scroll to the About section" onClick={() => scrollToSection("about")}>
        <span className="hero-cue-mouse" aria-hidden="true" />
      </button>
    </section>
  );
}
