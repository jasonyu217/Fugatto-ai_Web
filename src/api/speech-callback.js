export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许POST请求' });
  }

  try {
    const callbackData = req.body;
    
    // 处理连通性检查消息
    if (callbackData.Data && callbackData.Data.Test) {
      console.log('收到连通性检查消息:', callbackData);
      return res.status(200).json({ success: true });
    }
    
    // 处理实际的语音识别结果
    if (callbackData.Data && callbackData.Data.Result) {
      // 这里处理语音识别结果
      console.log('语音识别结果:', callbackData.Data.Result);
      
      // TODO: 在这里添加您的业务逻辑
      
      return res.status(200).json({ success: true });
    }
    
    return res.status(400).json({ success: false, message: '无效的回调数据' });
  } catch (error) {
    console.error('处理回调时出错:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
} 