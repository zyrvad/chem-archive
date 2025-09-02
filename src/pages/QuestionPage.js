// pages/QuestionPage.js
import React from 'react';

export default function QuestionPage({ question, onNavigateBack }) {
  if (!question) {
    return (
      <div className="pt-24 min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Question not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        <button
          onClick={onNavigateBack}
          className="mb-4 text-sky-600 hover:text-sky-800 transition-colors duration-200"
        >
          &larr; Back to Problems
        </button>
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-slate-800">{question.name}</h1>
          {question.category && (
            <span className="inline-block bg-sky-200 text-sky-800 text-sm font-semibold px-4 py-1 rounded-full">
              {question.category}
            </span>
          )}
        </div>
        {question.imageSrc && (
          <div className="mb-6 flex justify-center">
            <img 
              src={question.imageSrc} 
              alt={question.name} 
              className="w-full max-h-96 object-contain rounded-md" 
            />
          </div>
        )}
        <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">{question.description}</p>
      </div>
    </div>
  );
}