import * as tf from '@tensorflow/tfjs';
import { DailyEntry } from '../types/tracker';

// Enhanced mappings for better feature representation
const SCALE_MAPPINGS = {
  mood: {
    'Very Positive': 1,
    'Positive': 0.75,
    'Neutral': 0.5,
    'Negative': 0.25,
    'Very Negative': 0
  },
  motivation: {
    'High Motivation': 1,
    'Moderate Motivation': 0.66,
    'Low Motivation': 0.33,
    'Very Low Motivation': 0
  },
  stress: {
    'Very Low Stress': 0,
    'Low Stress': 0.25,
    'Moderate Stress': 0.5,
    'High Stress': 0.75,
    'Very High Stress': 1
  },
  efficiency: {
    'Highly Efficient': 1,
    'Efficient': 0.75,
    'Moderately Efficient': 0.5,
    'Low Efficiency': 0.25,
    'Very Low Efficiency': 0
  }
};

const normalizeValue = (value: string, scale: any) => scale[value] ?? 0.5;

const preprocessData = (entries: DailyEntry[]) => {
  return entries.map(entry => ({
    features: [
      normalizeValue(entry.moodLevel, SCALE_MAPPINGS.mood),
      normalizeValue(entry.motivationLevel, SCALE_MAPPINGS.motivation),
      normalizeValue(entry.stressLevel, SCALE_MAPPINGS.stress),
      normalizeValue(entry.taskCompletionEfficiency, SCALE_MAPPINGS.efficiency)
    ],
    date: new Date(entry.date)
  }));
};

const createModel = () => {
  const model = tf.sequential();
  
  // Input layer with 4 features
  model.add(tf.layers.dense({
    units: 8,
    activation: 'relu',
    inputShape: [4]
  }));
  
  // Hidden layer
  model.add(tf.layers.dense({
    units: 4,
    activation: 'relu'
  }));
  
  // Output layer
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));
  
  return model;
};

export const predictProductivityTrend = async (entries: DailyEntry[]) => {
  if (entries.length < 3) return null;

  const processedData = preprocessData(entries);
  const model = createModel();
  
  // Prepare training data
  const xs = tf.tensor2d(processedData.map(d => d.features));
  
  // Calculate productivity scores based on multiple factors
  const productivityScores = processedData.map(d => 
    (d.features[0] * 0.3) + // mood impact
    (d.features[1] * 0.3) + // motivation impact
    (d.features[2] * 0.2) + // stress impact (inverse)
    (d.features[3] * 0.2)   // efficiency impact
  );
  
  const ys = tf.tensor2d(productivityScores.map(score => [score]));
  
  // Train model with improved parameters
  await model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'meanSquaredError',
    metrics: ['mse']
  });
  
  await model.fit(xs, ys, {
    epochs: 100,
    batchSize: Math.min(32, entries.length),
    shuffle: true,
    validationSplit: 0.2
  });
  
  // Generate predictions
  const predictions = model.predict(xs) as tf.Tensor;
  const predictedValues = await predictions.array();
  
  // Cleanup
  model.dispose();
  xs.dispose();
  ys.dispose();
  predictions.dispose();
  
  return processedData.map((d, i) => ({
    date: d.date,
    actual: productivityScores[i],
    predicted: predictedValues[i][0],
    confidence: calculateConfidence(productivityScores[i], predictedValues[i][0])
  }));
};

const calculateConfidence = (actual: number, predicted: number): number => {
  const error = Math.abs(actual - predicted);
  return Math.max(0, 1 - error * 2); // Scale confidence based on prediction error
};

export const analyzePatterns = (entries: DailyEntry[]) => {
  const processedData = preprocessData(entries);
  const windowSizes = [7, 14]; // Analyze both weekly and bi-weekly patterns
  
  return windowSizes.map(windowSize => {
    const movingAverages = processedData.map((_, index, array) => {
      if (index < windowSize - 1) return null;
      
      const window = array.slice(index - windowSize + 1, index + 1);
      const averages = window.reduce((acc, entry) => ({
        mood: acc.mood + entry.features[0],
        motivation: acc.motivation + entry.features[1],
        stress: acc.stress + entry.features[2],
        efficiency: acc.efficiency + entry.features[3]
      }), { mood: 0, motivation: 0, stress: 0, efficiency: 0 });
      
      return {
        date: array[index].date,
        mood: averages.mood / windowSize,
        motivation: averages.motivation / windowSize,
        stress: averages.stress / windowSize,
        efficiency: averages.efficiency / windowSize,
        productivity: (averages.mood + averages.motivation + (1 - averages.stress) + averages.efficiency) / (4 * windowSize)
      };
    }).filter(Boolean);
    
    return {
      windowSize,
      data: movingAverages
    };
  });
};

export const getProductivityInsights = (entries: DailyEntry[]) => {
  const processedData = preprocessData(entries);
  
  // Calculate trends
  const recentTrend = processedData.slice(-7);
  const productivityTrend = recentTrend.map(d => 
    (d.features[0] * 0.3) + (d.features[1] * 0.3) + 
    ((1 - d.features[2]) * 0.2) + (d.features[3] * 0.2)
  );
  
  const averageProductivity = productivityTrend.reduce((a, b) => a + b, 0) / productivityTrend.length;
  const trend = productivityTrend[productivityTrend.length - 1] - productivityTrend[0];
  
  return {
    currentProductivity: productivityTrend[productivityTrend.length - 1],
    averageProductivity,
    trend,
    insights: generateInsights(processedData)
  };
};

const generateInsights = (data: any[]) => {
  const recent = data.slice(-7);
  const insights = [];
  
  // Analyze patterns and generate insights
  const avgMood = recent.reduce((sum, d) => sum + d.features[0], 0) / recent.length;
  const avgStress = recent.reduce((sum, d) => sum + d.features[2], 0) / recent.length;
  
  if (avgMood < 0.4) {
    insights.push("Mood levels have been lower than optimal. Consider implementing mood-boosting activities.");
  }
  if (avgStress > 0.6) {
    insights.push("Stress levels are elevated. Focus on stress management techniques.");
  }
  
  return insights;
};