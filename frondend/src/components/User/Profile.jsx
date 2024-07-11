/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { BACKEND_URL } from '../../config';
import "../../App.css";

const TABLE_HEAD = ["Status", "LanguageId", "Memory", "Time","Submitted At"];


const Profile = () => {
  const [user, setUser] = useState(null);
  const [submissions,setSubmissions] = useState([]);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

 

  const handleMouseOver = (event, value) => {
    if (value) {
      const rect = event.target.getBoundingClientRect();
      setTooltipPosition({ x: rect.x + window.scrollX, y: rect.y + window.scrollY - 30 });
      setTooltipContent(`Date: ${value.date}, Submissions: ${value.count}`);
    }
  };



  const handleMouseOut = () => {
    setTooltipContent(null);
  };
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const response = await axios.get(`${BACKEND_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchSubmission = async () => {
      try {

        const response = await axios.get(`${BACKEND_URL}/api/v1/submissionbyuserid`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(response.data);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUser();
    fetchSubmission();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getSubmissionData = () => {
    const submissionDates = user.submissions.map((submission) => new Date(submission.createdAt));
    const submissionCountByDate = submissionDates.reduce((acc, date) => {
      const dateString = date.toISOString().split('T')[0];
      acc[dateString] = (acc[dateString] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(submissionCountByDate).map(([date, count]) => ({
      date,
      count,
    }));
  };

  return (
<div className="container mx-auto p-8 flex">
      <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <div className="mb-2"><strong>Name:</strong> {user.name}</div>
        <div className="mb-2"><strong>Email:</strong> {user.email}</div>
        <div className="mb-2"><strong>Level:</strong> {user.skillLevel}</div>
        <div className="mb-2"><strong>Interests:</strong> {user.interests.join(', ')}</div>
        <div className="mb-2"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
      </div>

      <div className="w-3/4 pl-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Submission History</h3>
          <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={getSubmissionData()}            
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${Math.min(value.count, 4)}`;
            }}
            showWeekdayLabels
            onMouseOver={(event, value) => handleMouseOver(event,value)}
            onMouseLeave={handleMouseOut}


          />
        {tooltipContent && (
            <div className="tooltip" style={{ top: tooltipPosition.y, left: tooltipPosition.x }}>
              {tooltipContent}
            </div>
          )}

        </div>
        <div>
        <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 dark:bg-slate-200 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
       {submissions.map(({ id, languageId, status, memory, time, updatedAt }) => (
            <tr key={id} className="even:bg-blue-gray-50/50  ">
              <td className="p-4">
                <Typography variant="small" color="blue-gray dark:white" className="font-normal">
                  {status}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="  dark:text-white" className="font-normal">
                  {languageId}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color=" dark:text-white" className="font-normal">
                  {memory}
                </Typography>
                  </td>
                  <td className="p-4">
                <Typography variant="small" color="blue-gray  dark:text-white" className="font-normal">
                  {time}
                </Typography>
              </td>
              <td className="p-4">
                <Typography  variant="small" color="blue-gray  dark:text-white" className="font-medium">
                  {updatedAt}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
      </div>
      </div>
      </div>
  );
};


export default Profile;
