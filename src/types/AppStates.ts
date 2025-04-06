export enum PregnancyState {
  no = 'нет',
  yes = 'да',
  willing = 'планирую',
}

export type FiveStars = 1 | 2 | 3 | 4 | 5

export enum ContraceptionType {
  nothing = 'ничего',
  progestin = 'прогестинг',
  implant = 'имплант',
  preservatives = 'презервативы',
  ovulationTracking = 'отслеживание овуляции',
  outCumming = 'окончание вне влагалища',
  else = 'другое',
}
export enum IllnessType {
  fungus = 'грибковые инфекции',
  bacterialVaginosis = 'бактериальный вагиноз',
  genitourinaryInfections = 'инфекции мочеполовой системы',
  polycysticOvarySyndrome = 'поликистоз яичников',
  endometriosis = 'эндометриоз',
  fibroids = 'фиброиды',
  notSure = 'не уверена',
  nothing = 'ничего',
}
export enum FeelingType {
  cramps = 'судороги',
  rashes = 'сыпь',
  bloating = 'вздутие живота',
  labileMood = 'перепады настроения',
  headaches = 'головные боли',
  soreness = 'чувствительность',
  chestPain = 'боль в груди',
  backPain = 'боль в спине',
  abdominalPain = 'боль в животе',
}

export enum YesNoSure {
  yes = 'да',
  no = 'нет',
  notSure = 'не уверена',
}

export enum CycleMentality {
  moodSwings = 'перепады настроения',
  anxiety = 'тревожность',
  pain = 'боль',
  irritability = 'раздражительность',
  lowMood = 'упадок настроения',
  premenstrualDysphoricDisorder = 'предменструальное дисфорическое расстройство',
  nothing = 'ничего',
  notSure = 'не уверена',
}

export class UserStore {
  birthDate?: number | undefined
  pregnancy?: PregnancyState
  cycleRelationship?: FiveStars
  cycleKnowledge?: FiveStars
  cycleRegularity?: boolean
  cycleBeginDate?: number | false
  contraceptionType?: ContraceptionType
  illnesses?: IllnessType
  todaysFeelings?: FeelingType
  cycleAffectsSleep?: YesNoSure
  cycleAffectsSkin?: YesNoSure
  cycleAffectsTiredness?: YesNoSure
  cycleAffectsDiet?: YesNoSure
  cycleAffectsMentality?: CycleMentality
  weight?: number
  height?: number
  willUseAppToEnhanceMyLife?: boolean
}

export interface OnboardingState {
  currentStep: UserStoreKeys
  completedSteps: UserStoreKeys[]
  version: number
  didOnboard: boolean
}

export interface AppState {
  userData: UserStore
  onboarding: OnboardingState
}

export type UserStoreKeys = keyof UserStore

export const onboardingSteps = Object.keys(new UserStore()) as UserStoreKeys[]
