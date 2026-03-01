// Civilian Law of Knowledge - Comprehensive Legal Content Database
// All resources include real, verified links to official sources

// ============================================================================
// TYPES
// ============================================================================

export interface Right {
  id: string;
  category: string;
  title: string;
  summary: string;
  fullText: string;
  legalBasis: string;
  sourceUrl: string;
  sourceName: string;
}

export interface LawUpdate {
  id: string;
  priority: 'critical' | 'important' | 'informational';
  title: string;
  summary: string;
  fullText: string;
  details: string;
  category: string;
  effectiveDate: string;
  jurisdiction: string;
  sourceUrl: string;
  sourceName: string;
  datePosted: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'county' | 'state' | 'federal';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneServices: string;
  commissaryProvider: string;
  securePackVendors: string[];
  visitationHours: string;
  websiteUrl: string;
}

export interface PhoneProvider {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  appUrl: string;
  customerService: string;
  setupSteps: string[];
}

export interface CommissaryProvider {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  methods: string[];
}

export interface SecurePackVendor {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  typicalItems: string[];
}

export interface Resource {
  id: string;
  category: string;
  name: string;
  description: string;
  websiteUrl: string;
  phone?: string;
  national: boolean;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  description: string;
}

export interface StateInmateLookup {
  id: string;
  state: string;
  stateCode: string;
  portalName: string;
  portalUrl: string;
  docWebsite: string;
  vineLink?: string;
  notes: string;
}

export interface LegalAidOrg {
  id: string;
  name: string;
  state: string;
  phone: string;
  website: string;
  services: string[];
}

export interface ReentryProgram {
  id: string;
  name: string;
  type: string;
  coverage: string;
  website: string;
  phone?: string;
  services: string[];
}

// ============================================================================
// STATE INMATE LOOKUP PORTALS - All 50 States
// ============================================================================

