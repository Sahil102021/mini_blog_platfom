import React from 'react';
import { Home, ArrowLeft, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router';

const Notfound = () => {
  return (
    <div className="min-h-screen bg-(--white) flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Simple 404 */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black text-gray-400 leading-none mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-(--blue) mx-auto mb-8"></div>
        </div>

        {/* Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>

        {/* Simple Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 
              rounded-lg hover:bg-(--orange) transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Go Home
          </NavLink>
        </div>


      </div>
    </div>
  );
};

export default Notfound;