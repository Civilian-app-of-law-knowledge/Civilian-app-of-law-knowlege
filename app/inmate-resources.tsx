import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

const TABLET_PROVIDERS = [
  {
    name: "JPay (now GTL/ViaPath)",
    desc: "Most widely used tablet system in US prisons and jails",
    url: "https://www.jpay.com/",
    features: ["Email (JPay email)", "Music purchases", "Video visits", "Games", "Educational content", "eBooks", "Movie rentals"],
  },
  {
    name: "GTL (Global Tel Link) / ViaPath",
    desc: "Major provider of communication and tablet services",
    url: "https://www.gtl.net/",
    features: ["Messaging", "Video calling", "Educational programs", "Entertainment", "Legal resources", "Job search tools"],
  },
  {
    name: "Securus / Lantern",
    desc: "Tablet and communication services in many facilities",
    url: "https://securustech.net/",
    features: ["Securus eMessaging", "Video visits", "Music", "Games", "Educational content", "Legal forms"],
  },
  {
    name: "Edovo (now Apds)",
    desc: "Education-focused tablet platform — earn rewards for learning",
    url: "https://www.edovo.com/",
    features: ["GED prep courses", "College courses", "Job training", "Life skills", "Mental health resources", "Earn good time credits in some facilities"],
  },
  {
    name: "American Prison Data Systems (APDS)",
    desc: "Education and rehabilitation through technology",
    url: "https://www.apdscorp.com/",
    features: ["Structured education", "Vocational training", "Cognitive behavioral therapy", "Reentry planning", "Progress tracking"],
  },
];

const CO_ACCOUNTABILITY = [
  {
    title: "Your Rights During Interactions with COs",
    items: [
      "You have the right to be free from excessive force (8th Amendment)",
      "You have the right to file grievances without retaliation (1st Amendment)",
      "You have the right to medical care if injured by staff",
      "You have the right to due process in disciplinary proceedings",
      "You have the right to be free from sexual abuse and harassment (PREA)",
      "You have the right to practice your religion",
      "You have the right to send and receive mail (with reasonable restrictions)",
      "You have the right to access courts and legal materials",
      "You do NOT have to answer questions that could incriminate you (5th Amendment)",
      "You have the right to humane conditions of confinement",
    ],
  },
  {
    title: "How to Document Incidents",
    items: [
      "Write down EVERYTHING immediately — date, time, location, exactly what happened",
      "Include names and badge numbers of ALL officers present",
      "Note any witnesses — other inmates and staff",
      "Describe any injuries in detail — request medical attention to create a medical record",
      "Request preservation of any video footage — many areas have cameras",
      "Mail a copy of your documentation to a trusted family member or attorney",
      "Keep your notes in a safe place — consider mailing originals to family",
      "Be factual and specific — avoid emotional language in written documentation",
      "Note if any property was damaged or confiscated",
      "Document any threats made before or after the incident",
    ],
  },
  {
    title: "Where to File Complaints",
    items: [
      "Internal grievance system — ALWAYS start here (required by PLRA)",
      "Facility Inspector General or Internal Affairs",
      "State Department of Corrections Inspector General",
      "State Attorney General's office",
      "DOJ Civil Rights Division: civilrights.justice.gov",
      "ACLU: aclu.org/issues/prisoners-rights",
      "State prisoners' rights organizations",
      "Federal court (Section 1983 lawsuit — after exhausting administrative remedies)",
      "State licensing boards if medical staff is involved",
      "Local media (through family members)",
    ],
  },
];

