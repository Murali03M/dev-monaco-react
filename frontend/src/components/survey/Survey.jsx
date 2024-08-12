import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { notify } from '../NotificationProvider/NotificationUtils';

const SurveyForm = () => {
  const [responses, setResponses] = useState({
    satisfaction: '',
    difficulty: '',
    learningImpact: '',
    profileUsefulness: '',
    feedbackUsefulness: '',
    recommendationUsefulness: '',
    navigation: '',
    support: '',
    suggestions: '',
  });

  const token = localStorage.getItem('token');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setResponses({
      ...responses,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/survey`, responses, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201)
      {
        notify.success('Thank you for your feedback!');
        setResponses({
          satisfaction: '',
          difficulty: '',
          learningImpact: '',
          profileUsefulness: '',
          feedbackUsefulness: '',
          recommendationUsefulness: '',
          navigation: '',
          support: '',
          suggestions: '',
        })
      } else {
        notify.error('Failed to submit feedback. Please try again.');
      }
      
    } catch (error) {
      notify.error('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">User Feedback Survey</h2>

        <div>
          <label htmlFor="satisfaction" className="block mb-2 text-sm font-medium text-gray-700">
            How satisfied are you with the coding challenges provided?
          </label>
          <select
            name="satisfaction"
            id="satisfaction"
            value={responses.satisfaction}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select satisfaction level...</option>
            <option value="Very Unsatisfied">Very Unsatisfied</option>
            <option value="Unsatisfied">Unsatisfied</option>
            <option value="Neutral">Neutral</option>
            <option value="Satisfied">Satisfied</option>
            <option value="Very Satisfied">Very Satisfied</option>
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-700">
            Rate the difficulty level of the challenges.
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={responses.difficulty}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select difficulty level...</option>
            <option value="Too Easy">Too Easy</option>
            <option value="A Bit Easy">A Bit Easy</option>
            <option value="Just Right">Just Right</option>
            <option value="A Bit Hard">A Bit Hard</option>
            <option value="Too Hard">Too Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="learningImpact" className="block mb-2 text-sm font-medium text-gray-700">
            Do the challenges improve your coding skills?
          </label>
          <select
            name="learningImpact"
            id="learningImpact"
            value={responses.learningImpact}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select option...</option>
            <option value="Strongly Disagree">Strongly Disagree</option>
            <option value="Disagree">Disagree</option>
            <option value="Neutral">Neutral</option>
            <option value="Agree">Agree</option>
            <option value="Strongly Agree">Strongly Agree</option>
          </select>
        </div>

        <div>
          <label htmlFor="navigation" className="block mb-2 text-sm font-medium text-gray-700">
            How easy is it to navigate our platform?
          </label>
          <select
            name="navigation"
            id="navigation"
            value={responses.navigation}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select navigation ease...</option>
            <option value="Very Difficult">Very Difficult</option>
            <option value="Difficult">Difficult</option>
            <option value="Neutral">Neutral</option>
            <option value="Easy">Easy</option>
            <option value="Very Easy">Very Easy</option>
          </select>
        </div>

        <div>
          <label htmlFor="support" className="block mb-2 text-sm font-medium text-gray-700">
            Satisfaction with feedback and support:
          </label>
          <select
            name="support"
            id="support"
            value={responses.support}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select satisfaction level...</option>
            <option value="Very Unsatisfied">Very Unsatisfied</option>
            <option value="Unsatisfied">Unsatisfied</option>
            <option value="Neutral">Neutral</option>
            <option value="Satisfied">Satisfied</option>
            <option value="Very Satisfied">Very Satisfied</option>
          </select>
        </div>

        <div>
          <label htmlFor="suggestions" className="block mb-2 text-sm font-medium text-gray-700">
            Any suggestions for improvements?
          </label>
          <textarea
            name="suggestions"
            id="suggestions"
            value={responses.suggestions}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your suggestions..."
          ></textarea>
        </div>

        <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-950">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;
