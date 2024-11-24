import React from 'react';

const Notes = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgba(255,255,255,0.06)]">
      <div className="mt-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          No Notes Available
        </h2>
        <p className="mb-6 font-medium text-gray-400">
          This feature is not available yet, but it will be ready soon. Stay
          tuned!
        </p>
        <button
          className="cursor-not-allowed rounded-lg bg-theme1 px-4 py-2 font-semibold text-white opacity-50"
          disabled
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Notes;
