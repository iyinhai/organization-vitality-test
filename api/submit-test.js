import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      // 这里可以添加飞书API调用逻辑
      // 暂时返回成功响应
      res.status(200).json({ success: true, message: '数据提交成功' });
    } catch (error) {
      console.error('Error submitting test:', error);
      res.status(500).json({ success: false, message: '数据提交失败' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
