import fs from 'fs';
import path from 'path';

const years = [];
for (let y = 2021; y <= 2033; y++) years.push(y);

// Segment definitions (flat, single-level children)
const segments = {
  'By Simulation Channel': [
    ['Email Phishing', 0.42],
    ['SMS Phishing (Smishing)', 0.16],
    ['Voice Phishing (Vishing)', 0.10],
    ['Collaboration Platform Phishing (Teams, Slack, etc.)', 0.14],
    ['Multi-Channel Phishing', 0.18],
  ],
  'By Simulation Sophistication': [
    ['Static / Template-Based Simulation', 0.38],
    ['Contextual / Role-Based Simulation', 0.37],
    ['AI-Generated / Adaptive Simulation', 0.25],
  ],
  'By Platform Category': [
    ['Standalone Phishing Simulation Tools', 0.28],
    ['Security Awareness & Training Platforms (with simulation)', 0.45],
    ['Human Risk Management (HRM) Platforms', 0.27],
  ],
  'By Analytics Maturity': [
    ['Descriptive Analytics (campaign results, click rates)', 0.40],
    ['Behavioral Analytics (user interaction patterns)', 0.34],
    ['Predictive / Risk-Based Analytics (risk scoring, forecasting)', 0.26],
  ],
  'By Deployment Model': [
    ['Cloud-Based (SaaS)', 0.78],
    ['On-Premises', 0.22],
  ],
  'By Organization Size': [
    ['Large Enterprises', 0.62],
    ['Small & Mid-Sized Enterprises', 0.38],
  ],
  'By Industry Vertical': [
    ['BFSI', 0.22],
    ['Healthcare & Life Sciences', 0.16],
    ['IT & Telecom', 0.18],
    ['Government & Defense', 0.15],
    ['Retail & E-commerce', 0.12],
    ['Manufacturing', 0.10],
    ['Others (Energy & Utilities, Education, etc.)', 0.07],
  ],
};

// US value totals (USD Million) — demo curve, base 2026
const valueTotals = {
  2021: 612.5, 2022: 705.3, 2023: 818.7, 2024: 951.4, 2025: 1104.9,
  2026: 1281.8, 2027: 1487.0, 2028: 1724.9, 2029: 2001.8, 2030: 2322.1,
  2031: 2693.6, 2032: 3124.6, 2033: 3624.5,
};
// US volume totals (Thousand seats / users)
const volumeTotals = {
  2021: 18.2, 2022: 20.5, 2023: 23.1, 2024: 26.0, 2025: 29.3,
  2026: 33.0, 2027: 37.2, 2028: 41.9, 2029: 47.2, 2030: 53.2,
  2031: 60.0, 2032: 67.6, 2033: 76.2,
};

const r = (n) => Math.round(n * 10) / 10;

function buildSegments(totals) {
  const out = {};
  for (const [segName, items] of Object.entries(segments)) {
    const seg = {};
    for (const y of years) seg[String(y)] = r(totals[y]);
    // Normalize shares
    const sum = items.reduce((a, [, s]) => a + s, 0);
    for (const [name, share] of items) {
      const child = {};
      for (const y of years) child[String(y)] = r(totals[y] * (share / sum));
      seg[name] = child;
    }
    out[segName] = seg;
  }
  return out;
}

const valueData = { 'U.S.': buildSegments(valueTotals) };
const volumeData = { 'U.S.': buildSegments(volumeTotals) };

const segAnalysis = {
  'Global': Object.fromEntries(
    Object.entries(segments).map(([k, items]) => [
      k,
      Object.fromEntries(items.map(([n]) => [n, {}])),
    ])
  ),
};
segAnalysis['Global']['By Region'] = { 'U.S.': {} };

const dir = path.resolve('public/data');
fs.writeFileSync(path.join(dir, 'value.json'), JSON.stringify(valueData, null, 2));
fs.writeFileSync(path.join(dir, 'volume.json'), JSON.stringify(volumeData, null, 2));
fs.writeFileSync(path.join(dir, 'segmentation_analysis.json'), JSON.stringify(segAnalysis, null, 2));
console.log('Done');