const FUTURE_TECH_IDEAS = [
  {
    title: "AI-Powered Education Assistant",
    desc: "Imagine an AI tutor in your cell that can help with GED prep, explain legal concepts, answer questions 24/7, and adapt to your learning pace. No waiting for a teacher, no limited class slots.",
    icon: "brain.head.profile" as const,
    status: "Emerging Technology",
  },
  {
    title: "Digital Grievance Filing",
    desc: "File grievances electronically through tablets with automatic tracking, timestamps, and delivery confirmation. No more 'lost' paperwork. Every submission logged and timestamped.",
    icon: "doc.on.clipboard" as const,
    status: "Some Facilities Piloting",
  },
  {
    title: "Virtual Reality Job Training",
    desc: "VR simulations for job training — practice welding, construction, cooking, or customer service in a virtual environment before doing it for real.",
    icon: "play.circle" as const,
    status: "Pilot Programs",
  },
  {
    title: "Telehealth in Cells",
    desc: "Access doctors, therapists, and mental health professionals through video calls on tablets. No more waiting weeks for a sick call response.",
    icon: "cross.case.fill" as const,
    status: "Expanding Rapidly",
  },
  {
    title: "Voice-Recorded Experience Journals",
    desc: "Record your experiences, thoughts, and daily life through voice journals on tablets. Build a record of your time, document conditions, and process your experiences.",
    icon: "mic.fill" as const,
    status: "Concept",
  },
  {
    title: "Digital Legal Library",
    desc: "Full access to case law, legal forms, and self-help legal resources on tablets. No more fighting for time in a physical law library.",
    icon: "book.fill" as const,
    status: "Available in Some Facilities",
  },
  {
    title: "Reentry Planning AI",
    desc: "An AI that helps plan your reentry — finds housing, jobs, programs, and resources in your release area. Starts planning months before your release date.",
    icon: "map.fill" as const,
    status: "Concept",
  },
  {
    title: "Family Connection Platform",
    desc: "Affordable video calls, shared photo albums, bedtime story recordings for kids, and family milestone tracking — keeping families connected without exploitation pricing.",
    icon: "heart.fill" as const,
    status: "Advocacy Stage",
  },
];

const INMATE_WELLNESS = [
  {
    title: "Mental Health Resources",
    items: [
      { name: "SAMHSA Helpline", detail: "1-800-662-4357 — Free 24/7 mental health and substance abuse referrals", url: "https://www.samhsa.gov/find-help/national-helpline" },
      { name: "Crisis Text Line", detail: "Text HOME to 741741 — Free crisis counseling via text", url: "https://www.crisistextline.org/" },
      { name: "NAMI (National Alliance on Mental Illness)", detail: "Resources for inmates and families dealing with mental illness", url: "https://www.nami.org/" },
      { name: "Meditation & Mindfulness", detail: "Free guided meditation available on most tablet platforms", url: "https://www.headspace.com/" },
    ],
  },
  {
    title: "Physical Health & Fitness",
    items: [
      { name: "Cell Workout Programs", detail: "Bodyweight exercises you can do in a small space — no equipment needed", url: "https://www.nerdfitness.com/blog/the-beginner-bodyweight-workout/" },
      { name: "Yoga for Inmates", detail: "Prison yoga programs reduce stress, anxiety, and aggression", url: "https://www.prisonyoga.org/" },
      { name: "Nutrition Guide", detail: "Making the best food choices with commissary and facility meals", url: "https://www.eatright.org/" },
    ],
  },
  {
    title: "Spiritual & Religious Resources",
    items: [
      { name: "Prison Fellowship", detail: "Christian ministry with programs in 400+ prisons", url: "https://www.prisonfellowship.org/" },
      { name: "Islamic Services", detail: "Muslim chaplaincy and religious accommodations", url: "https://www.isna.net/" },
      { name: "Jewish Prisoner Services", detail: "Religious services and support for Jewish inmates", url: "https://www.jewishprisonerservices.org/" },
      { name: "Buddhist Prison Ministry", detail: "Meditation and mindfulness programs", url: "https://www.prisondharmanetwork.org/" },
    ],
  },
];

