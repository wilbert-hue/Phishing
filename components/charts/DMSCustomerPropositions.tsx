'use client'

import { useState } from 'react'

// Column definitions for each proposition (sourced from
// "Sample Framework_Customer Database_Global Automotive Dealer Management Systems (DMS) Market.xlsx")

type ColGroup = { group: string; color: string; headerColor: string; cols: { key: string; label: string }[] }

// Colors lifted from the source Excel file
const COLORS = {
  sno: '#B3A2C7',          // purple
  customerInfo: '#FDEADA', // light orange
  contact: '#93CDDD',      // cyan
  drivers: '#DBEEF4',      // light cyan
  behaviour: '#E6E0EC',    // light purple
  solution: '#FDEADA',     // light orange (matches Excel)
  cmi: '#DBEEF4',          // light cyan (matches Excel)
}
function shade(hex: string, percent: number): string {
  const h = hex.replace('#', '')
  const num = parseInt(h, 16)
  const amt = Math.round(2.55 * percent)
  const r = Math.max(0, Math.min(255, (num >> 16) + amt))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt))
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt))
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
}

const HEADER = {
  customerInfo: '#F5C9A7',
  contact: '#5BACC4',
  drivers: '#A8D8E4',
  behaviour: '#C9BCD9',
  solution: '#F5C9A7',
  cmi: '#A8D8E4',
}

