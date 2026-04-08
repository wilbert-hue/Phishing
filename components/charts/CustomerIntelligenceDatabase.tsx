'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CustomerData {
  // Customer Information
  sNo: number
  customerName: string
  businessOverview: string
  industryVertical: string
  employeeBase: string
  totalAnnualRevenue: string
  customerSize: string
  // Contact Details
  keyContactPerson: string
  designation: string
  emailAddress: string
  phoneNumber: string
  linkedInProfile: string
  websiteUrl: string
  // Security Awareness & Phishing Simulation Buying Drivers (Prop 2+)
  keyBuyingCriteria: string
  coreCyberPainPoints: string
  securityMaturityLevel: string
  phishingRiskExposure: string
  keyBuyingTriggers: string
  // Purchasing Behaviour Metrics (Prop 2+)
  budgetOwnership: string
  procurementModel: string
  vendorSelectionCriteria: string
  preferredEngagementType: string
  // Solution Requirements (Prop 3)
  preferredDeploymentModel: string
  preferredSolutionType: string
  integrationRequirements: string
  performanceExpectations: string
  // CMI Insights (Prop 3)
  customerBenchmarkingSummary: string
  additionalNotes: string
}

// Sample data for U.S. Phishing Simulator Market
const sampleCustomerData: CustomerData[] = [
  {
    sNo: 1,
    customerName: 'First National Bank Corp',
    businessOverview: 'Tier-1 U.S. retail and commercial bank serving 12M customers across 1,400 branches.',
    industryVertical: 'BFSI',
    employeeBase: '28,500',
    totalAnnualRevenue: '9,800',
    customerSize: 'Large Enterprise',
    keyContactPerson: 'Michael Reeves',
    designation: 'CISO',
    emailAddress: 'm.reeves@fnbcorp.com',
    phoneNumber: '+1 212-555-0142',
    linkedInProfile: 'linkedin.com/in/michael-reeves-ciso',
    websiteUrl: 'www.fnbcorp.com',
    keyBuyingCriteria: 'Reporting depth, integration with SIEM, compliance coverage',
    coreCyberPainPoints: 'BEC attacks, credential theft, regulator audit findings',
    securityMaturityLevel: 'High',
    phishingRiskExposure: 'High',
    keyBuyingTriggers: 'Compliance, Cyber Insurance',
    budgetOwnership: 'CISO',
    procurementModel: 'Multi-Year Contract',
    vendorSelectionCriteria: 'Reporting Depth, Integration, Simulation Realism',
    preferredEngagementType: 'Direct Vendor',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Integrated Human Risk Management',
    integrationRequirements: 'SIEM, IAM, Microsoft 365',
    performanceExpectations: 'Lower Click Rate, Compliance Readiness',
    customerBenchmarkingSummary: 'Strategic account – top quartile maturity',
    additionalNotes: 'Prioritizes vendors with FedRAMP and SOC 2 Type II.'
  },
  {
    sNo: 2,
    customerName: 'MercyCare Health System',
    businessOverview: 'Non-profit hospital network operating 22 hospitals across the Midwest.',
    industryVertical: 'Healthcare & Life Sciences',
    employeeBase: '42,000',
    totalAnnualRevenue: '6,200',
    customerSize: 'Large Enterprise',
    keyContactPerson: 'Dr. Anita Shah',
    designation: 'VP – Information Security',
    emailAddress: 'a.shah@mercycare.org',
    phoneNumber: '+1 312-555-0177',
    linkedInProfile: 'linkedin.com/in/anita-shah-infosec',
    websiteUrl: 'www.mercycare.org',
    keyBuyingCriteria: 'HIPAA alignment, content quality, ease of deployment',
    coreCyberPainPoints: 'Ransomware, PHI exposure, clinician click-through rates',
    securityMaturityLevel: 'Medium',
    phishingRiskExposure: 'Very High',
    keyBuyingTriggers: 'Increase in Email Threats, Board Mandate',
    budgetOwnership: 'CIO',
    procurementModel: 'Annual Subscription',
    vendorSelectionCriteria: 'Content Quality, Ease of Deployment',
    preferredEngagementType: 'MSSP',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Security Awareness Training',
    integrationRequirements: 'Microsoft 365, LMS, HRIS',
    performanceExpectations: 'Improved User Awareness, Faster Risk Reduction',
    customerBenchmarkingSummary: 'High potential – healthcare benchmark account',
    additionalNotes: 'Active RFP cycle in Q2; MSSP-led delivery preferred.'
  },
  {
    sNo: 3,
    customerName: 'Department of Civic Services',
    businessOverview: 'State-level government agency administering social and civic programs.',
    industryVertical: 'Government & Defense',
    employeeBase: '15,800',
    totalAnnualRevenue: '2,100',
    customerSize: 'Large Enterprise',
    keyContactPerson: 'Robert Hensley',
    designation: 'Director – IT Security',
    emailAddress: 'r.hensley@dcs.state.gov',
    phoneNumber: '+1 916-555-0188',
    linkedInProfile: 'linkedin.com/in/robert-hensley-itsec',
    websiteUrl: 'www.dcs.state.gov',
    keyBuyingCriteria: 'FedRAMP, admin control, cost',
    coreCyberPainPoints: 'Nation-state phishing, legacy email infrastructure',
    securityMaturityLevel: 'Medium',
    phishingRiskExposure: 'High',
    keyBuyingTriggers: 'Compliance, Security Program Upgrade',
    budgetOwnership: 'IT Security',
    procurementModel: 'Enterprise License',
    vendorSelectionCriteria: 'Admin Control, Cost, Reporting Depth',
    preferredEngagementType: 'Reseller',
    preferredDeploymentModel: 'Hybrid',
    preferredSolutionType: 'Phishing Simulation',
    integrationRequirements: 'Email Security, SIEM',
    performanceExpectations: 'Compliance Readiness, Better Reporting',
    customerBenchmarkingSummary: 'Reference account for public sector segment',
    additionalNotes: 'Procurement via GSA schedule; budget approved for FY26.'
  },
  {
    sNo: 4,
    customerName: 'Northstar Cloud Technologies',
    businessOverview: 'SaaS infrastructure provider offering cloud workloads for enterprise customers.',
    industryVertical: 'IT & Telecom',
    employeeBase: '6,400',
    totalAnnualRevenue: '1,750',
    customerSize: 'Mid-Sized Enterprise',
    keyContactPerson: 'Elena Park',
    designation: 'Head of Security Operations',
    emailAddress: 'e.park@northstarcloud.io',
    phoneNumber: '+1 415-555-0125',
    linkedInProfile: 'linkedin.com/in/elena-park-secops',
    websiteUrl: 'www.northstarcloud.io',
    keyBuyingCriteria: 'API integration, simulation realism, SOAR fit',
    coreCyberPainPoints: 'Credential phishing on engineering staff, MFA fatigue',
    securityMaturityLevel: 'Very High',
    phishingRiskExposure: 'Medium',
    keyBuyingTriggers: 'Security Program Upgrade',
    budgetOwnership: 'CISO',
    procurementModel: 'Annual Subscription',
    vendorSelectionCriteria: 'Integration, Simulation Realism',
    preferredEngagementType: 'Direct Vendor',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Integrated Human Risk Management',
    integrationRequirements: 'SIEM, SOAR, IAM, Google Workspace',
    performanceExpectations: 'Faster Risk Reduction, Better Executive Visibility',
    customerBenchmarkingSummary: 'Innovator – early adopter of AI-driven simulations',
    additionalNotes: 'Open to design-partner program for AI-generated lures.'
  },
  {
    sNo: 5,
    customerName: 'Apex Manufacturing Group',
    businessOverview: 'Diversified industrial manufacturer with 18 plants across the U.S.',
    industryVertical: 'Manufacturing',
    employeeBase: '12,300',
    totalAnnualRevenue: '3,400',
    customerSize: 'Large Enterprise',
    keyContactPerson: 'James O\'Connor',
    designation: 'IT Risk Manager',
    emailAddress: 'j.oconnor@apexmfg.com',
    phoneNumber: '+1 313-555-0193',
    linkedInProfile: 'linkedin.com/in/james-oconnor-itrisk',
    websiteUrl: 'www.apexmfg.com',
    keyBuyingCriteria: 'Ease of deployment, OT-aware content, cost',
    coreCyberPainPoints: 'Vendor invoice fraud, OT/IT convergence risks',
    securityMaturityLevel: 'Medium',
    phishingRiskExposure: 'High',
    keyBuyingTriggers: 'Cyber Insurance, Increase in Email Threats',
    budgetOwnership: 'IT Security',
    procurementModel: 'Annual Subscription',
    vendorSelectionCriteria: 'Ease of Deployment, Cost',
    preferredEngagementType: 'Hybrid',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Security Awareness Training',
    integrationRequirements: 'Microsoft 365, HRIS',
    performanceExpectations: 'Lower Click Rate, Improved User Awareness',
    customerBenchmarkingSummary: 'Growth account – cyber insurance driven',
    additionalNotes: 'Renewal with incumbent ends Q3; competitive replacement window.'
  },
  {
    sNo: 6,
    customerName: 'Coastline Retail Holdings',
    businessOverview: 'Omnichannel retailer operating 850 U.S. stores and a major e-commerce platform.',
    industryVertical: 'Retail & E-commerce',
    employeeBase: '34,000',
    totalAnnualRevenue: '5,600',
    customerSize: 'Large Enterprise',
    keyContactPerson: 'Sandra Liu',
    designation: 'Director – Cybersecurity',
    emailAddress: 's.liu@coastlineretail.com',
    phoneNumber: '+1 206-555-0162',
    linkedInProfile: 'linkedin.com/in/sandra-liu-cyber',
    websiteUrl: 'www.coastlineretail.com',
    keyBuyingCriteria: 'Multi-channel coverage, scale, content localization',
    coreCyberPainPoints: 'Smishing on store associates, gift-card fraud',
    securityMaturityLevel: 'Medium',
    phishingRiskExposure: 'High',
    keyBuyingTriggers: 'Increase in Email Threats, Remote Work',
    budgetOwnership: 'CISO',
    procurementModel: 'Multi-Year Contract',
    vendorSelectionCriteria: 'Simulation Realism, Content Quality',
    preferredEngagementType: 'Direct Vendor',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Integrated Human Risk Management',
    integrationRequirements: 'Email Security, IAM, LMS',
    performanceExpectations: 'Lower Click Rate, Improved User Awareness',
    customerBenchmarkingSummary: 'Large enterprise – multi-channel rollout target',
    additionalNotes: 'Interested in SMS/voice phishing modules for store ops.'
  },
  {
    sNo: 7,
    customerName: 'Greenfield University',
    businessOverview: 'Private research university with 35,000 students and faculty.',
    industryVertical: 'Others (Energy & Utilities, Education, etc.)',
    employeeBase: '7,800',
    totalAnnualRevenue: '950',
    customerSize: 'Mid-Sized Enterprise',
    keyContactPerson: 'Daniel Brooks',
    designation: 'Information Security Officer',
    emailAddress: 'd.brooks@greenfield.edu',
    phoneNumber: '+1 617-555-0149',
    linkedInProfile: 'linkedin.com/in/daniel-brooks-iso',
    websiteUrl: 'www.greenfield.edu',
    keyBuyingCriteria: 'Cost, ease of admin, LMS integration',
    coreCyberPainPoints: 'Student credential theft, research IP phishing',
    securityMaturityLevel: 'Low',
    phishingRiskExposure: 'High',
    keyBuyingTriggers: 'Cyber Insurance, Board Mandate',
    budgetOwnership: 'CIO',
    procurementModel: 'Annual Subscription',
    vendorSelectionCriteria: 'Cost, Ease of Deployment',
    preferredEngagementType: 'Reseller',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Phishing Simulation',
    integrationRequirements: 'Google Workspace, LMS',
    performanceExpectations: 'Improved User Awareness, Compliance Readiness',
    customerBenchmarkingSummary: 'Education segment benchmark – budget-sensitive',
    additionalNotes: 'Pilot opportunity for fall semester onboarding.'
  },
  {
    sNo: 8,
    customerName: 'Pacific Energy Partners',
    businessOverview: 'Regional electric and natural gas utility serving 4M customers.',
    industryVertical: 'Others (Energy & Utilities, Education, etc.)',
    employeeBase: '9,200',
    totalAnnualRevenue: '4,300',
    customerSize: 'Large Enterprise',
    keyContactPerson: 'Karen Mitchell',
    designation: 'Manager – Cyber Risk & Compliance',
    emailAddress: 'k.mitchell@pacificenergy.com',
    phoneNumber: '+1 503-555-0136',
    linkedInProfile: 'linkedin.com/in/karen-mitchell-cyber',
    websiteUrl: 'www.pacificenergy.com',
    keyBuyingCriteria: 'NERC CIP alignment, reporting, OT awareness content',
    coreCyberPainPoints: 'Targeted spear phishing on grid operators',
    securityMaturityLevel: 'High',
    phishingRiskExposure: 'Very High',
    keyBuyingTriggers: 'Compliance, Security Program Upgrade',
    budgetOwnership: 'Risk & Compliance',
    procurementModel: 'Multi-Year Contract',
    vendorSelectionCriteria: 'Reporting Depth, Content Quality',
    preferredEngagementType: 'Direct Vendor',
    preferredDeploymentModel: 'On-Premise',
    preferredSolutionType: 'Integrated Human Risk Management',
    integrationRequirements: 'SIEM, IAM',
    performanceExpectations: 'Compliance Readiness, Better Reporting',
    customerBenchmarkingSummary: 'Critical infrastructure – regulated reference account',
    additionalNotes: 'Air-gapped pilot environment available.'
  },
  {
    sNo: 9,
    customerName: 'BlueRiver Capital Advisors',
    businessOverview: 'Boutique wealth management firm with 1,200 advisors nationwide.',
    industryVertical: 'BFSI',
    employeeBase: '2,400',
    totalAnnualRevenue: '780',
    customerSize: 'Small & Mid-Sized Enterprise',
    keyContactPerson: 'Thomas Reilly',
    designation: 'Head of IT',
    emailAddress: 't.reilly@blueriveradv.com',
    phoneNumber: '+1 646-555-0119',
    linkedInProfile: 'linkedin.com/in/thomas-reilly-it',
    websiteUrl: 'www.blueriveradv.com',
    keyBuyingCriteria: 'SEC/FINRA alignment, simplicity, time to value',
    coreCyberPainPoints: 'Wire-fraud phishing on advisors and clients',
    securityMaturityLevel: 'Medium',
    phishingRiskExposure: 'High',
    keyBuyingTriggers: 'Compliance, Cyber Insurance',
    budgetOwnership: 'IT Security',
    procurementModel: 'Annual Subscription',
    vendorSelectionCriteria: 'Ease of Deployment, Reporting Depth',
    preferredEngagementType: 'MSP',
    preferredDeploymentModel: 'Cloud',
    preferredSolutionType: 'Security Awareness Training',
    integrationRequirements: 'Microsoft 365',
    performanceExpectations: 'Compliance Readiness, Lower Click Rate',
    customerBenchmarkingSummary: 'SMB BFSI – fast-deploy MSP play',
    additionalNotes: 'MSP-managed delivery; minimal in-house admin bandwidth.'
  },
  {
    sNo: 10,
    customerName: 'Vanguard Defense Solutions',
    businessOverview: 'Mid-tier defense contractor providing communications systems to DoD.',
    industryVertical: 'Government & Defense',
    employeeBase: '5,500',
    totalAnnualRevenue: '1,420',
    customerSize: 'Mid-Sized Enterprise',
    keyContactPerson: 'Rebecca Tan',
    designation: 'Director – Insider Risk & Awareness',
    emailAddress: 'r.tan@vanguarddefense.com',
    phoneNumber: '+1 703-555-0107',
    linkedInProfile: 'linkedin.com/in/rebecca-tan-insider',
    websiteUrl: 'www.vanguarddefense.com',
    keyBuyingCriteria: 'CMMC alignment, FedRAMP, advanced reporting',
    coreCyberPainPoints: 'APT-style spear phishing, supply-chain impersonation',
    securityMaturityLevel: 'Very High',
    phishingRiskExposure: 'Very High',
    keyBuyingTriggers: 'Compliance, Board Mandate',
    budgetOwnership: 'CISO',
    procurementModel: 'Enterprise License',
    vendorSelectionCriteria: 'Simulation Realism, Reporting Depth, Integration',
    preferredEngagementType: 'Direct Vendor',
    preferredDeploymentModel: 'Hybrid',
    preferredSolutionType: 'Integrated Human Risk Management',
    integrationRequirements: 'SIEM, SOAR, IAM, Email Security',
    performanceExpectations: 'Faster Risk Reduction, Better Executive Visibility',
    customerBenchmarkingSummary: 'Strategic – CMMC reference account',
    additionalNotes: 'Requires US-citizen support staff and ITAR-compliant hosting.'
  }
]