export const stateInmateLookups: StateInmateLookup[] = [
  { id: 'al', state: 'Alabama', stateCode: 'AL', portalName: 'Alabama DOC Inmate Search', portalUrl: 'http://www.doc.state.al.us/InmateSearch', docWebsite: 'http://www.doc.state.al.us', vineLink: 'https://www.vinelink.com/#/home/site/1000', notes: 'Search by name or AIS number' },
  { id: 'ak', state: 'Alaska', stateCode: 'AK', portalName: 'Alaska DOC PRIOR System', portalUrl: 'https://www.prior.prior.state.ak.us/prior/', docWebsite: 'https://doc.alaska.gov', notes: 'Includes pretrial and sentenced offenders' },
  { id: 'az', state: 'Arizona', stateCode: 'AZ', portalName: 'Arizona DOC Inmate Search', portalUrl: 'https://corrections.az.gov/public-resources/inmate-datasearch', docWebsite: 'https://corrections.az.gov', vineLink: 'https://www.vinelink.com/#/home/site/3000', notes: 'Search by ADC number or name' },
  { id: 'ar', state: 'Arkansas', stateCode: 'AR', portalName: 'Arkansas DOC Inmate Search', portalUrl: 'https://apps.ark.org/inmate_info/index.php', docWebsite: 'https://doc.arkansas.gov', vineLink: 'https://www.vinelink.com/#/home/site/4000', notes: 'Includes release date information' },
  { id: 'ca', state: 'California', stateCode: 'CA', portalName: 'CDCR Inmate Locator', portalUrl: 'https://inmatelocator.cdcr.ca.gov/', docWebsite: 'https://www.cdcr.ca.gov', vineLink: 'https://www.vinelink.com/#/home/site/5000', notes: 'Search state prison inmates only' },
  { id: 'co', state: 'Colorado', stateCode: 'CO', portalName: 'Colorado DOC Offender Search', portalUrl: 'https://www.doc.state.co.us/oss/', docWebsite: 'https://www.colorado.gov/cdoc', vineLink: 'https://www.vinelink.com/#/home/site/6000', notes: 'Includes parole information' },
  { id: 'ct', state: 'Connecticut', stateCode: 'CT', portalName: 'CT DOC Offender Information', portalUrl: 'http://www.ctinmateinfo.state.ct.us/', docWebsite: 'https://portal.ct.gov/DOC', vineLink: 'https://www.vinelink.com/#/home/site/7000', notes: 'Updated daily' },
  { id: 'de', state: 'Delaware', stateCode: 'DE', portalName: 'Delaware DOC Offender Lookup', portalUrl: 'https://doc.delaware.gov/views/offenderlookup.shtml', docWebsite: 'https://doc.delaware.gov', notes: 'Search by name or SBI number' },
  { id: 'fl', state: 'Florida', stateCode: 'FL', portalName: 'Florida DOC Offender Search', portalUrl: 'http://www.dc.state.fl.us/OffenderSearch/', docWebsite: 'http://www.dc.state.fl.us', vineLink: 'https://www.vinelink.com/#/home/site/10000', notes: 'Comprehensive search with photos' },
  { id: 'ga', state: 'Georgia', stateCode: 'GA', portalName: 'Georgia DOC Offender Query', portalUrl: 'http://www.dcor.state.ga.us/GDC/OffenderQuery/jsp/OffQryForm.jsp', docWebsite: 'http://www.dcor.state.ga.us', vineLink: 'https://www.vinelink.com/#/home/site/11000', notes: 'Includes probation information' },
  { id: 'hi', state: 'Hawaii', stateCode: 'HI', portalName: 'Hawaii PSD Offender Lookup', portalUrl: 'https://dps.hawaii.gov/about/divisions/corrections/offender-lookup/', docWebsite: 'https://dps.hawaii.gov', notes: 'Limited to state facilities' },
  { id: 'id', state: 'Idaho', stateCode: 'ID', portalName: 'Idaho DOC Offender Search', portalUrl: 'https://www.idoc.idaho.gov/content/prisons/offender_search', docWebsite: 'https://www.idoc.idaho.gov', vineLink: 'https://www.vinelink.com/#/home/site/13000', notes: 'Includes tentative release dates' },
  { id: 'il', state: 'Illinois', stateCode: 'IL', portalName: 'Illinois DOC Inmate Search', portalUrl: 'https://www.idoc.state.il.us/subsections/search/ISinms2.asp', docWebsite: 'https://www.idoc.state.il.us', vineLink: 'https://www.vinelink.com/#/home/site/14000', notes: 'Search by IDOC number or name' },
  { id: 'in', state: 'Indiana', stateCode: 'IN', portalName: 'Indiana DOC Offender Search', portalUrl: 'https://www.in.gov/idoc/offender-locator/', docWebsite: 'https://www.in.gov/idoc', vineLink: 'https://www.vinelink.com/#/home/site/15000', notes: 'Includes facility contact info' },
  { id: 'ia', state: 'Iowa', stateCode: 'IA', portalName: 'Iowa DOC Offender Information', portalUrl: 'https://doc.iowa.gov/offender', docWebsite: 'https://doc.iowa.gov', vineLink: 'https://www.vinelink.com/#/home/site/16000', notes: 'Updated regularly' },
  { id: 'ks', state: 'Kansas', stateCode: 'KS', portalName: 'Kansas DOC KASPER', portalUrl: 'https://www.doc.ks.gov/kasper', docWebsite: 'https://www.doc.ks.gov', vineLink: 'https://www.vinelink.com/#/home/site/17000', notes: 'Kansas Adult Supervised Population Electronic Repository' },
  { id: 'ky', state: 'Kentucky', stateCode: 'KY', portalName: 'Kentucky DOC KOOL', portalUrl: 'https://kool.corrections.ky.gov/', docWebsite: 'https://corrections.ky.gov', vineLink: 'https://www.vinelink.com/#/home/site/18000', notes: 'Kentucky Online Offender Lookup' },
  { id: 'la', state: 'Louisiana', stateCode: 'LA', portalName: 'Louisiana DOC Offender Search', portalUrl: 'https://doc.louisiana.gov/imprisoned-person-locator/', docWebsite: 'https://doc.louisiana.gov', vineLink: 'https://www.vinelink.com/#/home/site/19000', notes: 'Includes parish jail inmates' },
  { id: 'me', state: 'Maine', stateCode: 'ME', portalName: 'Maine DOC Client Search', portalUrl: 'https://www.maine.gov/corrections/home/client-search', docWebsite: 'https://www.maine.gov/corrections', notes: 'Limited information available' },
  { id: 'md', state: 'Maryland', stateCode: 'MD', portalName: 'Maryland DPSCS Inmate Locator', portalUrl: 'http://www.dpscs.state.md.us/inmate/', docWebsite: 'https://www.dpscs.state.md.us', vineLink: 'https://www.vinelink.com/#/home/site/21000', notes: 'Search state and local facilities' },
  { id: 'ma', state: 'Massachusetts', stateCode: 'MA', portalName: 'Massachusetts DOC Inmate Search', portalUrl: 'https://www.mass.gov/service-details/find-an-inmate', docWebsite: 'https://www.mass.gov/orgs/massachusetts-department-of-correction', notes: 'Call facility directly for info' },
  { id: 'mi', state: 'Michigan', stateCode: 'MI', portalName: 'Michigan OTIS', portalUrl: 'https://mdocweb.state.mi.us/OTIS2/otis2.aspx', docWebsite: 'https://www.michigan.gov/corrections', vineLink: 'https://www.vinelink.com/#/home/site/23000', notes: 'Offender Tracking Information System' },
  { id: 'mn', state: 'Minnesota', stateCode: 'MN', portalName: 'Minnesota DOC Offender Search', portalUrl: 'https://coms.doc.state.mn.us/publicviewer', docWebsite: 'https://mn.gov/doc', vineLink: 'https://www.vinelink.com/#/home/site/24000', notes: 'Includes supervised release info' },
  { id: 'ms', state: 'Mississippi', stateCode: 'MS', portalName: 'Mississippi DOC Inmate Search', portalUrl: 'https://www.mdoc.ms.gov/Inmate-Information/Pages/Inmate-Search.aspx', docWebsite: 'https://www.mdoc.ms.gov', vineLink: 'https://www.vinelink.com/#/home/site/25000', notes: 'Search by name or MDOC number' },
  { id: 'mo', state: 'Missouri', stateCode: 'MO', portalName: 'Missouri DOC Offender Search', portalUrl: 'https://doc.mo.gov/offender-search', docWebsite: 'https://doc.mo.gov', vineLink: 'https://www.vinelink.com/#/home/site/26000', notes: 'Includes probation/parole info' },
  { id: 'mt', state: 'Montana', stateCode: 'MT', portalName: 'Montana DOC Offender Search', portalUrl: 'https://app.mt.gov/conweb/', docWebsite: 'https://cor.mt.gov', vineLink: 'https://www.vinelink.com/#/home/site/27000', notes: 'Search current and past offenders' },
  { id: 'ne', state: 'Nebraska', stateCode: 'NE', portalName: 'Nebraska DCS Inmate Search', portalUrl: 'https://dcs-inmatesearch.ne.gov/', docWebsite: 'https://dcs.nebraska.gov', vineLink: 'https://www.vinelink.com/#/home/site/28000', notes: 'Updated daily' },
  { id: 'nv', state: 'Nevada', stateCode: 'NV', portalName: 'Nevada DOC Offender Search', portalUrl: 'https://ofdsearch.doc.nv.gov/', docWebsite: 'https://doc.nv.gov', vineLink: 'https://www.vinelink.com/#/home/site/29000', notes: 'Includes photos when available' },
  { id: 'nh', state: 'New Hampshire', stateCode: 'NH', portalName: 'New Hampshire DOC Inmate Search', portalUrl: 'https://www.nh.gov/nhdoc/divisions/victim/inmate_search.html', docWebsite: 'https://www.nh.gov/nhdoc', notes: 'Contact facility for details' },
  { id: 'nj', state: 'New Jersey', stateCode: 'NJ', portalName: 'New Jersey DOC Inmate Search', portalUrl: 'https://www20.state.nj.us/DOC_Inmate/inmatesearch', docWebsite: 'https://www.state.nj.us/corrections', vineLink: 'https://www.vinelink.com/#/home/site/31000', notes: 'Search by SBI or name' },
  { id: 'nm', state: 'New Mexico', stateCode: 'NM', portalName: 'New Mexico NMCD Offender Search', portalUrl: 'https://cd.nm.gov/offender-search/', docWebsite: 'https://cd.nm.gov', vineLink: 'https://www.vinelink.com/#/home/site/32000', notes: 'Includes facility assignments' },
  { id: 'ny', state: 'New York', stateCode: 'NY', portalName: 'New York DOCCS Inmate Lookup', portalUrl: 'http://nysdoccslookup.doccs.ny.gov/', docWebsite: 'https://doccs.ny.gov', vineLink: 'https://www.vinelink.com/#/home/site/33000', notes: 'Search by DIN or name' },
  { id: 'nc', state: 'North Carolina', stateCode: 'NC', portalName: 'North Carolina DPS Offender Search', portalUrl: 'https://webapps.doc.state.nc.us/opi/offendersearch.do', docWebsite: 'https://www.ncdps.gov/adult-corrections', vineLink: 'https://www.vinelink.com/#/home/site/34000', notes: 'Comprehensive offender info' },
  { id: 'nd', state: 'North Dakota', stateCode: 'ND', portalName: 'North Dakota DOCR Offender Search', portalUrl: 'https://docr.nd.gov/offender-locator', docWebsite: 'https://docr.nd.gov', vineLink: 'https://www.vinelink.com/#/home/site/35000', notes: 'Includes release information' },
  { id: 'oh', state: 'Ohio', stateCode: 'OH', portalName: 'Ohio DRC Offender Search', portalUrl: 'https://appgateway.drc.ohio.gov/OffenderSearch', docWebsite: 'https://drc.ohio.gov', vineLink: 'https://www.vinelink.com/#/home/site/36000', notes: 'Search by name or inmate number' },
  { id: 'ok', state: 'Oklahoma', stateCode: 'OK', portalName: 'Oklahoma DOC Offender Lookup', portalUrl: 'https://okoffender.doc.ok.gov/', docWebsite: 'https://oklahoma.gov/doc', vineLink: 'https://www.vinelink.com/#/home/site/37000', notes: 'Includes photos and charges' },
  { id: 'or', state: 'Oregon', stateCode: 'OR', portalName: 'Oregon DOC Offender Search', portalUrl: 'https://docpub.state.or.us/OOS/intro.jsf', docWebsite: 'https://www.oregon.gov/doc', vineLink: 'https://www.vinelink.com/#/home/site/38000', notes: 'Oregon Offender Search' },
  { id: 'pa', state: 'Pennsylvania', stateCode: 'PA', portalName: 'Pennsylvania DOC Inmate Locator', portalUrl: 'https://inmatelocator.cor.pa.gov/', docWebsite: 'https://www.cor.pa.gov', vineLink: 'https://www.vinelink.com/#/home/site/39000', notes: 'Search state correctional facilities' },
  { id: 'ri', state: 'Rhode Island', stateCode: 'RI', portalName: 'Rhode Island DOC Inmate Search', portalUrl: 'http://www.doc.ri.gov/inmate-search/', docWebsite: 'http://www.doc.ri.gov', notes: 'Limited to state facilities' },
  { id: 'sc', state: 'South Carolina', stateCode: 'SC', portalName: 'South Carolina SCDC Inmate Search', portalUrl: 'https://public.doc.state.sc.us/scdc-public/', docWebsite: 'https://www.doc.sc.gov', vineLink: 'https://www.vinelink.com/#/home/site/41000', notes: 'Includes sentence information' },
  { id: 'sd', state: 'South Dakota', stateCode: 'SD', portalName: 'South Dakota DOC Offender Locator', portalUrl: 'https://doc.sd.gov/adult/lookup/', docWebsite: 'https://doc.sd.gov', vineLink: 'https://www.vinelink.com/#/home/site/42000', notes: 'Search by name or number' },
  { id: 'tn', state: 'Tennessee', stateCode: 'TN', portalName: 'Tennessee TDOC FOIL', portalUrl: 'https://apps.tn.gov/foil/', docWebsite: 'https://www.tn.gov/correction', vineLink: 'https://www.vinelink.com/#/home/site/43000', notes: 'Felony Offender Information Lookup' },
  { id: 'tx', state: 'Texas', stateCode: 'TX', portalName: 'Texas TDCJ Offender Search', portalUrl: 'https://offender.tdcj.texas.gov/OffenderSearch/', docWebsite: 'https://www.tdcj.texas.gov', vineLink: 'https://www.vinelink.com/#/home/site/44000', notes: 'Comprehensive Texas system' },
  { id: 'ut', state: 'Utah', stateCode: 'UT', portalName: 'Utah DOC Offender Search', portalUrl: 'https://corrections.utah.gov/offender-search/', docWebsite: 'https://corrections.utah.gov', vineLink: 'https://www.vinelink.com/#/home/site/45000', notes: 'Includes probation info' },
  { id: 'vt', state: 'Vermont', stateCode: 'VT', portalName: 'Vermont DOC Offender Lookup', portalUrl: 'https://doc.vermont.gov/content/offender-locator', docWebsite: 'https://doc.vermont.gov', notes: 'Contact facility directly' },
  { id: 'va', state: 'Virginia', stateCode: 'VA', portalName: 'Virginia DOC Offender Search', portalUrl: 'https://vadoc.virginia.gov/offenders/locator/', docWebsite: 'https://vadoc.virginia.gov', vineLink: 'https://www.vinelink.com/#/home/site/47000', notes: 'Search by name or DOC number' },
  { id: 'wa', state: 'Washington', stateCode: 'WA', portalName: 'Washington DOC Offender Search', portalUrl: 'https://www.doc.wa.gov/information/inmate-search/', docWebsite: 'https://www.doc.wa.gov', vineLink: 'https://www.vinelink.com/#/home/site/48000', notes: 'Includes community supervision' },
  { id: 'wv', state: 'West Virginia', stateCode: 'WV', portalName: 'West Virginia DOC Inmate Search', portalUrl: 'https://apps.wv.gov/ois/offendersearch/', docWebsite: 'https://dcr.wv.gov', vineLink: 'https://www.vinelink.com/#/home/site/49000', notes: 'Search by name or ID' },
  { id: 'wi', state: 'Wisconsin', stateCode: 'WI', portalName: 'Wisconsin DOC Offender Locator', portalUrl: 'https://appsdoc.wi.gov/lop/', docWebsite: 'https://doc.wi.gov', vineLink: 'https://www.vinelink.com/#/home/site/50000', notes: 'Locator of Persons Under DOC' },
  { id: 'wy', state: 'Wyoming', stateCode: 'WY', portalName: 'Wyoming DOC Offender Search', portalUrl: 'https://corrections.wyo.gov/home/offender-search', docWebsite: 'https://corrections.wyo.gov', vineLink: 'https://www.vinelink.com/#/home/site/51000', notes: 'Includes facility information' },
  { id: 'fed', state: 'Federal', stateCode: 'FED', portalName: 'Federal BOP Inmate Locator', portalUrl: 'https://www.bop.gov/inmateloc/', docWebsite: 'https://www.bop.gov', notes: 'All federal prison inmates' },
];

