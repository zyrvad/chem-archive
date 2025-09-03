import React, { useState, useMemo } from 'react';
import Box from '../components/Box';

export default function Problems({ problemsData, onSelectQuestion }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  // Use a memoized list of all unique categories to render the filter tags.
  // The selected categories are sorted to appear first, creating the "shift to the left" effect.
  const allCategories = useMemo(() => {
    if (!problemsData) return [];
    const categories = new Set(problemsData.map(problem => problem.category).filter(Boolean));
    const selected = Array.from(selectedCategories);
    const unselected = Array.from(categories).filter(cat => !selectedCategories.has(cat));
    return [...selected, ...unselected];
  }, [problemsData, selectedCategories]);

  // Handle category button clicks to toggle selection.
  const handleCategoryClick = (category) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Filter the problems based on both search query and selected categories.
  const filteredProblems = useMemo(() => {
    if (!problemsData) return [];
    return problemsData.filter(problem => {
      // Check if the problem matches the search query.
      const matchesSearch = problem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          problem.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Check if the problem's category is selected, or if no categories are selected.
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(problem.category);

      return matchesSearch && matchesCategory;
    });
  }, [problemsData, searchQuery, selectedCategories]);

  const handleBoxClick = (question) => {
    onSelectQuestion(question);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Chemistry Problems</h2>

      {/* Search and filter section */}
      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search problems by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <div className="flex flex-wrap gap-2 items-center mt-4">
          <span className="font-semibold text-gray-700">Filter by Category:</span>
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ease-in-out
                ${selectedCategories.has(category) 
                  ? 'bg-blue-600 text-white shadow-md transform -translate-y-1'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Display filtered problems */}
      <div className="flex flex-wrap justify-center">
        {filteredProblems.length > 0 ? (
          filteredProblems.map(problem => (
            <Box
              key={problem.id}
              id={problem.id}
              name={problem.name}
              description={problem.description}
              category={problem.category}
              onClick={() => handleBoxClick(problem)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg mt-8">
            No problems match your search and filter criteria.
          </p>
        )}
      </div>
    </div>
  );
}
