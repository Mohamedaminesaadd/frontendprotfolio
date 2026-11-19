/*
 * Project content — every statement below was checked against the
 * repository source code on GitHub (github.com/Mohamedaminesaadd)
 * or the HPIS internship report. Nothing planned is listed as built.
 * Kept deliberately short: one sentence + at most 3 bullets.
 */

export type ProjectStatus = 'completed' | 'in-progress' | 'learning';

export type ProjectGroup = 'current' | 'featured' | 'other' | 'learning';

export type ProjectTone = 'red' | 'green' | 'orange' | 'purple' | 'navy';

export interface ProjectVideo {
  src: string;
  title: string;
  caption: string;
  width: number;
  height: number;
}

export interface RoadmapStep {
  label: string;
  done: boolean;
}

export interface Project {
  id: string;
  group: ProjectGroup;
  tone: ProjectTone;

  /** Code-window header, as in the original cards. */
  fileName: string;
  fileIcon: string;

  title: string;
  context?: string;
  status: ProjectStatus;
  statusLabel: string;

  summary: string;

  /** What is actually implemented (short). */
  highlights?: string[];

  /** Future objectives — shown separately, never as done. */
  planned?: string[];

  /** Phase progress bar (EVA-Guard), following the project's own docs. */
  roadmap?: RoadmapStep[];

  tags: string[];
  codeUrl: string;
  video?: ProjectVideo;
}


const GH = 'https://github.com/Mohamedaminesaadd';


