/**
 * Site content.
 *
 * Ground rule for this file: every claim is checked against the source code of
 * the repository it describes, not against that repository's own README. An
 * earlier version of this site listed skills and an employment history that the
 * code did not support, and described one project as a working app when it was
 * an unmodified project template. Nothing goes in here that would not survive
 * an interviewer opening the repo mid-conversation.
 */

export const profile = {
  name: "Manish Kumar Soni",
  firstName: "Manish",
  role: "Software Engineer",
  availability: "Open to New Grad 2027 roles & internships",
  tagline:
    "I build systems end to end, and I care about what fails quietly — contracts shared between client and server, correct HTTP semantics, untrusted code that cannot reach a secret, and money arithmetic that does not lose a cent to a float.",
  location: "Bhopal, Madhya Pradesh, India",
  email: "0810sonimanish@gmail.com",
  resumeUrl: "/manish-kumar-soni-cv.pdf",
  resumeName: "Manish-Kumar-Soni-CV.pdf",
  photo: "/profile.jpg",
  initials: "MS",
  /**
   * The scannable stack line in the masthead.
   *
   * Every entry here also appears in `skillGroups` below, so this introduces no
   * new claim — it is the recruiter-facing subset, ordered by how often it shows
   * up on a job requirement sheet rather than by preference.
   */
  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Prisma",
    "Docker",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/Mu0810", handle: "@Mu0810" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sonimanixh",
      handle: "in/sonimanixh",
    },
    { label: "Email", href: "mailto:0810sonimanish@gmail.com", handle: "0810sonimanish@gmail.com" },
  ],
};

/**
 * Concrete, checkable numbers rather than "8+ projects". Each one points at
 * something a reader can go and verify in a repository.
 */
export const stats = [
  {
    value: "25",
    label: "model production schema",
    detail: "PostgreSQL via Prisma, across 9 sequential migrations, in HireFlow",
  },
  {
    value: "66",
    label: "failure paths typed",
    detail: "Every service error mapped to a real status code instead of a blanket 400",
  },
  {
    value: "17",
    label: "test suites in one project",
    detail: "Money and date logic kept pure so it can be asserted directly",
  },
  {
    value: "O(n)",
    label: "from 57,600 checks/frame",
    detail: "Particle-neighbour linking reduced by spatial hashing",
  },
];

