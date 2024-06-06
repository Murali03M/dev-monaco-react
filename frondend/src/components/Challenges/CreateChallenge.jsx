import  { useState } from 'react';
import axios from 'axios';

const CreateChallenge = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('EASY');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);


  const availableTags = ['JavaScript', 'Python', 'React', 'Node.js', 'GraphQL'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/v1/challenges', {
        title,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        description,
        testCases
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleRemoveTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = testCases.slice();
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Challenge</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Test Cases</label>
            {testCases.map((testCase, index) => (
              <div key={index} className="mb-2">
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                    placeholder="Input"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                  <input
                    type="text"
                    value={testCase.output}
                    onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                    placeholder="Output"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTestCase(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTestCase}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add Test Case
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
