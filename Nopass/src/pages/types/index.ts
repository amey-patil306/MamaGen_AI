export type TrimesterNumber = 1 | 2 | 3;

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface ScheduleData {
  1: ScheduleItem[];
  2: ScheduleItem[];
  3: ScheduleItem[];
}

export interface PregnancyStat {
  icon: JSX.Element;
  label: string;
  value: string;
  subtext: string;
}

export interface BirthPlanPreference {
  id: number;
  title: string;
  selected: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}