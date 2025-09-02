// components/Box.js
import React from 'react';

export default function Box({ id, name, description, category, imageSrc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 m-4 w-full max-w-sm cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{name}</h3>
          <p className="text-sm text-slate-600 line-clamp-3">{description}</p>
        </div>
        {imageSrc && (
          <div className="ml-4 flex-shrink-0">
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-20 h-20 object-cover rounded" 
            />
          </div>
        )}
      </div>
      <div className="mt-4">
        {category && (
          <span className="inline-block bg-sky-200 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}