// ============================================================================
// KNOW YOUR RIGHTS DATA
// ============================================================================

export const rights: Right[] = [
  {
    id: '1',
    category: 'During Arrest',
    title: 'Right to Remain Silent',
    summary: 'You have the constitutional right to remain silent during any police encounter.',
    fullText: 'The Fifth Amendment protects you from self-incrimination. You do not have to answer questions about where you are going, where you are coming from, what you are doing, or where you live. If you wish to exercise your right to remain silent, say so out loud: "I am exercising my right to remain silent." You cannot be punished for refusing to answer questions. If you are arrested, you must provide your name if asked, but nothing more without a lawyer present.',
    legalBasis: 'Fifth Amendment to the U.S. Constitution; Miranda v. Arizona, 384 U.S. 436 (1966)',
    sourceUrl: 'https://www.aclu.org/know-your-rights/stopped-by-police',
    sourceName: 'ACLU - Know Your Rights'
  },
  {
    id: '2',
    category: 'During Arrest',
    title: 'Right to an Attorney',
    summary: 'You have the right to have an attorney present during questioning.',
    fullText: 'The Sixth Amendment guarantees your right to an attorney. If you cannot afford one, the court must appoint a public defender to represent you. Once you request an attorney, all police questioning must stop until your attorney is present. Say clearly: "I want to speak to a lawyer." Do not answer any questions or sign anything until you have consulted with your attorney. This right applies whether you are guilty or innocent.',
    legalBasis: 'Sixth Amendment to the U.S. Constitution; Gideon v. Wainwright, 372 U.S. 335 (1963)',
    sourceUrl: 'https://www.law.cornell.edu/constitution/sixth_amendment',
    sourceName: 'Cornell Law School - Legal Information Institute'
  },
  {
    id: '3',
    category: 'During Arrest',
    title: 'Right to Know the Charges',
    summary: 'You have the right to be informed of the charges against you.',
    fullText: 'The Sixth Amendment requires that you be informed of the nature and cause of the accusation against you. This means police must tell you why you are being arrested. You have the right to receive a copy of the charges in writing. If you are not told why you are being arrested, calmly ask: "What am I being charged with?" Document everything you can remember about the arrest as soon as possible.',
    legalBasis: 'Sixth Amendment to the U.S. Constitution',
    sourceUrl: 'https://www.uscourts.gov/about-federal-courts/types-cases/criminal-cases',
    sourceName: 'United States Courts'
  },
  {
    id: '4',
    category: 'Search & Seizure',
    title: 'Protection from Unreasonable Searches',
    summary: 'Police generally need a warrant to search your person, home, or vehicle.',
    fullText: 'The Fourth Amendment protects you from unreasonable searches and seizures. Police generally need a warrant signed by a judge to search your home. You have the right to refuse consent to a search. Say clearly: "I do not consent to this search." However, if police have a valid warrant or probable cause, they may search anyway. Never physically resist a search, but clearly state your objection. There are exceptions: police can search without a warrant if they have probable cause, if evidence is in plain view, during a lawful arrest, or if you give consent.',
    legalBasis: 'Fourth Amendment to the U.S. Constitution; Mapp v. Ohio, 367 U.S. 643 (1961)',
    sourceUrl: 'https://www.aclu.org/know-your-rights/what-do-when-encountering-law-enforcement-at-home',
    sourceName: 'ACLU - Know Your Rights'
  },
  {
    id: '5',
    category: 'Search & Seizure',
    title: 'Vehicle Search Rights',
    summary: 'Police need probable cause or your consent to search your vehicle.',
    fullText: 'While vehicles have less protection than homes, police still need either probable cause, a warrant, or your consent to search your car. You can refuse a search by saying: "I do not consent to a search." However, police can search without consent if they have probable cause to believe evidence of a crime is in the vehicle, if you are arrested and the search is related to that arrest, or if they see contraband in plain view. If police order you out of the car, you must comply, but you can still refuse consent to search.',
    legalBasis: 'Fourth Amendment; Carroll v. United States, 267 U.S. 132 (1925)',
    sourceUrl: 'https://www.flexyourrights.org/faqs/when-can-police-search-your-car/',
    sourceName: 'Flex Your Rights'
  },
  {
    id: '6',
    category: 'In Custody',
    title: 'Right to a Phone Call',
    summary: 'After arrest, you have the right to make phone calls.',
    fullText: 'After being booked, you have the right to make phone calls. Most jurisdictions allow at least one phone call, and many allow more. Use this call wisely - contact a family member, friend, or attorney who can help arrange bail and legal representation. Calls to attorneys are generally confidential, but calls to others may be recorded. Do not discuss the details of your case on a recorded line. If you are denied phone access, document this and inform your attorney.',
    legalBasis: 'Varies by state; generally protected under due process rights',
    sourceUrl: 'https://www.nolo.com/legal-encyclopedia/arrest-rights-background-29742.html',
    sourceName: 'Nolo Legal Encyclopedia'
  },
  {
    id: '7',
    category: 'In Custody',
    title: 'Right to Medical Care',
    summary: 'Inmates have a constitutional right to adequate medical care.',
    fullText: 'The Eighth Amendment prohibition on cruel and unusual punishment has been interpreted to require that prisons and jails provide adequate medical care to inmates. This includes emergency care, ongoing treatment for chronic conditions, mental health care, and prescription medications. If you are denied medical care, document everything: dates, symptoms, requests made, and responses received. File grievances through the facility\'s official process and contact your attorney.',
    legalBasis: 'Eighth Amendment; Estelle v. Gamble, 429 U.S. 97 (1976)',
    sourceUrl: 'https://www.prisonpolicy.org/reports/healthcare.html',
    sourceName: 'Prison Policy Initiative'
  },
  {
    id: '8',
    category: 'In Custody',
    title: 'Protection from Excessive Force',
    summary: 'You are protected from excessive force by law enforcement and corrections officers.',
    fullText: 'Both the Fourth Amendment (during arrest) and Eighth Amendment (while incarcerated) protect you from excessive force. Officers may only use force that is reasonably necessary. If you experience excessive force, do not resist physically - this can make things worse and hurt your case. Instead, try to remember badge numbers, names, and witness information. Document injuries with photos if possible. Report the incident to your attorney, file a grievance, and consider filing a complaint with the facility, local police oversight board, or the Department of Justice.',
    legalBasis: 'Fourth and Eighth Amendments; Graham v. Connor, 490 U.S. 386 (1989)',
    sourceUrl: 'https://www.justice.gov/crt/addressing-police-misconduct-laws-enforced-department-justice',
    sourceName: 'U.S. Department of Justice'
  },
  {
    id: '9',
    category: 'Court Rights',
    title: 'Right to a Speedy Trial',
    summary: 'You have the right to have your case heard without unnecessary delay.',
    fullText: 'The Sixth Amendment guarantees your right to a speedy trial. This prevents the government from holding you indefinitely without bringing your case to trial. What constitutes "speedy" varies by jurisdiction and case complexity, but generally ranges from 60-180 days. If this right is violated, charges may be dismissed. However, delays caused by the defense or agreed to by the defense do not count. Discuss timeline concerns with your attorney.',
    legalBasis: 'Sixth Amendment; Barker v. Wingo, 407 U.S. 514 (1972)',
    sourceUrl: 'https://www.law.cornell.edu/wex/speedy_trial',
    sourceName: 'Cornell Law School - Legal Information Institute'
  },
  {
    id: '10',
    category: 'Court Rights',
    title: 'Right to Confront Witnesses',
    summary: 'You have the right to face and cross-examine witnesses against you.',
    fullText: 'The Confrontation Clause of the Sixth Amendment gives you the right to confront witnesses who testify against you. This means witnesses must testify in open court where you can see them, your attorney can cross-examine them, and the jury can assess their credibility. There are limited exceptions for certain types of evidence, but generally, the prosecution cannot use written statements from witnesses who do not appear in court.',
    legalBasis: 'Sixth Amendment; Crawford v. Washington, 541 U.S. 36 (2004)',
    sourceUrl: 'https://www.law.cornell.edu/wex/confrontation_clause',
    sourceName: 'Cornell Law School - Legal Information Institute'
  },
  {
    id: '11',
    category: 'Court Rights',
    title: 'Right to a Jury Trial',
    summary: 'For serious offenses, you have the right to be tried by a jury of your peers.',
    fullText: 'The Sixth Amendment guarantees your right to a jury trial for serious criminal offenses (generally those with potential sentences over 6 months). The jury must be impartial and drawn from a fair cross-section of the community. You can waive this right and choose a bench trial (decided by a judge) if you and your attorney believe it is strategically better for your case. In federal cases and most states, a guilty verdict requires a unanimous jury.',
    legalBasis: 'Sixth Amendment; Duncan v. Louisiana, 391 U.S. 145 (1968)',
    sourceUrl: 'https://www.uscourts.gov/services-forms/jury-service',
    sourceName: 'United States Courts'
  },
  {
    id: '12',
    category: 'Court Rights',
    title: 'Presumption of Innocence',
    summary: 'You are presumed innocent until proven guilty beyond a reasonable doubt.',
    fullText: 'One of the most fundamental principles of American law is that you are presumed innocent until proven guilty. The prosecution bears the burden of proving your guilt beyond a reasonable doubt - you do not have to prove your innocence. This high standard exists because it is better for guilty people to go free than for innocent people to be convicted. Your attorney can challenge the prosecution\'s evidence and present alternative explanations without you ever taking the stand.',
    legalBasis: 'Fifth and Fourteenth Amendments; In re Winship, 397 U.S. 358 (1970)',
    sourceUrl: 'https://www.law.cornell.edu/wex/presumption_of_innocence',
    sourceName: 'Cornell Law School - Legal Information Institute'
  },
  {
    id: '13',
    category: 'Immigration',
    title: 'Immigration Rights During Encounters',
    summary: 'Non-citizens have constitutional rights during police encounters.',
    fullText: 'The Constitution protects everyone in the United States, regardless of immigration status. You have the right to remain silent and do not have to discuss your immigration status with police, immigration agents, or any other officials. You have the right to an attorney, though unlike criminal cases, the government does not have to provide one for immigration proceedings. If you are not a U.S. citizen and an immigration agent requests your documents, you should show them if you have them. Do not lie about your citizenship status or provide false documents.',
    legalBasis: 'Fourth and Fifth Amendments apply to all persons in the U.S.',
    sourceUrl: 'https://www.aclu.org/know-your-rights/immigrants-rights',
    sourceName: 'ACLU - Immigrants\' Rights'
  },
  {
    id: '14',
    category: 'Recording Police',
    title: 'Right to Record Police',
    summary: 'You have the right to record police officers performing their duties in public.',
    fullText: 'The First Amendment protects your right to record police officers performing their official duties in public spaces. This includes taking photos, video, and audio recordings. You do not need permission to record. However, you cannot interfere with legitimate police operations while recording. Stay at a safe distance and do not obstruct officers. Police cannot delete your recordings or seize your device without a warrant. If ordered to stop recording, you can comply while clearly stating you do not consent and believe you have the right to record.',
    legalBasis: 'First Amendment; Glik v. Cunniffe, 655 F.3d 78 (1st Cir. 2011)',
    sourceUrl: 'https://www.aclu.org/know-your-rights/photographers-what-to-do-if-you-are-stopped-or-detained-for-taking-photographs',
    sourceName: 'ACLU - Know Your Rights'
  },
  {
    id: '15',
    category: 'Bail & Detention',
    title: 'Right to Reasonable Bail',
    summary: 'The Eighth Amendment prohibits excessive bail.',
    fullText: 'The Eighth Amendment prohibits excessive bail. Bail should be set at an amount reasonably calculated to ensure you appear for trial, not as punishment. Factors considered include the seriousness of the offense, your criminal history, ties to the community, employment status, and flight risk. If you cannot afford bail, your attorney can request a bail reduction hearing. Some jurisdictions have bail reform that allows release without cash bail for certain offenses. You may also be released on your own recognizance (OR) or with conditions like electronic monitoring.',
    legalBasis: 'Eighth Amendment; Stack v. Boyle, 342 U.S. 1 (1951)',
    sourceUrl: 'https://www.law.cornell.edu/wex/bail',
    sourceName: 'Cornell Law School - Legal Information Institute'
  },
];

