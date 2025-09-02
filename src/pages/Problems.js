// pages/Problems.js
import React from 'react';
import Box from '../components/Box';

export default function Problems({ problemsData, onSelectQuestion }) {
  const handleBoxClick = (question) => {
    onSelectQuestion(question);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Chemistry Problems</h2>
      <div className="flex flex-wrap justify-center">
        {problemsData.map(problem => (
          <Box
            key={problem.id}
            id={problem.id}
            name={problem.name}
            description={problem.description}
            category={problem.category}
            imageSrc={problem.imageSrc}
            onClick={() => handleBoxClick(problem)}
          />
        ))}
      </div>
    </div>
  );
}