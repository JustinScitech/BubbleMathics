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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-black">{question}</h2>
                <div className="grid grid-cols-2 gap-6">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.id)}
                            className={`p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 ${
                                selectedOption === option.id ? 'ring ring-blue-700' : ''
                            }`}
                            style={{ // Override Tailwind CSS styles
                                backgroundColor: selectedOption === option.id ? '#2c5282' : '#3498db', // Custom background color
                                borderRadius: '8px', // Custom border radius
                                padding: '16px', // Custom padding
                                fontSize: '18px', // Custom font size
                                fontWeight: 'bold', // Custom font weight
                                cursor: 'pointer', // Custom cursor
                            }}
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