const G_CUSTOMER_INFO: ColGroup = {
  group: 'Customer Information',
  color: COLORS.customerInfo,
  headerColor: HEADER.customerInfo,
  cols: [
    { key: 'name', label: 'Customer Name / Company Name' },
    { key: 'overview', label: 'Business Overview' },
    { key: 'vertical', label: 'Industry Vertical' },
    { key: 'focus', label: 'Dealership Type Focus' },
    { key: 'revenue', label: 'Total Annual Revenue (US$ Million)' },
    { key: 'size', label: 'Customer Size / Scale' },
  ],
}
const G_CONTACT: ColGroup = {
  group: 'Contact Details',
  color: COLORS.contact,
  headerColor: HEADER.contact,
  cols: [
    { key: 'contact', label: 'Key Contact Person' },
    { key: 'role', label: 'Designation / Role' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone / WhatsApp Number' },
    { key: 'linkedin', label: 'LinkedIn Profile' },
    { key: 'website', label: 'Website URL' },
  ],
}
const G_DRIVERS: ColGroup = {
  group: 'Engineering Outsourcing Drivers',
  color: COLORS.drivers,
  headerColor: HEADER.drivers,
  cols: [
    { key: 'buyingCriteria', label: 'Key DMS Buying Criteria' },
    { key: 'painPoints', label: 'Core Operational Pain Points' },
    { key: 'maturity', label: 'Digital Maturity Level' },
    { key: 'siteDep', label: 'Single-Site vs Multi-Site Dependency' },
    { key: 'triggers', label: 'Transformation Triggers' },
  ],
}
const G_BEHAVIOUR: ColGroup = {
  group: 'Outsourcing Behaviour Metrics',
  color: COLORS.behaviour,
  headerColor: HEADER.behaviour,
  cols: [
    { key: 'budgetOwner', label: 'Budget Ownership' },
    { key: 'procurement', label: 'Procurement Model' },
    { key: 'vendorCriteria', label: 'Vendor Selection Criteria' },
    { key: 'engagement', label: 'Preferred Engagement Type' },
  ],
}
const G_SOLUTION: ColGroup = {
  group: 'Solution Requirements',
  color: COLORS.solution,
  headerColor: HEADER.solution,
  cols: [
    { key: 'deployment', label: 'Preferred Deployment Model' },
    { key: 'solutionType', label: 'Preferred Solution Type' },
    { key: 'integration', label: 'Integration Requirements' },
    { key: 'performance', label: 'Performance Expectations' },
  ],
}
const G_CMI: ColGroup = {
  group: 'CMI Insights',
  color: COLORS.cmi,
  headerColor: HEADER.cmi,
  cols: [
    { key: 'benchmark', label: 'Customer Benchmarking Summary (Potential Customers)' },
    { key: 'notes', label: 'Additional Comments / Notes by CMI Team' },
  ],
}

const P1_GROUPS: ColGroup[] = [G_CUSTOMER_INFO, G_CONTACT]

const P2_GROUPS: ColGroup[] = [...P1_GROUPS, G_DRIVERS, G_BEHAVIOUR]
const P3_GROUPS: ColGroup[] = [...P2_GROUPS, G_SOLUTION, G_CMI]

// Realistic-looking demo customers (10 rows). All values are placeholders.
const NAMES = [
  'AutoNation Group',
  'Lithia Motors',
  'Penske Automotive',
  'Group 1 Automotive',
  'Sonic Automotive',
  'Asbury Automotive',
  'Pendragon PLC',
  'Inchcape Retail',
  'Emil Frey Group',
  'Mahindra First Choice',
]
const VERTICALS = ['Dealer Group', 'Auto Retailer', 'OEM-Affiliated Dealer Network', 'Commercial Vehicle Dealer', 'Powersports Dealer']
const FOCUS = ['Passenger Vehicle', 'Multi-Brand', 'Luxury', 'Commercial Vehicle', 'Used Vehicle']
const SIZES = ['Large', 'Mid-size', 'Small', 'Enterprise']
const MATURITY = ['Low', 'Medium', 'High', 'Very High']
const SITE_DEP = ['Single-Site', 'Multi-Site']
const DEPLOY = ['Cloud', 'On-Premise', 'Hybrid']
const BUDGET = ['Dealer Principal', 'CFO', 'COO', 'CIO', 'Group IT']
const PROCUREMENT = ['Direct Purchase', 'Multi-Year Contract', 'Group-Wide Rollout', 'Regional Rollout', 'OEM-Influenced Procurement']
const ENGAGEMENT = ['Direct Vendor', 'Implementation Partner', 'Managed Services', 'Hybrid']
const SOLUTION = ['Core DMS', 'DMS + CRM Integration', 'DMS + F&I', 'DMS + Service & Parts', 'DMS + Analytics', 'Full Dealership Platform']

const pick = <T,>(arr: T[], i: number) => arr[i % arr.length]

const buildRow = (i: number) => {
  const n = NAMES[i]
  const slug = n.toLowerCase().replace(/[^a-z0-9]+/g, '')
  return {
    sNo: i + 1,
    name: n,
    overview: 'Operates dealership network across multiple regions; multi-brand portfolio with new + used + service.',
    vertical: pick(VERTICALS, i),
    focus: pick(FOCUS, i),
    revenue: (1200 + i * 480).toLocaleString(),
    size: pick(SIZES, i),
    contact: ['Michael Chen', 'Sarah Patel', 'David Müller', 'Aiko Tanaka', 'Carlos Ramirez', 'Emma Wright', 'Liam O\'Connor', 'Priya Sharma', 'Hans Schmidt', 'Jessica Brown'][i],
    role: ['CIO', 'Head of IT', 'COO', 'Group IT Director', 'CFO', 'VP Operations', 'Dealer Principal', 'Head of Digital', 'CTO', 'Director - Fixed Ops'][i],
    email: `contact@${slug}.com`,
    phone: `+1 555-0${100 + i}`,
    linkedin: `linkedin.com/company/${slug}`,
    website: `www.${slug}.com`,
    buyingCriteria: 'Open integration, OEM compatibility, multi-store control',
    painPoints: 'Legacy system silos, slow deal processing, inconsistent reporting',
    maturity: pick(MATURITY, i),
    siteDep: pick(SITE_DEP, i),
    triggers: 'DMS Migration, Cloud Modernization, Digital Retail Integration',
    budgetOwner: pick(BUDGET, i),
    procurement: pick(PROCUREMENT, i),
    vendorCriteria: 'Functionality, Open Integration, Support, OEM Compatibility',
    engagement: pick(ENGAGEMENT, i),
    deployment: pick(DEPLOY, i),
    solutionType: pick(SOLUTION, i),
    integration: 'CRM, OEM Systems, F&I, Inventory, Digital Retail',
    performance: 'Higher Efficiency, Faster Deal Processing, Multi-Store Control',
    benchmark: 'High potential — strategic account; aligns with cloud-first roadmap',
    notes: 'Active evaluation expected within 12 months; decision committee identified',
  }
}

const ROWS = NAMES.map((_, i) => buildRow(i))

interface Props {
  title?: string
}

function PropositionTable({ title, badge, badgeColor, groups }: { title: string; badge: string; badgeColor: string; groups: ColGroup[] }) {
  const [expanded, setExpanded] = useState(true)
  const flatCols = groups.flatMap(g => g.cols)
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-gray-200 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 text-xs font-semibold rounded ${badgeColor}`}>{badge}</span>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{ROWS.length} customers · {flatCols.length} attributes</span>
        </div>
        <span className="text-xs text-gray-500">{expanded ? '▾' : '▸'}</span>
      </button>

      {expanded && (
        <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
          <table className="min-w-full text-xs border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                <th
                  rowSpan={2}
                  className="px-3 py-2 text-center font-bold text-gray-900 border border-white"
                  style={{ backgroundColor: COLORS.sno }}
                >
                  S.No.
                </th>
                {groups.map(g => (
                  <th
                    key={g.group}
                    colSpan={g.cols.length}
                    className="px-3 py-2 text-center font-bold text-gray-900 border border-white"
                    style={{ backgroundColor: g.headerColor }}
                  >
                    {g.group}
                  </th>
                ))}
              </tr>
              <tr>
                {groups.flatMap(g =>
                  g.cols.map(c => (
                    <th
                      key={c.key}
                      className="px-3 py-2 text-left font-semibold text-gray-800 border border-white align-top"
                      style={{ backgroundColor: g.color }}
                    >
                      <div className="max-w-[220px] whitespace-normal leading-tight">{c.label}</div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, rIdx) => (
                <tr key={row.sNo} className="hover:brightness-95 transition-all">
                  <td
                    className="px-3 py-2 border border-white text-center font-semibold text-gray-800"
                    style={{ backgroundColor: rIdx % 2 === 0 ? '#EAE2F0' : '#DCD0E6' }}
                  >
                    {row.sNo}
                  </td>
                  {groups.flatMap(g =>
                    g.cols.map(c => (
                      <td
                        key={c.key}
                        className="px-3 py-2 border border-white text-gray-800 whitespace-nowrap max-w-[260px] overflow-hidden text-ellipsis"
                        style={{ backgroundColor: rIdx % 2 === 0 ? g.color : shade(g.color, -6) }}
                      >
                        {(row as any)[c.key] ?? '—'}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function DMSCustomerPropositions({ title = 'Customer Intelligence — DMS Market' }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          Verified customer directory and insight tiers for the U.S. Phishing Simulator market.
          Three propositions provide progressively richer attributes — from basic contact data to full strategic intelligence.
        </p>
      </div>

      <PropositionTable
        title="Proposition 1 — Basic"
        badge="BASIC"
        badgeColor="bg-blue-100 text-blue-700"
        groups={P1_GROUPS}
      />
      <PropositionTable
        title="Proposition 2 — Advance"
        badge="ADVANCE"
        badgeColor="bg-emerald-100 text-emerald-700"
        groups={P2_GROUPS}
      />
      <PropositionTable
        title="Proposition 3 — Premium"
        badge="PREMIUM"
        badgeColor="bg-amber-100 text-amber-800"
        groups={P3_GROUPS}
      />
    </div>
  )
}