export const about = [
  "I'm a final-year B.Tech student at VIT Bhopal, and most of what I know I learned by shipping things and then fixing what broke. I work mainly in TypeScript across Next.js, Node, and PostgreSQL, with a real interest in the parts of a system that are easy to get subtly wrong.",
  "That interest is why my projects tend to include the unglamorous work: a monorepo where client and server share one set of Zod schemas so a payload change is a type error rather than a runtime 400; an API where a permissions failure returns 403 instead of the same 400 as a typo; pricing arithmetic in integer cents because floating point quietly undercharges by a dollar.",
  "I also like writing the algorithm rather than importing it — a chess engine with its own negamax search, a 3D platformer with no physics library, a GLSL shader written by hand. It is the fastest way I know to actually understand something.",
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5 / CSS3", "GLSL", "Bash"],
  },
  {
    title: "Frontend",
    items: [
      "React 19",
      "Next.js 16",
      "App Router",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
      "Zod",
      "Three.js",
      "WebGL",
      "Vite",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express 5",
      "FastAPI",
      "REST API design",
      "Prisma 7",
      "JWT access / refresh",
      "OAuth 2.0 (Passport)",
      "Stripe",
    ],
  },
  {
    title: "Data & Infrastructure",
    items: [
      "PostgreSQL",
      "Redis",
      "SQLite / libSQL",
      "Schema design & migrations",
      "Docker Compose",
      "GitHub Actions",
      "Turborepo",
      "pnpm workspaces",
      "Vercel",
    ],
  },
  {
    title: "AI integration",
    items: [
      "OpenAI SDK",
      "Groq",
      "OpenRouter",
      "Provider abstraction",
      "Rule-based fallback",
      "Structured output",
    ],
  },
  {
    // Not "How I work": that is section 04's heading, and having the same name
    // label a skills row directly above it read as the same thing twice.
    title: "Testing & practice",
    items: [
      "Integration testing",
      "Vitest / Supertest / Pytest",
      "Typed error handling",
      "Process isolation for untrusted code",
      "Accessibility & reduced motion",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  /** The single most interesting engineering detail — shown as a pull-quote. */
  highlight?: string;
  tags: string[];
  year: string;
  href: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "HireFlow",
    description:
      "A recruitment and applicant-tracking platform: companies post jobs, screen applicants, run coding tests, schedule interviews, and message candidates. Built as a Turborepo monorepo where a Next.js client, an Express API, and a shared package all consume one set of Zod schemas.",
    highlight:
      "Candidate code used to be graded in-process with Node's vm, where a one-line escape reads the database URL and both JWT signing secrets. I moved execution to an environment-stripped, heap-capped child process — then proved it by running the escape and asserting the recovered environment was empty.",
    tags: ["TypeScript", "Next.js 16", "Express 5", "PostgreSQL", "Prisma", "Docker", "Turborepo"],
    year: "2026",
    href: "https://github.com/Mu0810/hireflow-ai",
    featured: true,
  },
  {
    title: "BuyWise AI",
    description:
      "An AI shopping assistant that turns a plain-language query into value-scored recommendations compared across retailers, asking clarifying questions before it answers rather than returning a raw result list.",
    highlight:
      "A provider abstraction lets new retailers plug in without touching business logic, and the same shape is mirrored for AI: an OpenAI engine sits beside a rule-based fallback, so the product stays fully usable with no API key configured.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Prisma", "Redis", "Stripe", "OpenAI"],
    year: "2026",
    href: "https://github.com/Mu0810/buywise-ai",
    featured: true,
  },
  {
    title: "Healthvibe",
    description:
      "A nutrition tracker built around Energy Availability — intake minus exercise burn, over fat-free mass — rather than calories alone. Log a meal by photograph and an image model estimates its macros with a confidence rating.",
    highlight:
      "BMI, Mifflin-St Jeor BMR, TDEE and macro targets are pure functions with no React and no I/O, so the health maths is unit-tested directly. The LLM client walks an ordered fallback chain, because a free tier returns 429 unpredictably.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "libSQL / Turso", "OpenRouter"],
    year: "2026",
    href: "https://github.com/Mu0810/health-webapp",
    featured: true,
  },
  {
    title: "Online Chess",
    description:
      "A complete chess engine and AI opponent written from scratch in vanilla JavaScript — legal move generation, castling, en passant, promotion, and every draw condition including threefold repetition and insufficient material.",
    highlight:
      "The opponent is a negamax search with alpha-beta pruning, MVV-LVA move ordering and a quiescence extension, exposed at four levels that vary search depth, aspiration window and evaluation noise. Zero runtime dependencies, no build step.",
    tags: ["JavaScript", "Algorithms", "Web Audio", "Zero dependencies"],
    year: "2026",
    href: "https://github.com/Mu0810/chess",
    featured: true,
  },
  {
    title: "Echo Runner",
    description:
      "A 2D puzzle-platformer for Android running on its own engine. Each thirty-second take is recorded and replayed as an Echo, so a puzzle is solved by choreographing several versions of yourself — one holding a switch while an earlier one crosses the door it opens. Levels are data-driven JSON; 12,700 lines of Kotlin with 57 unit tests.",
    highlight:
      "An Echo replays resolved state, not input. Replaying keystrokes drifts the moment anything else in the world differs, so each take records the positions the simulation actually produced and the ghost is kinematic — which is what makes a thirty-second replay identical on every run. The loop is a hand-written 60 Hz fixed timestep drawing to a Compose Canvas: no game engine, and determinism is a property of the design rather than something patched in afterwards.",
    tags: ["Kotlin", "Jetpack Compose", "Android", "Custom game loop", "Determinism"],
    year: "2026",
    href: "https://github.com/Mu0810/echo-runner",
    featured: true,
  },
  {
    title: "DON'T LOOK AWAY",
    description:
      "A first-person psychological horror game for Android in Unity 6.3. The mechanic is observation — what you look at, and what you look away from, changes the world: an entity advances only while unobserved, and a door can be held shut by being watched. Every asset is generated in code, with no imported art: parametric geometry, procedural textures, synthesised audio. 56,000 lines of C#.",
    highlight:
      "Observation is modelled as a general source-to-target relation rather than a player-only check, so an entity can observe a door exactly as the player observes the entity — which is the only reason entity-observes-object puzzles are expressible at all. Occlusion raycasts are throttled to 10 Hz and staggered across entities so the cost does not scale with the cast, and observed/unobserved durations are centralised in one snapshot instead of being recomputed by each system that needs them.",
    tags: ["C#", "Unity 6.3", "URP Forward+", "Android", "Procedural assets"],
    year: "2026",
    href: "https://github.com/Mu0810/dont-look-away",
    featured: true,
  },
  {
    title: "Rocket Recruiters Portal",
    description:
      "A candidate application portal and hiring pipeline for a recruitment agency: a multi-step application with CV upload on the front, and an admin dashboard behind it to filter, search, annotate and move candidates through a status pipeline, with CSV export and an email notification on every submission.",
    highlight:
      "Zero npm dependencies — not as a stunt, but because the standard library covers it: node:sqlite for storage, node:http for the server, built-in fetch and FormData for uploads, and a hand-written SMTP client against RFC 5321 handling implicit TLS, STARTTLS and both AUTH modes rather than pulling in a mailer. Candidate answers live in a single JSON column, so adding a question to the schema needs no migration; only the fields actually filtered, sorted or searched on get their own column.",
    tags: ["Node.js", "node:sqlite", "Zero dependencies", "SMTP", "Google Apps Script"],
    year: "2026",
    href: "https://github.com/Mu0810/rr",
    featured: true,
  },
  {
    title: "Meridian Reserve",
    description:
      "A luxury hotel booking flow — browse suites, pick dates and guests, get a priced quote, receive a retrievable confirmation code. No backend, no router, no component library.",
    highlight:
      "Money runs in integer cents because 850 × 1.15 evaluates to 977.4999… and rounds down, silently undercharging by a dollar on a real suite rate. Dates are anchored to noon UTC so a timezone offset cannot shift a day and corrupt the night count. 17 test suites.",
    tags: ["React 19", "TypeScript", "Vite", "Testing"],
    year: "2026",
    href: "https://github.com/Mu0810/demo",
  },
  {
    title: "Super Plumber 3D",
    description:
      "A 3D collect-a-thon platformer built on Three.js across 16 ES modules — with no art assets and no physics engine. Every piece of level geometry is generated procedurally, collision detection and resolution are hand-written, and all sound is synthesised at runtime.",
    tags: ["Three.js", "JavaScript", "Procedural generation", "Web Audio"],
    year: "2026",
    href: "https://github.com/Mu0810/adss",
    demo: "https://adss-xi.vercel.app",
  },
  {
    title: "WebGL Aurora",
    description:
      "An interactive showcase built from three files. A hand-written GLSL fragment shader paints domain-warped, five-octave value noise per pixel per frame, and a 240-particle field links neighbours in real time.",
    highlight:
      "Naive neighbour linking is 57,600 distance checks every frame at 240 particles. A spatial hash reduces it to O(n), with line draws batched into opacity buckets.",
    tags: ["GLSL", "WebGL", "Canvas", "Performance"],
    year: "2026",
    href: "https://github.com/Mu0810/robot",
    demo: "https://robot-ecru-nu.vercel.app",
  },
  {
    title: "AI Research Agent",
    description:
      "A FastAPI agent service pairing Groq inference with a small toolset — web search, HTML scraping and PDF parsing — rate-limited with SlowAPI and backed by PostgreSQL.",
    tags: ["Python", "FastAPI", "Groq", "PostgreSQL"],
    year: "2026",
    href: "https://github.com/Mu0810/AI-agent",
    demo: "https://ai-agent-khaki-psi.vercel.app",
  },
  {
    title: "SQLi Lab & Field Notes",
    description:
      "Two defence-first security learning platforms: one covering advanced injection across SQL, XXE, XPath, LDAP and NoSQL, the other the ethical-hacking lifecycle. Both zero-dependency single-page apps.",
    highlight:
      "The query-boundary simulator runs entirely in the browser with no database connection — there is deliberately nothing to attack, because a teaching tool should not ship a live target.",
    tags: ["Security", "JavaScript", "Education", "Zero dependencies"],
    year: "2026",
    href: "https://github.com/Mu0810/web-application-sql",
    demo: "https://web-application-sql.vercel.app",
  },
  {
    title: "Diwan-e-Jaun",
    description:
      "An animated web edition of the Urdu poet Jaun Elia's collected work in Devanagari — 169 pieces across 2,436 lines.",
    highlight:
      "The source PDF used a legacy font with no Unicode mapping, so दिल arrived as ददि. Matras and nuqtas were restored programmatically without changing a single word, and the passages too corrupted to recover honestly are flagged as missing rather than invented.",
    tags: ["JavaScript", "Text processing", "Typography"],
    year: "2026",
    href: "https://github.com/Mu0810/sher",
    demo: "https://sher-flax.vercel.app",
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  detail: string;
};

