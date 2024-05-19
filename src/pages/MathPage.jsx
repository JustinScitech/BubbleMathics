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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-black">{question}</h2>
          <div className="grid grid-cols-2 gap-6">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 ${
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
