import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function CommunityResourcesScreen() {
  const router = useRouter();
  const colors = useColors();

  const resourceCategories = [
    {
      title: 'Food Assistance',
      icon: 'leaf.fill' as const,
      color: colors.success,
      resources: [
        {
          name: 'Find a Food Bank',
          organization: 'Feeding America',
          description: 'Locate food banks and pantries near you. No ID or proof of income required at most locations.',
          url: 'https://www.feedingamerica.org/find-your-local-foodbank',
          phone: '1-800-771-2303',
        },
        {
          name: 'SNAP Benefits (Food Stamps)',
          organization: 'USDA',
          description: 'Apply for government food assistance. Many people with records are eligible.',
          url: 'https://www.fns.usda.gov/snap/recipient/eligibility',
          phone: '1-800-221-5689',
        },
        {
          name: 'WIC Program',
          organization: 'USDA',
          description: 'Nutrition assistance for pregnant women, new mothers, and children under 5.',
          url: 'https://www.fns.usda.gov/wic',
          phone: 'Contact local WIC office',
        },
        {
          name: 'Meals on Wheels',
          organization: 'Meals on Wheels America',
          description: 'Home-delivered meals for seniors and those with disabilities.',
          url: 'https://www.mealsonwheelsamerica.org/find-meals',
          phone: '1-888-998-6325',
        },
      ],
    },
    {
      title: 'Housing Assistance',
      icon: 'house.fill' as const,
      color: colors.primary,
      resources: [
        {
          name: 'HUD Housing Counseling',
          organization: 'U.S. Dept of Housing',
          description: 'Free housing counseling and assistance finding affordable housing.',
          url: 'https://www.hud.gov/findhelp',
          phone: '1-800-569-4287',
        },
        {
          name: 'Transitional Housing',
          organization: 'Various',
          description: 'Temporary housing programs specifically for people reentering from incarceration.',
          url: 'https://www.hudexchange.info/housing-and-homeless-assistance/',
          phone: 'Contact local reentry programs',
        },
        {
          name: 'Salvation Army Housing',
          organization: 'Salvation Army',
          description: 'Emergency shelters and transitional housing programs nationwide.',
          url: 'https://www.salvationarmyusa.org/usn/provide-shelter/',
          phone: '1-800-725-2769',
        },
        {
          name: 'Oxford Houses',
          organization: 'Oxford House Inc.',
          description: 'Self-supporting recovery housing. Good option for those in recovery.',
          url: 'https://www.oxfordhouse.org/',
          phone: '1-800-689-6411',
        },
      ],
    },
    {
      title: 'Clothing & Essentials',
      icon: 'tshirt.fill' as const,
      color: colors.warning,
      resources: [
        {
          name: 'Dress for Success',
          organization: 'Dress for Success',
          description: 'Professional clothing for job interviews. Free suits and interview prep.',
          url: 'https://dressforsuccess.org/',
          phone: 'Find local affiliate',
        },
        {
          name: 'Goodwill',
          organization: 'Goodwill Industries',
          description: 'Affordable clothing and household items. Many offer voucher programs.',
          url: 'https://www.goodwill.org/locator/',
          phone: 'Contact local store',
        },
        {
          name: 'St. Vincent de Paul',
          organization: 'Society of St. Vincent de Paul',
          description: 'Clothing, furniture, and household items assistance.',
          url: 'https://www.svdpusa.org/',
          phone: 'Contact local chapter',
        },
        {
          name: 'The Salvation Army',
          organization: 'Salvation Army',
          description: 'Clothing assistance and thrift stores with voucher programs.',
          url: 'https://www.salvationarmyusa.org/',
          phone: '1-800-725-2769',
        },
      ],
    },
    {
      title: 'Utility Assistance',
      icon: 'bolt.fill' as const,
      color: colors.error,
      resources: [
        {
          name: 'LIHEAP',
          organization: 'Federal Program',
          description: 'Low Income Home Energy Assistance Program helps pay heating and cooling bills.',
          url: 'https://www.acf.hhs.gov/ocs/programs/liheap',
          phone: '1-866-674-6327',
        },
        {
          name: 'Utility Company Programs',
          organization: 'Local Utilities',
          description: 'Most utility companies have hardship programs. Call and ask about payment plans.',
          url: 'Contact your utility provider',
          phone: 'Call your utility company',
        },
        {
          name: 'Dollar Energy Fund',
          organization: 'Dollar Energy Fund',
          description: 'Utility assistance grants in many states.',
          url: 'https://dollarenergy.org/',
          phone: '1-800-542-3929',
        },
      ],
    },
    {
      title: 'Healthcare',
      icon: 'cross.fill' as const,
      color: '#E91E63',
      resources: [
        {
          name: 'Medicaid',
          organization: 'State Programs',
          description: 'Free or low-cost health insurance. Apply immediately upon release.',
          url: 'https://www.medicaid.gov/about-us/beneficiary-resources/index.html',
          phone: '1-877-267-2323',
        },
        {
          name: 'Community Health Centers',
          organization: 'HRSA',
          description: 'Sliding-scale fee clinics that serve everyone regardless of ability to pay.',
          url: 'https://findahealthcenter.hrsa.gov/',
          phone: 'Find local center',
        },
        {
          name: 'Free Clinics',
          organization: 'National Association of Free Clinics',
          description: 'Completely free medical care at volunteer-run clinics.',
          url: 'https://nafcclinics.org/find-clinic/',
          phone: 'Find local clinic',
        },
        {
          name: 'Mental Health Services',
          organization: 'SAMHSA',
          description: 'Find mental health and substance abuse treatment services.',
          url: 'https://findtreatment.gov/',
          phone: '1-800-662-4357',
        },
      ],
    },
    {
      title: 'Transportation',
      icon: 'car.fill' as const,
      color: '#9C27B0',
      resources: [
        {
          name: 'Vehicles for Change',
          organization: 'Vehicles for Change',
          description: 'Provides cars to working families at very low cost.',
          url: 'https://vehiclesforchange.org/',
          phone: '410-242-9674',
        },
        {
          name: 'Working Cars for Working Families',
          organization: 'Various Programs',
          description: 'Car donation programs that provide vehicles to those in need.',
          url: 'Search local programs',
          phone: 'Contact local charities',
        },
        {
          name: 'Public Transit Assistance',
          organization: 'Local Transit',
          description: 'Many cities offer reduced fare programs for low-income riders.',
          url: 'Contact local transit authority',
          phone: 'Call local transit',
        },
      ],
    },
  ];

  const findLocalHelp = [
    { name: '211 Helpline', description: 'Dial 211 for local resources', url: 'https://www.211.org/', action: 'Call 211' },
    { name: 'United Way', description: 'Community resources nationwide', url: 'https://www.unitedway.org/', action: 'Visit' },
    { name: 'Catholic Charities', description: 'Help regardless of religion', url: 'https://www.catholiccharitiesusa.org/', action: 'Visit' },
    { name: 'Jewish Family Services', description: 'Open to all, not just Jewish families', url: 'https://www.networkjfs.org/', action: 'Visit' },
  ];

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
            <Text className="text-xl font-bold text-foreground">Community Resources</Text>
            <Text className="text-sm text-muted">Food, housing, clothing & more</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View className="px-4 py-4">
          <View className="bg-success rounded-xl p-5">
            <View className="flex-row items-center mb-3">
              <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3">
                <Text className="text-3xl">🤝</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">Help Is Available</Text>
                <Text className="text-sm text-white/80">You don't have to do this alone</Text>
              </View>
            </View>
            <Text className="text-sm text-white/90 leading-relaxed">
              Getting back on your feet takes support. These resources can help with basic needs 
              while you focus on rebuilding your life. Most services are free and don't require 
              extensive documentation.
            </Text>
          </View>
        </View>

        {/* Quick Access - 211 */}
        <View className="px-4 py-2">
          <TouchableOpacity
            className="bg-primary rounded-xl p-4 flex-row items-center"
            onPress={() => Linking.openURL('tel:211')}
            activeOpacity={0.7}
          >
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-3">
              <IconSymbol name="phone.fill" size={24} color="#FFFFFF" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">Dial 211</Text>
              <Text className="text-sm text-white/80">Connect to local resources instantly</Text>
            </View>
            <IconSymbol name="chevron.right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Resource Categories */}
        {resourceCategories.map((category, catIndex) => (
          <View key={catIndex} className="px-4 py-4">
            <View className="flex-row items-center mb-3 px-1">
              <View 
                className="w-8 h-8 rounded-full items-center justify-center mr-2"
                style={{ backgroundColor: category.color + '20' }}
              >
                <IconSymbol name={category.icon} size={18} color={category.color} />
              </View>
              <Text className="text-lg font-semibold text-foreground">{category.title}</Text>
            </View>
            
            {category.resources.map((resource, resIndex) => (
              <TouchableOpacity
                key={resIndex}
                className="bg-surface rounded-xl p-4 mb-3 border border-border"
                onPress={() => resource.url.startsWith('http') ? Linking.openURL(resource.url) : null}
                activeOpacity={0.7}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground">{resource.name}</Text>
                    <Text className="text-xs text-primary">{resource.organization}</Text>
                  </View>
                  {resource.url.startsWith('http') && (
                    <IconSymbol name="arrow.up.right" size={16} color={colors.primary} />
                  )}
                </View>
                <Text className="text-sm text-muted mb-2">{resource.description}</Text>
                {resource.phone && (
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => {
                      const phoneNumber = resource.phone.replace(/[^0-9]/g, '');
                      if (phoneNumber.length >= 10) {
                        Linking.openURL(`tel:${phoneNumber}`);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <IconSymbol name="phone.fill" size={14} color={colors.success} />
                    <Text className="text-sm font-medium ml-1" style={{ color: colors.success }}>
                      {resource.phone}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Find Local Help */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-foreground mb-3 px-1">Find Local Help</Text>
          <View className="flex-row flex-wrap justify-between">
            {findLocalHelp.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-surface rounded-xl p-4 mb-3 border border-border"
                onPress={() => item.url.startsWith('http') ? Linking.openURL(item.url) : Linking.openURL('tel:211')}
                activeOpacity={0.7}
              >
                <Text className="text-sm font-semibold text-foreground mb-1">{item.name}</Text>
                <Text className="text-xs text-muted mb-2">{item.description}</Text>
                <View className="bg-primary/10 rounded-lg px-2 py-1 self-start">
                  <Text className="text-xs font-medium" style={{ color: colors.primary }}>{item.action}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View className="px-4 py-4">
          <View className="bg-primary/10 rounded-xl p-4 border border-primary/30">
            <Text className="text-base font-semibold text-foreground mb-2">💡 Tips for Getting Help</Text>
            <View className="space-y-2">
              {[
                'Call 211 first - they know all local resources',
                'Don\'t be afraid to ask - these services exist to help',
                'Bring ID if you have it, but many places don\'t require it',
                'Ask about other programs - staff often know hidden resources',
                'Apply for multiple programs - you may qualify for more than you think',
              ].map((tip, index) => (
                <View key={index} className="flex-row items-start mb-1">
                  <Text className="text-primary mr-2">•</Text>
                  <Text className="flex-1 text-sm text-muted">{tip}</Text>
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
            <Text className="text-white font-semibold ml-2">Ask AI About Resources</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
