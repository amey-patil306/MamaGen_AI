export interface DailyEntry {
  id?: number;
  date: string;
  moodLevel: string;
  motivationLevel: string;
  stressLevel: string;
  taskClarity: string;
  taskComplexity: string;
  deadlinePressure: string;
  concentrationLevel: string;
  breakFrequency: string;
  taskCompletionEfficiency: string;
  progressSatisfaction: string;
  goalAlignmentPerception: string;
  sittingHours: string;
  physicalDiscomfort: string;
  meetingDuration: string;
  meetingFrequency: string;
}

export const OPTIONS = {
  moodLevels: ['Very Positive', 'Positive', 'Neutral', 'Negative', 'Very Negative'],
  motivationLevels: ['High Motivation', 'Moderate Motivation', 'Low Motivation', 'Very Low Motivation'],
  stressLevels: ['Very Low Stress', 'Low Stress', 'Moderate Stress', 'High Stress', 'Very High Stress'],
  taskClarity: ['Completely Clear', 'Mostly Clear', 'Moderate Clarity', 'Low Clarity', 'Very Low Clarity'],
  taskComplexity: ['Very Simple', 'Simple', 'Moderate', 'Complex', 'Highly Complex'],
  deadlinePressure: ['Very Relaxed', 'Low Pressure', 'Moderate Pressure', 'High Pressure', 'Extreme Pressure'],
  concentrationLevel: ['Very Focused', 'Focused', 'Moderate Focus', 'Low Focus', 'Very Low Focus'],
  breakFrequency: ['Frequent Breaks', 'Moderate Breaks', 'Occasional Breaks', 'Few Breaks', 'Minimal Breaks'],
  taskCompletionEfficiency: ['Highly Efficient', 'Efficient', 'Moderately Efficient', 'Low Efficiency', 'Very Low Efficiency'],
  progressSatisfaction: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very Unsatisfied'],
  goalAlignmentPerception: ['Very Aligned', 'Aligned', 'Moderate Alignment', 'Low Alignment', 'No Alignment'],
  sittingHours: ['Less than 1 Hour', '1-2 Hours', '2-4 Hours', '4-6 Hours', '6+ Hours'],
  physicalDiscomfort: ['No Discomfort', 'Minor Discomfort', 'Moderate Discomfort', 'High Discomfort', 'Severe Discomfort'],
  meetingDuration: ['Short (15-30 mins)', 'Moderate (30 mins-1 hour)', 'Long (1-2 hours)', 'Very Long (2+ hours)'],
  meetingFrequency: ['Daily', 'Few times a week', 'Weekly', 'Monthly']
};