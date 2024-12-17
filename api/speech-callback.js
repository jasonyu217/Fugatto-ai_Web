import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
  regions: ['sin1'], // 指定新加坡区域
};

export default async function handler(request) {
  // 处理 OPTIONS 请求
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