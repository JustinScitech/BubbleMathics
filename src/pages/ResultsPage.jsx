import React from 'react';
import { useLocation } from 'react-router-dom';
import './ResultsPage.css';

const ResultsPage = () => {
    const location = useLocation();
    const { correctAnswers, totalQuestions } = location.state || { correctAnswers: 0, totalQuestions: 0 };

    const getPerformanceMessage = () => {
        if (correctAnswers === 0) {
            return "Damn man, for real?";
        } else if ((correctAnswers / totalQuestions) > 0.9) {
            return "Now go kill some dragon with Math!";
        }
        return null;
    };

    return (
        <div className="results-card">
            <h2 className="results-title">Your math warrior journey</h2>
            <p className="results-text">You nailed {correctAnswers} out of {totalQuestions} questions.</p>
            <p className="results-text">Correct Answers: {correctAnswers}</p>
            <p className="results-text">Wrong Answers: {totalQuestions - correctAnswers}</p>
            <p className="performance-message">{getPerformanceMessage()}</p>
        </div>
    );
};

export default ResultsPage;
