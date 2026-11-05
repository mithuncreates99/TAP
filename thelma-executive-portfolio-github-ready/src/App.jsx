import React from 'react';
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Camera,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Users,
  Linkedin,
  Check,
} from 'lucide-react';

const EXPERIENCE = [
  {
    company: 'KLA',
    role: 'Automation & Business Process Analyst',
    period: 'Oct 2024 – Mar 2025',
    location: 'Chennai, India',
    summary:
      'Worked with business and technical stakeholders to understand service-process challenges, clarify requirements and support practical process improvements.',
    contributions: [
      'Gathered and documented business and functional requirements',
      'Helped teams bring structure to recurring service issues and follow-up',
      'Used operational information to support review and decision-making',
    ],
  },
  {
    company: 'Stellantis',
    role: 'Asset Manager (IT Infrastructure) & Market Research Analyst',
    period: 'Jun 2023 – Jun 2024',
    location: 'Chennai, India',
    summary:
      'Supported infrastructure operations and research activities, bringing information together for teams and preparing clear reporting for stakeholders.',
    contributions: [
      'Coordinated asset-related requests and issue follow-up with technical teams',
      'Organised research findings and operational information',
      'Prepared reports and presentations to support business discussions',
    ],
  },
  {
    company: 'Bible Tours',
    role: 'Operations Executive — Client & Order Management',
    period: 'Mar 2025 – Present',
    location: 'Chennai, India',
    summary:
      'Coordinates day-to-day client and order operations, working with service partners to keep requests moving and communication clear.',
    contributions: [
      'Manages client requests and order follow-up across service channels',
      'Coordinates with partners on service issues and next steps',
      'Supports dispute handling, escalation and closure',
    ],
  },
];

const STRENGTHS = [
  {
    title: 'Business Analysis',
    description: 'Understanding needs, clarifying requirements and helping teams agree on practical next steps.',
    items: ['Requirements gathering', 'Process documentation', 'Problem analysis', 'Stakeholder communication'],
  },
  {
    title: 'Operations & Coordination',
    description: 'Keeping people, requests and service activities organised from start to finish.',
    items: ['Client and order management', 'Partner coordination', 'Issue follow-up', 'Service delivery'],
  },
  {
    title: 'Research & Reporting',
    description: 'Turning information into clear summaries that support thoughtful decisions.',
    items: ['Market research', 'Information analysis', 'Management reporting', 'Presentation preparation'],
  },
  {
    title: 'Communication & Leadership',
    description: 'Building good working relationships and helping groups work towards shared goals.',
    items: ['Customer communication', 'Cross-team collaboration', 'Event coordination', 'Team leadership'],
  },
];

