import React, { useEffect, useRef } from 'react';

export default function HomePage() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <section 
        id="section-1" 
        className="h-screen w-full flex flex-col items-center justify-center p-8 bg-sky-500 text-white snap-start"
      >
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Welcome to Our Site
          </h1>
          <p className="text-lg sm:text-xl font-medium opacity-80">
            This is the first section of our scrolling page.
          </p>
        </div>
      </section>

      <section 
        id="section-2" 
        className="h-screen w-full flex flex-col items-center justify-center p-8 bg-indigo-500 text-white snap-start"
      >
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Key Features
          </h1>
          <p className="text-lg sm:text-xl font-medium opacity-80">
            This section can be used to highlight key features or services.
          </p>
        </div>
      </section>

      <section 
        id="section-3" 
        className="h-screen w-full flex flex-col items-center justify-center p-8 bg-emerald-500 text-white snap-start"
      >
        <div className="max-w-xl text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl font-medium opacity-80">
            The final section is a great place for a call to action.
          </p>
        </div>
      </section>
    </div>
  );
} 