// import { useRef, useEffect } from "react";
// import { skills } from "@/data/portfolio";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ReactBitsText from "@/components/ui/ReactBitsText";

// gsap.registerPlugin(ScrollTrigger);

// export default function Skills() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!sectionRef.current) return;

//     const ctx = gsap.context(() => {
//       const title = headerRef.current?.querySelector("h2");
//       const description = headerRef.current?.querySelector("p:last-child");

//       // Word-lift style heading reveal
//       gsap.from(title, {
//         scrollTrigger: {
//           trigger: headerRef.current,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//         y: 24,
//         rotationX: -55,
//         transformOrigin: "50% 100%",
//         duration: 0.8,
//         ease: "power3.out",
//       });
//       gsap.from(description, { scrollTrigger: { trigger: headerRef.current, start: "top 80%" }, y: 18, duration: 0.7, delay: 0.15, ease: "power2.out" });

//       // Cards stagger
//       const cards = gridRef.current?.querySelectorAll(".skill-group");
//       if (cards) {
//         gsap.from(cards, {
//           scrollTrigger: {
//             trigger: gridRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           },
//           y: 50,
//           stagger: 0.1,
//           duration: 0.8,
//           ease: "power3.out",
//         });
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} id="skills" className="section section-skills">
//       <div className="container-custom">
//         {/* Header */}
//         <div ref={headerRef} className="max-w-3xl mb-16">
//           <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
//             Technical Expertise
//           </p>
//           <ReactBitsText text="Skills & Technologies" variant="fold" className="text-heading mb-6" />
//           <p className="text-body-large">
//             A comprehensive toolkit for building modern, scalable applications across the full stack.
//           </p>
//         </div>

//         {/* Skills Grid */}
//         <div ref={gridRef} className="grid-minimal">
//           {skills.map((group) => (
//             <div
//               key={group.category}
//               className="skill-group card-minimal"
//             >
//               {/* Category */}
//               <h3 
//                 className="text-xl font-semibold mb-6"
//                 style={{ color: "var(--text-primary)" }}
//               >
//                 {group.category}
//               </h3>

//               {/* Skills */}
//               <div className="flex flex-wrap gap-2">
//                 {group.items.map((skill) => (
//                   <span
//                     key={skill}
//                     className="skill-chip px-3 py-1.5 text-sm border rounded-full transition-colors"
//                     style={{
//                       borderColor: "var(--border-color)",
//                       color: "var(--text-secondary)",
//                     }}
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="container-custom mt-24">
//         <div className="line" />
//       </div>
//     </section>
//   );
// }


import { useRef, useEffect } from "react";
import {
  Code2,
  Server,
  BrainCircuit,
  LayoutGrid,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skills } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactBitsText from "@/components/ui/ReactBitsText";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  Backend: Server,
  "AI / Data": BrainCircuit,
  Frontend: LayoutGrid,
  Databases: Database,
  Tools: Wrench,
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const title = headerRef.current?.querySelector("h2");
      const description = headerRef.current?.querySelector("p:last-child");

      gsap.from(title, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 24,
        rotationX: -55,
        transformOrigin: "50% 100%",
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(description, {
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        y: 18,
        duration: 0.7,
        delay: 0.15,
        ease: "power2.out",
      });

      const cards = gridRef.current?.querySelectorAll(".skill-group");
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section section-skills">
      <div className="container-custom">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <p className="text-caption mb-4" style={{ color: "var(--accent)" }}>
            Technical Expertise
          </p>
          <ReactBitsText text="Skills & Technologies" variant="fold" className="text-heading mb-6" />
          <p className="text-body-large">
            A comprehensive toolkit for building modern, scalable applications across the full stack.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid-minimal">
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Code2;
            return (
              <div key={group.category} className="skill-group card-minimal skill-card">
                <span className="skill-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Category header */}
                <div className="skill-card-header">
                  <div className="skill-card-icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="skill-card-title">{group.category}</h3>
                    <p className="skill-card-count">
                      {group.items.length} {group.items.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="skill-card-chips">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="container-custom mt-24">
        <div className="line" />
      </div>
    </section>
  );
}