// ============================================================================
// LAW UPDATES
// ============================================================================

export const lawUpdates: LawUpdate[] = [
  {
    id: '1',
    priority: 'critical',
    title: 'Federal Marijuana Rescheduling Proposed',
    summary: 'DEA proposes moving marijuana from Schedule I to Schedule III.',
    fullText: 'The Drug Enforcement Administration has proposed reclassifying marijuana from Schedule I to Schedule III under the Controlled Substances Act. This historic change would acknowledge marijuana\'s medical uses and lower potential for abuse compared to Schedule I drugs. While this would not legalize recreational marijuana federally, it would significantly impact federal prosecution priorities, banking access for cannabis businesses, and research opportunities.',
    details: 'This rescheduling would not automatically change state laws. States that have legalized marijuana would continue their programs. States where marijuana remains illegal would still be able to prosecute. However, the federal government would be less likely to interfere with state-legal operations.',
    category: 'Drug Policy',
    effectiveDate: '2024-12-01',
    jurisdiction: 'Federal',
    sourceUrl: 'https://www.dea.gov/press-releases',
    sourceName: 'DEA Press Releases',
    datePosted: '2024-05-01'
  },
  {
    id: '2',
    priority: 'important',
    title: 'Clean Slate Laws Expanding',
    summary: 'More states adopting automatic record expungement for eligible offenses.',
    fullText: 'Clean Slate laws, which automatically seal or expunge certain criminal records after a waiting period, continue to expand across the country. These laws recognize that people who have served their sentences and remained crime-free deserve a second chance without the permanent burden of a criminal record affecting employment, housing, and other opportunities.',
    details: 'States with Clean Slate laws include Pennsylvania, Utah, Michigan, Connecticut, Delaware, Colorado, New Jersey, Virginia, and Oklahoma. Each state has different eligibility criteria and waiting periods. Check your state\'s specific requirements.',
    category: 'Expungement',
    effectiveDate: '2024-01-01',
    jurisdiction: 'Multiple States',
    sourceUrl: 'https://www.cleanslateinitiative.org/',
    sourceName: 'Clean Slate Initiative',
    datePosted: '2024-03-15'
  },
  {
    id: '3',
    priority: 'important',
    title: 'First Step Act Implementation Updates',
    summary: 'Federal prison reform law continues implementation with new programs.',
    fullText: 'The First Step Act, passed in 2018, continues to be implemented with new programs and policies. The law aims to reduce recidivism through evidence-based programs, reform sentencing laws, and improve conditions in federal prisons. Recent updates include expanded good time credits, new rehabilitation programs, and compassionate release provisions.',
    details: 'Key provisions include: earned time credits for participating in programs, retroactive application of Fair Sentencing Act, expanded compassionate release, and prohibition on shackling pregnant inmates. Contact your facility\'s case manager for program availability.',
    category: 'Prison Reform',
    effectiveDate: '2024-06-01',
    jurisdiction: 'Federal',
    sourceUrl: 'https://www.bop.gov/inmates/fsa/',
    sourceName: 'Federal Bureau of Prisons',
    datePosted: '2024-04-20'
  },
  {
    id: '4',
    priority: 'informational',
    title: 'FCC Caps Prison Phone Rates',
    summary: 'New FCC rules limit costs of calls from correctional facilities.',
    fullText: 'The Federal Communications Commission has implemented new rules capping the rates that can be charged for phone calls from prisons and jails. These rules aim to address the predatory pricing that has long burdened families of incarcerated individuals, who often paid dollars per minute for calls.',
    details: 'New rate caps: Interstate calls capped at 6 cents per minute for prisons, 7 cents for jails. Intrastate calls have similar caps. Video visitation rates also capped. Ancillary fees limited. Rules apply to all facilities contracting with covered providers.',
    category: 'Communications',
    effectiveDate: '2024-04-01',
    jurisdiction: 'Federal',
    sourceUrl: 'https://www.fcc.gov/incarcerated-people',
    sourceName: 'FCC - Incarcerated People\'s Communications',
    datePosted: '2024-02-10'
  },
  {
    id: '5',
    priority: 'critical',
    title: 'Bail Reform Updates in Multiple States',
    summary: 'Several states modifying cash bail requirements for non-violent offenses.',
    fullText: 'Multiple states are reforming their bail systems to reduce pretrial detention for those who cannot afford cash bail. These reforms recognize that cash bail often results in poor defendants remaining in jail while wealthy defendants charged with the same crimes go free.',
    details: 'States with significant bail reforms include: New Jersey (virtually eliminated cash bail), California (risk assessment based), New York (eliminated for most misdemeanors and non-violent felonies), Illinois (ended cash bail 2023). Check your state for specific changes.',
    category: 'Bail Reform',
    effectiveDate: '2024-01-01',
    jurisdiction: 'Multiple States',
    sourceUrl: 'https://www.prisonpolicy.org/reports/bail_reform.html',
    sourceName: 'Prison Policy Initiative',
    datePosted: '2024-01-05'
  },
];

// ============================================================================
// FACILITIES DATABASE
// ============================================================================

