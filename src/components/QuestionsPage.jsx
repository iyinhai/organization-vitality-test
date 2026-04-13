import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, dimensions } from '../config/questions';

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentDimension = dimensions[currentDimensionIndex];
  const currentQuestions = questions.filter(q => q.dimension === currentDimension.key);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    // 检查当前页所有题目是否已回答
    const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined);
    if (!allAnswered) {
      alert('请完成当前页所有题目');
      return;
    }

    if (currentDimensionIndex < dimensions.length - 1) {
      setCurrentDimensionIndex(prev => prev + 1);
    } else {
      // 保存答案到本地存储，以便留资页和结果页使用
      localStorage.setItem('testAnswers', JSON.stringify(answers));
      navigate('/contact');
    }
  };

  const handlePrevious = () => {
    if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex(prev => prev - 1);
    }
  };

  const renderScoreOptions = (questionId) => {
    const scoreLabels = [
      { value: 1, label: '非常不符合' },
      { value: 2, label: '比较不符合' },
      { value: 3, label: '略不符合' },
      { value: 4, label: '一般 / 不确定' },
      { value: 5, label: '略符合' },
      { value: 6, label: '比较符合' },
      { value: 7, label: '非常符合' }
    ];

    return scoreLabels.map(option => (
      <label key={option.value} className="flex items-center p-2 cursor-pointer">
        <input
          type="radio"
          name={questionId}
          value={option.value}
          checked={answers[questionId] === option.value}
          onChange={() => handleAnswerChange(questionId, option.value)}
          className="mr-2"
        />
        <span className="text-sm">{option.value} = {option.label}</span>
      </label>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-medium text-gray-600">当前维度：{currentDimension.name}</h2>
            <p className="text-sm text-gray-500">第 {currentDimensionIndex + 1} / 6 部分</p>
          </div>

          <div className="space-y-8">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="border-b pb-4">
                <p className="font-medium text-gray-800 mb-4">{index + 1}. {question.title}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {renderScoreOptions(question.id)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentDimensionIndex === 0}
              className={`px-6 py-2 rounded-full font-medium transition duration-300 ${currentDimensionIndex === 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              上一页
            </button>
            <button
              onClick={handleNext}
              className="bg-primary text-white px-8 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300"
            >
              {currentDimensionIndex === dimensions.length - 1 ? '完成答题' : '下一页'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;