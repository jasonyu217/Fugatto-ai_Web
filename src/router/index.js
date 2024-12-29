import { createRouter, createWebHistory } from 'vue-router'
import AIAudioView from '../views/AIAudioView.vue'

const routes = [
  {
    path: '/workspace',
    component: () => import('../views/WorkspaceView.vue'),
    children: [
      {
        path: '',
        redirect: '/workspace/text-to-speech'
      },
      {
        path: 'text-to-speech',
        component: () => import('../components/workspace/TextToSpeech.vue')
      },
      {
        path: 'speech-to-text',
        component: () => import('../components/workspace/SpeechToText.vue')
      },
      {
        path: 'speech-to-speech',
        component: () => import('../components/workspace/SpeechToSpeech.vue')
      },
      {
        path: 'voice-cloning',
        component: () => import('../components/workspace/VoiceCloning.vue')
      },
      {
        path: '/workspace/ai-audio',
        name: 'ai-audio',
        component: AIAudioView,
        meta: {
          title: 'AI音频创作'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 