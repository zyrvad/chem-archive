import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'ketcher-react';
import { RemoteStructServiceProvider } from 'ketcher-core';
import 'ketcher-react/dist/index.css';

const structService = new RemoteStructServiceProvider('/v2');

function ProblemSolver() {
  const [error, setError] = useState(null);
  const ketcherRef = useRef(null);
  const [isKetcherInitialized, setIsKetcherInitialized] = useState(false);

  useEffect(() => {
    // This is your existing logic to check the service
    fetch('/v2/indigo/info')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Indigo service responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Indigo service is ready:', data);
      })
      .catch(err => {
        console.error('Failed to connect to Indigo service:', err);
        setError('Could not connect to the Indigo service.');
      });

    // THIS IS THE NEW CLEANUP FUNCTION
    // It runs when the component is unmounted.
    return () => {
      console.log('ProblemSolverPage is unmounting...');
      if (ketcherRef.current) {
        // The ketcher instance likely has a destroy method
        // to properly clean up its own DOM elements.
        try {
          ketcherRef.current.destroy();
          console.log('Ketcher instance destroyed successfully.');
        } catch (e) {
          console.error('Error destroying ketcher instance:', e);
        }
      }
    };
  }, []);

  const getMolecule = async () => {
    if (ketcherRef.current) {
      try {
        const mol = await ketcherRef.current.getMolfile();
        console.log('Molecule Data (Molfile):', mol);
        alert('Molecule data has been logged to the console!');
      } catch (e) {
        console.error('Error getting molecule data:', e);
      }
    } else {
      console.error('Ketcher editor is not yet initialized.');
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <>
      <main className="flex-grow relative">
        <div className="relative h-96 w-full">
          <Editor
            staticResourcesUrl="https://unpkg.com/ketcher-react@2.15.0/dist/"
            structServiceProvider={structService}
            onInit={(ketcher) => {
              console.log('Ketcher editor initialized successfully!');
              ketcherRef.current = ketcher;
              setIsKetcherInitialized(true);
              window.ketcher = ketcher;
            }}
            errorHandler={(message, err) => {
              console.error('Ketcher error:', message, err);
              setError('A Ketcher-specific error occurred. Check the console for details.');
            }}
          />
        </div>
      </main>
      <footer className="bg-gray-200 p-4 flex justify-center items-center">
        <button
          onClick={getMolecule}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          disabled={!isKetcherInitialized}
        >
          Submit Answer
        </button>
      </footer>
    </>
  );
}

export default ProblemSolver;