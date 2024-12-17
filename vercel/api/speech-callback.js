// 使用 Edge Runtime
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: '只允许POST请求' }), 
      { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const callbackData = await request.json();
    
    // 处理连通性检查消息
    if (callbackData.Data && callbackData.Data.Test) {
      console.log('收到连通性检查消息:', callbackData);
      return new Response(
        JSON.stringify({ success: true }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // 处理实际的语音识别结果
    if (callbackData.Data && callbackData.Data.Result) {
      console.log('语音识别结果:', callbackData.Data.Result);
      
      // TODO: 在这里添加您的业务逻辑
      
      return new Response(
        JSON.stringify({ success: true }), 
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ success: false, message: '无效的回调数据' }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('处理回调时出错:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 