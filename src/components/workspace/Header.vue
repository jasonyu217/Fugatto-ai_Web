<template>
  <header class="h-16 bg-gray-900/50 backdrop-blur-md border-b border-white/10">
    <div class="flex items-center justify-between px-6 h-full">
      <div class="flex items-center gap-4">
        <button 
          @click="$emit('toggle-sidebar')"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <MenuIcon class="w-6 h-6" />
        </button>
        <Breadcrumb />
      </div>
      
      <div class="flex items-center gap-4">
        <LanguageSelector />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import MenuIcon from '../icons/MenuIcon.vue'
import Breadcrumb from './Breadcrumb.vue'
import LanguageSelector from './LanguageSelector.vue'

defineEmits(['toggle-sidebar'])
</script> 