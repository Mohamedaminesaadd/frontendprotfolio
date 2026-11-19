import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
  SkillsCard,
  Skill
} from '../../shared/skills-card/skills-card';


export interface SkillCategory {
  name: string;
  icon: string;
  tone: string;
  skills: Skill[];
  /** Projects on this page where these skills were applied. */
  usedIn: string[];
}


/*
 * Only technologies backed by the CV or by code in the public
 * repositories are listed here.
 */
@Component({
  selector: 'app-skills',
  standalone: true,

  imports: [
    SkillsCard
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {

  readonly categories: SkillCategory[] = [

    {
      name: 'AI & Machine Learning',
      tone: 'blue',
      icon: 'mdi:brain',
      skills: [
        { name: 'Python', icon: 'simple-icons:python' },
        { name: 'PyTorch', icon: 'simple-icons:pytorch' },
        { name: 'scikit-learn', icon: 'simple-icons:scikitlearn' },
        { name: 'XGBoost', icon: 'mdi:chart-tree' },
        { name: 'TensorFlow', icon: 'simple-icons:tensorflow' },
        { name: 'Pandas · NumPy', icon: 'simple-icons:pandas' },
        { name: 'LangGraph', icon: 'mdi:graph-outline' },
        { name: 'LangChain', icon: 'simple-icons:langchain' }
      ],
      usedIn: ['HPIS', 'Photovoltaic Platform', 'AI Agents Lab']
    },

    {
      name: 'Computer Vision & Deep Learning',
      tone: 'sky',
      icon: 'mdi:eye-outline',
      skills: [
        { name: 'OpenCV', icon: 'simple-icons:opencv' },
        { name: 'MediaPipe', icon: 'mdi:human-handsup' },
        { name: 'CNNs (1D ECG)', icon: 'mdi:layers-triple-outline' },
        { name: 'Transformers (GPT, Donut)', icon: 'simple-icons:huggingface' },
        { name: 'Tesseract OCR', icon: 'mdi:text-recognition' },
        { name: 'Attention & BPE tokenizers', icon: 'mdi:brain' }
      ],
      usedIn: ['AI Fitness Coach', 'Invoice Data Extraction', 'LLM From Scratch', 'HPIS']
    },

    {
      name: 'Cybersecurity',
      tone: 'purple',
      icon: 'mdi:shield-lock-outline',
      skills: [
        { name: 'Node monitoring', icon: 'mdi:monitor-eye' },
        { name: 'Anomaly analysis', icon: 'mdi:chart-bell-curve' },
        { name: 'JWT · bcrypt', icon: 'mdi:key-outline' },
        { name: 'Helmet · rate limiting', icon: 'mdi:shield-check-outline' },
        { name: 'Linux telemetry (/proc)', icon: 'simple-icons:linux' }
      ],
      usedIn: ['EVA-Guard', 'Photovoltaic Platform']
    },

    {
      name: 'Blockchain & Ethereum',
      tone: 'navy',
      icon: 'simple-icons:ethereum',
      skills: [
        { name: 'Ethereum', icon: 'simple-icons:ethereum' },
        { name: 'Geth · Prysm', icon: 'mdi:server-network' },
        { name: 'Foundry · Anvil · Cast', icon: 'mdi:hammer-wrench' },
        { name: 'Bitcoin Core (regtest)', icon: 'simple-icons:bitcoin' },
        { name: 'Signatures & ECC', icon: 'mdi:key-chain-variant' }
      ],
      usedIn: ['EVA-Guard', 'Blockchain Laboratory']
    },

    {
      name: 'Backend Development',
      tone: 'blue',
      icon: 'mdi:server-outline',
      skills: [
        { name: 'FastAPI', icon: 'simple-icons:fastapi' },
        { name: 'Node.js · Express', icon: 'simple-icons:nodedotjs' },
        { name: 'Flask', icon: 'simple-icons:flask' },
        { name: 'REST APIs', icon: 'mdi:api' },
        { name: 'MongoDB', icon: 'simple-icons:mongodb' },
        { name: 'WebSockets', icon: 'mdi:access-point-network' }
      ],
      usedIn: ['HPIS', 'Photovoltaic Platform', 'WebSocket from Scratch']
    },

    {
      name: 'Distributed Systems & Data',
      tone: 'sky',
      icon: 'mdi:lan',
      skills: [
        { name: 'Kafka', icon: 'simple-icons:apachekafka' },
        { name: 'RabbitMQ', icon: 'simple-icons:rabbitmq' },
        { name: 'Cassandra', icon: 'simple-icons:apachecassandra' },
        { name: 'Redis', icon: 'simple-icons:redis' },
        { name: 'Hadoop · HDFS', icon: 'simple-icons:apachehadoop' }
      ],
      usedIn: ['HPIS', 'Big Data Twitter Analysis']
    },

    {
      name: 'Frontend Development',
      tone: 'purple',
      icon: 'mdi:monitor-dashboard',
      skills: [
        { name: 'Angular', icon: 'simple-icons:angular' },
        { name: 'TypeScript', icon: 'simple-icons:typescript' },
        { name: 'Angular Material', icon: 'mdi:material-design' },
        { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
        { name: 'Chart.js', icon: 'simple-icons:chartdotjs' }
      ],
      usedIn: ['Photovoltaic Platform', 'HPIS', 'This portfolio']
    },

    {
      name: 'Programming Languages',
      tone: 'navy',
      icon: 'mdi:code-braces',
      skills: [
        { name: 'Python', icon: 'simple-icons:python' },
        { name: 'Rust', icon: 'simple-icons:rust' },
        { name: 'TypeScript', icon: 'simple-icons:typescript' },
        { name: 'JavaScript', icon: 'simple-icons:javascript' },
        { name: 'C++', icon: 'simple-icons:cplusplus' },
        { name: 'Java', icon: 'mdi:language-java' },
        { name: 'SQL', icon: 'mdi:database-outline' }
      ],
      usedIn: ['EVA-Guard (Rust)', 'HPIS (Python, C++ firmware)']
    },

    {
      name: 'DevOps & Tools',
      tone: 'blue',
      icon: 'mdi:tools',
      skills: [
        { name: 'Docker · Compose', icon: 'simple-icons:docker' },
        { name: 'Linux · SSH', icon: 'simple-icons:linux' },
        { name: 'Git · GitHub', icon: 'simple-icons:github' },
        { name: 'Jupyter', icon: 'simple-icons:jupyter' },
        { name: 'LaTeX', icon: 'simple-icons:latex' }
      ],
      usedIn: ['HPIS', 'EVA-Guard']
    }

  ];

}