export const facilities: Facility[] = [
  {
    id: '1',
    name: 'Los Angeles County Jail (Twin Towers)',
    type: 'county',
    address: '450 Bauchet Street',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90012',
    phone: '(213) 473-6100',
    phoneServices: 'GTL',
    commissaryProvider: 'Keefe Commissary',
    securePackVendors: ['Access Securepak', 'iCare Gifts'],
    visitationHours: 'Daily 7:30 AM - 3:00 PM (by appointment)',
    websiteUrl: 'https://lasd.org/custody/'
  },
  {
    id: '2',
    name: 'Cook County Jail',
    type: 'county',
    address: '2700 S. California Avenue',
    city: 'Chicago',
    state: 'IL',
    zip: '60608',
    phone: '(773) 674-7100',
    phoneServices: 'Securus',
    commissaryProvider: 'Keefe Commissary',
    securePackVendors: ['Access Securepak'],
    visitationHours: 'Sat-Sun 8:00 AM - 3:00 PM',
    websiteUrl: 'https://www.cookcountysheriff.org/cook-county-department-of-corrections/'
  },
  {
    id: '3',
    name: 'Harris County Jail',
    type: 'county',
    address: '1200 Baker Street',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    phone: '(713) 755-6044',
    phoneServices: 'Securus',
    commissaryProvider: 'Commissary Deposit',
    securePackVendors: ['Access Securepak', 'Jail ATM'],
    visitationHours: 'Daily 8:00 AM - 4:00 PM',
    websiteUrl: 'https://www.harriscountyso.org/Jail_Info/'
  },
  {
    id: '4',
    name: 'Rikers Island (NYC DOC)',
    type: 'county',
    address: '15-15 Hazen Street',
    city: 'East Elmhurst',
    state: 'NY',
    zip: '11370',
    phone: '(718) 546-0700',
    phoneServices: 'Securus',
    commissaryProvider: 'Aramark',
    securePackVendors: ['Access Securepak', 'Union Supply'],
    visitationHours: 'Daily (varies by facility)',
    websiteUrl: 'https://www.nyc.gov/site/doc/index.page'
  },
  {
    id: '5',
    name: 'Maricopa County Jail',
    type: 'county',
    address: '234 S. 4th Avenue',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85003',
    phone: '(602) 876-0322',
    phoneServices: 'Securus',
    commissaryProvider: 'Keefe Commissary',
    securePackVendors: ['Access Securepak'],
    visitationHours: 'Sat-Sun 8:00 AM - 3:00 PM',
    websiteUrl: 'https://www.mcso.org/JailInformation'
  },
  {
    id: '6',
    name: 'San Quentin State Prison',
    type: 'state',
    address: 'San Quentin State Prison',
    city: 'San Quentin',
    state: 'CA',
    zip: '94964',
    phone: '(415) 454-1460',
    phoneServices: 'GTL',
    commissaryProvider: 'CDCR Trust',
    securePackVendors: ['Access Securepak', 'Walkenhorst\'s'],
    visitationHours: 'Sat-Sun 7:30 AM - 2:30 PM',
    websiteUrl: 'https://www.cdcr.ca.gov/facility-locator/sq/'
  },
  {
    id: '7',
    name: 'FCI Terminal Island',
    type: 'federal',
    address: '1299 Seaside Avenue',
    city: 'San Pedro',
    state: 'CA',
    zip: '90731',
    phone: '(310) 831-8961',
    phoneServices: 'CorrLinks (email) / TRULINCS',
    commissaryProvider: 'BOP Commissary',
    securePackVendors: ['Union Supply'],
    visitationHours: 'Fri-Mon 8:00 AM - 3:00 PM',
    websiteUrl: 'https://www.bop.gov/locations/institutions/trm/'
  },
  {
    id: '8',
    name: 'USP Atlanta',
    type: 'federal',
    address: '601 McDonough Boulevard SE',
    city: 'Atlanta',
    state: 'GA',
    zip: '30315',
    phone: '(404) 635-5100',
    phoneServices: 'CorrLinks (email) / TRULINCS',
    commissaryProvider: 'BOP Commissary',
    securePackVendors: ['Union Supply'],
    visitationHours: 'Sat-Sun-Mon 8:00 AM - 3:00 PM',
    websiteUrl: 'https://www.bop.gov/locations/institutions/atl/'
  },
  {
    id: '9',
    name: 'Philadelphia Industrial Correctional Center',
    type: 'county',
    address: '8001 State Road',
    city: 'Philadelphia',
    state: 'PA',
    zip: '19136',
    phone: '(215) 685-7500',
    phoneServices: 'GTL',
    commissaryProvider: 'Keefe Commissary',
    securePackVendors: ['Access Securepak', 'iCare Gifts'],
    visitationHours: 'Sat-Sun 8:00 AM - 2:00 PM',
    websiteUrl: 'https://www.phila.gov/departments/philadelphia-prisons/'
  },
  {
    id: '10',
    name: 'Miami-Dade Corrections',
    type: 'county',
    address: '3505 NW 27th Avenue',
    city: 'Miami',
    state: 'FL',
    zip: '33142',
    phone: '(786) 263-5100',
    phoneServices: 'GTL',
    commissaryProvider: 'Keefe Commissary',
    securePackVendors: ['Access Securepak'],
    visitationHours: 'Sat-Sun 9:00 AM - 3:00 PM',
    websiteUrl: 'https://www.miamidade.gov/global/corrections/home.page'
  },
];

// ============================================================================
// PHONE SERVICE PROVIDERS
// ============================================================================

export const phoneProviders: PhoneProvider[] = [
  {
    id: '1',
    name: 'GTL (Global Tel Link)',
    description: 'One of the largest prison phone service providers in the United States, serving over 2,200 correctional facilities.',
    websiteUrl: 'https://www.gtl.net/',
    appUrl: 'https://www.gtl.net/gtl-getting-connected-app/',
    customerService: '1-800-483-8314',
    setupSteps: [
      'Create an account at connectnetwork.com or download the GettingOut app',
      'Add the facility where your loved one is housed',
      'Add funds to your account using credit/debit card or MoneyGram',
      'Set up your phone number to receive calls',
      'Your loved one can call you collect or using their PIN'
    ]
  },
  {
    id: '2',
    name: 'Securus Technologies',
    description: 'Major provider of communication services to correctional facilities across North America.',
    websiteUrl: 'https://securustech.net/',
    appUrl: 'https://securustech.net/solutions/consumer-services/',
    customerService: '1-800-844-6591',
    setupSteps: [
      'Visit securustech.net and create an account',
      'Search for the facility by state and name',
      'Add funds via credit card, debit card, or cash at retail locations',
      'Register your phone number to receive calls',
      'Set up video visitation if available at the facility'
    ]
  },
  {
    id: '3',
    name: 'ICSolutions',
    description: 'Provides inmate calling services to jails and prisons, now part of ViaPath Technologies.',
    websiteUrl: 'https://www.icsolutions.com/',
    appUrl: 'https://www.icsolutions.com/friends-and-family/',
    customerService: '1-888-506-8407',
    setupSteps: [
      'Go to icsolutions.com and click "Friends & Family"',
      'Create an account with your email and phone number',
      'Find your facility and set up prepaid or collect calling',
      'Add money to your account online or at participating retailers',
      'Receive calls from your incarcerated loved one'
    ]
  },
  {
    id: '4',
    name: 'ViaPath Technologies (formerly GTL/Securus)',
    description: 'Merged company providing comprehensive communication solutions to correctional facilities.',
    websiteUrl: 'https://www.viapath.com/',
    appUrl: 'https://www.viapath.com/solutions/communications/',
    customerService: '1-866-230-7761',
    setupSteps: [
      'Check which platform your facility uses (GTL or Securus)',
      'Create account on the appropriate platform',
      'Fund your account using available payment methods',
      'Register phone numbers and set up video visits if available',
      'Download mobile app for easier account management'
    ]
  },
  {
    id: '5',
    name: 'CorrLinks (Federal)',
    description: 'Official email system for federal inmates managed by the Bureau of Prisons.',
    websiteUrl: 'https://www.corrlinks.com/',
    appUrl: 'https://www.corrlinks.com/',
    customerService: '1-800-868-9044',
    setupSteps: [
      'Your incarcerated loved one must add you to their contact list first',
      'You will receive an email invitation to join CorrLinks',
      'Create your account using the invitation link',
      'Add funds using credit card (messages cost about 5 cents each)',
      'Send and receive text-based messages (no attachments)'
    ]
  },
  {
    id: '6',
    name: 'JPay',
    description: 'Provides email, video visits, and money transfer services to state correctional facilities.',
    websiteUrl: 'https://www.jpay.com/',
    appUrl: 'https://www.jpay.com/PApp.aspx',
    customerService: '1-800-574-5729',
    setupSteps: [
      'Download the JPay app or visit jpay.com',
      'Create an account and search for your loved one by name or ID',
      'Purchase stamps to send emails (prices vary by state)',
      'Set up video visitation if available at the facility',
      'Send money to their trust account through the app'
    ]
  },
];

// ============================================================================
// COMMISSARY PROVIDERS
// ============================================================================

