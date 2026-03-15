import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ogDir = join(__dirname, '..', 'public', 'images', 'og');

const width = 1200;
const height = 630;

// Shared SVG parts
const defs = `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="50%" stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#16213e"/>
    </linearGradient>
    <radialGradient id="glowCyan" cx="35%" cy="40%" r="35%">
      <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowViolet" cx="70%" cy="65%" r="30%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>`;

const background = `
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glowCyan)"/>
  <rect width="${width}" height="${height}" fill="url(#glowViolet)"/>`;

const particles = `
  <circle cx="180" cy="120" r="2" fill="#00d4ff" opacity="0.4"/>
  <circle cx="350" cy="80" r="1.5" fill="#7c3aed" opacity="0.5"/>
  <circle cx="520" cy="150" r="1" fill="#00d4ff" opacity="0.3"/>
  <circle cx="700" cy="90" r="2.5" fill="#7c3aed" opacity="0.3"/>
  <circle cx="900" cy="130" r="1.5" fill="#00d4ff" opacity="0.4"/>
  <circle cx="1050" cy="100" r="2" fill="#ff6b35" opacity="0.3"/>
  <circle cx="150" cy="450" r="1.5" fill="#7c3aed" opacity="0.3"/>
  <circle cx="400" cy="500" r="2" fill="#00d4ff" opacity="0.3"/>
  <circle cx="650" cy="530" r="1" fill="#7c3aed" opacity="0.4"/>
  <circle cx="850" cy="480" r="2" fill="#00d4ff" opacity="0.25"/>
  <circle cx="1000" cy="520" r="1.5" fill="#ff6b35" opacity="0.3"/>
  <circle cx="1100" cy="460" r="1" fill="#7c3aed" opacity="0.35"/>
  <circle cx="250" cy="300" r="1" fill="#00d4ff" opacity="0.2"/>
  <circle cx="950" cy="280" r="1.5" fill="#7c3aed" opacity="0.2"/>`;

const footer = `
  <rect x="80" y="470" width="120" height="3" rx="1.5" fill="url(#accentLine)"/>
  <text x="80" y="540" font-family="ui-monospace, monospace" font-size="15" fill="#64748b">fabiobacchini.com</text>`;

function makeSvg({ eyebrow, eyebrowWidth, title, subtitle, affiliations }) {
  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  ${defs}
  ${background}
  ${particles}

  <!-- Eyebrow pill -->
  <rect x="80" y="190" width="${eyebrowWidth}" height="32" rx="16" fill="#00d4ff" fill-opacity="0.08" stroke="#00d4ff" stroke-opacity="0.25" stroke-width="1"/>
  <circle cx="100" cy="206" r="4" fill="#00d4ff" opacity="0.8"/>
  <text x="115" y="212" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#00d4ff" letter-spacing="1.5">${eyebrow}</text>

  <!-- Title -->
  <text x="80" y="300" font-family="system-ui, sans-serif" font-size="72" font-weight="700" fill="#e2e8f0">${title}</text>

  <!-- Subtitle -->
  <text x="80" y="355" font-family="system-ui, sans-serif" font-size="26" font-weight="400" fill="#94a3b8">${subtitle}</text>

  <!-- Affiliations -->
  <text x="80" y="400" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="#64748b">${affiliations}</text>

  ${footer}
</svg>`;
}

const pages = [
  {
    name: 'default',
    eyebrow: 'ASTROPHYSICAL PLASMA PHYSICS',
    eyebrowWidth: 280,
    title: 'Fabio Bacchini',
    subtitle: 'Assistant Professor &amp; Research Scientist',
    affiliations: 'KU Leuven  ·  BIRA-IASB',
  },
  {
    name: 'research',
    eyebrow: 'RESEARCH',
    eyebrowWidth: 140,
    title: 'Fabio Bacchini',
    subtitle: 'Plasma Astrophysics, Simulations &amp; HPC',
    affiliations: 'Current projects, team members, and academic profile',
  },
  {
    name: 'publications',
    eyebrow: 'PUBLICATIONS',
    eyebrowWidth: 160,
    title: 'Fabio Bacchini',
    subtitle: 'Peer-reviewed Papers in Astrophysics',
    affiliations: 'Plasma physics, particle-in-cell methods, and computational science',
  },
  {
    name: 'contact',
    eyebrow: 'CONTACT',
    eyebrowWidth: 130,
    title: 'Fabio Bacchini',
    subtitle: 'KU Leuven &amp; BIRA-IASB',
    affiliations: 'Leuven, Belgium  ·  Brussels, Belgium',
  },
];

for (const page of pages) {
  const svg = makeSvg(page);
  const outPath = join(ogDir, `${page.name}.png`);
  await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toFile(outPath);
  console.log(`OG image generated: ${outPath}`);
}