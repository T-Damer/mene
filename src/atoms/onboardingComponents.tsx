import BirthDateStep from '@/components/UserInfo/BirthDateStep'
import { ComponentType } from 'react'
import PregnancyStep from '@/components/UserInfo/PregnancyStep'
import ContraceptionTypeStep from '@/components/UserInfo/ContraceptionTypeStep'
import CycleAffectsDietStep from '@/components/UserInfo/CycleAffectsDietStep'
import CycleAffectsMentalityStep from '@/components/UserInfo/CycleAffectsMentalityStep'
import CycleAffectsSkinStep from '@/components/UserInfo/CycleAffectsSkinStep'
import CycleAffectsSleepStep from '@/components/UserInfo/CycleAffectsSleepStep'
import CycleAffectsTirednessStep from '@/components/UserInfo/CycleAffectsTirednessStep'
import CycleBeginDateStep from '@/components/UserInfo/CycleBeginDateStep'
import CycleKnowledgeStep from '@/components/UserInfo/CycleKnowledgeStep'
import CycleRegularityStep from '@/components/UserInfo/CycleRegularityStep'
import CycleRelationshipStep from '@/components/UserInfo/CycleRelationshipStep'
import EnhanceLifeStep from '@/components/UserInfo/EnhanceLifeStep'
import HeightStep from '@/components/UserInfo/HeightStep'
import IllnessesStep from '@/components/UserInfo/IllnessesStep'
import TodaysFeelingStep from '@/components/UserInfo/TodaysFeelingStep'
import WeightStep from '@/components/UserInfo/WeightStep'
import { UserStoreKeys } from '@/types/AppStates'

export interface StepComponentProps {
  value: any
  onChange: (value: any) => void
  onContinue: () => void
}

export const STEP_COMPONENTS: Record<
  UserStoreKeys,
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
