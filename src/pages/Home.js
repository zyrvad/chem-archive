import React, { useEffect, useRef, useState } from 'react';

// Replaced react-icons with self-contained inline SVG icons to fix the compilation error.
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path fillRule="evenodd" d="M12.516 2.173a.75.75 0 011 0l4.373 2.646 2.646 4.373a.75.75 0 010 1l-2.646 4.373-4.373 2.646a.75.75 0 01-1 0l-4.373-2.646-2.646-4.373a.75.75 0 010-1l2.646-4.373 4.373-2.646z" clipRule="evenodd" />
    <path d="M15.584 8.28a.75.75 0 01.724 0l2.646 1.601-1.601 2.646a.75.75 0 01-.724 0l-2.646-1.601-1.601 2.646a.75.75 0 01-.724 0l-2.646-1.601L5.8 14.524a.75.75 0 01-.724 0L2.43 12.923a.75.75 0 010-1.209l1.601-2.646a.75.75 0 01.724 0l2.646 1.601 1.601-2.646a.75.75 0 01.724 0l2.646 1.601z" />
  </svg>
);

const PuzzleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.414L16.293 8.757a.75.75 0 01-1.06 1.06l-4.707-4.707L8.757 7.293a.75.75 0 01-1.06-1.06l4.707-4.707H3.75A1.5 1.5 0 002.25 4.5v5.25a.75.75 0 01-1.5 0V4.5A3 3 0 014.5 1.5h15c.664 0 1.25.166 1.79.479l-.89-.89a.75.75 0 011.061-1.06l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.061-1.06l.89-.89-.89-.89z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path fillRule="evenodd" d="M8.25 6.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zm.25 10.5a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM8.25 15a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zm.25 1.5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM12.75 15a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm.25 1.5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM16.5 15a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zm.25 1.5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.864 8.165 6.83 9.497.5.092.682-.218.682-.483 0-.237-.009-.868-.014-1.7-2.782.605-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532.99 1.532.99.89 1.532 2.336 1.09 2.903.834.091-.647.348-1.09.634-1.339-2.22-.252-4.555-1.11-4.555-4.939 0-1.09.39-1.983 1.03-2.675-.103-.252-.447-1.267.098-2.644 0 0 .84-.268 2.75 1.026.799-.222 1.643-.333 2.486-.337.843.004 1.688.115 2.486.337 1.909-1.294 2.749-1.026 2.749-1.026.546 1.377.202 2.392.099 2.644.64.693 1.03 1.586 1.03 2.675 0 3.839-2.338 4.686-4.562 4.933.359.309.678.92.678 1.854 0 1.339-.012 2.418-.012 2.744 0 .267.17.579.688.484C19.141 20.16 22 16.416 22 12 22 6.477 17.523 2 12 2z" />
  </svg>
);

export default function HomePage() {
  const section1Ref = useRef(null);
  const [coords, setCoords] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const section1 = section1Ref.current;
    if (!section1) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = section1.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      setCoords({ x: `${x * 100}%`, y: `${y * 100}%` });
    };

    section1.addEventListener('mousemove', handleMouseMove);

    return () => {
      section1.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth font-sans">
      
      {/* Section 1: Hero with light effect */}
      <section 
        id="section-1" 
        ref={section1Ref}
        className="h-screen w-full flex flex-col items-center justify-center p-8 text-white snap-start relative transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${coords.x} ${coords.y}, rgba(255, 255, 255, 0.08), transparent 30%), linear-gradient(to bottom right, #111827, #312e81)`
        }}
      >
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Unlock the World of Chemistry
          </h1>
          <p className="text-lg sm:text-xl font-medium opacity-80 leading-relaxed">
            Dive into a world of interactive learning and problem-solving. From molecular structures to complex equations, our platform makes chemistry accessible, engaging, and fun for everyone.
          </p>
          <a
            href="#section-2"
            className="inline-block mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Section 2: Key Features */}
      <section 
        id="section-2" 
        className="h-screen w-full flex flex-col items-center justify-center p-8 bg-gray-100 text-gray-800 snap-start"
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-4 text-center">
              <div className="flex justify-center text-indigo-500 text-5xl">
                <BookIcon />
              </div>
              <h3 className="text-2xl font-bold">Interactive Lessons</h3>
              <p className="text-sm text-gray-600">
                Engage with our comprehensive library of animated and interactive lessons, making complex topics easy to understand.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-4 text-center">
              <div className="flex justify-center text-teal-500 text-5xl">
                <PuzzleIcon />
              </div>
              <h3 className="text-2xl font-bold">Practice Problems</h3>
              <p className="text-sm text-gray-600">
                Test your knowledge with thousands of practice problems, complete with detailed, step-by-step solutions.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-4 text-center">
              <div className="flex justify-center text-rose-500 text-5xl">
                <UsersIcon />
              </div>
              <h3 className="text-2xl font-bold">Community Forums</h3>
              <p className="text-sm text-gray-600">
                Connect with fellow students and experts to ask questions, share insights, and collaborate on challenging topics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Developer Info */}
      <section 
        id="section-3" 
        className="h-screen w-full flex flex-col items-center justify-center p-8 bg-gray-900 text-white snap-start"
      >
        <div className="max-w-3xl text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Connect with the Creator
          </h2>
          <p className="text-lg font-medium opacity-80 leading-relaxed">
            This platform was built by a passionate developer with a knack for turning complex concepts into simple, beautiful applications.
          </p>
          <a 
            href="https://github.com/zyrvad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <GithubIcon />
            <span>Visit @zyrvad on GitHub</span>
          </a>
        </div>
      </section>
    </div>
  );
}
