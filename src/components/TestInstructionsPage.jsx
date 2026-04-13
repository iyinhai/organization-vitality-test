import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestInstructionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">测试说明</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-6">
            本测试适合创始人、管理层和组织顾问使用。
          </p>
          <p className="text-gray-700 mb-6">
            它不是为了给企业贴标签，而是帮助你看见：组织在方向、价值创造、人的状态、关系、学习与结果上的整体画像。
          </p>
          <p className="text-gray-700 mb-8">
            请基于真实感受作答，无需追求“理想答案”。
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <h3 className="font-medium text-gray-800 mb-2">边界提示：</h3>
            <p className="text-gray-600 mb-2">
              本测试用于组织理解与对话，不构成对企业价值的绝对评判
            </p>
            <p className="text-gray-600">
              不同组织所处阶段、行业、历史背景不同，应结合现实情况理解结果
            </p>
          </div>
          <button 
            onClick={() => navigate('/questions')}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            进入答题
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionsPage;