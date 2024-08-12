import { Card } from '@material-tailwind/react';
import React from 'react'

const profileSkeleton = () => {
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
          <div className='h-20'/>
         
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
                  <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray dark:white" className="font-normal">
                        {status}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="dark:text-white" className="font-normal">
                        {languageId}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="dark:text-white" className="font-normal">
                        {memory}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray dark:text-white" className="font-normal">
                        {time}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray dark:text-white" className="font-medium">
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
}

export default profileSkeleton