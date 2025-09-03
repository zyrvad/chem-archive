import React from 'react';

export default function Learn() {
  const resources = [
    {
      title: 'General Chemistry Principles',
      description: 'Review foundational concepts like atomic structure, stoichiometry, and chemical reactions.',
      link: '#'
    },
    {
      title: 'Organic Chemistry Reactions',
      description: 'Explore key reactions and mechanisms, including synthesis and reaction pathways.',
      link: '#'
    },
    {
      title: 'Physical Chemistry Thermodynamics',
      description: 'Understand the principles of thermodynamics, including Gibbs free energy and entropy.',
      link: '#'
    },
    {
      title: 'Inorganic Chemistry Bonding',
      description: 'Learn about different types of chemical bonds and molecular geometries.',
      link: '#'
    },
    {
      title: 'Biochemistry Basics',
      description: 'An introduction to the chemistry of biological systems, including proteins and nucleic acids.',
      link: '#'
    },
    {
      title: 'Analytical Chemistry Techniques',
      description: 'A guide to common laboratory techniques like chromatography and spectroscopy.',
      link: '#'
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Learn More
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Here are some resources to help you master the topics required for the problems.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {resource.title}
            </h3>
            <p className="text-gray-600 mb-4 flex-grow">
              {resource.description}
            </p>
            <a
              href={resource.link}
              className="mt-auto inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Learn More &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
