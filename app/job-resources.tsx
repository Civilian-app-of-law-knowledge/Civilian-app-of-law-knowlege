import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

type Employer = {
  name: string;
  industry: string;
  description: string;
  website: string;
  notes: string;
  banTheBox?: boolean;
  openHiring?: boolean;
};

export default function JobResourcesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllEmployers, setShowAllEmployers] = useState(false);

  const secondChanceEmployers: Employer[] = [
    // === RETAIL ===
    {
      name: 'Walmart',
      industry: 'Retail',
      description: 'Largest private employer in the U.S. Hires people with criminal records and considers each case individually after a conditional offer.',
      website: 'https://careers.walmart.com/',
      notes: 'Over 1.6 million U.S. employees. Positions: cashier, stocker, warehouse, distribution',
      banTheBox: true,
    },
    {
      name: 'Target',
      industry: 'Retail',
      description: 'Ban the Box employer since 2014. Criminal history reviewed only after conditional job offer, not on initial application.',
      website: 'https://corporate.target.com/careers',
      notes: 'Positions: team member, stock, fulfillment, distribution center',
      banTheBox: true,
    },
    {
      name: 'Home Depot',
      industry: 'Retail',
      description: 'Hires people with backgrounds. Background check conducted after interview, not before. Values skills and work ethic.',
      website: 'https://careers.homedepot.com/',
      notes: 'Positions: sales associate, lot associate, warehouse, delivery driver',
      banTheBox: true,
    },
    {
      name: 'Lowe\'s',
      industry: 'Retail',
      description: 'Fair chance employer. Considers criminal history on case-by-case basis after conditional offer.',
      website: 'https://talent.lowes.com/',
      notes: 'Positions: customer service, stocking, warehouse, pro services',
      banTheBox: true,
    },
    {
      name: 'IKEA',
      industry: 'Retail',
      description: 'Committed to fair chance hiring. Evaluates candidates individually regardless of criminal history.',
      website: 'https://www.ikea.com/us/en/this-is-ikea/work-with-us/',
      notes: 'Positions: sales, warehouse, food service, customer service. Good benefits.',
      banTheBox: true,
    },
    {
      name: 'Dollar General',
      industry: 'Retail',
      description: 'Hires people with records for store positions. One of the fastest-growing retailers with constant hiring needs.',
      website: 'https://careers.dollargeneral.com/',
      notes: 'Positions: sales associate, lead, assistant manager. 19,000+ stores nationwide.',
    },
    {
      name: 'Dollar Tree / Family Dollar',
      industry: 'Retail',
      description: 'Known to hire people with criminal backgrounds. High turnover means frequent openings.',
      website: 'https://www.dollartree.com/careers',
      notes: 'Positions: cashier, stocker, assistant manager. 16,000+ stores.',
    },
    {
      name: 'Goodwill Industries',
      industry: 'Retail',
      description: 'Mission-driven organization that specifically helps people with barriers to employment, including criminal records.',
      website: 'https://www.goodwill.org/jobs-training/',
      notes: 'Also provides job training, resume help, and career coaching. Excellent starting point.',
      banTheBox: true,
    },
    {
      name: 'Salvation Army',
      industry: 'Retail',
      description: 'Actively hires people with criminal backgrounds as part of their rehabilitation mission.',
      website: 'https://www.salvationarmyusa.org/usn/careers/',
      notes: 'Positions: store associate, warehouse, driver, social services. Also offers housing help.',
    },
    // === FOOD SERVICE ===
    {
      name: 'McDonald\'s',
      industry: 'Food Service',
      description: 'Many franchise locations hire people with records. Each location makes its own hiring decisions.',
      website: 'https://careers.mcdonalds.com/',
      notes: 'Positions: crew member, shift manager, maintenance. Flexible hours, advancement opportunities.',
    },
    {
      name: 'Starbucks',
      industry: 'Food Service',
      description: 'Fair chance employer committed to second chances. Considers criminal history after conditional offer only.',
      website: 'https://www.starbucks.com/careers',
      notes: 'Positions: barista, shift supervisor. Excellent benefits including health insurance and tuition.',
      banTheBox: true,
    },
    {
      name: 'Taco Bell',
      industry: 'Food Service',
      description: 'Many locations hire people with backgrounds. Franchise-owned locations often more flexible.',
      website: 'https://www.tacobell.com/careers',
      notes: 'Positions: team member, shift lead, assistant manager. Fast advancement.',
    },
    {
      name: 'Wendy\'s',
      industry: 'Food Service',
      description: 'Franchise locations frequently hire people with criminal records. High demand for workers.',
      website: 'https://www.wendys.com/careers',
      notes: 'Positions: crew member, shift manager. Many locations are always hiring.',
    },
    {
      name: 'Burger King',
      industry: 'Food Service',
      description: 'Many franchise locations are open to hiring people with backgrounds. Apply directly at locations.',
      website: 'https://careers.bk.com/',
      notes: 'Positions: team member, shift coordinator. Flexible scheduling.',
    },
    {
      name: 'Subway',
      industry: 'Food Service',
      description: 'Franchise-owned locations make individual hiring decisions. Many hire people with records.',
      website: 'https://www.subway.com/en-US/Careers',
      notes: 'Positions: sandwich artist, shift leader. Apply at individual locations.',
    },
    {
      name: 'Denny\'s',
      industry: 'Food Service',
      description: 'Known to hire people with criminal backgrounds. Open 24/7 means flexible shift options.',
      website: 'https://www.dennys.com/careers',
      notes: 'Positions: server, cook, host, dishwasher. Tips can boost income.',
    },
    {
      name: 'Waffle House',
      industry: 'Food Service',
      description: 'Well-known for giving second chances. One of the most felon-friendly restaurant chains.',
      website: 'https://www.wafflehouse.com/careers/',
      notes: 'Positions: grill operator, server, host. Good tips, consistent hours.',
    },
    {
      name: 'Chipotle',
      industry: 'Food Service',
      description: 'Fair chance employer. Considers applicants with records on individual basis.',
      website: 'https://jobs.chipotle.com/',
      notes: 'Positions: crew member, kitchen manager. Tuition benefits, advancement track.',
      banTheBox: true,
    },
    {
      name: 'Popeyes',
      industry: 'Food Service',
      description: 'Many franchise locations hire people with backgrounds. Growing chain with frequent openings.',
      website: 'https://careers.popeyes.com/',
      notes: 'Positions: team member, shift manager, cook.',
    },
    {
      name: 'Pizza Hut',
      industry: 'Food Service',
      description: 'Franchise locations often hire people with records. Delivery driver positions available.',
      website: 'https://jobs.pizzahut.com/',
      notes: 'Positions: cook, server, delivery driver (need clean driving record for delivery).',
    },
    // === FOOD PRODUCTION ===
    {
      name: 'Dave\'s Killer Bread',
      industry: 'Food Production',
      description: 'Founded by a formerly incarcerated person. One-third of employees have criminal backgrounds. Industry leader in second chance hiring.',
      website: 'https://www.daveskillerbread.com/second-chance-employment',
      notes: 'Also runs Second Chance Employment foundation. Advocates for fair chance hiring nationwide.',
      banTheBox: true,
    },
    {
      name: 'Greyston Bakery',
      industry: 'Food Production',
      description: 'Pioneer of Open Hiring model — no background checks, no interviews, no questions asked. First come, first served.',
      website: 'https://greyston.org/',
      notes: 'Makes brownies for Ben & Jerry\'s. Open Hiring model being adopted by other companies.',
      openHiring: true,
    },
    {
      name: 'Tyson Foods',
      industry: 'Food Production',
      description: 'One of the largest food companies in the world. Hires people with criminal records for plant positions.',
      website: 'https://www.tysonfoods.com/careers',
      notes: 'Positions: production worker, maintenance, driver. Plants in many states.',
    },
    // === WAREHOUSE / DELIVERY ===
    {
      name: 'Amazon',
      industry: 'Warehouse/Delivery',
      description: 'Hires many people with criminal records for warehouse and delivery positions. Massive hiring needs year-round.',
      website: 'https://www.amazon.jobs/',
      notes: 'Positions: warehouse associate, delivery driver, sortation. $15+ starting wage, benefits from day one.',
    },
    {
      name: 'UPS',
      industry: 'Warehouse/Delivery',
      description: 'Hires people with records for package handler and driver positions. Union jobs with excellent benefits.',
      website: 'https://www.jobs-ups.com/',
      notes: 'Positions: package handler, driver helper, warehouse. Union wages, tuition assistance.',
      banTheBox: true,
    },
    {
      name: 'FedEx',
      industry: 'Warehouse/Delivery',
      description: 'Considers applicants with criminal history on case-by-case basis. Ground positions often more accessible.',
      website: 'https://careers.fedex.com/',
      notes: 'Positions: package handler, driver, warehouse. FedEx Ground is contractor-based.',
    },
    {
      name: 'DHL',
      industry: 'Warehouse/Delivery',
      description: 'International shipping company that considers applicants with records for warehouse positions.',
      website: 'https://www.dhl.com/us-en/home/careers.html',
      notes: 'Positions: warehouse associate, package handler, operations.',
    },
    {
      name: 'XPO Logistics',
      industry: 'Warehouse/Delivery',
      description: 'Large logistics company that hires people with backgrounds for warehouse and driving positions.',
      website: 'https://jobs.xpo.com/',
      notes: 'Positions: warehouse worker, forklift operator, truck driver.',
    },
    {
      name: 'US Foods',
      industry: 'Warehouse/Delivery',
      description: 'Food distribution company that hires people with records for warehouse and delivery roles.',
      website: 'https://www.usfoods.com/careers.html',
      notes: 'Positions: warehouse selector, delivery driver, forklift operator. Good pay.',
    },
    {
      name: 'Sysco',
      industry: 'Warehouse/Delivery',
      description: 'Largest food distributor in the U.S. Hires people with backgrounds for warehouse positions.',
      website: 'https://careers.sysco.com/',
      notes: 'Positions: warehouse associate, delivery driver, merchandiser.',
    },
    // === CONSTRUCTION / TRADES ===
    {
      name: 'Laborers\' International Union (LIUNA)',
      industry: 'Construction',
      description: 'Union that actively recruits and trains people with criminal records for construction careers.',
      website: 'https://www.liuna.org/',
      notes: 'Apprenticeship programs, union wages, benefits. No experience needed to start.',
    },
    {
      name: 'Habitat for Humanity',
      industry: 'Construction',
      description: 'Nonprofit that hires and trains people with backgrounds in construction and building trades.',
      website: 'https://www.habitat.org/volunteer/near-you',
      notes: 'Great way to learn construction skills. Also offers homeownership programs.',
    },
    {
      name: 'ABC Supply',
      industry: 'Construction',
      description: 'Roofing and building materials distributor that hires people with records.',
      website: 'https://www.abcsupply.com/careers/',
      notes: 'Positions: warehouse, delivery driver, counter sales.',
    },
    {
      name: 'Waste Management',
      industry: 'Construction',
      description: 'Largest waste collection company in the U.S. Hires people with criminal backgrounds.',
      website: 'https://www.wm.com/us/en/careers',
      notes: 'Positions: driver, helper, equipment operator. CDL training available. Good pay.',
    },
    {
      name: 'Republic Services',
      industry: 'Construction',
      description: 'Second-largest waste company. Hires people with records for driver and labor positions.',
      website: 'https://www.republicservices.com/careers',
      notes: 'Positions: driver, technician, laborer. Benefits and CDL training.',
    },
    // === MANUFACTURING ===
    {
      name: 'Koch Industries',
      industry: 'Manufacturing',
      description: 'Ban the Box employer. Removed criminal history questions from all applications. One of the largest private companies in America.',
      website: 'https://jobs.kochcareers.com/',
      notes: 'Includes Georgia-Pacific, Molex, Guardian. Diverse manufacturing and industrial positions.',
      banTheBox: true,
    },
    {
      name: 'Unilever',
      industry: 'Manufacturing',
      description: 'Global consumer goods company committed to fair chance hiring practices.',
      website: 'https://careers.unilever.com/',
      notes: 'Positions: production, warehouse, quality control. Open Hiring pilot programs.',
      banTheBox: true,
      openHiring: true,
    },
    {
      name: 'General Motors (GM)',
      industry: 'Manufacturing',
      description: 'Has hired people with records through second chance programs. UAW union positions available.',
      website: 'https://search-careers.gm.com/',
      notes: 'Positions: assembly, skilled trades, warehouse. Union wages and benefits.',
    },
    {
      name: 'Caterpillar',
      industry: 'Manufacturing',
      description: 'Heavy equipment manufacturer that considers applicants with records for manufacturing roles.',
      website: 'https://www.caterpillar.com/en/careers.html',
      notes: 'Positions: assembly, welding, machining, warehouse.',
    },
    // === TRANSPORTATION ===
    {
      name: 'Uber',
      industry: 'Transportation',
      description: 'Conducts background checks but considers many applicants with records. Flexible gig work.',
      website: 'https://www.uber.com/us/en/drive/',
      notes: 'Need clean driving record (3+ years). Some felonies may disqualify. Be your own boss.',
    },
    {
      name: 'Lyft',
      industry: 'Transportation',
      description: 'Similar to Uber — conducts checks but considers applicants individually. Flexible scheduling.',
      website: 'https://www.lyft.com/driver',
      notes: 'Need clean driving record. Some convictions reviewed on case-by-case basis.',
    },
    {
      name: 'Werner Enterprises',
      industry: 'Transportation',
      description: 'Trucking company that hires drivers with some criminal backgrounds. CDL training available.',
      website: 'https://www.werner.com/careers/',
      notes: 'Positions: OTR driver, regional driver. Will train for CDL. Good pay.',
    },
    {
      name: 'Swift Transportation',
      industry: 'Transportation',
      description: 'One of the largest trucking companies. Considers drivers with some criminal history.',
      website: 'https://www.driveswift.com/',
      notes: 'CDL training academy. Some felonies may disqualify depending on type and time.',
    },
    {
      name: 'J.B. Hunt',
      industry: 'Transportation',
      description: 'Major trucking and logistics company. Considers applicants with records for driving positions.',
      website: 'https://www.jbhunt.com/careers/',
      notes: 'Positions: truck driver, warehouse, intermodal. CDL required for driving.',
    },
    // === TECHNOLOGY ===
    {
      name: 'Checkr',
      industry: 'Technology',
      description: 'Background check company that actively hires people with records. Leading advocate for fair chance hiring.',
      website: 'https://checkr.com/company/careers',
      notes: 'Also runs advocacy programs to help other companies adopt fair chance hiring.',
      banTheBox: true,
    },
    {
      name: 'Slack (Salesforce)',
      industry: 'Technology',
      description: 'Committed to fair chance hiring through Next Chapter program for formerly incarcerated software engineers.',
      website: 'https://slack.com/careers',
      notes: 'Next Chapter program provides apprenticeships in software engineering.',
      banTheBox: true,
    },
    {
      name: 'Microsoft',
      industry: 'Technology',
      description: 'Partners with organizations to hire formerly incarcerated people. Supports reentry through technology training.',
      website: 'https://careers.microsoft.com/',
      notes: 'LEAP apprenticeship program. Also funds tech training in prisons.',
    },
    {
      name: 'JPMorgan Chase',
      industry: 'Technology',
      description: 'Major employer committed to second chance hiring. Hired 10,000+ people with records since 2019.',
      website: 'https://careers.jpmorgan.com/',
      notes: 'Positions: operations, technology, customer service. PolicyCenter advocates for reform.',
      banTheBox: true,
    },
    // === HOSPITALITY ===
    {
      name: 'Marriott International',
      industry: 'Hospitality',
      description: 'World\'s largest hotel chain. Fair chance employer that considers applicants with records.',
      website: 'https://careers.marriott.com/',
      notes: 'Positions: housekeeping, front desk, maintenance, food service. Career advancement.',
      banTheBox: true,
    },
    {
      name: 'Hilton Hotels',
      industry: 'Hospitality',
      description: 'Committed to fair chance hiring. Partners with reentry organizations for recruitment.',
      website: 'https://jobs.hilton.com/',
      notes: 'Positions: housekeeping, engineering, food & beverage, front office.',
      banTheBox: true,
    },
    {
      name: 'MGM Resorts',
      industry: 'Hospitality',
      description: 'Large hospitality company that considers applicants with criminal backgrounds.',
      website: 'https://careers.mgmresorts.com/',
      notes: 'Positions: food service, housekeeping, security, entertainment. Las Vegas and nationwide.',
    },
    // === STAFFING AGENCIES (work with formerly incarcerated) ===
    {
      name: 'Staffmark Group',
      industry: 'Staffing',
      description: 'Staffing agency that works with people with criminal backgrounds to find temporary and permanent positions.',
      website: 'https://www.staffmark.com/',
      notes: 'Temp-to-hire positions. Good way to get your foot in the door.',
    },
    {
      name: 'Kelly Services',
      industry: 'Staffing',
      description: 'Major staffing agency that places people with records in warehouse, manufacturing, and office positions.',
      website: 'https://www.kellyservices.com/',
      notes: 'Temp and permanent positions. Office, industrial, and professional roles.',
    },
    {
      name: 'Manpower',
      industry: 'Staffing',
      description: 'Global staffing agency. Many offices work with people with criminal backgrounds.',
      website: 'https://www.manpower.com/',
      notes: 'Warehouse, manufacturing, admin positions. Training programs available.',
    },
    {
      name: 'Adecco',
      industry: 'Staffing',
      description: 'One of the largest staffing agencies. Places people with records in various industries.',
      website: 'https://www.adeccousa.com/',
      notes: 'Industrial, office, and professional positions. Temp-to-hire opportunities.',
    },
    {
      name: 'Labor Ready / PeopleReady',
      industry: 'Staffing',
      description: 'Day labor and temporary staffing. Very accessible for people with records — work starts immediately.',
      website: 'https://www.peopleready.com/',
      notes: 'Construction, warehouse, events. Get paid daily. No long application process.',
    },
    // === HEALTHCARE ===
    {
      name: 'HCA Healthcare',
      industry: 'Healthcare',
      description: 'Largest for-profit hospital system. Hires for non-clinical positions with criminal backgrounds.',
      website: 'https://careers.hcahealthcare.com/',
      notes: 'Positions: environmental services, food service, transport, warehouse. Clinical roles have restrictions.',
    },
    {
      name: 'Compass Group',
      industry: 'Healthcare',
      description: 'Largest food service company. Provides food services in hospitals, schools, and businesses. Hires people with records.',
      website: 'https://www.compass-usa.com/careers/',
      notes: 'Positions: cook, food service worker, dishwasher, catering. Locations everywhere.',
    },
  ];

  const industries = [
    { id: 'all', name: 'All (55+)', icon: 'square.grid.2x2' as const },
    { id: 'Retail', name: 'Retail', icon: 'cart' as const },
    { id: 'Food Service', name: 'Food', icon: 'fork.knife' as const },
    { id: 'Warehouse/Delivery', name: 'Warehouse', icon: 'shippingbox' as const },
    { id: 'Construction', name: 'Construction', icon: 'hammer' as const },
    { id: 'Manufacturing', name: 'Manufacturing', icon: 'hammer' as const },
    { id: 'Transportation', name: 'Transport', icon: 'car.fill' as const },
    { id: 'Technology', name: 'Tech', icon: 'lightbulb' as const },
    { id: 'Hospitality', name: 'Hotels', icon: 'building.columns' as const },
    { id: 'Staffing', name: 'Staffing', icon: 'person.2.fill' as const },
    { id: 'Food Production', name: 'Production', icon: 'shippingbox.fill' as const },
    { id: 'Healthcare', name: 'Healthcare', icon: 'cross.case.fill' as const },
  ];

  const jobSearchSites = [
    {
      name: '70 Million Jobs',
      description: 'Job board specifically for people with criminal records',
      url: 'https://www.70millionjobs.com/',
      icon: 'briefcase.fill' as const,
    },
    {
      name: 'Honest Jobs',
      description: 'Connects people with records to fair chance employers',
      url: 'https://www.honestjobs.co/',
      icon: 'checkmark.seal.fill' as const,
    },
    {
      name: 'Reentry Jobs',
      description: 'Job listings from employers who hire people with backgrounds',
      url: 'https://reentryemployment.com/',
      icon: 'arrow.uturn.right.circle.fill' as const,
    },
    {
      name: 'Indeed',
      description: 'Search "fair chance" or "second chance" employers',
      url: 'https://www.indeed.com/',
      icon: 'magnifyingglass' as const,
    },
    {
      name: 'Careeronestop',
      description: 'U.S. DOL sponsored job search and training finder',
      url: 'https://www.careeronestop.org/',
      icon: 'star.fill' as const,
    },
    {
      name: 'Glassdoor',
      description: 'Search companies and read reviews about hiring practices',
      url: 'https://www.glassdoor.com/',
      icon: 'magnifyingglass' as const,
    },
  ];

  const workReleaseInfo = [
    {
      title: 'What is Work Release?',
      content: 'Work release allows inmates to leave the facility during the day to work at approved jobs, then return at night. It helps maintain employment and prepare for reentry.',
    },
    {
      title: 'How to Get Approved',
      content: 'Talk to your case manager or counselor. You typically need good behavior, a certain amount of time served, and an approved job. Start the process early — it can take weeks.',
    },
    {
      title: 'Finding Work Release Jobs',
      content: 'Many employers work directly with correctional facilities. Ask your case manager for a list of approved employers. Staffing agencies like PeopleReady often have work release positions.',
    },
    {
      title: 'Benefits of Work Release',
      content: 'Earn money, build work history, maintain job skills, save for release, and demonstrate responsibility to the court. Can help with early release or parole decisions.',
    },
  ];

  const resumeTips = [
    {
      title: 'Focus on Skills, Not Gaps',
      description: 'Use a functional resume format that highlights skills and accomplishments rather than chronological work history.',
    },
    {
      title: 'Include Prison Work Experience',
      description: 'Jobs held while incarcerated count as work experience. Include them with the facility name or just "State of [State]" as employer.',
    },
    {
      title: 'Get Certifications',
      description: 'Certifications show initiative and skills. Many are available through reentry programs: forklift, OSHA, food handler, CDL, welding, etc.',
    },
    {
      title: 'Prepare Your Story',
      description: 'Practice a brief, honest explanation of your background that focuses on what you learned and how you\'ve changed. Keep it under 30 seconds.',
    },
    {
      title: 'Get References',
      description: 'Parole officers, case managers, program coordinators, volunteers, and clergy can all serve as references.',
    },
    {
      title: 'Use Free Resume Services',
      description: 'Goodwill, Workforce Development offices, and libraries offer free resume writing help. Take advantage of these.',
    },
  ];

  const trainingPrograms = [
    {
      name: 'Goodwill Career Centers',
      description: 'Free job training, resume help, and job placement assistance',
      url: 'https://www.goodwill.org/find-jobs-and-services/',
    },
    {
      name: 'America Works',
      description: 'Job training and placement for people with barriers to employment',
      url: 'https://americaworks.com/',
    },
    {
      name: 'Center for Employment Opportunities (CEO)',
      description: 'Immediate employment, job training, and placement for people with records',
      url: 'https://ceoworks.org/',
    },
    {
      name: 'Local Workforce Development',
      description: 'Your state\'s workforce agency offers free training and job search help',
      url: 'https://www.careeronestop.org/LocalHelp/local-help.aspx',
    },
    {
      name: 'Homeboy Industries',
      description: 'Job training, tattoo removal, and support services in Los Angeles',
      url: 'https://homeboyindustries.org/',
    },
    {
      name: 'The Last Mile',
      description: 'Technology training and coding bootcamp for incarcerated and formerly incarcerated',
      url: 'https://thelastmile.org/',
    },
    {
      name: 'Code.7370',
      description: 'Coding and web development training for people in and leaving prison',
      url: 'https://www.code7370.com/',
    },
    {
      name: 'Persevere',
      description: 'Software development training for justice-impacted individuals',
      url: 'https://perseverenow.org/',
    },
  ];

  const franchiseOpportunities = [
    {
      name: 'Cleaning / Janitorial Franchises',
      description: 'Low startup cost, flexible hours. Companies like Jan-Pro, Vanguard Cleaning, and Stratus Building Solutions often work with people with records.',
      url: 'https://www.franchise.org/',
    },
    {
      name: 'Lawn Care / Landscaping',
      description: 'Seasonal but profitable. Companies like Lawn Doctor and U.S. Lawns offer franchise opportunities.',
      url: 'https://www.franchise.org/',
    },
    {
      name: 'Food Truck / Mobile Food',
      description: 'Lower barrier to entry than a restaurant. Check your state\'s food truck licensing requirements.',
      url: 'https://www.sba.gov/business-guide/launch-your-business/pick-your-business-location',
    },
    {
      name: 'SBA Resources for Entrepreneurs',
      description: 'The Small Business Administration offers free counseling, training, and loan programs for aspiring business owners.',
      url: 'https://www.sba.gov/',
    },
  ];

  const filteredEmployers = selectedCategory === 'all' 
    ? secondChanceEmployers 
    : secondChanceEmployers.filter(e => e.industry === selectedCategory);

  const displayedEmployers = showAllEmployers ? filteredEmployers : filteredEmployers.slice(0, 10);

  return (
    <ScreenContainer>
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-4 bg-surface flex-row items-center">
          <TouchableOpacity
            className="mr-3 p-1"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-foreground">Job Resources</Text>
            <Text className="text-sm text-muted">55+ employers that hire people with records</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-4">
          <View className="bg-primary rounded-xl p-5">
            <View className="flex-row items-center mb-3">
              <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3">
                <IconSymbol name="briefcase.fill" size={32} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">You Can Get Hired</Text>
                <Text className="text-sm text-white/80">55+ companies that give second chances</Text>
              </View>
            </View>
            <Text className="text-sm text-white/90 leading-relaxed">
              Over 70 million Americans have some form of criminal record. Many major employers 
              have committed to fair chance hiring. Your background doesn't define your future.
            </Text>
          </View>
        </View>

        {/* Stats Banner */}
        <View className="px-4 py-2">
          <View className="flex-row justify-between">
            <View className="flex-1 bg-success/10 rounded-xl p-3 mr-2 items-center border border-success/20">
              <Text className="text-2xl font-bold" style={{ color: colors.success }}>55+</Text>
              <Text className="text-xs text-muted text-center">Companies Listed</Text>
            </View>
            <View className="flex-1 bg-primary/10 rounded-xl p-3 mr-2 items-center border border-primary/20">
              <Text className="text-2xl font-bold" style={{ color: colors.primary }}>12</Text>
              <Text className="text-xs text-muted text-center">Industries</Text>
            </View>
            <View className="flex-1 bg-warning/10 rounded-xl p-3 items-center border border-warning/20">
              <Text className="text-2xl font-bold" style={{ color: colors.warning }}>20+</Text>
              <Text className="text-xs text-muted text-center">Ban the Box</Text>
            </View>
          </View>
        </View>

        {/* Encouragement */}
        <View className="px-4 py-3">
          <View className="bg-success/10 rounded-xl p-4 border border-success/30">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">💪</Text>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">Don't Give Up</Text>
                <Text className="text-sm text-muted">
                  It may take more applications, but there ARE employers who will hire you. 
                  Keep applying and stay persistent. Every "no" gets you closer to a "yes."
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Job Search Sites */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Job Search Sites for People with Records</Text>
          <View className="flex-row flex-wrap justify-between">
            {jobSearchSites.map((site, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-surface rounded-xl p-4 mb-3 border border-border"
                onPress={() => Linking.openURL(site.url)}
                activeOpacity={0.7}
              >
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: colors.primary + '20' }}
                >
                  <IconSymbol name={site.icon} size={22} color={colors.primary} />
                </View>
                <Text className="text-sm font-semibold text-foreground mb-1">{site.name}</Text>
                <Text className="text-xs text-muted" numberOfLines={2}>{site.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Second Chance Employers */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-1 px-1">Second Chance Employers</Text>
          <Text className="text-sm text-muted mb-3 px-1">Companies known to hire people with criminal backgrounds</Text>
          
          {/* Industry Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-3"
          >
            {industries.map((industry) => (
              <TouchableOpacity
                key={industry.id}
                className={`mr-2 px-3 py-2 rounded-full flex-row items-center ${
                  selectedCategory === industry.id ? 'bg-primary' : 'bg-surface border border-border'
                }`}
                onPress={() => { setSelectedCategory(industry.id); setShowAllEmployers(false); }}
                activeOpacity={0.7}
              >
                <IconSymbol 
                  name={industry.icon} 
                  size={14} 
                  color={selectedCategory === industry.id ? '#FFFFFF' : colors.muted} 
                />
                <Text 
                  className={`ml-1 text-xs font-medium ${
                    selectedCategory === industry.id ? 'text-white' : 'text-muted'
                  }`}
                >
                  {industry.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Count */}
          <Text className="text-xs text-muted mb-2 px-1">
            Showing {displayedEmployers.length} of {filteredEmployers.length} employers
          </Text>

          {/* Employer List */}
          {displayedEmployers.map((employer, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border"
              onPress={() => Linking.openURL(employer.website)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center flex-wrap">
                    <Text className="text-base font-semibold text-foreground mr-2">{employer.name}</Text>
                    {employer.banTheBox && (
                      <View className="bg-success/20 px-2 py-0.5 rounded-full mr-1">
                        <Text className="text-xs font-medium" style={{ color: colors.success }}>Ban the Box</Text>
                      </View>
                    )}
                    {employer.openHiring && (
                      <View className="bg-primary/20 px-2 py-0.5 rounded-full">
                        <Text className="text-xs font-medium" style={{ color: colors.primary }}>Open Hiring</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-xs" style={{ color: colors.primary }}>{employer.industry}</Text>
                </View>
                <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
              </View>
              <Text className="text-sm text-muted mb-2">{employer.description}</Text>
              <View className="bg-background rounded-lg px-3 py-2">
                <Text className="text-xs text-muted">💡 {employer.notes}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Show More Button */}
          {!showAllEmployers && filteredEmployers.length > 10 && (
            <TouchableOpacity
              className="bg-primary/10 rounded-xl p-4 items-center border border-primary/20"
              onPress={() => setShowAllEmployers(true)}
              activeOpacity={0.7}
            >
              <Text className="text-base font-semibold" style={{ color: colors.primary }}>
                Show All {filteredEmployers.length} Employers
              </Text>
              <Text className="text-xs text-muted mt-1">
                {filteredEmployers.length - 10} more companies to explore
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Franchise / Self-Employment */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-1 px-1">Start Your Own Business</Text>
          <Text className="text-sm text-muted mb-3 px-1">Franchise and self-employment opportunities</Text>
          {franchiseOpportunities.map((opp, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(opp.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.warning + '20' }}
              >
                <IconSymbol name="star.fill" size={20} color={colors.warning} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{opp.name}</Text>
                <Text className="text-xs text-muted" numberOfLines={2}>{opp.description}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Work Release */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Work Release Information</Text>
          {workReleaseInfo.map((info, index) => (
            <View key={index} className="bg-surface rounded-xl p-4 mb-3 border border-border">
              <Text className="text-sm font-semibold text-foreground mb-2">{info.title}</Text>
              <Text className="text-sm text-muted">{info.content}</Text>
            </View>
          ))}
        </View>

        {/* Resume Tips */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Resume Tips for People with Records</Text>
          <View className="bg-surface rounded-xl p-4 border border-border">
            {resumeTips.map((tip, index) => (
              <View key={index} className={index < resumeTips.length - 1 ? "mb-4" : ""}>
                <View className="flex-row items-center mb-1">
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Text className="text-xs text-white font-bold">{index + 1}</Text>
                  </View>
                  <Text className="text-sm font-semibold text-foreground">{tip.title}</Text>
                </View>
                <Text className="text-xs text-muted ml-8">{tip.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Training Programs */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-1 px-1">Free Training Programs</Text>
          <Text className="text-sm text-muted mb-3 px-1">Learn new skills and get certified</Text>
          {trainingPrograms.map((program, index) => (
            <TouchableOpacity
              key={index}
              className="bg-surface rounded-xl p-4 mb-3 border border-border flex-row items-center"
              onPress={() => Linking.openURL(program.url)}
              activeOpacity={0.7}
            >
              <View 
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: colors.success + '20' }}
              >
                <IconSymbol name="graduationcap.fill" size={20} color={colors.success} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">{program.name}</Text>
                <Text className="text-xs text-muted">{program.description}</Text>
              </View>
              <IconSymbol name="arrow.up.right" size={18} color={colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Know Your Rights */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base font-semibold text-foreground mb-3">Your Employment Rights</Text>
            <View>
              {[
                'Ban the Box laws in 37+ states prevent employers from asking about criminal history on initial applications',
                'You have the right to explain your record if asked in an interview',
                'Some convictions can be expunged, removing them from background checks',
                'Employers cannot discriminate based on arrest records (only convictions)',
                'Federal contractors must follow fair chance hiring guidelines (Fair Chance Act)',
                'The EEOC prohibits blanket bans on hiring people with records — employers must consider the nature of the offense, time passed, and job relevance',
                'Many states offer tax credits to employers who hire people with records (Work Opportunity Tax Credit)',
                'You can request a copy of your background check if you are denied a job',
              ].map((right, index) => (
                <View key={index} className="flex-row items-start mb-2">
                  <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} style={{ marginTop: 2 }} />
                  <Text className="flex-1 text-sm text-muted ml-2">{right}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Ask AI */}
        <View className="px-4 py-4 mb-4">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center justify-center"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <IconSymbol name="bubble.left.fill" size={20} color="#FFFFFF" />
            <Text className="text-white font-semibold ml-2">Ask AI About Job Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
