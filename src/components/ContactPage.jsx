import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    wechat: '',
    email: '',
    companyName: '',
    userRole: '',
    companySize: '',
    companyStage: '',
    industry: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 检查必填项
    if (!formData.userRole) {
      alert('请选择您的角色');
      return;
    }

    // 保存用户信息到本地存储
    localStorage.setItem('userInfo', JSON.stringify(formData));
    navigate('/results');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">完善信息，生成你的测试结果</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">姓名（可选）</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">手机号（可选）</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">微信号（可选）</label>
                <input
                  type="text"
                  name="wechat"
                  value={formData.wechat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">邮箱（可选）</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">公司名称（可选）</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">你的角色（必填）</label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">请选择</option>
                <option value="创始人">创始人</option>
                <option value="合伙人">合伙人</option>
                <option value="高管团队">高管团队</option>
                <option value="BU负责人">BU负责人</option>
                <option value="HRD/组织发展负责人">HRD/组织发展负责人</option>
                <option value="顾问/教练/组织发展从业者">顾问/教练/组织发展从业者</option>
                <option value="中层管理者">中层管理者</option>
                <option value="创业团队核心成员">创业团队核心成员</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">企业规模（可选）</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">请选择</option>
                  <option value="1-20人">1-20人</option>
                  <option value="21-100人">21-100人</option>
                  <option value="101-500人">101-500人</option>
                  <option value="501-1000人">501-1000人</option>
                  <option value="1000人以上">1000人以上</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">企业阶段（可选）</label>
                <select
                  name="companyStage"
                  value={formData.companyStage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">请选择</option>
                  <option value="种子期">种子期</option>
                  <option value="初创期">初创期</option>
                  <option value="成长期">成长期</option>
                  <option value="成熟期">成熟期</option>
                  <option value="转型期">转型期</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">所属行业（可选）</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">请选择</option>
                  <option value="科技">科技</option>
                  <option value="教育">教育</option>
                  <option value="金融">金融</option>
                  <option value="医疗">医疗</option>
                  <option value="零售">零售</option>
                  <option value="制造业">制造业</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-blue-600 transition duration-300"
            >
              查看结果
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;