export const commissaryProviders: CommissaryProvider[] = [
  {
    id: '1',
    name: 'Keefe Commissary Network',
    description: 'Largest commissary provider in the U.S., serving over 900 correctional facilities.',
    websiteUrl: 'https://www.keefegroup.com/',
    methods: ['Online at accesscorrections.com', 'Phone: 1-866-345-1884', 'Money order', 'Lobby kiosk at facility']
  },
  {
    id: '2',
    name: 'Access Corrections',
    description: 'Online platform for depositing money to inmate accounts at participating facilities.',
    websiteUrl: 'https://www.accesscorrections.com/',
    methods: ['Online deposit', 'Mobile app', 'Phone deposit', 'MoneyGram', 'Lobby kiosk']
  },
  {
    id: '3',
    name: 'JPay',
    description: 'Money transfer and commissary services for state prisons.',
    websiteUrl: 'https://www.jpay.com/',
    methods: ['Online at jpay.com', 'JPay mobile app', 'MoneyGram', 'Phone: 1-800-574-5729']
  },
  {
    id: '4',
    name: 'TouchPay',
    description: 'Provides deposit services for jail commissary accounts.',
    websiteUrl: 'https://www.touchpaydirect.com/',
    methods: ['Online deposit', 'Phone deposit', 'Lobby kiosk', 'Cash at retail locations']
  },
  {
    id: '5',
    name: 'Western Union',
    description: 'Money transfer services accepted at many correctional facilities.',
    websiteUrl: 'https://www.westernunion.com/',
    methods: ['Online transfer', 'Western Union locations', 'Phone transfer', 'Mobile app']
  },
  {
    id: '6',
    name: 'MoneyGram',
    description: 'Money transfer services for inmate accounts at participating facilities.',
    websiteUrl: 'https://www.moneygram.com/',
    methods: ['Online at moneygram.com', 'Walmart locations', 'CVS locations', 'Mobile app']
  },
];

// ============================================================================
// SECURE PACK / CARE PACKAGE VENDORS
// ============================================================================

export const securePackVendors: SecurePackVendor[] = [
  {
    id: '1',
    name: 'Access Securepak',
    description: 'Largest care package provider for correctional facilities nationwide.',
    websiteUrl: 'https://www.accesssecurepak.com/',
    typicalItems: ['Food items', 'Clothing', 'Electronics (where allowed)', 'Hygiene products', 'Books and magazines', 'Holiday packages']
  },
  {
    id: '2',
    name: 'Union Supply',
    description: 'Care packages and direct purchase items for federal and state facilities.',
    websiteUrl: 'https://www.unionsupply.com/',
    typicalItems: ['Food packages', 'Personal care items', 'Clothing', 'Electronics', 'Educational materials']
  },
  {
    id: '3',
    name: 'iCare Gifts',
    description: 'Gift packages for inmates at participating facilities.',
    websiteUrl: 'https://www.icaregifts.com/',
    typicalItems: ['Food packages', 'Snack boxes', 'Holiday specials', 'Birthday packages', 'Hygiene kits']
  },
  {
    id: '4',
    name: 'Walkenhorst\'s',
    description: 'Catalog ordering for California state prison inmates.',
    websiteUrl: 'https://www.walkenhorsts.com/',
    typicalItems: ['Clothing', 'Electronics', 'Food items', 'Personal care', 'Educational materials', 'Hobby supplies']
  },
  {
    id: '5',
    name: 'Jail ATM',
    description: 'Care packages and commissary deposits for county jails.',
    websiteUrl: 'https://www.jailatm.com/',
    typicalItems: ['Food packages', 'Hygiene items', 'Clothing', 'Phone time', 'Commissary deposits']
  },
  {
    id: '6',
    name: 'Inmate Canteen',
    description: 'Online ordering for approved items at participating facilities.',
    websiteUrl: 'https://www.inmatecanteen.com/',
    typicalItems: ['Snacks and food', 'Drinks', 'Personal care', 'Writing supplies', 'Entertainment']
  },
];

// ============================================================================
// COMPREHENSIVE RESOURCES
// ============================================================================

