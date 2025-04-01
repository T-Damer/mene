import BirthDateStep from '@/app/@onboarding/user-info/BirthDateStep'
import { MetadataKeys, UserStoreKeys } from './userAtom'
import { ComponentType } from 'react'
import PregnancyStep from '@/app/@onboarding/user-info/PregnancyStep'
import ContraceptionTypeStep from '@/app/@onboarding/user-info/ContraceptionTypeStep'
import CycleAffectsDietStep from '@/app/@onboarding/user-info/CycleAffectsDietStep'
import CycleAffectsMentalityStep from '@/app/@onboarding/user-info/CycleAffectsMentalityStep'
import CycleAffectsSkinStep from '@/app/@onboarding/user-info/CycleAffectsSkinStep'
import CycleAffectsSleepStep from '@/app/@onboarding/user-info/CycleAffectsSleepStep'
import CycleAffectsTirednessStep from '@/app/@onboarding/user-info/CycleAffectsTirednessStep'
import CycleBeginDateStep from '@/app/@onboarding/user-info/CycleBeginDateStep'
import CycleKnowledgeStep from '@/app/@onboarding/user-info/CycleKnowledgeStep'
import CycleRegularityStep from '@/app/@onboarding/user-info/CycleRegularityStep'
import CycleRelationshipStep from '@/app/@onboarding/user-info/CycleRelationshipStep'
import EnhanceLifeStep from '@/app/@onboarding/user-info/EnhanceLifeStep'
import HeightStep from '@/app/@onboarding/user-info/HeightStep'
import IllnessesStep from '@/app/@onboarding/user-info/IllnessesStep'
import TodaysFeelingStep from '@/app/@onboarding/user-info/TodaysFeelingStep'
import WeightStep from '@/app/@onboarding/user-info/WeightStep'

export type StepKey = Exclude<UserStoreKeys, MetadataKeys>

export interface StepComponentProps {
  value: any
  onChange: (value: any) => void
  onContinue: () => void
}

export const STEP_COMPONENTS: Record<
  StepKey,
  ComponentType<StepComponentProps>
> = {
  birthDate: BirthDateStep,
  pregnancy: PregnancyStep,
  cycleRelationship: CycleRelationshipStep,
  cycleKnowledge: CycleKnowledgeStep,
  cycleRegularity: CycleRegularityStep,
  cycleBeginDate: CycleBeginDateStep,
  contraceptionType: ContraceptionTypeStep,
  illnesses: IllnessesStep,
  todaysFeelings: TodaysFeelingStep,
  cycleAffectsSleep: CycleAffectsSleepStep,
  cycleAffectsSkin: CycleAffectsSkinStep,
  cycleAffectsTiredness: CycleAffectsTirednessStep,
  cycleAffectsDiet: CycleAffectsDietStep,
  cycleAffectsMentality: CycleAffectsMentalityStep,
  weight: WeightStep,
  height: HeightStep,
  willUseAppToEnhanceMyLife: EnhanceLifeStep,
}
