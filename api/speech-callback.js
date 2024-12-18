import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
  regions: ['sin1']
};

export default async function handler(request) {
  // 检查主机名并处理重定向
  const url = new URL(request.url);
  if (url.hostname.startsWith('www.')) {
    const newUrl = new URL(url);
    newUrl.hostname = newUrl.hostname.replace('www.', '');
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept'
      }
    });
  }

  if (request.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ message: '只允许POST请求' }), 
      { 
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  try {
    const callbackData = await request.json();
    console.log('收到回调数据:', callbackData);
    
    // 处理连通性检查消息
    if (callbackData.Data && callbackData.Data.Test) {
      console.log('收到连通性检查消息:', callbackData);
      return new NextResponse(
        JSON.stringify({ success: true }), 
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
    
    // 处理实际的语音识别结果
    if (callbackData.Data && callbackData.Data.Result) {
      console.log('语音识别结果:', callbackData.Data.Result);
      
      return new NextResponse(
        JSON.stringify({ success: true }), 
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
    
    return new NextResponse(
      JSON.stringify({ success: false, message: '无效的回调数据' }), 
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('处理回调时出错:', error);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
} 