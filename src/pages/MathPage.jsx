import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MathPage.css';

const MathPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://bubblemathics.study/questions');
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
        const currentQuestion = questions[currentQuestionIndex];
        if (optionText === currentQuestion.answer) {
            setIsCorrect(true);
            setCorrectAnswers(correctAnswers + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setIsCorrect(null);
        }
    };

    const handleViewResult = () => {
        navigate('/results', { state: { correctAnswers, totalQuestions: questions.length } });
    };

    if (loading) return (
        <div className="loading-overlay">
            <div className="loader"></div>
        </div>
    );

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
                            selectedOption?.questionId === currentQuestion._id && selectedOption?.optionText === option ? 
                            (isCorrect ? 'correct' : 'selected') : ''
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
                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        onClick={handleNextQuestion}
                        className="nav-button"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleViewResult}
                        className="nav-button"
                    >
                        View Result
                    </button>
                )}
            </div>
        </div>
    );
};

export default MathPage;
