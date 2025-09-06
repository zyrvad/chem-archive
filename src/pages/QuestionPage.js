import React, { useState } from 'react';
import ProblemSolver from './ProblemSolver.js';

export default function QuestionPage({ question, onNavigateBack, onUpdateQuestionStatus, onUpdateUserStats }) {
  const [answer, setAnswer] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) {
      setSubmissionMessage('You have already submitted an answer for this question.');
      return;
    }
    
    if (answer.trim() === '') {
      setSubmissionMessage('Please enter an answer before submitting.');
      return;
    }

    // Per your request, the condition is always true for now.
    // This will allow you to handle the 'isDone' state in a separate JSON file.
    setIsSubmitted(true);
    setSubmissionMessage("Correct! You've solved this problem.");
    
    // Call the parent functions to update the question status and user stats
    onUpdateQuestionStatus(question.id);
    onUpdateUserStats(question.category);
  };

  const renderAnswerInput = () => {
    if (question.category.toLowerCase().includes('organic chemistry')) {
      return (
        <div className="flex flex-col items-center w-full">
          <ProblemSolver />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Enter your numerical or text answer..."
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            disabled={isSubmitted}
          />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="pt-24 max-w-4xl w-full">
        <button
          onClick={onNavigateBack}
          className="text-blue-600 font-semibold mb-4 flex items-center transition-colors hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Problems
        </button>
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{question.name}</h2>
            {isSubmitted && (
              <span className="text-green-500 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <p className="text-lg font-semibold text-blue-600 mb-4">{question.category}</p>
          <p className="text-gray-600 whitespace-pre-wrap mb-6">{question.full}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            {renderAnswerInput()}
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              disabled={isSubmitted}
            >
              Submit Answer
            </button>
            {submissionMessage && (
              <p className={`mt-4 text-center font-semibold ${
                submissionMessage.includes('Correct') ? 'text-green-600' : 'text-red-600'
              }`}>
                {submissionMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
