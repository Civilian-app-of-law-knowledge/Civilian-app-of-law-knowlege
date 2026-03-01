import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const EDUCATION_PROGRAMS = [
  {
    category: "GED & High School Equivalency",
    icon: "graduationcap.fill" as const,
    programs: [
      { name: "GED Testing Service", desc: "Official GED program — available in most correctional facilities", url: "https://ged.com/", details: "4 subjects: Math, Science, Social Studies, Language Arts. Many facilities offer free prep classes." },
      { name: "HiSET (High School Equivalency Test)", desc: "Alternative to GED accepted in many states", url: "https://hiset.ets.org/", details: "5 subjects including Writing. Available in English and Spanish." },
      { name: "Khan Academy", desc: "Free online learning for GED prep — available on tablets", url: "https://www.khanacademy.org/", details: "Math, reading, science courses. Self-paced with practice exercises." },
      { name: "Pell Grant Restoration", desc: "Federal financial aid now available for incarcerated students (restored 2023)", url: "https://www.ed.gov/higher-education/second-chance-pell", details: "Covers tuition for college courses while incarcerated. Apply through FAFSA." },
    ],
  },
  {
    category: "College & University Programs",
    icon: "book.closed" as const,
    programs: [
      { name: "Second Chance Pell", desc: "Federal program providing Pell Grants to incarcerated students", url: "https://www.ed.gov/higher-education/second-chance-pell", details: "200+ colleges now offer programs inside prisons. Associate's and bachelor's degrees available." },
      { name: "Bard Prison Initiative", desc: "Full college degree program inside prisons — one of the best in the nation", url: "https://bpi.bard.edu/", details: "Liberal arts education. Students earn real Bard College degrees." },
      { name: "Cornell Prison Education Program", desc: "Ivy League education inside correctional facilities", url: "https://cpep.cornell.edu/", details: "College courses taught by Cornell professors." },
      { name: "Ashland University", desc: "One of the largest prison education programs in the country", url: "https://www.ashland.edu/correctional-education", details: "Associate's, bachelor's, and master's degrees available." },
      { name: "Adams State University", desc: "Correspondence courses designed for incarcerated students", url: "https://www.adams.edu/extended-studies/prison-college-program/", details: "Self-paced courses by mail. Multiple degree programs." },
      { name: "Ohio University", desc: "Correctional education program with correspondence courses", url: "https://www.ohio.edu/university-college/correctional-education", details: "Associate's degree available through mail-based courses." },
    ],
  },
  {
    category: "Trade & Vocational Certifications",
    icon: "wrench.and.screwdriver" as const,
    programs: [
      { name: "OSHA Safety Certifications", desc: "10-hour and 30-hour workplace safety certifications", url: "https://www.osha.gov/training/outreach", details: "OSHA 10 and OSHA 30 — required for many construction and warehouse jobs. Highly valued by employers." },
      { name: "ServSafe Food Handler", desc: "Food safety certification — required for restaurant and food service jobs", url: "https://www.servsafe.com/", details: "Available in many facilities. Opens doors to restaurant, catering, and food production jobs." },
      { name: "Forklift Operator Certification", desc: "OSHA-compliant forklift training — high demand in warehouses", url: "https://www.osha.gov/powered-industrial-trucks", details: "Warehouse and distribution center jobs pay $15-25/hour. Many facilities offer this training." },
      { name: "CDL (Commercial Driver's License)", desc: "Truck driving certification — one of the best-paying options for people with records", url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license", details: "Some states allow CDL training while incarcerated. Trucking companies actively hire people with backgrounds." },
      { name: "Welding Certification (AWS)", desc: "American Welding Society certification — skilled trade with high demand", url: "https://www.aws.org/", details: "Welders earn $40,000-80,000/year. Many facilities have welding programs." },
      { name: "HVAC Certification", desc: "Heating, ventilation, and air conditioning — always in demand", url: "https://www.escogroup.org/", details: "EPA Section 608 certification. HVAC techs earn $45,000-75,000/year." },
      { name: "Electrical Apprenticeship", desc: "Pre-apprenticeship programs available in some facilities", url: "https://www.njatc.org/", details: "Electricians earn $50,000-90,000/year. Union apprenticeships available post-release." },
      { name: "Plumbing Certification", desc: "Plumbing trade training — essential skill with steady demand", url: "https://www.phccweb.org/", details: "Plumbers earn $45,000-80,000/year. Many states have pre-apprenticeship programs in facilities." },
      { name: "Carpentry / Construction", desc: "Construction skills training and pre-apprenticeship programs", url: "https://www.agc.org/", details: "Construction industry actively hires people with records. Good pay and advancement opportunities." },
      { name: "Automotive Technician (ASE)", desc: "Automotive Service Excellence certification", url: "https://www.ase.com/", details: "Auto mechanics earn $35,000-65,000/year. Some facilities have auto shop programs." },
    ],
  },
  {
    category: "Technology & Coding",
    icon: "laptopcomputer" as const,
    programs: [
      { name: "The Last Mile", desc: "Coding bootcamp inside prisons — teaches web development", url: "https://thelastmile.org/", details: "HTML, CSS, JavaScript, Python. Graduates have been hired by tech companies including Slack and Dropbox." },
      { name: "Code.org", desc: "Free coding courses — available on facility tablets", url: "https://code.org/", details: "Beginner-friendly. Learn computer science fundamentals." },
      { name: "freeCodeCamp", desc: "Free full-stack web development curriculum", url: "https://www.freecodecamp.org/", details: "Earn certifications in responsive web design, JavaScript, and more." },
      { name: "Coursera / edX", desc: "Free online courses from top universities", url: "https://www.coursera.org/", details: "Computer science, data analysis, business courses. Some facilities provide access." },
      { name: "Google IT Support Certificate", desc: "Entry-level IT certification — no experience needed", url: "https://grow.google/certificates/it-support/", details: "Prepares for help desk and IT support roles. Recognized by major employers." },
      { name: "CompTIA A+ Certification", desc: "Industry-standard IT certification", url: "https://www.comptia.org/certifications/a", details: "IT support technicians earn $40,000-60,000/year. Study materials available by mail." },
    ],
  },
  {
    category: "Life Skills & Personal Development",
    icon: "lightbulb" as const,
    programs: [
      { name: "Financial Literacy", desc: "Budgeting, banking, credit repair, and money management", url: "https://www.mymoney.gov/", details: "Essential for reentry. Learn to manage money, rebuild credit, and avoid financial traps." },
      { name: "Anger Management", desc: "Cognitive behavioral programs for emotional regulation", url: "https://www.samhsa.gov/", details: "Often required for parole. Teaches healthy coping strategies." },
      { name: "Substance Abuse Treatment", desc: "Drug and alcohol recovery programs", url: "https://www.samhsa.gov/find-help/national-helpline", details: "SAMHSA helpline: 1-800-662-4357. Many facilities offer AA/NA, RDAP, and therapeutic communities." },
      { name: "Parenting Classes", desc: "Strengthening family bonds and parenting skills", url: "https://www.childwelfare.gov/", details: "Important for custody cases and family reunification. Many facilities offer these programs." },
      { name: "Entrepreneurship Training", desc: "Learn to start your own business", url: "https://www.sba.gov/", details: "SBA resources for starting a business. Self-employment is a great option for people with records." },
    ],
  },
];

export default function EducationScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center mb-2">
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginRight: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground flex-1">Education & Certifications</Text>
          </View>

          {/* Hero */}
          <View className="bg-primary/10 rounded-2xl p-5 mb-6 border border-primary/30">
            <Text className="text-lg font-bold text-foreground mb-2">Education Changes Everything</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Incarcerated individuals who participate in education programs are 43% less likely to return to prison. Every certification, every class, every skill you learn is an investment in your future. Pell Grants are now restored — college is accessible again.
            </Text>
          </View>

          {/* Pell Grant Alert */}
          <View className="bg-success/10 rounded-2xl p-4 mb-6 border border-success/30">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.success} />
              <Text className="text-base font-bold text-success ml-2">Pell Grants Restored!</Text>
            </View>
            <Text className="text-sm text-foreground leading-relaxed">
              As of July 2023, incarcerated students can again receive federal Pell Grants for college education. This covers tuition at participating institutions. Ask your facility's education department about available programs.
            </Text>
          </View>

          {/* Categories */}
          {EDUCATION_PROGRAMS.map((category) => (
            <View key={category.category} className="mb-4">
              <TouchableOpacity
                onPress={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
              >
                <View className="bg-surface rounded-2xl p-4 border border-border">
                  <View className="flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-primary/15 items-center justify-center mr-3">
                      <IconSymbol name={category.icon} size={24} color={colors.primary} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-foreground">{category.category}</Text>
                      <Text className="text-xs text-muted">{category.programs.length} programs</Text>
                    </View>
                    <IconSymbol
                      name={expandedCategory === category.category ? "chevron.up" : "chevron.down"}
                      size={20}
                      color={colors.muted}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {expandedCategory === category.category && (
                <View className="mt-2">
                  {category.programs.map((program, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => Linking.openURL(program.url)}
                      style={{ marginBottom: 8 }}
                    >
                      <View className="bg-surface rounded-xl p-3 border border-border ml-4">
                        <View className="flex-row items-start">
                          <View className="flex-1">
                            <Text className="text-sm font-bold text-foreground">{program.name}</Text>
                            <Text className="text-xs text-muted mt-1">{program.desc}</Text>
                            <Text className="text-xs text-foreground mt-2 leading-relaxed">{program.details}</Text>
                          </View>
                          <IconSymbol name="arrow.up.right" size={16} color={colors.primary} style={{ marginTop: 2 }} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Certification Value Chart */}
          <Text className="text-xl font-bold text-foreground mt-4 mb-4">What Certifications Are Worth</Text>
          <View className="bg-surface rounded-2xl p-4 border border-border mb-4">
            {[
              { cert: "CDL (Truck Driving)", salary: "$45,000 - $80,000/yr", time: "4-8 weeks" },
              { cert: "Welding (AWS)", salary: "$40,000 - $80,000/yr", time: "6-12 months" },
              { cert: "HVAC Technician", salary: "$45,000 - $75,000/yr", time: "6-12 months" },
              { cert: "Electrician", salary: "$50,000 - $90,000/yr", time: "4-5 year apprenticeship" },
              { cert: "Plumbing", salary: "$45,000 - $80,000/yr", time: "4-5 year apprenticeship" },
              { cert: "CompTIA A+ (IT)", salary: "$40,000 - $60,000/yr", time: "3-6 months study" },
              { cert: "Forklift Operator", salary: "$30,000 - $50,000/yr", time: "1-2 days" },
              { cert: "ServSafe Food Handler", salary: "$25,000 - $40,000/yr", time: "1 day" },
              { cert: "OSHA 10/30", salary: "Required for construction", time: "10-30 hours" },
              { cert: "Coding Bootcamp", salary: "$50,000 - $100,000/yr", time: "3-6 months" },
            ].map((item, idx) => (
              <View key={idx} className="flex-row items-center py-2 border-b border-border">
                <Text className="text-sm font-bold text-foreground flex-1">{item.cert}</Text>
                <View className="items-end">
                  <Text className="text-xs font-bold text-success">{item.salary}</Text>
                  <Text className="text-xs text-muted">{item.time}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Tips */}
          <View className="bg-warning/10 rounded-2xl p-4 mt-4 border border-warning/30">
            <Text className="text-base font-bold text-foreground mb-3">Education Tips for Inmates</Text>
            {[
              "Start with your GED if you don't have a high school diploma — it's the foundation for everything",
              "Ask about Pell Grants — college is now financially accessible for incarcerated students",
              "Stack certifications — OSHA + Forklift + CDL makes you highly employable",
              "Keep ALL certificates and completion records — you'll need them for job applications",
              "Trade certifications often lead to higher-paying jobs than a general degree",
              "Coding and tech skills can be learned on tablets — The Last Mile has placed graduates at major tech companies",
              "Substance abuse and anger management completions look good on parole applications",
              "Education credits can count toward good time in some states — ask your counselor",
            ].map((tip, idx) => (
              <View key={idx} className="flex-row mb-2">
                <IconSymbol name="lightbulb" size={16} color={colors.warning} style={{ marginTop: 2 }} />
                <Text className="text-sm text-foreground ml-2 flex-1 leading-relaxed">{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
