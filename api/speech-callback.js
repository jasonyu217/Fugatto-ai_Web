// 使用 Edge Runtime 以获得更好的性能
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // 添加 CORS 头
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: '只允许POST请求' }), 
      { 
        status: 405,
        headers: corsHeaders
      }
    );
  }

  try {
    const callbackData = await request.json();
    console.log('收到回调数据:', callbackData);
    
    // 处理连通性检查消息
    if (callbackData.Data && callbackData.Data.Test) {
      console.log('收到连通性检查消息:', callbackData);
      return new Response(
        JSON.stringify({ success: true }), 
        { 
          status: 200,
          headers: corsHeaders
        }
      );
    }
    
    // 处理实际的语音识别结果
    if (callbackData.Data && callbackData.Data.Result) {
      console.log('语音识别结果:', callbackData.Data.Result);
      
      return new Response(
        JSON.stringify({ success: true }), 
        { 
          status: 200,
          headers: corsHeaders
        }
      );
    }
    
    return new Response(
      JSON.stringify({ success: false, message: '无效的回调数据' }), 
      { 
        status: 400,
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('处理回调时出错:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }), 
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
} 