export const PROJECTS: Project[] = [

  /* ---------------- CURRENTLY WORKING ON ---------------- */

  {
    id: 'eva-guard',
    group: 'current',
    tone: 'orange',
    fileName: 'monitoring-rust/src/main.rs',
    fileIcon: 'simple-icons:rust',
    title: 'EVA-Guard',
    context: 'Ethereum node security monitoring',
    status: 'in-progress',
    statusLabel: 'In progress',
    summary:
      'Detects and investigates attacks on Ethereum nodes. Phase 1, the Rust monitoring engine, is built.',
    highlights: [
      'Geth JSON-RPC client (Rust, Tokio)',
      '5 collectors: chain, P2P, RPC, network, system',
      'Scheduled snapshots stored as JSON Lines',
      'Tested against a local Geth node'
    ],
    planned: [
      'Anomaly detection',
      'LLM-generated attack hypotheses',
      'Multi-evidence attack confirmation'
    ],
    roadmap: [
      { label: 'Monitoring', done: true },
      { label: 'Anomaly detection', done: false },
      { label: 'Attack hypotheses', done: false },
      { label: 'Confirmation', done: false }
    ],
    tags: ['Rust', 'Tokio', 'Geth', 'Ethereum'],
    codeUrl: `${GH}/EVA-Guard_Project`
  },


  /* ---------------- FEATURED ---------------- */

  {
    id: 'hpis',
    group: 'featured',
    tone: 'purple',
    fileName: 'hpis/backend/main.py',
    fileIcon: 'mdi:heart-pulse',
    title: 'HPIS',
    context: 'Internship project · 2025–2026',
    status: 'completed',
    statusLabel: 'Completed',
    summary:
      'ESP32 wearable and distributed AI backend for athlete stress detection.',
    highlights: [
      'Live ECG streamed over WebSocket',
      'Kafka · RabbitMQ · Cassandra · Redis pipeline',
      'XGBoost stress model (WESAD) served by FastAPI'
    ],
    tags: ['ESP32', 'FastAPI', 'XGBoost', 'Kafka', 'Docker', 'Angular'],
    codeUrl: `${GH}/HIPS`
  },

  {
    id: 'fitness',
    group: 'featured',
    tone: 'navy',
    fileName: 'ai-fitness-coach/main_coach.py',
    fileIcon: 'mdi:run',
    title: 'AI Fitness Coach',
    context: 'Computer vision',
    status: 'completed',
    statusLabel: 'Completed',
    summary:
      'Webcam coach that counts reps and corrects posture in real time.',
    highlights: [
      'MediaPipe pose tracking',
      'Squats, push-ups, leg raises, bridges',
      'Fuzzy-logic scoring with voice feedback'
    ],
    tags: ['Python', 'OpenCV', 'MediaPipe', 'scikit-fuzzy'],
    codeUrl: `${GH}/AI-Fitness-Coach-Setup-Dependencies`
  },

  {
    id: 'pv-platform',
    group: 'featured',
    tone: 'red',
    fileName: 'pv-manager/Frontend/src/app',
    fileIcon: 'mdi:solar-panel',
    title: 'Photovoltaic Management Platform',
    context: 'Web platform',
    status: 'completed',
    statusLabel: 'Completed',
    summary:
      'Manages solar installation projects, tasks and technician teams.',
    highlights: [
      'Role-based spaces with JWT auth',
      'Dashboard, Gantt planning, task tracking',
      'XGBoost task-duration prediction'
    ],
    tags: ['Angular', 'Node.js', 'Express', 'MongoDB', 'FastAPI', 'XGBoost'],
    codeUrl: `${GH}/platefome-de-gestion-de-travaill-dans-les-project-photopholtiaque`,
    video: {
      src: 'media/pv/demo.mp4',
      title: 'Project Demonstration',
      caption: 'No audio · dashboard, projects, tasks, Gantt, technician view',
      width: 1440,
      height: 670
    }
  },


  /* ---------------- OTHER TECHNICAL PROJECTS ---------------- */

  {
    id: 'twitter',
    group: 'other',
    tone: 'purple',
    fileName: 'hadoop/mapper.py',
    fileIcon: 'simple-icons:apachehadoop',
    title: 'Big Data Twitter Analysis',
    status: 'completed',
    statusLabel: 'Completed',
    summary: 'Hashtag trends from scraped tweets, processed with MapReduce on a 3-node Hadoop cluster.',
    tags: ['Hadoop', 'Python', 'Flask', 'Angular'],
    codeUrl: `${GH}/Big-Data-Twitter-Analysis-System-using-Hadoop`
  },

  {
    id: 'invoice',
    group: 'other',
    tone: 'red',
    fileName: 'facture_data/main.py',
    fileIcon: 'mdi:file-document-outline',
    title: 'Invoice Data Extraction AI',
    status: 'completed',
    statusLabel: 'Completed',
    summary: 'Extracts invoice fields with Tesseract OCR and the Donut transformer.',
    tags: ['Python', 'Tesseract', 'Donut', 'Tkinter'],
    codeUrl: `${GH}/facture_data`
  },

  {
    id: 'websocket',
    group: 'other',
    tone: 'navy',
    fileName: 'src/protocol/websocket.py',
    fileIcon: 'mdi:access-point-network',
    title: 'WebSocket from Scratch',
    status: 'completed',
    statusLabel: 'Completed',
    summary: 'The WebSocket protocol implemented on raw Python sockets, with tests.',
    tags: ['Python', 'Sockets', 'unittest'],
    codeUrl: `${GH}/web-socket-from-scratch`
  },


  /* ---------------- RESEARCH & LEARNING ---------------- */

  {
    id: 'llm-scratch',
    group: 'learning',
    tone: 'purple',
    fileName: 'lab28_mini_gpt.py',
    fileIcon: 'mdi:brain',
    title: 'LLM From Scratch',
    status: 'learning',
    statusLabel: 'Learning',
    summary: 'A GPT-style Transformer built step by step in PyTorch.',
    tags: ['PyTorch', 'Transformers'],
    codeUrl: `${GH}/LLm-from-scratch`
  },

  {
    id: 'blockchain-lab',
    group: 'learning',
    tone: 'orange',
    fileName: 'bitcoin_core.md',
    fileIcon: 'mdi:link-variant',
    title: 'Blockchain Laboratory',
    status: 'learning',
    statusLabel: 'Ongoing',
    summary: 'Cryptography, proof-of-work and Bitcoin regtest labs, moving on to Ethereum.',
    tags: ['Bitcoin Core', 'Ethereum'],
    codeUrl: `${GH}/blolkchain_labortoriy`
  },

  {
    id: 'agent-lab',
    group: 'learning',
    tone: 'red',
    fileName: 'task_19_supervisor.py',
    fileIcon: 'mdi:robot-outline',
    title: 'AI Agents Lab',
    status: 'learning',
    statusLabel: 'Learning',
    summary: 'LangGraph agents: tools, memory, supervisors, reflection.',
    tags: ['LangGraph', 'LangChain'],
    codeUrl: `${GH}/agent_lab`
  },

  {
    id: 'pytorch-notebook',
    group: 'learning',
    tone: 'navy',
    fileName: 'pytorch.ipynb',
    fileIcon: 'simple-icons:pytorch',
    title: 'PyTorch Notebook',
    status: 'learning',
    statusLabel: 'Learning',
    summary: 'PyTorch fundamentals, from autograd to Transformers.',
    tags: ['PyTorch', 'Jupyter'],
    codeUrl: `${GH}/PyTorch-Learning-Notebook`
  }

];
