export const calculateScores = (answers) => {
  // 按维度分组计算平均分
  const scores = {
    direction: (parseInt(answers.Q1) + parseInt(answers.Q2) + parseInt(answers.Q3)) / 3,
    value_creation: (parseInt(answers.Q4) + parseInt(answers.Q5) + parseInt(answers.Q6)) / 3,
    vitality: (parseInt(answers.Q7) + parseInt(answers.Q8) + parseInt(answers.Q9)) / 3,
    relationship: (parseInt(answers.Q10) + parseInt(answers.Q11) + parseInt(answers.Q12)) / 3,
    learning: (parseInt(answers.Q13) + parseInt(answers.Q14) + parseInt(answers.Q15)) / 3,
    results: (parseInt(answers.Q16) + parseInt(answers.Q17) + parseInt(answers.Q18)) / 3
  };

  // 计算总体平均分
  const overallAverage = Object.values(scores).reduce((sum, score) => sum + score, 0) / 6;

  return { scores, overallAverage };
};

export const getZone = (score) => {
  if (score >= 5.0) return "展开区";
  if (score >= 3.0) return "维持区";
  return "压缩区";
};

export const determineOrgType = (scores, overallAverage) => {
  const { direction, value_creation, vitality, relationship, learning, results } = scores;

  // 优先判断 D 型
  if (
    overallAverage >= 5.5 &&
    direction >= 5.0 &&
    vitality >= 5.0 &&
    relationship >= 5.0 &&
    learning >= 5.0 &&
    results >= 5.0
  ) {
    return "D型：生命展开型";
  }

  // 判断 A 型
  if (results <= 4.5 && direction <= 4.5 && vitality <= 4.5) {
    return "A型：生存承压型";
  }

  // 判断 B 型
  if (results >= 5.0) {
    let count = 0;
    if (vitality < 5.0) count++;
    if (value_creation < 5.0) count++;
    if (learning < 5.0) count++;
    if (relationship < 5.0) count++;
    if (count >= 2) {
      return "B型：效率驱动型";
    }
  }

  // 判断 C 型
  if (
    overallAverage >= 4.5 &&
    overallAverage <= 5.8 &&
    value_creation >= 4.5 &&
    relationship >= 4.5 &&
    learning >= 4.5
  ) {
    return "C型：结构成型型";
  }

  // 兜底逻辑
  if (overallAverage <= 4.3) return "A型：生存承压型";
  if (overallAverage <= 5.0) return "B型：效率驱动型";
  if (overallAverage <= 5.6) return "C型：结构成型型";
  return "D型：生命展开型";
};

export const getSuggestions = (scores, orgType) => {
  // 按分数排序找出最低和第二低分维度
  const sortedDimensions = Object.entries(scores)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.value - b.value);

  const lowest = sortedDimensions[0].key;
  const secondLowest = sortedDimensions[1].key;

  // 维度建议映射
  const dimensionSuggestions = {
    direction: "建议先重新回答\"我们为什么存在、我们拒绝成为什么、我们靠什么做判断\"。很多组织的问题，并不是执行不够，而是方向和判断原则不清。",
    value_creation: "建议优先识别组织中哪些关键价值过度依赖少数人，并把这些能力逐步沉淀为方法、流程、模板或协同机制。",
    vitality: "建议不要只继续加压，而是先看哪些结构性因素正在持续消耗团队。真正的改善，往往来自减少无意义消耗，而不只是增加激励。",
    relationship: "建议优先改善团队之间的理解、信任和协同方式。没有共同体感的组织，即使短期能跑，长期也很容易内耗。",
    learning: "建议从复盘机制开始，推动\"做完一件事就留下点什么\"。当经验不能沉淀，组织就难以真正成长。",
    results: "建议先聚焦基本盘和关键结果，避免组织陷入\"只有理念、没有成果\"的状态。生命力不是空转，而是要能落到现实价值上。"
  };

  // 类型附加建议
  const typeSuggestions = {
    "A型：生存承压型": "先稳住，再进化。不要同时做太多升级动作，而要先确保组织具备基本的结果支撑与方向稳定。",
    "B型：效率驱动型": "从\"效率优先\"走向\"效率与生命力并重\"。重点不是再加压，而是修复单点依赖、人的状态和组织学习。",
    "C型：结构成型型": "从\"结构成型\"走向\"生命展开\"。重点不是再做更多流程，而是增强方向共识、组织激活和共同体感。",
    "D型：生命展开型": "守护已有生命力，同时提升扩张过程中的稳定性，避免组织在增长中重新掉回短视和消耗模式。"
  };

  return [
    dimensionSuggestions[lowest],
    dimensionSuggestions[secondLowest],
    typeSuggestions[orgType]
  ];
};

export const getStrengthsAndWeaknesses = (scores) => {
  const strengths = [];
  const weaknesses = [];

  const dimensionNames = {
    direction: "方向感",
    value_creation: "价值创造方式",
    vitality: "个体生命状态",
    relationship: "关系与共同体",
    learning: "学习与进化",
    results: "现实结果"
  };

  Object.entries(scores).forEach(([key, value]) => {
    if (value >= 5.0) {
      strengths.push(dimensionNames[key]);
    } else if (value < 3.0) {
      weaknesses.push(dimensionNames[key]);
    }
  });

  return { strengths, weaknesses };
};