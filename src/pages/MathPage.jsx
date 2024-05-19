import React from 'react';
import { useState } from 'react';

const MathPage = () => {
  const question = "What is the result of 7 + 5?";
  const options = [
    { id: 1, text: "10" },
    { id: 2, text: "11" },
    { id: 3, text: "12" },
    { id: 4, text: "13" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-12 text-black text-center">{question}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`py-6 px-8 bg-blue-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-400 ${
                selectedOption === option.id ? 'ring ring-blue-700' : ''
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathPage;
