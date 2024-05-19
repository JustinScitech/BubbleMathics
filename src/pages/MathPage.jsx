import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MathPage = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/questions');
                setQuestions(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.toString());
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleOptionClick = (questionId, optionText) => {
        setSelectedOption({ questionId, optionText });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                    {questions.map((question, index) => (
                        <div key={index} className="mb-8">
                            <h2 className="text-2xl font-bold mb-6 text-black">{question.question}</h2>
                            <div className="grid grid-cols-2 gap-6">
                                {question.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(question._id, option)}
                                        className={`p-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 ${
                                            selectedOption?.questionId === question._id && selectedOption?.optionText === option ? 'ring ring-blue-700' : ''
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
};

export default MathPage;
