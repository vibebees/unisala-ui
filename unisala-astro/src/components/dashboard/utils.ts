// types/metrics.ts
export interface TimeSeriesData {
    time: string;
    wpm: number;
    focusScore: number;
  }
  export const calculateTotalWords = (timeSeriesData: TimeSeriesData[]): number => {
    if (!timeSeriesData || timeSeriesData.length === 0) return 0;
    
    return timeSeriesData.reduce((sum, dataPoint) => {
      return sum + (dataPoint.wpm || 0);
    }, 0);
  };
  
  export const findMaxWpm = (timeSeriesData: TimeSeriesData[]): number => {
    if (!timeSeriesData || timeSeriesData.length === 0) return 0;
    
    return Math.max(...timeSeriesData.map(point => point.wpm));
  };
  
  export const calculateAverageWpm = (timeSeriesData: TimeSeriesData[]): number => {
    if (!timeSeriesData || timeSeriesData.length === 0) return 0;
    
    const validPoints = timeSeriesData.filter(point => point.wpm > 0);
    if (validPoints.length === 0) return 0;
    
    const totalWpm = validPoints.reduce((sum, point) => sum + point.wpm, 0);
    return Math.round(totalWpm / validPoints.length);
  };
  
  export const calculateTotalFocusTime = (timeSeriesData: TimeSeriesData[]): number => {
    if (!timeSeriesData || timeSeriesData.length === 0) return 0;
    
    // Assuming each data point represents one minute of time
    return timeSeriesData.filter(point => point.focusScore > 50).length;
  };
  
  export const calculateTotalSessionTime = (timeSeriesData: TimeSeriesData[]): number => {
    if (!timeSeriesData || timeSeriesData.length === 0) return 0;
    
    // Total time is the number of data points (assuming each represents one minute)
    return timeSeriesData.length;
  };
  
  export const calculateFocusPercentage = (timeSeriesData: TimeSeriesData[]): number => {
    if (!timeSeriesData || timeSeriesData.length === 0) return 0;
    
    const totalTime = timeSeriesData.length;
    const focusedTime = timeSeriesData.filter(point => point.focusScore > 50).length;
    
    return Math.round((focusedTime / totalTime) * 100);
  };