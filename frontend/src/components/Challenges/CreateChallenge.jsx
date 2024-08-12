import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const CreateChallenge = () => {
  const [problemSlug, setProblemSlug] = useState('');
  const [problemTitle, setProblemTitle] = useState('');
  const [difficulty, setDifficulty] = useState('EASY');
  const [tag, setTag] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const availableTags = ['Arrays', 'Greedy', 'String', 'linkedList'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/challenges`, {
        problemSlug,
        problemTitle,
        difficulty,
        tag
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTag = (newTag) => {
    if (!tag.includes(newTag) && newTag) {
      setTag([...tag, newTag]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    setTag(tag.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Challenge</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Problem Slug</label>
            <input
              type="text"
              value={problemSlug}
              onChange={(e) => setProblemSlug(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Problem Title</label>
            <input
              type="text"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
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
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="mt-2">
              {availableTags
                .filter((t) => t.toLowerCase().includes(tagInput.toLowerCase()) && !tag.includes(t))
                .map((t) => (
                  <div
                    key={t}
                    onClick={() => addTag(t)}
                    className="cursor-pointer inline-block px-2 py-1 m-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                  >
                    {t}
                  </div>
                ))}
            </div>
            <div className="mt-2">
              {tag.map((t) => (
                <div
                  key={t}
                  className="inline-flex items-center px-2 py-1 m-1 bg-blue-200 dark:bg-blue-700 rounded-full"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="ml-2 text-red-500 dark:text-red-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
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