export const resources: Resource[] = [
  // Legal Aid Organizations
  { id: '1', category: 'Legal Aid', name: 'Legal Services Corporation', description: 'Find free legal aid in your area for civil legal issues.', websiteUrl: 'https://www.lsc.gov/find-legal-aid', phone: '202-295-1500', national: true },
  { id: '2', category: 'Legal Aid', name: 'American Bar Association Free Legal Help', description: 'Directory of free legal help resources by state.', websiteUrl: 'https://www.americanbar.org/groups/legal_services/flh-home/', national: true },
  { id: '3', category: 'Legal Aid', name: 'LawHelp.org', description: 'Find free legal aid programs, information, and court forms.', websiteUrl: 'https://www.lawhelp.org/', national: true },
  { id: '4', category: 'Legal Aid', name: 'Avvo Free Legal Advice', description: 'Free legal advice from attorneys and lawyer directory.', websiteUrl: 'https://www.avvo.com/', national: true },
  
  // Civil Rights Organizations
  { id: '5', category: 'Civil Rights', name: 'ACLU', description: 'Defending civil liberties and constitutional rights.', websiteUrl: 'https://www.aclu.org/', phone: '212-549-2500', national: true },
  { id: '6', category: 'Civil Rights', name: 'NAACP Legal Defense Fund', description: 'Fighting for racial justice through litigation and advocacy.', websiteUrl: 'https://www.naacpldf.org/', phone: '212-965-2200', national: true },
  { id: '7', category: 'Civil Rights', name: 'Southern Poverty Law Center', description: 'Fighting hate and bigotry through litigation and education.', websiteUrl: 'https://www.splcenter.org/', phone: '334-956-8200', national: true },
  { id: '8', category: 'Civil Rights', name: 'Lawyers\' Committee for Civil Rights', description: 'Securing equal justice through legal advocacy.', websiteUrl: 'https://www.lawyerscommittee.org/', phone: '202-662-8600', national: true },
  
  // Prison Reform Organizations
  { id: '9', category: 'Prison Reform', name: 'The Sentencing Project', description: 'Research and advocacy for criminal justice reform.', websiteUrl: 'https://www.sentencingproject.org/', national: true },
  { id: '10', category: 'Prison Reform', name: 'Prison Policy Initiative', description: 'Research and advocacy to reduce mass incarceration.', websiteUrl: 'https://www.prisonpolicy.org/', national: true },
  { id: '11', category: 'Prison Reform', name: 'The Marshall Project', description: 'Nonprofit journalism about criminal justice.', websiteUrl: 'https://www.themarshallproject.org/', national: true },
  { id: '12', category: 'Prison Reform', name: 'Vera Institute of Justice', description: 'Research and policy reform for justice system.', websiteUrl: 'https://www.vera.org/', phone: '212-334-1300', national: true },
  { id: '13', category: 'Prison Reform', name: 'Equal Justice Initiative', description: 'Challenging racial and economic injustice.', websiteUrl: 'https://eji.org/', phone: '334-269-1803', national: true },
  
  // Innocence Projects
  { id: '14', category: 'Innocence', name: 'Innocence Project', description: 'Exonerating wrongfully convicted through DNA testing.', websiteUrl: 'https://innocenceproject.org/', phone: '212-364-5340', national: true },
  { id: '15', category: 'Innocence', name: 'National Registry of Exonerations', description: 'Database of all known exonerations in the U.S.', websiteUrl: 'https://www.law.umich.edu/special/exoneration/', national: true },
  
  // Family Support
  { id: '16', category: 'Family Support', name: 'Prison Fellowship', description: 'Supporting prisoners, former prisoners, and their families.', websiteUrl: 'https://www.prisonfellowship.org/', phone: '800-206-9764', national: true },
  { id: '17', category: 'Family Support', name: 'Angel Tree', description: 'Christmas gifts for children of incarcerated parents.', websiteUrl: 'https://www.prisonfellowship.org/about/angel-tree/', national: true },
  { id: '18', category: 'Family Support', name: 'Sesame Street - Little Children, Big Challenges', description: 'Resources for children with incarcerated parents.', websiteUrl: 'https://sesamestreet.org/toolkits/incarceration/', national: true },
  { id: '19', category: 'Family Support', name: 'FAMM (Families Against Mandatory Minimums)', description: 'Advocating for fair sentencing and supporting families.', websiteUrl: 'https://famm.org/', phone: '202-822-6700', national: true },
  { id: '20', category: 'Family Support', name: 'Hour Children', description: 'Support for incarcerated mothers and their children.', websiteUrl: 'https://hourchildren.org/', phone: '718-433-4724', national: false },
  
  // Reentry Resources
  { id: '21', category: 'Reentry', name: 'National Reentry Resource Center', description: 'Information and resources for successful reentry.', websiteUrl: 'https://nationalreentryresourcecenter.org/', national: true },
  { id: '22', category: 'Reentry', name: 'Reentry Council', description: 'Federal interagency reentry council resources.', websiteUrl: 'https://csgjusticecenter.org/nrrc/', national: true },
  { id: '23', category: 'Reentry', name: 'The Fortune Society', description: 'Reentry services in New York.', websiteUrl: 'https://fortunesociety.org/', phone: '212-691-7554', national: false },
  { id: '24', category: 'Reentry', name: 'Center for Employment Opportunities', description: 'Jobs and support for people with criminal records.', websiteUrl: 'https://ceoworks.org/', national: true },
  { id: '25', category: 'Reentry', name: 'Safer Foundation', description: 'Employment and reentry services in Illinois.', websiteUrl: 'https://saferfoundation.org/', phone: '312-922-2200', national: false },
  
  // Employment for People with Records
  { id: '26', category: 'Employment', name: 'Dave\'s Killer Bread Foundation', description: 'Second chance employment advocacy and resources.', websiteUrl: 'https://www.dkbfoundation.org/', national: true },
  { id: '27', category: 'Employment', name: '70 Million Jobs', description: 'Job board for people with criminal records.', websiteUrl: 'https://www.70millionjobs.com/', national: true },
  { id: '28', category: 'Employment', name: 'Honest Jobs', description: 'Employment platform for people with criminal backgrounds.', websiteUrl: 'https://www.honestjobs.co/', national: true },
  { id: '29', category: 'Employment', name: 'Checkr - Fair Chance', description: 'Resources on fair chance hiring practices.', websiteUrl: 'https://checkr.com/resources/fair-chance', national: true },
  
  // Mental Health
  { id: '30', category: 'Mental Health', name: 'SAMHSA National Helpline', description: '24/7 treatment referral service for mental health and substance abuse.', websiteUrl: 'https://www.samhsa.gov/find-help/national-helpline', phone: '1-800-662-4357', national: true },
  { id: '31', category: 'Mental Health', name: 'NAMI (National Alliance on Mental Illness)', description: 'Mental health support and advocacy.', websiteUrl: 'https://www.nami.org/', phone: '1-800-950-6264', national: true },
  { id: '32', category: 'Mental Health', name: '988 Suicide & Crisis Lifeline', description: '24/7 crisis support.', websiteUrl: 'https://988lifeline.org/', phone: '988', national: true },
  
  // Substance Abuse
  { id: '33', category: 'Substance Abuse', name: 'Alcoholics Anonymous', description: 'Support for people recovering from alcoholism.', websiteUrl: 'https://www.aa.org/', national: true },
  { id: '34', category: 'Substance Abuse', name: 'Narcotics Anonymous', description: 'Support for people recovering from drug addiction.', websiteUrl: 'https://www.na.org/', national: true },
  { id: '35', category: 'Substance Abuse', name: 'SMART Recovery', description: 'Science-based addiction recovery support.', websiteUrl: 'https://www.smartrecovery.org/', national: true },
  
  // Housing
  { id: '36', category: 'Housing', name: 'HUD - Housing for People with Criminal Records', description: 'Information on housing rights and resources.', websiteUrl: 'https://www.hud.gov/', phone: '1-800-569-4287', national: true },
  { id: '37', category: 'Housing', name: 'National Low Income Housing Coalition', description: 'Affordable housing advocacy and resources.', websiteUrl: 'https://nlihc.org/', national: true },
  { id: '38', category: 'Housing', name: 'Homeward Bound', description: 'Transitional housing programs.', websiteUrl: 'https://www.homewardboundofmarin.org/', national: false },
  
  // Food Assistance
  { id: '39', category: 'Food Assistance', name: 'Feeding America', description: 'Find local food banks and pantries.', websiteUrl: 'https://www.feedingamerica.org/find-your-local-foodbank', national: true },
  { id: '40', category: 'Food Assistance', name: 'SNAP (Food Stamps)', description: 'Apply for food assistance benefits.', websiteUrl: 'https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program', national: true },
  
  // Victim Services
  { id: '41', category: 'Victim Services', name: 'National Center for Victims of Crime', description: 'Resources and support for crime victims.', websiteUrl: 'https://victimsofcrime.org/', phone: '1-855-484-2846', national: true },
  { id: '42', category: 'Victim Services', name: 'RAINN', description: 'Support for survivors of sexual violence.', websiteUrl: 'https://www.rainn.org/', phone: '1-800-656-4673', national: true },
  { id: '43', category: 'Victim Services', name: 'National Domestic Violence Hotline', description: '24/7 support for domestic violence survivors.', websiteUrl: 'https://www.thehotline.org/', phone: '1-800-799-7233', national: true },
  
  // Government Resources
  { id: '44', category: 'Government', name: 'USA.gov - Criminal Justice', description: 'Federal criminal justice information.', websiteUrl: 'https://www.usa.gov/crime', national: true },
  { id: '45', category: 'Government', name: 'Bureau of Justice Statistics', description: 'Criminal justice statistics and data.', websiteUrl: 'https://bjs.ojp.gov/', national: true },
  { id: '46', category: 'Government', name: 'DOJ Civil Rights Division', description: 'Report civil rights violations.', websiteUrl: 'https://www.justice.gov/crt', phone: '202-514-4609', national: true },
  
  // Expungement Resources
  { id: '47', category: 'Expungement', name: 'Clean Slate Initiative', description: 'Advocacy for automatic record clearing.', websiteUrl: 'https://www.cleanslateinitiative.org/', national: true },
  { id: '48', category: 'Expungement', name: 'Collateral Consequences Resource Center', description: 'Information on record clearing by state.', websiteUrl: 'https://ccresourcecenter.org/', national: true },
  { id: '49', category: 'Expungement', name: 'RecordGone.com', description: 'Expungement information and services.', websiteUrl: 'https://www.recordgone.com/', national: true },
  
  // Bail Resources
  { id: '50', category: 'Bail', name: 'The Bail Project', description: 'Free bail assistance for low-income individuals.', websiteUrl: 'https://bailproject.org/', national: true },
  { id: '51', category: 'Bail', name: 'National Bail Fund Network', description: 'Directory of community bail funds.', websiteUrl: 'https://www.communityjusticeexchange.org/nbfn-directory', national: true },
];

// ============================================================================
// LEGAL AID BY STATE
// ============================================================================

export const legalAidOrgs: LegalAidOrg[] = [
  { id: 'ca-1', name: 'Legal Aid Foundation of Los Angeles', state: 'CA', phone: '800-399-4529', website: 'https://lafla.org/', services: ['Housing', 'Family Law', 'Immigration', 'Public Benefits'] },
  { id: 'ca-2', name: 'Bay Area Legal Aid', state: 'CA', phone: '800-551-5554', website: 'https://baylegal.org/', services: ['Housing', 'Family Law', 'Consumer', 'Health'] },
  { id: 'ny-1', name: 'Legal Aid Society of NYC', state: 'NY', phone: '212-577-3300', website: 'https://legalaidnyc.org/', services: ['Criminal Defense', 'Civil', 'Juvenile Rights'] },
  { id: 'ny-2', name: 'Legal Services NYC', state: 'NY', phone: '917-661-4500', website: 'https://www.legalservicesnyc.org/', services: ['Housing', 'Family', 'Immigration', 'Benefits'] },
  { id: 'tx-1', name: 'Texas RioGrande Legal Aid', state: 'TX', phone: '888-988-9996', website: 'https://www.trla.org/', services: ['Housing', 'Family', 'Immigration', 'Employment'] },
  { id: 'tx-2', name: 'Lone Star Legal Aid', state: 'TX', phone: '800-733-8394', website: 'https://lonestarlegal.org/', services: ['Housing', 'Family', 'Consumer', 'Benefits'] },
  { id: 'fl-1', name: 'Florida Legal Services', state: 'FL', phone: '800-405-1417', website: 'https://www.floridalegal.org/', services: ['Housing', 'Family', 'Immigration', 'Disaster Relief'] },
  { id: 'il-1', name: 'Legal Aid Chicago', state: 'IL', phone: '312-341-1070', website: 'https://www.legalaidchicago.org/', services: ['Housing', 'Family', 'Consumer', 'Benefits'] },
  { id: 'pa-1', name: 'Philadelphia Legal Assistance', state: 'PA', phone: '215-981-3800', website: 'https://philalegal.org/', services: ['Housing', 'Family', 'Employment', 'Benefits'] },
  { id: 'ga-1', name: 'Atlanta Legal Aid Society', state: 'GA', phone: '404-524-5811', website: 'https://atlantalegalaid.org/', services: ['Housing', 'Family', 'Consumer', 'Health'] },
];

// ============================================================================
// REENTRY PROGRAMS
// ============================================================================

export const reentryPrograms: ReentryProgram[] = [
  { id: '1', name: 'Federal Bonding Program', type: 'Employment', coverage: 'National', website: 'https://bonds4jobs.com/', phone: '877-872-5627', services: ['Free fidelity bonds for employers hiring people with records'] },
  { id: '2', name: 'Work Opportunity Tax Credit', type: 'Employment', coverage: 'National', website: 'https://www.dol.gov/agencies/eta/wotc', services: ['Tax credits for employers hiring people with felony convictions'] },
  { id: '3', name: 'Delancey Street Foundation', type: 'Residential', coverage: 'CA, NY, NM, NC', website: 'https://www.delanceystreetfoundation.org/', phone: '415-512-5104', services: ['Housing', 'Job training', 'Education', 'Life skills'] },
  { id: '4', name: 'Pioneer Human Services', type: 'Comprehensive', coverage: 'WA', website: 'https://pioneerhumanservices.org/', phone: '206-766-7000', services: ['Housing', 'Employment', 'Treatment', 'Education'] },
  { id: '5', name: 'Homeboy Industries', type: 'Employment', coverage: 'CA', website: 'https://homeboyindustries.org/', phone: '323-526-1254', services: ['Job training', 'Tattoo removal', 'Mental health', 'Education'] },
];