export default function InmateResourcesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedTablet, setExpandedTablet] = useState<string | null>(null);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center mb-2">
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginRight: 8 }}>
              <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground flex-1">Inmate Resources</Text>
          </View>

          <Text className="text-sm text-muted mb-6">
            Everything beneficial for inmates — tablet info, CO accountability, wellness, and the future of corrections technology.
          </Text>

          {/* Tablet Resources */}
          <Text className="text-xl font-bold text-foreground mb-4">Tablet Providers & Services</Text>
          <Text className="text-sm text-muted mb-3">
            Most facilities now provide tablets. Know what's available and how to use them for education, communication, and self-improvement.
          </Text>
          {TABLET_PROVIDERS.map((provider) => (
            <TouchableOpacity
              key={provider.name}
              onPress={() => setExpandedTablet(expandedTablet === provider.name ? null : provider.name)}
              style={{ marginBottom: 10 }}
            >
              <View className="bg-surface rounded-2xl p-4 border border-border">
                <View className="flex-row items-center">
                  <IconSymbol name="ipad" size={24} color={colors.primary} />
                  <View className="flex-1 ml-3">
                    <Text className="text-base font-bold text-foreground">{provider.name}</Text>
                    <Text className="text-xs text-muted">{provider.desc}</Text>
                  </View>
                  <IconSymbol
                    name={expandedTablet === provider.name ? "chevron.up" : "chevron.down"}
                    size={20}
                    color={colors.muted}
                  />
                </View>
                {expandedTablet === provider.name && (
                  <View className="mt-3 pt-3 border-t border-border">
                    <Text className="text-sm font-bold text-foreground mb-2">Available Features:</Text>
                    {provider.features.map((feature, idx) => (
                      <View key={idx} className="flex-row items-center mb-1">
                        <IconSymbol name="checkmark" size={14} color={colors.success} />
                        <Text className="text-sm text-foreground ml-2">{feature}</Text>
                      </View>
                    ))}
                    <TouchableOpacity
                      onPress={() => Linking.openURL(provider.url)}
                      style={{ marginTop: 8, backgroundColor: colors.primary + "15", borderRadius: 8, padding: 8 }}
                    >
                      <Text className="text-sm font-bold text-primary text-center">Visit Website →</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* CO Accountability */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">CO Accountability & Your Rights</Text>
          <View className="bg-error/10 rounded-2xl p-4 mb-4 border border-error/30">
            <Text className="text-sm text-foreground leading-relaxed">
              Corrections officers are public servants bound by law. They do NOT have unlimited power. Know your rights, document everything, and use the system to hold them accountable.
            </Text>
          </View>
          {CO_ACCOUNTABILITY.map((section) => (
            <TouchableOpacity
              key={section.title}
              onPress={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
              style={{ marginBottom: 10 }}
            >
              <View className="bg-surface rounded-2xl p-4 border border-border">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-bold text-foreground flex-1">{section.title}</Text>
                  <IconSymbol
                    name={expandedSection === section.title ? "chevron.up" : "chevron.down"}
                    size={20}
                    color={colors.muted}
                  />
                </View>
                {expandedSection === section.title && (
                  <View className="mt-3 pt-3 border-t border-border">
                    {section.items.map((item, idx) => (
                      <View key={idx} className="flex-row mb-2">
                        <View className="w-5 h-5 rounded-full bg-primary/20 items-center justify-center mr-2 mt-0.5">
                          <Text className="text-xs font-bold text-primary">{idx + 1}</Text>
                        </View>
                        <Text className="text-sm text-foreground flex-1 leading-relaxed">{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}

          {/* Wellness */}
          <Text className="text-xl font-bold text-foreground mt-6 mb-4">Wellness & Self-Improvement</Text>
          {INMATE_WELLNESS.map((section) => (
            <View key={section.title} className="mb-4">
              <Text className="text-base font-bold text-foreground mb-2">{section.title}</Text>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => Linking.openURL(item.url)}
                  style={{ marginBottom: 8 }}
                >
                  <View className="bg-surface rounded-xl p-3 border border-border flex-row items-center">
                    <View className="flex-1">
                      <Text className="text-sm font-bold text-foreground">{item.name}</Text>
                      <Text className="text-xs text-muted mt-1">{item.detail}</Text>
                    </View>
                    <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          {/* Future Tech */}
          <Text className="text-xl font-bold text-foreground mt-4 mb-2">The Future of Corrections Technology</Text>
          <Text className="text-sm text-muted mb-4">
            Technology should serve rehabilitation, not just surveillance. These are the innovations that could transform the system.
          </Text>
          {FUTURE_TECH_IDEAS.map((idea, idx) => (
            <View key={idx} className="bg-surface rounded-2xl p-4 border border-border mb-3">
              <View className="flex-row items-start">
                <View className="w-10 h-10 rounded-full bg-primary/15 items-center justify-center mr-3">
                  <IconSymbol name={idea.icon} size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-foreground">{idea.title}</Text>
                  <View className="bg-primary/10 rounded-full px-2 py-0.5 self-start mt-1 mb-2">
                    <Text className="text-xs font-bold text-primary">{idea.status}</Text>
                  </View>
                  <Text className="text-sm text-foreground leading-relaxed">{idea.desc}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Call to Action */}
          <View className="bg-primary/10 rounded-2xl p-5 mt-4 border border-primary/30">
            <Text className="text-lg font-bold text-foreground mb-2">The System Can Be Better</Text>
            <Text className="text-sm text-foreground leading-relaxed">
              Every person behind bars is still a person. Technology, education, accountability, and compassion can transform corrections from a warehouse into a place of genuine rehabilitation. Advocate for change. Share this information. The future belongs to those who imagine it first.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
