from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import edge_tts
import asyncio
import io
import logging
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import HTMLResponse

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",  # 添加您的实际前端地址
        "http://127.0.0.1:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition", "Content-Type"]
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["Content-Security-Policy"] = "default-src 'self' http://127.0.0.1:8002 http://localhost:8002; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    return response

class TTSRequest(BaseModel):
    text: str
    language: str
    voice: str

@app.post("/api/tts")
async def text_to_speech(request: TTSRequest):
    try:
        logger.info(f"Received TTS request: {request}")
        logger.info(f"Request text: {request.text}")
        logger.info(f"Request language: {request.language}")
        logger.info(f"Request voice: {request.voice}")
        
        # 获取对应的 Edge TTS 声音名称
        voice_name = get_voice_name(request.language, request.voice)
        logger.info(f"Selected voice: {voice_name}")
        
        try:
            # 创建 TTS 通信
            communicate = edge_tts.Communicate(request.text, voice_name)
            logger.info("Created TTS communicate object")
            
            # 使用内存流存储音频数据
            audio_stream = io.BytesIO()
            
            # 生成音频
            logger.info("Starting audio generation...")
            await communicate.save(audio_stream)
            logger.info("Audio generation completed")
            
            # 获取音频数据
            audio_data = audio_stream.getvalue()
            logger.info(f"Generated audio size: {len(audio_data)} bytes")
            
            if len(audio_data) == 0:
                raise Exception("Generated audio is empty")
            
            # 确保指针回到开始位置
            audio_stream.seek(0)
            
            # 返回音频文件
            logger.info("Sending audio response")
            response = Response(
                content=audio_data,
                media_type="audio/mpeg",
                headers={
                    "Content-Disposition": "attachment; filename=speech.mp3",
                    "Content-Type": "audio/mpeg"
                }
            )
            logger.info("Response created successfully")
            return response
        except Exception as e:
            logger.error(f"Error in TTS generation: {str(e)}", exc_info=True)
            return Response(
                status_code=500,
                content={"error": f"TTS generation failed: {str(e)}"},
                media_type="application/json"
            )
            
    except Exception as e:
        logger.error(f"Error in request handling: {str(e)}", exc_info=True)
        return Response(
            status_code=400,
            content={"error": f"Invalid request: {str(e)}"},
            media_type="application/json"
        )

def get_voice_name(language, voice_type):
    # 语音映射表
    voice_map = {
        'en-US': {
            'energetic-male': 'en-US-GuyNeural',
            'professional-female': 'en-US-JennyNeural',
            'friendly-male': 'en-US-ChristopherNeural',
            'warm-female': 'en-US-AriaNeural',
            'news-anchor': 'en-US-DavisNeural',
            'storyteller': 'en-US-EmmaNeural'
        },
        'zh-CN': {
            'energetic-male': 'zh-CN-YunxiNeural',
            'professional-female': 'zh-CN-XiaoxiaoNeural',
            'friendly-male': 'zh-CN-YunjianNeural',
            'warm-female': 'zh-CN-XiaoyiNeural',
            'news-anchor': 'zh-CN-YunyangNeural',
            'storyteller': 'zh-CN-XiaochenNeural'
        }
    }
    
    return voice_map.get(language, {}).get(voice_type, 'en-US-GuyNeural')

@app.get("/api/voices")
async def get_voices():
    try:
        voices = await edge_tts.list_voices()
        return voices
    except Exception as e:
        return {"error": str(e)} 

@app.get("/")
async def root():
    return {"message": "TTS Service is running"}

@app.get("/test")
async def test():
    return {"status": "ok", "message": "API is working"} 