const CREDENTIALS = [
  { name: 'AI-Powered Business Analyst Professional', issuer: 'IIBA' },
  { name: 'Product & App Management Workshop', issuer: 'IIT Madras · 2023' },
  { name: 'Data Analyst Certification', issuer: 'Besant Technologies · 2024' },
  { name: 'Python Programming', issuer: 'FITA' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#252B2A]">
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-[#F7F4EF]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3 sm:px-8">
          <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="Thelma Agnes Peter, home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#874F42] font-serif text-lg font-bold text-white">T</span>
            <span className="min-w-0">
              <span className="block truncate font-semibold tracking-tight text-[#282B29]">Thelma Agnes Peter</span>
              <span className="block text-[11px] tracking-wide text-[#77756F]">Business Analysis · Operations · Research</span>
            </span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm text-[#5F625D] md:flex">
            <a className="transition hover:text-[#874F42]" href="#experience">Experience</a>
            <a className="transition hover:text-[#874F42]" href="#strengths">Strengths</a>
            <a className="transition hover:text-[#874F42]" href="#education">Education</a>
            <a className="transition hover:text-[#874F42]" href="#recognition">Recognition</a>
            <a className="transition hover:text-[#874F42]" href="#contact">Contact</a>
          </nav>
          <a
            href="./Thelma_Agnes_Peter_CV_ATS.pdf"
            download="Thelma_Agnes_Peter_CV_ATS.pdf"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#B98D79] px-4 py-2 text-xs font-semibold text-[#754538] transition hover:bg-[#EEE4DB]"
          >
            <Download className="h-3.5 w-3.5" /> CV
          </a>
          <nav aria-label="Mobile and tablet navigation" className="grid w-full grid-cols-3 gap-2 text-center text-xs text-[#5F625D] md:hidden">
            <a className="rounded-lg bg-white/70 px-2 py-2.5" href="#experience">Experience</a>
            <a className="rounded-lg bg-white/70 px-2 py-2.5" href="#strengths">Strengths</a>
            <a className="rounded-lg bg-white/70 px-2 py-2.5" href="#education">Education</a>
            <a className="rounded-lg bg-white/70 px-2 py-2.5" href="#recognition">Recognition</a>
            <a className="rounded-lg bg-white/70 px-2 py-2.5" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-6xl space-y-24 px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCC9B9] bg-[#EFE6DD] px-4 py-2 text-xs font-medium text-[#744B3F]">
              <span className="h-2 w-2 rounded-full bg-[#9A6655]" />
              Open to business analysis and operations opportunities
            </div>
            <div className="space-y-4">
              <p className="font-serif text-sm italic tracking-wide text-[#956D5C]">A thoughtful approach to people, processes and information.</p>
              <h1 className="max-w-3xl font-serif text-4xl leading-[1.12] tracking-tight text-[#252B2A] sm:text-6xl">
                Bringing clarity to <span className="text-[#874F42]">complex work</span> and connection to every detail.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#666760] sm:text-lg">
                I’m Thelma, a Business and Research Analyst with experience across business processes, operations, client coordination and reporting. I enjoy understanding what people need, organising the moving parts and helping teams make informed decisions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="./Thelma_Agnes_Peter_CV_ATS.pdf"
                download="Thelma_Agnes_Peter_CV_ATS.pdf"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#874F42] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#704034]"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
              <a
                href="mailto:thelmaagnespeter@gmail.com"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#CFC3B7] bg-white/60 px-6 py-3 text-sm font-semibold text-[#544D46] transition hover:bg-white"
              >
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#E4DCD2] pt-5 text-xs text-[#77756F]">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Chennai, India · Open to relocation</span>
              <a className="inline-flex items-center gap-1.5 transition hover:text-[#874F42]" href="https://linkedin.com/in/thelma-agnes" target="_blank" rel="noreferrer"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-[2rem] border border-[#E3D8CC] bg-[#EFE8DF] p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-serif text-lg italic text-[#75564B]">A few highlights</span>
                <span className="h-10 w-10 rounded-full border border-[#C9B8A8] bg-[#F7F4EF] p-2.5">
                  <Camera className="h-full w-full text-[#874F42]" />
                </span>
              </div>
              <div className="space-y-6">
                <div className="border-b border-[#D9CBBE] pb-5">
                  <p className="font-serif text-5xl text-[#874F42]">3 years</p>
                  <p className="mt-1 text-sm text-[#6B6861]">Professional experience</p>
                </div>
                <div className="border-b border-[#D9CBBE] pb-5">
                  <p className="font-serif text-5xl text-[#874F42]">9+</p>
                  <p className="mt-1 text-sm text-[#6B6861]">MUN press and photojournalism awards</p>
                </div>
                <div>
                  <p className="font-serif text-5xl text-[#874F42]">8.91/10</p>
                  <p className="mt-1 text-sm text-[#6B6861]">B.Tech academic GPA</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-[#D9CBBE] pt-5 text-xs text-[#6B6861]">
                <Award className="h-4 w-4 text-[#874F42]" />
                Business-minded, people-focused, detail-oriented.
              </div>
            </div>
            <div className="absolute -bottom-4 -right-3 -z-10 h-28 w-28 rounded-full bg-[#DCC8B7]/60 blur-2xl" />
          </aside>
        </section>

        <section id="experience" className="scroll-mt-36 space-y-8">
          <div className="flex flex-col justify-between gap-3 border-b border-[#DED6CC] pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#956D5C]">Career experience</p>
              <h2 className="mt-2 font-serif text-3xl text-[#282D2A] sm:text-4xl">Where I’ve contributed</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#77756F]">A high-level overview of my roles and responsibilities. Employer-owned materials and confidential project details are not reproduced.</p>
          </div>
          <div className="space-y-4">
            {EXPERIENCE.map((item, index) => (
              <article key={item.company} className="grid gap-5 rounded-3xl border border-[#E3DBD1] bg-white/75 p-6 shadow-[0_8px_30px_rgba(63,48,37,0.035)] sm:grid-cols-[0.7fr_1.3fr] sm:p-8">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9A7463]">0{index + 1} · {item.period}</p>
                  <h3 className="font-serif text-2xl text-[#2D322F]">{item.company}</h3>
                  <p className="text-sm font-semibold text-[#874F42]">{item.role}</p>
                  <p className="text-xs text-[#8A8982]">{item.location}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm leading-7 text-[#666760]">{item.summary}</p>
                  <ul className="space-y-2">
                    {item.contributions.map((contribution) => (
                      <li key={contribution} className="flex gap-2.5 text-sm leading-6 text-[#555A55]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#9A7463]" /> {contribution}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="strengths" className="scroll-mt-36 space-y-8">
          <div className="border-b border-[#DED6CC] pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#956D5C]">How I work</p>
            <h2 className="mt-2 font-serif text-3xl text-[#282D2A] sm:text-4xl">Professional strengths</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {STRENGTHS.map((item, index) => (
              <article key={item.title} className="rounded-3xl border border-[#E3DBD1] bg-white/70 p-6 sm:p-7">
                <span className="font-serif text-sm italic text-[#A27D6C]">0{index + 1}</span>
                <h3 className="mt-2 font-serif text-2xl text-[#2D322F]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#77756F]">{item.description}</p>
                <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-[#555A55] sm:grid-cols-2">
                  {item.items.map((skill) => <li key={skill} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#A77A68]" />{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="text-xs leading-6 text-[#88857E]">
            Supporting tools: Microsoft Excel, Power BI, SQL and Python.
          </p>
        </section>

        <section id="education" className="scroll-mt-36 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] bg-[#2F3935] p-7 text-[#F7F4EF] sm:p-9">
            <div className="flex items-center gap-3 text-[#D5B7A2]"><GraduationCap className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Education</p></div>
            <h2 className="mt-6 font-serif text-3xl leading-tight">A foundation in business and technology</h2>
            <h3 className="mt-6 text-lg font-semibold">B.Tech — Computer Science & Business Systems</h3>
            <p className="mt-1 text-sm text-[#D4D4CC]">SRM Institute of Science & Technology · 2020–2024</p>
            <p className="mt-5 font-serif text-4xl text-[#D5B7A2]">8.91 / 10</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#D4D4CC]">Academic distinction, with coursework spanning service operations, operations research and project management.</p>
          </div>
          <div className="rounded-[2rem] border border-[#E3DBD1] bg-white/70 p-7 sm:p-9">
            <div className="flex items-center gap-3 text-[#956D5C]"><BriefcaseBusiness className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Certifications & learning</p></div>
            <h2 className="mt-6 font-serif text-3xl text-[#2D322F]">Continued learning</h2>
            <div className="mt-6 divide-y divide-[#E9E1D8]">
              {CREDENTIALS.map((credential) => (
                <div key={credential.name} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                  <p className="text-sm font-semibold text-[#414641]">{credential.name}</p>
                  <p className="text-xs text-[#8A8982]">{credential.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="recognition" className="scroll-mt-36 space-y-8">
          <div className="border-b border-[#DED6CC] pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#956D5C]">Beyond the role</p>
            <h2 className="mt-2 font-serif text-3xl text-[#282D2A] sm:text-4xl">Recognition, photography & leadership</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[2rem] border border-[#DECFC1] bg-[#EFE5DB] p-7 sm:p-9">
              <div className="flex items-center gap-3 text-[#874F42]"><Camera className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Photojournalism</p></div>
              <p className="mt-6 font-serif text-5xl text-[#874F42]">9+ awards</p>
              <h3 className="mt-3 font-serif text-2xl text-[#2D322F]">Stories told through a thoughtful lens.</h3>
              <p className="mt-3 text-sm leading-7 text-[#68665F]">
                Recognised across Model United Nations conferences in Chennai and Bangalore, including Best International Press Photojournalist at SSN University MUN (2023) and an Honorable Mention at Christ University MUN (2022).
              </p>
            </article>
            <article className="rounded-[2rem] border border-[#E3DBD1] bg-white/70 p-7 sm:p-9">
              <div className="flex items-center gap-3 text-[#956D5C]"><Users className="h-5 w-5" /><p className="text-xs font-semibold uppercase tracking-[0.18em]">Leadership</p></div>
              <h3 className="mt-6 font-serif text-2xl text-[#2D322F]">Vice President — Camogenics & Department of CSE</h3>
              <p className="mt-3 text-sm leading-7 text-[#77756F]">
                Progressed through student leadership roles at Camogenics, SRM University’s media body, and served as Vice President of the Department of Computer Science & Engineering. Contributed to inter-college events including Monocle and Texus.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-[#F5F0EA] p-3"><p className="text-[10px] text-[#8A8982]">2021–22</p><p className="mt-1 text-xs font-semibold text-[#555A55]">Head of Admin</p></div>
                <div className="rounded-xl bg-[#F5F0EA] p-3"><p className="text-[10px] text-[#8A8982]">2022–23</p><p className="mt-1 text-xs font-semibold text-[#555A55]">Secretary</p></div>
                <div className="rounded-xl bg-[#EFE5DB] p-3"><p className="text-[10px] text-[#874F42]">2023–24</p><p className="mt-1 text-xs font-semibold text-[#555A55]">Vice President</p></div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer id="contact" className="scroll-mt-24 border-t border-[#DED6CC] bg-[#EDE6DD]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-serif text-2xl text-[#2D322F]">Let’s start a conversation.</p>
            <p className="mt-2 text-sm text-[#77756F]">Business analysis · Operations · Research · Client coordination</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="mailto:thelmaagnespeter@gmail.com" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#874F42] px-5 py-3 font-semibold text-white transition hover:bg-[#704034]"><Mail className="h-4 w-4" /> Email</a>
            <a href="https://linkedin.com/in/thelma-agnes" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CFC3B7] bg-white/70 px-5 py-3 font-semibold text-[#544D46] transition hover:bg-white"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href="./Thelma_Agnes_Peter_CV_ATS.pdf" download="Thelma_Agnes_Peter_CV_ATS.pdf" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CFC3B7] bg-white/70 px-5 py-3 font-semibold text-[#544D46] transition hover:bg-white"><Download className="h-4 w-4" /> CV</a>
          </div>
        </div>
        <div className="border-t border-[#DED6CC] px-5 py-4 text-center text-[11px] text-[#89857E]">© {new Date().getFullYear()} Thelma Agnes Peter</div>
      </footer>
    </div>
  );
}
