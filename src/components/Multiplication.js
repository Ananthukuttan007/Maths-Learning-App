// App.js
import React, { useState, useEffect } from 'react';
import './Multiplication.css';

function Multiplication() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [A, setA] = useState(2);
    const [B, setB] = useState(20);

    useEffect(() => {
        generateQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [A, B]);

    const generateQuestions = () => {
        const generatedQuestions = [];
        for (let i = A; i <= B; i++) {
            for (let j = A; j <= B; j++) {
                generatedQuestions.push({ firstNumber: i, secondNumber: j });
            }
        }
        for (let i = generatedQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [generatedQuestions[i], generatedQuestions[j]] = [generatedQuestions[j], generatedQuestions[i]];
        }
        setQuestions(generatedQuestions);
    };

    const handleStart = () => {
        setCurrentQuestionIndex(0);
        setShowAnswer(false);
        setCompleted(false);
    };

    const handleCheckAnswer = () => {
        setShowAnswer(true);
    };

    const handleNextQuestion = () => {
        setShowAnswer(false);
        if (currentQuestionIndex === questions.length - 1) {
            setCompleted(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

    return (
        <div className="App">
            <h1 className="title">Multiplication Table Learning</h1>
            <div className="input-container">
                <label className="input-label">
                    A:
                    <input type="number" className="input-number" value={A} onChange={(e) => setA(Number(e.target.value))} />
                </label>
                <label className="input-label">
                    B:
                    <input type="number" className="input-number" value={B} onChange={(e) => setB(Number(e.target.value))} />
                </label>
                <button className="generate-button" onClick={generateQuestions}>Generate Questions</button>
            </div>
            {!completed ? (
                <div className="question-container">
                    <h2 className="question">
                        Question: {currentQuestion?.firstNumber} * {currentQuestion?.secondNumber} = ?
                    </h2>
                    {showAnswer ? (
                        <div>
                            <p className="answer">Answer: {currentQuestion?.firstNumber * currentQuestion?.secondNumber}</p>
                            <button className="next-button" onClick={handleNextQuestion}>Next Question</button>
                        </div>
                    ) : (
                        <div>
                            <p className="answer-placeholder">Answer:</p>
                            <button className="check-button" onClick={handleCheckAnswer}>Check Answer</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="completed-container">
                    <h2 className="completed-message">Congratulations! You have completed the task.</h2>
                    <button className="start-again-button" onClick={handleStart}>Start Again</button>
                </div>
            )}
            <footer className="footer">
                Question {currentQuestionIndex + 1} of {questions?.length}
            </footer>
        </div>
    );
}

export default Multiplication;
