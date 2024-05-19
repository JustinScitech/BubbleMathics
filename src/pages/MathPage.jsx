import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MathPage.css'; // Make sure to import the CSS file

const MathPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
            <div className="card">
                <h2 className="question">{currentQuestion.question}</h2>
                <div className="option-grid">
                    {currentQuestion.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionClick(currentQuestion._id, option)}
                            className={`option-button ${
                                selectedOption?.questionId === currentQuestion._id && selectedOption?.optionText === option ? 'selected' : ''
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="nav-button"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="nav-button"
                    >
                        Next
                    </button>
                </div>
            </div>
    );
};

export default MathPage;