export const education: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science and Engineering",
    institution: "VIT Bhopal University",
    period: "2023 — 2027",
    detail:
      "Final year. Coursework alongside self-directed work across full-stack development, systems, algorithms and applied AI — most of it visible on GitHub.",
  },
];

/**
 * Short, honest notes on engineering practice. These replace the employment
 * timeline the previous version of this site carried, which described freelance
 * work that is not evidenced anywhere in the repositories.
 */
export const principles = [
  {
    title: "Share the contract, not just the types",
    body: "In HireFlow the Zod schemas the API validates against are the same ones the web client compiles against. A change to a payload shape becomes a type error on both sides instead of a 400 discovered in production.",
  },
  {
    title: "Say what actually went wrong",
    body: "Every service failure used to return 400, so a permissions problem and a malformed body were indistinguishable. All 66 paths now carry a real status — 401, 403, 404, 409 — and unmatched routes return JSON rather than an HTML error page.",
  },
  {
    title: "Assume the sandbox leaks",
    body: "Node's vm is not a security boundary. Rather than trusting it, candidate code now runs in a separate process with no environment, a capped heap and a hard timeout — and the test suite executes a real escape to prove there is nothing left to steal.",
  },
  {
    title: "Test the part that is quietly wrong",
    body: "Money in integer cents, dates anchored to noon UTC, availability from a stable hash rather than a random roll. These are the bugs that never throw, so they are the ones worth pinning with tests.",
  },
];
