import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
  regions: ['sin1']
};

export default async function handler(request) {
  return new NextResponse(
    JSON.stringify({ message: 'API 工作正常' }), 
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
} 