import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const calculateMean = (data) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  return total / data.length;
};

export const AccuracyTimeChart = ({ submissions }) => {
  const [chartData, setChartData] = useState({ accuracy: {}, timeSpent: {} });
  const [meanTimeSpent, setMeanTimeSpent] = useState(0);

  useEffect(() => {
    if (submissions.length > 0) {
      const accuracyData = submissions.map(submission => submission.accuracy || 0);
      const timeSpentData = submissions.map(submission => submission.timeSpent || 0);

      const meanAccuracy = calculateMean(accuracyData);
      const meanTimeSpent = calculateMean(timeSpentData);

      setChartData({
        accuracy: {
          labels: ['Mean Accuracy'],
          datasets: [{
            data: [meanAccuracy, 100 - meanAccuracy],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(192, 192, 192, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 192, 192, 1)'],
            borderWidth: 1,
          }],
        },
        timeSpent: {
          labels: ['Mean Time Spent'],
          datasets: [{
            data: [meanTimeSpent, 100 - meanTimeSpent],
            backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(192, 192, 192, 0.6)'],
            borderColor: ['rgba(153, 102, 255, 1)', 'rgba(192, 192, 192, 1)'],
            borderWidth: 1,
          }],
        },
      });

      setMeanTimeSpent(meanTimeSpent);
    }
  }, [submissions]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-8">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-4 dark:text-white">Mean Accuracy</Typography>
          {chartData.accuracy.datasets ? (
            <div style={{ width: '300px', height: '300px' }}>
              <Pie data={chartData.accuracy} />
            </div>
          ) : null}
        </div>
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-4 dark:text-white">{`Mean Time Spent : ${meanTimeSpent.toFixed(2)} seconds`}</Typography>
          {chartData.timeSpent.datasets ? (
            <div style={{ width: '300px', height: '300px' }}>
              <Pie data={chartData.timeSpent} />
            </div>
          ) : null}
         
        </div>
      </div>
    </div>
  );
};
