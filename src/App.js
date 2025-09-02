// App.js
import React, { useState } from 'react';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Problems from './pages/Problems.js';
import QuestionPage from './pages/QuestionPage.js';
import problemsData from './problemsData.json'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleHeaderNavigate = (page) => {
    // If navigating to the 'problems' page, clear the selected question
    if (page === 'problems') {
      setSelectedQuestion(null);
    }
    // Set the current page
    setCurrentPage(page);
  };


  let component;
  switch (currentPage) {
    case 'home':
      component = <Home />;
      break;
    case 'problems':
      if (selectedQuestion) {
        component = <QuestionPage question={selectedQuestion}  onNavigateBack={() => setSelectedQuestion(null)}/>;
      } else {
        // Pass the function to handle question selection down to Problems
        component = <Problems problemsData={problemsData} onSelectQuestion={setSelectedQuestion}/>;
      }
      break;
    default:
      component = <Home />;
  }

  return (
    <div>
      <Header onNavigate={handleHeaderNavigate} />
      {component}
    </div>
  );
}