import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { calculateScores, getZone, determineOrgType, getSuggestions, getStrengthsAndWeaknesses } from '../utils/calculateResults';
import { dimensions } from '../config/questions';

const ResultsPage = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    // 从本地存储获取答案和用户信息
    const answers = JSON.parse(localStorage.getItem('testAnswers'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!answers) {
      // 如果没有答案，重定向到首页
      window.location.href = '/';
      return;
    }

    // 计算得分
    const { scores, overallAverage } = calculateScores(answers);
    
    // 确定组织类型
    const orgType = determineOrgType(scores, overallAverage);
    
    // 获取优势和劣势
    const { strengths, weaknesses } = getStrengthsAndWeaknesses(scores);
    
    // 获取建议
    const suggestions = getSuggestions(scores, orgType);
    
    // 计算每个维度的区间
    const zones = {};
    Object.entries(scores).forEach(([key, value]) => {
      zones[key] = getZone(value);
    });

    setResults({
      scores,
      overallAverage,
      orgType,
      strengths,
      weaknesses,
      suggestions,
      zones,
      userInfo
    });
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-gray-700">加载结果中...</p>
        </div>
      </div>
    );
  }

  // 准备雷达图数据
  const radarData = dimensions.map(dim => ({
    subject: dim.name,
    score: results.scores[dim.key],
    fullMark: 7
  }));

  // 组织类型总评
  const getOrgTypeSummary = (orgType) => {
    const summaries = {
      "A型：生存承压型": "你的组织当前更接近\"生存承压型\"。这类组织通常处在较强的现实压力之下，团队更多在努力撑住基本盘。这样的状态并不意味着组织不好，而往往意味着企业正处于高压、转型或资源受限阶段。当前最重要的，不是追求完美，而是稳住结果、找回方向、减少持续性消耗。",
      "B型：效率驱动型": "你的组织当前更接近\"效率驱动型\"。这类组织通常具备较强的执行能力和结果导向，因此能跑得不慢。但与此同时，也可能出现短视、销售导向、单点依赖和人的状态被压缩等问题。下一步最值得关注的，是让组织从\"跑得快\"逐步进化到\"跑得稳、跑得久、跑得有生命感\"。",
      "C型：结构成型型": "你的组织当前更接近\"结构成型型\"。这意味着组织已经开始从依赖个体走向依赖结构，具备一定的协同、沉淀和方法基础。它通常不是最激进的状态，但具备向更高生命力展开的良好基础。接下来重点是增强方向感与个体激活，让组织不只是能运转，还能真正生长。",
      "D型：生命展开型": "你的组织当前更接近\"生命展开型\"。这类组织通常在方向、关系、成长、学习和结果之间形成了较好的平衡。它并不意味着没有问题，而是说明组织已经具备较强的内在驱动力与自我更新能力。接下来需要做的，是持续守护这种生命力，并避免在扩张中重新滑回短视和单点依赖。"
    };
    return summaries[orgType] || '';
  };

  // 维度解释
  const getDimensionExplanation = (dimension, zone) => {
    const explanations = {
      direction: {
        "压缩区": "组织当前在\"为什么而存在\"这件事上相对模糊，团队更容易被短期目标和外部压力牵引。这样的状态在快速求生或高压阶段很常见，但长期会削弱判断力与内在凝聚力。",
        "维持区": "组织在方向与意义上已有一定基础，但尚未形成足够稳定的共识。多数时候知道往哪走，但在压力和选择面前，仍可能回到短期导向。",
        "展开区": "组织在使命、方向和判断原则上已形成较清晰的共识。这会帮助团队在复杂环境中保持一致性，也让组织更容易超越单纯的业绩驱动。"
      },
      value_creation: {
        "压缩区": "组织当前的价值创造较大程度依赖少数关键人物。这样在早期或关键阶段并不罕见，但长期会带来单点依赖、复制困难和组织脆弱性。",
        "维持区": "组织已经具备一定的协同和机制基础，但仍存在对关键个体的较强依赖。下一步的重点，是把经验和能力逐步沉淀到机制与方法中。",
        "展开区": "组织的价值创造更多依赖系统协同，而不只是少数人硬撑。这意味着组织正在从\"靠人顶住\"走向\"靠系统创造价值\"。"
      },
      vitality: {
        "压缩区": "组织中的人当前可能更多感受到疲惫、消耗和压力，而不是成长、激活和舒展。这样的状态若持续过久，会侵蚀创造力、信任和长期投入感。",
        "维持区": "组织中的人并未明显失去状态，但生命力的展开仍不稳定。大家多数时候还能支撑工作，但未必真正被点亮。",
        "展开区": "人在组织中总体是被激活、被点亮的。大家不仅在完成任务，也在成长、投入和获得能量，这往往是组织长期生命力的重要来源。"
      },
      relationship: {
        "压缩区": "团队之间可能存在防御、割裂或低协同现象。问题出现时，大家更容易各自为战，而不是形成真正的共同体。",
        "维持区": "团队关系具备基本信任和合作基础，但共同体感仍有待增强。组织可以协同做事，但未必已经形成深层次的理解与支持。",
        "展开区": "团队内部已形成较强的信任、支持与共同体感。这会让组织在面对变化和挑战时，更有韧性，也更容易共创。"
      },
      learning: {
        "压缩区": "组织当前更偏向\"做完就过\"，经验没有稳定沉淀下来。这样的状态容易让组织重复踩坑，也难以从个体经验走向组织能力。",
        "维持区": "组织已具备一定复盘和调整意识，但学习与沉淀机制还不稳定。个别项目会成长，但尚未形成持续的组织进化能力。",
        "展开区": "组织具备较强的反馈、复盘、沉淀和迭代能力。每完成一件事，组织都有机会变得更聪明，这是生命力持续展开的重要标志。"
      },
      results: {
        "压缩区": "组织当前在业务结果、客户价值或行动转化上承受较大压力。这样的状态会让团队更容易陷入被动和焦虑，需要先稳住基本盘。",
        "维持区": "组织已经能够形成基本结果，但结果的稳定性和转化效率仍有提升空间。重点是让理念、机制和执行形成更强的闭环。",
        "展开区": "组织不仅有方向、有生命状态，也能把这些转化为稳定的现实结果。这说明生命力并未停留在理念层，而是正在形成真实价值。"
      }
    };
    return explanations[dimension]?.[zone] || '';
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">组织生命力测试结果</h1>
          
          {/* 组织类型 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{results.orgType}</h2>
            <p className="text-gray-700 leading-relaxed">{getOrgTypeSummary(results.orgType)}</p>
          </div>

          {/* 雷达图 */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">六维生命力画像</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 7]} />
                  <Radar name="生命力得分" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 六维分项说明 */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">六维分项说明</h3>
            <div className="space-y-4">
              {dimensions.map(dim => (
                <div key={dim.key} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800">{dim.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${results.zones[dim.key] === '展开区' ? 'bg-green-100 text-green-800' : results.zones[dim.key] === '维持区' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {results.zones[dim.key]}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{getDimensionExplanation(dim.key, results.zones[dim.key])}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 优势与劣势 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">优势维度</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {results.strengths.length > 0 ? (
                  results.strengths.map(strength => (
                    <li key={strength}>{strength}</li>
                  ))
                ) : (
                  <li className="text-gray-500">暂无明显优势</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-4">受压缩维度</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {results.weaknesses.length > 0 ? (
                  results.weaknesses.map(weakness => (
                    <li key={weakness}>{weakness}</li>
                  ))
                ) : (
                  <li className="text-gray-500">暂无明显受压缩维度</li>
                )}
              </ul>
            </div>
          </div>

          {/* 进化建议 */}
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">进化建议</h3>
            <div className="space-y-4">
              {results.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 免责声明 */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 italic">
              本测试用于组织理解与对话，不构成对企业价值的绝对评判。不同组织所处阶段、行业、历史背景不同，应结合现实情况理解结果。
            </p>
          </div>

          {/* 行动入口按钮 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition duration-300">
              获取完整解读
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition duration-300">
              预约组织诊断
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition duration-300">
              保存结果图
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition duration-300">
              分享给团队
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;