interface PrepositionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Preposition({ title, isOpen, onToggle, children }: PrepositionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-2 pb-4 bg-white rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  )
}

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

// Shared cell classes
const thInfo = "bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thContact = "bg-[#B0E0E6] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thBuying = "bg-[#DDA0DD] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thPurchasing = "bg-[#DEB887] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thSolution = "bg-[#C8E6C9] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const thInsights = "bg-[#FFE0B2] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black"
const td = "border border-gray-300 px-3 py-2 text-sm text-black"
const tdLink = "border border-gray-300 px-3 py-2 text-sm text-blue-600 hover:underline"

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [openPreposition, setOpenPreposition] = useState<number | null>(1)

  const togglePreposition = (num: number) => {
    setOpenPreposition(openPreposition === num ? null : num)
  }

  // Customer Information cells (shared across props)
  const renderCustomerInfoCells = (c: CustomerData) => (
    <>
      <td className={`${td} text-center`}>{c.sNo}</td>
      <td className={td}>{c.customerName}</td>
      <td className={td}>{c.businessOverview}</td>
      <td className={td}>{c.industryVertical}</td>
      <td className={td}>{c.employeeBase}</td>
      <td className={td}>{c.totalAnnualRevenue}</td>
      <td className={td}>{c.customerSize}</td>
    </>
  )

  const renderContactCells = (c: CustomerData) => (
    <>
      <td className={td}>{c.keyContactPerson}</td>
      <td className={td}>{c.designation}</td>
      <td className={tdLink}><a href={`mailto:${c.emailAddress}`}>{c.emailAddress}</a></td>
      <td className={td}>{c.phoneNumber}</td>
      <td className={tdLink}><a href={`https://${c.linkedInProfile}`} target="_blank" rel="noopener noreferrer">{c.linkedInProfile}</a></td>
      <td className={tdLink}><a href={`https://${c.websiteUrl}`} target="_blank" rel="noopener noreferrer">{c.websiteUrl}</a></td>
    </>
  )

  // Customer Information headers (shared)
  const renderCustomerInfoHeaders = () => (
    <>
      <th className={`${thInfo} min-w-[60px]`}>S.No.</th>
      <th className={`${thInfo} min-w-[180px]`}>Customer Name / Company Name</th>
      <th className={`${thInfo} min-w-[260px]`}>Business Overview</th>
      <th className={`${thInfo} min-w-[160px]`}>Industry Vertical</th>
      <th className={`${thInfo} min-w-[120px]`}>Employee Base / User Base</th>
      <th className={`${thInfo} min-w-[140px]`}>Total Annual Revenue (US$ Million)</th>
      <th className={`${thInfo} min-w-[140px]`}>Customer Size / Scale</th>
    </>
  )

  const renderContactHeaders = () => (
    <>
      <th className={`${thContact} whitespace-nowrap min-w-[140px]`}>Key Contact Person</th>
      <th className={`${thContact} whitespace-nowrap min-w-[160px]`}>Designation / Role</th>
      <th className={`${thContact} whitespace-nowrap min-w-[180px]`}>Email Address</th>
      <th className={`${thContact} whitespace-nowrap min-w-[150px]`}>Phone / WhatsApp Number</th>
      <th className={`${thContact} whitespace-nowrap min-w-[180px]`}>LinkedIn Profile</th>
      <th className={`${thContact} whitespace-nowrap min-w-[150px]`}>Website URL</th>
    </>
  )

  // Preposition 1 Table - Customer Information + Contact Details
  const renderPreposition1Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={7} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
          </tr>
          <tr className="bg-gray-100">
            {renderCustomerInfoHeaders()}
            {renderContactHeaders()}
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((c, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderCustomerInfoCells(c)}
              {renderContactCells(c)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 2 Table
  const renderPreposition2Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={7} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={5} className="bg-[#9370DB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-white">
              Security Awareness & Phishing Simulation Buying Drivers
            </th>
            <th colSpan={4} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Purchasing Behaviour Metrics
            </th>
          </tr>
          <tr className="bg-gray-100">
            {renderCustomerInfoHeaders()}
            {renderContactHeaders()}
            {/* Buying Drivers */}
            <th className={`${thBuying} min-w-[200px]`}>Key Buying Criteria</th>
            <th className={`${thBuying} min-w-[220px]`}>Core Cybersecurity Pain Points</th>
            <th className={`${thBuying} min-w-[160px]`}>
              <div>Security Maturity Level</div>
              <div className="font-normal text-[10px] text-gray-700">(Low / Medium / High / Very High)</div>
            </th>
            <th className={`${thBuying} min-w-[160px]`}>Phishing Risk Exposure Level</th>
            <th className={`${thBuying} min-w-[220px]`}>
              <div>Key Buying Triggers</div>
              <div className="font-normal text-[10px] text-gray-700">(Compliance / Remote Work / Email Threats / Cyber Insurance / Board Mandate / Program Upgrade)</div>
            </th>
            {/* Purchasing Behaviour */}
            <th className={`${thPurchasing} min-w-[180px]`}>
              <div>Budget Ownership</div>
              <div className="font-normal text-[10px] text-gray-700">(CISO / CIO / IT Security / Risk & Compliance / HR / L&D)</div>
            </th>
            <th className={`${thPurchasing} min-w-[200px]`}>
              <div>Procurement Model</div>
              <div className="font-normal text-[10px] text-gray-700">(Direct / Annual / Multi-Year / Enterprise / Channel-Led)</div>
            </th>
            <th className={`${thPurchasing} min-w-[220px]`}>
              <div>Vendor Selection Criteria</div>
              <div className="font-normal text-[10px] text-gray-700">(Realism / Reporting / Content / Integration / Deployment / Admin / Cost)</div>
            </th>
            <th className={`${thPurchasing} min-w-[180px]`}>
              <div>Preferred Engagement Type</div>
              <div className="font-normal text-[10px] text-gray-700">(Direct / MSP / MSSP / Reseller / Hybrid)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((c, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderCustomerInfoCells(c)}
              {renderContactCells(c)}
              <td className={td}>{c.keyBuyingCriteria}</td>
              <td className={td}>{c.coreCyberPainPoints}</td>
              <td className={td}>{c.securityMaturityLevel}</td>
              <td className={td}>{c.phishingRiskExposure}</td>
              <td className={td}>{c.keyBuyingTriggers}</td>
              <td className={td}>{c.budgetOwnership}</td>
              <td className={td}>{c.procurementModel}</td>
              <td className={td}>{c.vendorSelectionCriteria}</td>
              <td className={td}>{c.preferredEngagementType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Preposition 3 Table
  const renderPreposition3Table = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th colSpan={7} className="bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Customer Information
            </th>
            <th colSpan={6} className="bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Contact Details
            </th>
            <th colSpan={5} className="bg-[#9370DB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-white">
              Security Awareness & Phishing Simulation Buying Drivers
            </th>
            <th colSpan={4} className="bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Purchasing Behaviour Metrics
            </th>
            <th colSpan={4} className="bg-[#A5D6A7] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              Solution Requirements
            </th>
            <th colSpan={2} className="bg-[#FFCC80] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black">
              CMI Insights
            </th>
          </tr>
          <tr className="bg-gray-100">
            {renderCustomerInfoHeaders()}
            {renderContactHeaders()}
            {/* Buying Drivers */}
            <th className={`${thBuying} min-w-[200px]`}>Key Buying Criteria</th>
            <th className={`${thBuying} min-w-[220px]`}>Core Cybersecurity Pain Points</th>
            <th className={`${thBuying} min-w-[160px]`}>Security Maturity Level</th>
            <th className={`${thBuying} min-w-[160px]`}>Phishing Risk Exposure Level</th>
            <th className={`${thBuying} min-w-[220px]`}>Key Buying Triggers</th>
            {/* Purchasing Behaviour */}
            <th className={`${thPurchasing} min-w-[180px]`}>Budget Ownership</th>
            <th className={`${thPurchasing} min-w-[200px]`}>Procurement Model</th>
            <th className={`${thPurchasing} min-w-[220px]`}>Vendor Selection Criteria</th>
            <th className={`${thPurchasing} min-w-[180px]`}>Preferred Engagement Type</th>
            {/* Solution Requirements */}
            <th className={`${thSolution} min-w-[180px]`}>
              <div>Preferred Deployment Model</div>
              <div className="font-normal text-[10px] text-gray-700">(Cloud / On-Premise / Hybrid)</div>
            </th>
            <th className={`${thSolution} min-w-[220px]`}>
              <div>Preferred Solution Type</div>
              <div className="font-normal text-[10px] text-gray-700">(Phishing Simulation / Awareness Training / HRM / Managed Service)</div>
            </th>
            <th className={`${thSolution} min-w-[220px]`}>
              <div>Integration Requirements</div>
              <div className="font-normal text-[10px] text-gray-700">(Email Security / SIEM / SOAR / IAM / LMS / HRIS / M365 / Workspace)</div>
            </th>
            <th className={`${thSolution} min-w-[220px]`}>
              <div>Performance Expectations</div>
              <div className="font-normal text-[10px] text-gray-700">(Click Rate / Reporting / Risk Reduction / Compliance / Awareness / Visibility)</div>
            </th>
            {/* CMI Insights */}
            <th className={`${thInsights} min-w-[220px]`}>Customer Benchmarking Summary</th>
            <th className={`${thInsights} min-w-[220px]`}>Additional Comments / Notes by CMI Team</th>
          </tr>
        </thead>
        <tbody>
          {sampleCustomerData.map((c, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderCustomerInfoCells(c)}
              {renderContactCells(c)}
              <td className={td}>{c.keyBuyingCriteria}</td>
              <td className={td}>{c.coreCyberPainPoints}</td>
              <td className={td}>{c.securityMaturityLevel}</td>
              <td className={td}>{c.phishingRiskExposure}</td>
              <td className={td}>{c.keyBuyingTriggers}</td>
              <td className={td}>{c.budgetOwnership}</td>
              <td className={td}>{c.procurementModel}</td>
              <td className={td}>{c.vendorSelectionCriteria}</td>
              <td className={td}>{c.preferredEngagementType}</td>
              <td className={td}>{c.preferredDeploymentModel}</td>
              <td className={td}>{c.preferredSolutionType}</td>
              <td className={td}>{c.integrationRequirements}</td>
              <td className={td}>{c.performanceExpectations}</td>
              <td className={td}>{c.customerBenchmarkingSummary}</td>
              <td className={td}>{c.additionalNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-6">Customer Intelligence Database</h2>

      <Preposition
        title="Proposition 1 - Basic"
        isOpen={openPreposition === 1}
        onToggle={() => togglePreposition(1)}
      >
        {renderPreposition1Table()}
      </Preposition>

      <Preposition
        title="Proposition 2 - Advance"
        isOpen={openPreposition === 2}
        onToggle={() => togglePreposition(2)}
      >
        {renderPreposition2Table()}
      </Preposition>

      <Preposition
        title="Proposition 3 - Premium"
        isOpen={openPreposition === 3}
        onToggle={() => togglePreposition(3)}
      >
        {renderPreposition3Table()}
      </Preposition>
    </div>
  )
}
