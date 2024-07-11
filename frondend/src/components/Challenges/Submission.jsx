import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import { json } from "react-router-dom";
 
const TABLE_HEAD = ["Status", "LanguageId", "Memory", "Time","Submitted At"];


Submissions.propTypes = {
    challenge:json.isRequired
}


export function Submissions({challenge}) {

  const [submission, setSubmission] = useState([]);
  
  

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/submissions/${challenge?.id}`);
         console.log(response,"success");

        setSubmission(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChallenge();
  },[challenge?.id]);
  return (
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
       {submission.map(({ id, languageId, status, memory, time, updatedAt }) => (
            
            <tr key={id} className="even:bg-blue-gray-50/50 dark:bg-slate-500 ">
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
  );
}
