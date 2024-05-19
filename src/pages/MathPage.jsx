import React, { useState } from 'react';
import './MathPage.css'; 


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
        <div className="page-container">
            <div className="card">
                <h2 className="question">{question}</h2>
                <div className="option-grid">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.id)}
                            className={`option-button ${selectedOption === option.id ? 'selected' : ''}`}
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
