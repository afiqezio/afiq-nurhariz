import { ProjectDetails } from "../projectTypes";

export const hermesProject: ProjectDetails = {
  images: [
    {
      url: "/assets/projects/Hermes/pipeline.svg",
      alt: "The nine steps from a Telegram request to a running app",
      caption: "A request, start to finish: plan, approve, build, check, deploy, prove, watch"
    },
    {
      url: "/assets/projects/Hermes/architecture.svg",
      alt: "Two-seam architecture: an orchestration loop and a separate engineering subprocess",
      caption: "Two seams: a cheap model runs the conversation, Claude Code does the engineering"
    }
  ],

  overview:
    "A self-hosted software factory run over Telegram. I message a bot, it plans the work, waits for my yes, has Claude Code build it, checks the result itself, deploys a container and tells me what actually happened. It runs on Hermes Agent, Nous Research's open-source agent runtime, which I configured and operate on a small homelab VM. It replaced a 6,400-line Python bot I had written myself.",

  features: [
    "Telegram is the only interface: no web UI and no inbound port",
    "Two seams: a low-cost model runs the conversation while Claude Code does the engineering as a subprocess",
    "Plan gate: planning runs in a read-only mode, then stops until I approve the plan",
    "Quality gate: a deterministic check script decides whether a build may deploy, by exit code",
    "Every app ships as a Docker container with a healthcheck, a memory limit and its own git repo",
    "After deploy, one real user flow is exercised over HTTP before anything is called done",
    "A watchdog with no LLM in it checks every container every five minutes and alerts once per outage",
    "Configuration lives in git behind symlinks, so a change the agent makes to itself shows up in a diff"
  ],

  challenges: [
    {
      title: "Paying for the loop",
      description:
        "A Claude subscription cannot fund a third-party agent loop, so the design is split in two. A per-token model handles routing and chat, and the long agentic builds stay inside Claude Code, which the subscription does cover."
    },
    {
      title: "Keeping a cheap model away from the code",
      description:
        "The routing model once edited files 23 times on a single task instead of delegating. Asking it not to was not enough, so the file-writing tools were removed from it altogether."
    },
    {
      title: "An agent that grades its own work",
      description:
        "The agent that writes the code never decides whether it passes. A check script runs build, tests and standards inside a container, and a timeout or crash counts as a failure, never as a pass."
    },
    {
      title: "A healthy container is not a working app",
      description:
        "An early deploy stopped at a green healthcheck and shipped features that arrived inert. Deploys now have to prove one real user flow, and roll back if it fails."
    }
  ],

  improvements: [],

  duration: "Since Aug 2026",

  caseStudy: {
    problem:
      "An agent that plans, builds and deploys on its own has to be held to rules it cannot talk its way around.",
    challenge:
      "The whole system runs on one 8 GB VM, and a Claude subscription cannot fund a third-party agent loop, so the conversation and the engineering had to be paid for separately.",
    solution:
      "The controls are structural instead of polite requests. Planning runs in a mode that cannot write to disk. The orchestrator has no file tools. Dangerous shell commands need manual approval. A deploy only happens when the check script exits cleanly.",
    results: [
      "Shipped a photo and video library, a one-page portfolio and a shared Postgres, and keeps a job board with resume matching running",
      "Asked to redeploy urgently on top of a broken check, it ran the gate, refused, and left zero containers running",
      "The watchdog has run more than 18,000 times with no LLM in it",
      "Replaced 6,400 lines of home-grown bot code with configuration on an open-source runtime"
    ],
    techStack: [
      "Hermes Agent",
      "Claude Code",
      "DeepSeek",
      "Docker",
      "Telegram Bot API",
      "systemd",
      "Proxmox",
      "PostgreSQL",
      "MCP"
    ]
  }
};
