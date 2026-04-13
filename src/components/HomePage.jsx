import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">组织生命力测试</h1>
        <p className="text-xl text-gray-600 mb-8">帮助企业看见自身所处状态与生命力进化方向</p>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-6">
            这不是一份“好坏评判表”，而是一份帮助组织理解自己当前位置的生命力画像。你将从方向、价值创造、人的状态、关系、学习与结果六个维度，看见企业当前的生命力分布与进化方向。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">测试时长</p>
              <p className="text-gray-600">约 5-8 分钟</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">适用对象</p>
              <p className="text-gray-600">创始人、管理层、组织顾问</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">测试结果</p>
              <p className="text-gray-600">六维画像 + 组织状态分析 + 进化建议</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/instructions')}
            className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            开始测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;