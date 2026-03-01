import { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

type QuizStep = 'intro' | 'state' | 'offense-type' | 'conviction-type' | 'time-elapsed' | 'sentence-complete' | 'new-offenses' | 'prior-expungements' | 'result';

interface QuizAnswers {
  state: string;
  offenseType: string;
  convictionType: string;
  timeElapsed: string;
  sentenceComplete: string;
  newOffenses: string;
  priorExpungements: string;
}

export default function ExpungementQuizScreen() {
  const router = useRouter();
  const colors = useColors();
  const [currentStep, setCurrentStep] = useState<QuizStep>('intro');
  const [answers, setAnswers] = useState<QuizAnswers>({
    state: '',
    offenseType: '',
    convictionType: '',
    timeElapsed: '',
    sentenceComplete: '',
    newOffenses: '',
    priorExpungements: '',
  });

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming', 'Federal'
  ];

  const cleanSlateStates = ['Pennsylvania', 'Michigan', 'Utah', 'New Jersey', 'Connecticut', 'Delaware', 'Oklahoma', 'Colorado'];

  const offenseTypes = [
    { id: 'non-violent-misdemeanor', label: 'Non-violent Misdemeanor', description: 'Petty theft, minor drug possession, disorderly conduct, etc.' },
    { id: 'violent-misdemeanor', label: 'Violent Misdemeanor', description: 'Simple assault, harassment, etc.' },
    { id: 'non-violent-felony', label: 'Non-violent Felony', description: 'Theft over certain amount, drug offenses, fraud, etc.' },
    { id: 'violent-felony', label: 'Violent Felony', description: 'Robbery, aggravated assault, etc.' },
    { id: 'sex-offense', label: 'Sex Offense', description: 'Any offense requiring registration' },
    { id: 'dui-dwi', label: 'DUI/DWI', description: 'Driving under the influence' },
    { id: 'drug-offense', label: 'Drug Offense', description: 'Possession, distribution, manufacturing' },
    { id: 'arrest-only', label: 'Arrest Only (No Conviction)', description: 'Charges dropped, dismissed, or acquitted' },
  ];

  const convictionTypes = [
    { id: 'conviction', label: 'Convicted (Found Guilty)', description: 'Pled guilty or found guilty at trial' },
    { id: 'deferred', label: 'Deferred Adjudication/Probation', description: 'Completed probation, case dismissed' },
    { id: 'dismissed', label: 'Charges Dismissed', description: 'Prosecutor dropped charges' },
    { id: 'acquitted', label: 'Acquitted (Found Not Guilty)', description: 'Found not guilty at trial' },
    { id: 'nolle', label: 'Nolle Prosequi', description: 'Prosecutor declined to prosecute' },
  ];

  const timeOptions = [
    { id: 'less-than-1', label: 'Less than 1 year' },
    { id: '1-3-years', label: '1-3 years' },
    { id: '3-5-years', label: '3-5 years' },
    { id: '5-7-years', label: '5-7 years' },
    { id: '7-10-years', label: '7-10 years' },
    { id: 'more-than-10', label: 'More than 10 years' },
  ];

  const yesNoOptions = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
    { id: 'unsure', label: "I'm not sure" },
  ];

  const priorExpungementOptions = [
    { id: 'none', label: 'None - This would be my first' },
    { id: 'one', label: 'One previous expungement' },
    { id: 'multiple', label: 'Multiple previous expungements' },
    { id: 'unsure', label: "I'm not sure" },
  ];

  const handleAnswer = (field: keyof QuizAnswers, value: string) => {
    setAnswers({ ...answers, [field]: value });
  };

  const getNextStep = (current: QuizStep): QuizStep => {
    const steps: QuizStep[] = ['intro', 'state', 'offense-type', 'conviction-type', 'time-elapsed', 'sentence-complete', 'new-offenses', 'prior-expungements', 'result'];
    const currentIndex = steps.indexOf(current);
    return steps[currentIndex + 1] || 'result';
  };

  const getPrevStep = (current: QuizStep): QuizStep => {
    const steps: QuizStep[] = ['intro', 'state', 'offense-type', 'conviction-type', 'time-elapsed', 'sentence-complete', 'new-offenses', 'prior-expungements', 'result'];
    const currentIndex = steps.indexOf(current);
    return steps[currentIndex - 1] || 'intro';
  };

  const getProgress = (): number => {
    const steps: QuizStep[] = ['intro', 'state', 'offense-type', 'conviction-type', 'time-elapsed', 'sentence-complete', 'new-offenses', 'prior-expungements', 'result'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex) / (steps.length - 1)) * 100;
  };

  const calculateEligibility = () => {
    let score = 0;
    let factors: string[] = [];
    let concerns: string[] = [];
    let recommendations: string[] = [];

    // Arrest only - almost always eligible
    if (answers.offenseType === 'arrest-only' || answers.convictionType === 'dismissed' || answers.convictionType === 'acquitted' || answers.convictionType === 'nolle') {
      score += 40;
      factors.push('Non-conviction records are typically easier to expunge');
      recommendations.push('Request expungement of arrest records from the court where you were charged');
    }

    // Offense type scoring
    if (answers.offenseType === 'non-violent-misdemeanor') {
      score += 30;
      factors.push('Non-violent misdemeanors are commonly eligible for expungement');
    } else if (answers.offenseType === 'drug-offense') {
      score += 20;
      factors.push('Many states have expanded expungement for drug offenses');
      recommendations.push('Check if your state has specific marijuana expungement provisions');
    } else if (answers.offenseType === 'non-violent-felony') {
      score += 15;
      factors.push('Some non-violent felonies may be eligible depending on your state');
    } else if (answers.offenseType === 'dui-dwi') {
      score += 10;
      concerns.push('DUI/DWI expungement is limited in most states');
    } else if (answers.offenseType === 'violent-misdemeanor') {
      score += 10;
      concerns.push('Violent offenses have more restrictions');
    } else if (answers.offenseType === 'violent-felony') {
      score += 5;
      concerns.push('Violent felonies are often excluded from expungement');
    } else if (answers.offenseType === 'sex-offense') {
      score += 0;
      concerns.push('Sex offenses are typically not eligible for expungement');
    }

    // Conviction type scoring
    if (answers.convictionType === 'deferred') {
      score += 15;
      factors.push('Deferred adjudication often qualifies for sealing or expungement');
    } else if (answers.convictionType === 'conviction') {
      score += 5;
      // Standard conviction, depends on other factors
    }

    // Time elapsed scoring
    if (answers.timeElapsed === 'more-than-10') {
      score += 20;
      factors.push('Significant time has passed since your case');
    } else if (answers.timeElapsed === '7-10-years') {
      score += 15;
      factors.push('You likely meet most waiting period requirements');
    } else if (answers.timeElapsed === '5-7-years') {
      score += 12;
      factors.push('You may meet waiting period requirements in many states');
    } else if (answers.timeElapsed === '3-5-years') {
      score += 8;
      factors.push('Some states allow expungement after 3-5 years');
    } else if (answers.timeElapsed === '1-3-years') {
      score += 4;
      concerns.push('You may need to wait longer in some states');
    } else if (answers.timeElapsed === 'less-than-1') {
      score += 0;
      concerns.push('Most states require a waiting period before expungement');
    }

    // Sentence completion
    if (answers.sentenceComplete === 'yes') {
      score += 15;
      factors.push('Completing your sentence is typically required');
    } else if (answers.sentenceComplete === 'no') {
      score -= 10;
      concerns.push('You must complete your entire sentence before applying');
      recommendations.push('Complete all probation, parole, fines, and restitution first');
    }

    // New offenses
    if (answers.newOffenses === 'yes') {
      score -= 15;
      concerns.push('New offenses can disqualify you from expungement');
      recommendations.push('You may need to wait until the new case is resolved');
    } else if (answers.newOffenses === 'no') {
      score += 10;
      factors.push('No new offenses is favorable for your application');
    }

    // Prior expungements
    if (answers.priorExpungements === 'none') {
      score += 5;
      factors.push('First-time expungement applicants often have better chances');
    } else if (answers.priorExpungements === 'multiple') {
      concerns.push('Some states limit the number of expungements allowed');
    }

    // Clean Slate state bonus
    if (cleanSlateStates.includes(answers.state)) {
      score += 10;
      factors.push(`${answers.state} has Clean Slate laws that may automatically expunge eligible records`);
      recommendations.push('Check if your record qualifies for automatic expungement under Clean Slate');
    }

    // Determine eligibility level
    let eligibility: 'likely' | 'possible' | 'unlikely' | 'needs-review';
    if (score >= 60) {
      eligibility = 'likely';
    } else if (score >= 40) {
      eligibility = 'possible';
    } else if (score >= 20) {
      eligibility = 'needs-review';
    } else {
      eligibility = 'unlikely';
    }

    // Add general recommendations
    recommendations.push('Obtain your official criminal record to verify what appears');
    recommendations.push('Consult with a local attorney or legal aid organization');
    if (answers.state) {
      recommendations.push(`Research ${answers.state}'s specific expungement laws and forms`);
    }

    return { eligibility, score, factors, concerns, recommendations };
  };

  const renderIntro = () => (
    <View className="flex-1 px-4 py-6">
      <View className="bg-primary rounded-xl p-6 mb-6">
        <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mb-4 self-center">
          <IconSymbol name="checkmark.shield.fill" size={36} color="#FFFFFF" />
        </View>
        <Text className="text-2xl font-bold text-white text-center mb-3">
          Expungement Eligibility Quiz
        </Text>
        <Text className="text-base text-white/90 text-center leading-relaxed">
          Answer a few questions to get a personalized assessment of whether you might qualify for expungement.
        </Text>
      </View>

      <View className="bg-surface rounded-xl p-4 mb-6 border border-border">
        <Text className="text-base font-semibold text-foreground mb-3">What you'll learn:</Text>
        <View className="space-y-2">
          {[
            'Whether your offense type is commonly eligible',
            'If you meet typical waiting period requirements',
            'State-specific factors that may help or hurt',
            'Recommended next steps for your situation',
          ].map((item, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-sm text-muted ml-2">{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="bg-warning/10 rounded-xl p-4 mb-6 border border-warning/30">
        <View className="flex-row items-start">
          <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} style={{ marginTop: 2 }} />
          <Text className="flex-1 text-sm text-muted ml-2 leading-relaxed">
            <Text className="font-semibold text-foreground">Important:</Text> This quiz provides general guidance only and is not legal advice. 
            Eligibility varies significantly by state and individual circumstances. Always consult with an attorney for your specific situation.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-primary rounded-xl py-4 items-center"
        onPress={() => setCurrentStep('state')}
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-lg">Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStateSelection = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">Where did your case occur?</Text>
      <Text className="text-sm text-muted mb-4">Select the state where you were charged or convicted.</Text>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {states.map((state) => (
            <TouchableOpacity
              key={state}
              className={`w-[48%] rounded-xl p-3 mb-2 border ${answers.state === state ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
              onPress={() => handleAnswer('state', state)}
              activeOpacity={0.7}
            >
              <Text className={`text-sm font-medium text-center ${answers.state === state ? 'text-white' : 'text-foreground'}`}>
                {state}
              </Text>
              {cleanSlateStates.includes(state) && (
                <Text className={`text-xs text-center mt-1 ${answers.state === state ? 'text-white/80' : 'text-primary'}`}>
                  Clean Slate State
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.state ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.state && setCurrentStep(getNextStep(currentStep))}
          activeOpacity={0.7}
          disabled={!answers.state}
        >
          <Text className={answers.state ? 'text-white font-medium' : 'text-muted font-medium'}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOffenseType = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">What type of offense?</Text>
      <Text className="text-sm text-muted mb-4">Select the category that best describes your case.</Text>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {offenseTypes.map((offense) => (
          <TouchableOpacity
            key={offense.id}
            className={`rounded-xl p-4 mb-3 border ${answers.offenseType === offense.id ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
            onPress={() => handleAnswer('offenseType', offense.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-base font-semibold ${answers.offenseType === offense.id ? 'text-white' : 'text-foreground'}`}>
              {offense.label}
            </Text>
            <Text className={`text-sm mt-1 ${answers.offenseType === offense.id ? 'text-white/80' : 'text-muted'}`}>
              {offense.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.offenseType ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.offenseType && setCurrentStep(getNextStep(currentStep))}
          activeOpacity={0.7}
          disabled={!answers.offenseType}
        >
          <Text className={answers.offenseType ? 'text-white font-medium' : 'text-muted font-medium'}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConvictionType = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">What was the outcome?</Text>
      <Text className="text-sm text-muted mb-4">How did your case end?</Text>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {convictionTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            className={`rounded-xl p-4 mb-3 border ${answers.convictionType === type.id ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
            onPress={() => handleAnswer('convictionType', type.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-base font-semibold ${answers.convictionType === type.id ? 'text-white' : 'text-foreground'}`}>
              {type.label}
            </Text>
            <Text className={`text-sm mt-1 ${answers.convictionType === type.id ? 'text-white/80' : 'text-muted'}`}>
              {type.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.convictionType ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.convictionType && setCurrentStep(getNextStep(currentStep))}
          activeOpacity={0.7}
          disabled={!answers.convictionType}
        >
          <Text className={answers.convictionType ? 'text-white font-medium' : 'text-muted font-medium'}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTimeElapsed = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">How long ago was this?</Text>
      <Text className="text-sm text-muted mb-4">Time since your conviction or case completion.</Text>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {timeOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`rounded-xl p-4 mb-3 border ${answers.timeElapsed === option.id ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
            onPress={() => handleAnswer('timeElapsed', option.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-base font-semibold text-center ${answers.timeElapsed === option.id ? 'text-white' : 'text-foreground'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.timeElapsed ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.timeElapsed && setCurrentStep(getNextStep(currentStep))}
          activeOpacity={0.7}
          disabled={!answers.timeElapsed}
        >
          <Text className={answers.timeElapsed ? 'text-white font-medium' : 'text-muted font-medium'}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSentenceComplete = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">Have you completed your sentence?</Text>
      <Text className="text-sm text-muted mb-4">Including probation, parole, fines, and restitution.</Text>
      
      <View className="flex-1">
        {yesNoOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`rounded-xl p-4 mb-3 border ${answers.sentenceComplete === option.id ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
            onPress={() => handleAnswer('sentenceComplete', option.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-base font-semibold text-center ${answers.sentenceComplete === option.id ? 'text-white' : 'text-foreground'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.sentenceComplete ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.sentenceComplete && setCurrentStep(getNextStep(currentStep))}
          activeOpacity={0.7}
          disabled={!answers.sentenceComplete}
        >
          <Text className={answers.sentenceComplete ? 'text-white font-medium' : 'text-muted font-medium'}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNewOffenses = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">Any new arrests or convictions?</Text>
      <Text className="text-sm text-muted mb-4">Since the case you want to expunge.</Text>
      
      <View className="flex-1">
        {yesNoOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`rounded-xl p-4 mb-3 border ${answers.newOffenses === option.id ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
            onPress={() => handleAnswer('newOffenses', option.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-base font-semibold text-center ${answers.newOffenses === option.id ? 'text-white' : 'text-foreground'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.newOffenses ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.newOffenses && setCurrentStep(getNextStep(currentStep))}
          activeOpacity={0.7}
          disabled={!answers.newOffenses}
        >
          <Text className={answers.newOffenses ? 'text-white font-medium' : 'text-muted font-medium'}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPriorExpungements = () => (
    <View className="flex-1 px-4 py-4">
      <Text className="text-xl font-bold text-foreground mb-2">Previous expungements?</Text>
      <Text className="text-sm text-muted mb-4">Have you had any records expunged before?</Text>
      
      <View className="flex-1">
        {priorExpungementOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            className={`rounded-xl p-4 mb-3 border ${answers.priorExpungements === option.id ? 'bg-primary border-primary' : 'bg-surface border-border'}`}
            onPress={() => handleAnswer('priorExpungements', option.id)}
            activeOpacity={0.7}
          >
            <Text className={`text-base font-semibold text-center ${answers.priorExpungements === option.id ? 'text-white' : 'text-foreground'}`}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-row mt-4 pt-4 border-t border-border">
        <TouchableOpacity
          className="flex-1 bg-surface rounded-xl py-3 mr-2 items-center border border-border"
          onPress={() => setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <Text className="text-foreground font-medium">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-xl py-3 ml-2 items-center ${answers.priorExpungements ? 'bg-primary' : 'bg-muted/30'}`}
          onPress={() => answers.priorExpungements && setCurrentStep('result')}
          activeOpacity={0.7}
          disabled={!answers.priorExpungements}
        >
          <Text className={answers.priorExpungements ? 'text-white font-medium' : 'text-muted font-medium'}>See Results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResult = () => {
    const result = calculateEligibility();
    
    const getEligibilityColor = () => {
      switch (result.eligibility) {
        case 'likely': return colors.success;
        case 'possible': return colors.primary;
        case 'needs-review': return colors.warning;
        case 'unlikely': return colors.error;
      }
    };

    const getEligibilityTitle = () => {
      switch (result.eligibility) {
        case 'likely': return 'Likely Eligible';
        case 'possible': return 'Possibly Eligible';
        case 'needs-review': return 'Needs Legal Review';
        case 'unlikely': return 'May Face Challenges';
      }
    };

    const getEligibilityDescription = () => {
      switch (result.eligibility) {
        case 'likely': return 'Based on your answers, you appear to have a good chance of qualifying for expungement. We recommend consulting with an attorney to confirm.';
        case 'possible': return 'You may be eligible for some form of record relief. The specific options depend on your state\'s laws and individual circumstances.';
        case 'needs-review': return 'Your situation has factors that require careful legal analysis. We strongly recommend consulting with an attorney.';
        case 'unlikely': return 'Based on your answers, expungement may be challenging but not impossible. Some states have expanded eligibility recently.';
      }
    };

    return (
      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Result Header */}
        <View 
          className="rounded-xl p-6 mb-4"
          style={{ backgroundColor: getEligibilityColor() + '20' }}
        >
          <View className="items-center mb-4">
            <View 
              className="w-20 h-20 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: getEligibilityColor() + '30' }}
            >
              <IconSymbol 
                name={result.eligibility === 'likely' || result.eligibility === 'possible' ? 'checkmark.circle.fill' : 'exclamationmark.circle.fill'} 
                size={44} 
                color={getEligibilityColor()} 
              />
            </View>
            <Text className="text-2xl font-bold text-foreground">{getEligibilityTitle()}</Text>
          </View>
          <Text className="text-sm text-muted text-center leading-relaxed">
            {getEligibilityDescription()}
          </Text>
        </View>

        {/* Summary */}
        <View className="bg-surface rounded-xl p-4 mb-4 border border-border">
          <Text className="text-base font-semibold text-foreground mb-3">Your Answers</Text>
          <View className="space-y-2">
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-muted">State</Text>
              <Text className="text-sm font-medium text-foreground">{answers.state}</Text>
            </View>
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-muted">Offense Type</Text>
              <Text className="text-sm font-medium text-foreground">{offenseTypes.find(o => o.id === answers.offenseType)?.label}</Text>
            </View>
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-muted">Case Outcome</Text>
              <Text className="text-sm font-medium text-foreground">{convictionTypes.find(c => c.id === answers.convictionType)?.label}</Text>
            </View>
            <View className="flex-row justify-between py-1">
              <Text className="text-sm text-muted">Time Elapsed</Text>
              <Text className="text-sm font-medium text-foreground">{timeOptions.find(t => t.id === answers.timeElapsed)?.label}</Text>
            </View>
          </View>
        </View>

        {/* Positive Factors */}
        {result.factors.length > 0 && (
          <View className="bg-success/10 rounded-xl p-4 mb-4 border border-success/30">
            <View className="flex-row items-center mb-3">
              <IconSymbol name="checkmark.circle.fill" size={18} color={colors.success} />
              <Text className="text-base font-semibold text-foreground ml-2">Favorable Factors</Text>
            </View>
            {result.factors.map((factor, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text className="text-success mr-2">•</Text>
                <Text className="flex-1 text-sm text-foreground">{factor}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Concerns */}
        {result.concerns.length > 0 && (
          <View className="bg-warning/10 rounded-xl p-4 mb-4 border border-warning/30">
            <View className="flex-row items-center mb-3">
              <IconSymbol name="exclamationmark.triangle" size={18} color={colors.warning} />
              <Text className="text-base font-semibold text-foreground ml-2">Potential Concerns</Text>
            </View>
            {result.concerns.map((concern, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <Text className="text-warning mr-2">•</Text>
                <Text className="flex-1 text-sm text-foreground">{concern}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Recommendations */}
        <View className="bg-primary/10 rounded-xl p-4 mb-4 border border-primary/30">
          <View className="flex-row items-center mb-3">
            <IconSymbol name="lightbulb.fill" size={18} color={colors.primary} />
            <Text className="text-base font-semibold text-foreground ml-2">Recommended Next Steps</Text>
          </View>
          {result.recommendations.map((rec, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <View 
                className="w-5 h-5 rounded-full items-center justify-center mr-2"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-xs text-white font-bold">{index + 1}</Text>
              </View>
              <Text className="flex-1 text-sm text-foreground">{rec}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="space-y-3 mb-6">
          <TouchableOpacity
            className="bg-primary rounded-xl py-4 items-center"
            onPress={() => router.push("/expungement" as any)}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">View Full Expungement Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-surface rounded-xl py-4 items-center border border-border"
            onPress={() => router.push("/assistant" as any)}
            activeOpacity={0.7}
          >
            <Text className="text-foreground font-semibold">Ask AI About Your Situation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-surface rounded-xl py-4 items-center border border-border"
            onPress={() => Linking.openURL('https://www.lawhelp.org/')}
            activeOpacity={0.7}
          >
            <Text className="text-foreground font-semibold">Find Free Legal Help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3 items-center"
            onPress={() => {
              setAnswers({
                state: '',
                offenseType: '',
                convictionType: '',
                timeElapsed: '',
                sentenceComplete: '',
                newOffenses: '',
                priorExpungements: '',
              });
              setCurrentStep('intro');
            }}
            activeOpacity={0.7}
          >
            <Text className="text-muted font-medium">Take Quiz Again</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <View className="bg-surface rounded-xl p-4 mb-8 border border-border">
          <View className="flex-row items-start">
            <IconSymbol name="info.circle" size={18} color={colors.muted} style={{ marginTop: 2 }} />
            <Text className="flex-1 text-xs text-muted ml-2 leading-relaxed">
              This assessment is for informational purposes only and does not constitute legal advice. 
              Expungement eligibility depends on many factors specific to your case and jurisdiction. 
              Always consult with a qualified attorney before making legal decisions.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'intro': return renderIntro();
      case 'state': return renderStateSelection();
      case 'offense-type': return renderOffenseType();
      case 'conviction-type': return renderConvictionType();
      case 'time-elapsed': return renderTimeElapsed();
      case 'sentence-complete': return renderSentenceComplete();
      case 'new-offenses': return renderNewOffenses();
      case 'prior-expungements': return renderPriorExpungements();
      case 'result': return renderResult();
      default: return renderIntro();
    }
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View className="px-5 pt-4 pb-3 bg-surface flex-row items-center border-b border-border">
        <TouchableOpacity
          className="mr-3 p-1"
          onPress={() => currentStep === 'intro' || currentStep === 'result' ? router.back() : setCurrentStep(getPrevStep(currentStep))}
          activeOpacity={0.7}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">Eligibility Quiz</Text>
          {currentStep !== 'intro' && currentStep !== 'result' && (
            <Text className="text-xs text-muted">Question {['state', 'offense-type', 'conviction-type', 'time-elapsed', 'sentence-complete', 'new-offenses', 'prior-expungements'].indexOf(currentStep) + 1} of 7</Text>
          )}
        </View>
      </View>

      {/* Progress Bar */}
      {currentStep !== 'intro' && currentStep !== 'result' && (
        <View className="h-1 bg-border">
          <View 
            className="h-full bg-primary" 
            style={{ width: `${getProgress()}%` }} 
          />
        </View>
      )}

      {renderCurrentStep()}
    </ScreenContainer>
  );
}
