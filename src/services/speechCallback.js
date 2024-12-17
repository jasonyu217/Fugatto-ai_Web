const express = require('express');
const router = express.Router();

// 处理阿里云语音识别的回调
router.post('/speech-callback', async (req, res) => {
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
    
    res.status(400).json({ success: false, message: '无效的回调数据' });
  } catch (error) {
    console.error('处理回调时出错:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 