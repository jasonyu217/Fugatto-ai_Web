from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import edge_tts
import asyncio
import io
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发环境下允许所有源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    text: str
    language: str
    voice: str

@app.post("/api/tts")
async def text_to_speech(request: TTSRequest):
    try:
        logger.info(f"Received TTS request: {request}")
        
        # 获取对应的 Edge TTS 声音名称
        voice_name = get_voice_name(request.language, request.voice)
        logger.info(f"Selected voice: {voice_name}")
        
        # 创建 TTS 通信
        communicate = edge_tts.Communicate(request.text, voice_name)
        
        # 使用内存流存储音频数据
        audio_stream = io.BytesIO()
        
        # 生成音频
        logger.info("Generating audio...")
        await communicate.save(audio_stream)
        
        # 获取音频数据
        audio_data = audio_stream.getvalue()
        logger.info(f"Generated audio size: {len(audio_data)} bytes")
        
        # 确保指针回到开始位置
        audio_stream.seek(0)
        
        # 返回音频文件
        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "attachment; filename=speech.mp3"
            }
        )
    except Exception as e:
        logger.error(f"Error generating speech: {str(e)}", exc_info=True)
        return {"error": str(e)}

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
        # 可以继续添加其他语言的声音映射
    }
    
    return voice_map.get(language, {}).get(voice_type, 'en-US-GuyNeural')

# 获取可用的声音列表
@app.get("/api/voices")
async def get_voices():
    try:
        voices = await edge_tts.list_voices()
        return voices
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 