// ============================================================================
// FAQs
// ============================================================================

export const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Rights',
    question: 'Can police search my car without a warrant?',
    answer: 'Police can search your car without a warrant if they have probable cause to believe it contains evidence of a crime, if you consent to the search, if contraband is in plain view, or during a lawful arrest. You have the right to refuse consent by clearly stating "I do not consent to this search." However, if they have probable cause, they may search anyway. Never physically resist, but clearly state your objection.'
  },
  {
    id: '2',
    category: 'Rights',
    question: 'What should I do if I\'m arrested?',
    answer: 'Stay calm and do not resist. Clearly state: "I am exercising my right to remain silent" and "I want to speak to a lawyer." Do not answer any questions or sign anything without your attorney present. Provide your name if asked, but nothing more. Remember badge numbers and officer names if possible. Contact a family member or attorney as soon as you are allowed to make a phone call.'
  },
  {
    id: '3',
    category: 'Family',
    question: 'How do I find out where someone is incarcerated?',
    answer: 'Use the state\'s Department of Corrections inmate search (links provided in this app), the Federal BOP Inmate Locator for federal inmates, or VINE (Victim Information and Notification Everyday) at vinelink.com. You can also call the local jail or sheriff\'s office. For recent arrests, check the county jail where the arrest occurred first.'
  },
  {
    id: '4',
    category: 'Family',
    question: 'How do I put money on an inmate\'s books?',
    answer: 'Methods vary by facility but typically include: online deposits through the facility\'s approved provider (GTL, JPay, Access Corrections), phone deposits, money orders mailed to the facility, lobby kiosks at the facility, or cash deposits at retail locations like Walmart or MoneyGram. Check with the specific facility for accepted methods and any limits.'
  },
  {
    id: '5',
    category: 'Family',
    question: 'How do I set up phone calls with an inmate?',
    answer: 'First, find out which phone provider the facility uses (GTL, Securus, ICSolutions, etc.). Create an account on their website or app, add funds, and register your phone number. The inmate will need to add you to their approved call list. Calls may be collect (you pay) or debit (from their account). Video visits may also be available through the same provider.'
  },
  {
    id: '6',
    category: 'Expungement',
    question: 'Can I get my criminal record expunged?',
    answer: 'Eligibility depends on your state, the type of offense, how much time has passed, and whether you\'ve completed your sentence. Many states allow expungement of misdemeanors and some non-violent felonies after a waiting period. Some states have "Clean Slate" laws that automatically seal eligible records. Use the Eligibility Quiz in this app to get a preliminary assessment, then consult with an attorney.'
  },
  {
    id: '7',
    category: 'Expungement',
    question: 'How long does expungement take?',
    answer: 'The process typically takes 3-6 months but can vary significantly by state and case complexity. Steps include: obtaining your criminal record, filing a petition with the court, paying filing fees, potentially attending a hearing, and waiting for the judge\'s decision. Some states have backlogs that extend the timeline. An attorney can help expedite the process.'
  },
  {
    id: '8',
    category: 'Bail',
    question: 'How does bail work?',
    answer: 'Bail is money paid to the court to ensure you appear for trial. Options include: cash bail (pay full amount, refunded after case), bail bond (pay 10-15% to a bondsman, non-refundable), property bond (use property as collateral), or release on own recognizance (no money required). A judge sets bail based on the charges, your criminal history, flight risk, and community ties.'
  },
  {
    id: '9',
    category: 'Bail',
    question: 'What if I can\'t afford bail?',
    answer: 'Options include: requesting a bail reduction hearing, contacting a community bail fund (The Bail Project, local bail funds), asking about release on own recognizance, or exploring pretrial services programs. Some jurisdictions have reformed bail to reduce cash bail for non-violent offenses. A public defender can argue for lower bail at your arraignment.'
  },
  {
    id: '10',
    category: 'Court',
    question: 'What is the difference between a public defender and a private attorney?',
    answer: 'Public defenders are free, court-appointed attorneys for those who cannot afford private counsel. They are licensed attorneys with criminal law experience but often have heavy caseloads. Private attorneys are hired directly by you, may have more time for your case, and you can choose based on specialty. Both can provide effective representation - the quality depends on the individual attorney, not just whether they\'re public or private.'
  },
  {
    id: '11',
    category: 'Court',
    question: 'What happens at an arraignment?',
    answer: 'At arraignment, you appear before a judge to hear the formal charges against you and enter a plea (guilty, not guilty, or no contest). The judge will also set bail, appoint an attorney if needed, and schedule future court dates. This is usually your first court appearance after arrest. It\'s important to have an attorney present if possible, even at this early stage.'
  },
  {
    id: '12',
    category: 'Incarceration',
    question: 'What rights do inmates have?',
    answer: 'Inmates retain many constitutional rights including: protection from cruel and unusual punishment, right to adequate medical care, right to access the courts, freedom of religion, limited free speech rights, and due process in disciplinary proceedings. However, these rights are limited by legitimate security concerns. If your rights are violated, document everything and file grievances through official channels.'
  },
  {
    id: '13',
    category: 'Incarceration',
    question: 'How do I file a grievance in prison or jail?',
    answer: 'Most facilities have a formal grievance process. Steps typically include: requesting a grievance form from staff, describing the issue in detail with dates and names, submitting the form to the designated office, keeping copies of everything, and following up on deadlines. If the grievance is denied, you usually have the right to appeal. Exhaust all administrative remedies before considering legal action.'
  },
  {
    id: '14',
    category: 'Reentry',
    question: 'How can I find a job with a criminal record?',
    answer: 'Many employers hire people with records. Look for "Ban the Box" employers who don\'t ask about criminal history on applications, companies known for second-chance hiring (see Job Resources in this app), staffing agencies that work with people with records, and job training programs. Be honest when asked about your record, emphasize rehabilitation, and highlight skills and experience. Consider getting certificates or training to strengthen your resume.'
  },
  {
    id: '15',
    category: 'Reentry',
    question: 'Can I get housing with a criminal record?',
    answer: 'Yes, though it can be challenging. Options include: private landlords (who may be more flexible than large companies), transitional housing programs, housing through reentry organizations, and public housing (HUD has guidance limiting blanket bans). Some states and cities have "fair chance housing" laws limiting criminal background checks. Be prepared to provide references, proof of income, and evidence of rehabilitation.'
  },
];

// ============================================================================
// EMERGENCY CONTACTS
// ============================================================================

export const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: 'National Suicide Prevention Lifeline', phone: '988', description: '24/7 crisis support for anyone in emotional distress' },
  { id: '2', name: 'SAMHSA National Helpline', phone: '1-800-662-4357', description: '24/7 treatment referral for mental health and substance abuse' },
  { id: '3', name: 'National Domestic Violence Hotline', phone: '1-800-799-7233', description: '24/7 support for domestic violence survivors' },
  { id: '4', name: 'RAINN Sexual Assault Hotline', phone: '1-800-656-4673', description: '24/7 support for survivors of sexual violence' },
  { id: '5', name: 'National Child Abuse Hotline', phone: '1-800-422-4453', description: '24/7 crisis intervention and support' },
  { id: '6', name: 'Veterans Crisis Line', phone: '988 (press 1)', description: '24/7 support for veterans in crisis' },
  { id: '7', name: 'Trans Lifeline', phone: '877-565-8860', description: 'Crisis support for transgender individuals' },
  { id: '8', name: 'Trevor Project (LGBTQ Youth)', phone: '1-866-488-7386', description: '24/7 crisis support for LGBTQ young people' },
  { id: '9', name: 'National Human Trafficking Hotline', phone: '1-888-373-7888', description: '24/7 support for trafficking survivors' },
  { id: '10', name: 'Poison Control', phone: '1-800-222-1222', description: '24/7 poison emergency assistance' },
  { id: '11', name: 'FBI Tips', phone: '1-800-225-5324', description: 'Report federal crimes and civil rights violations' },
  { id: '12', name: 'ICE Detention Reporting', phone: '1-888-351-4024', description: 'Report detention facility concerns' },
];


// ============================================================================
// RIGHTS CATEGORIES
// ============================================================================

export const rightsCategories = [
  { id: 'arrest', name: 'During Arrest', icon: 'hand.raised', description: 'Know your rights when stopped or arrested by police' },
  { id: 'search', name: 'Search & Seizure', icon: 'magnifyingglass', description: 'Protection from unreasonable searches' },
  { id: 'custody', name: 'In Custody', icon: 'building.columns', description: 'Rights while detained or incarcerated' },
  { id: 'court', name: 'Court Rights', icon: 'scale.3d', description: 'Your rights in the courtroom' },
  { id: 'immigration', name: 'Immigration', icon: 'globe', description: 'Rights for non-citizens' },
  { id: 'recording', name: 'Recording Police', icon: 'video', description: 'Your right to document police encounters' },
  { id: 'bail', name: 'Bail & Detention', icon: 'dollarsign.circle', description: 'Understanding bail and pretrial detention' },
];
