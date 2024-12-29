import { createRouter, createWebHistory } from 'vue-router'
import VoiceCommunityView from '../views/VoiceCommunityView.vue'

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
      }
    ]
  },
  {
    path: '/voice-community',
    name: 'voice-community',
    component: VoiceCommunityView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 