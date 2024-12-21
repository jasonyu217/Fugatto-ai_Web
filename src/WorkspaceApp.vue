<template>
  <div class="flex h-screen bg-gray-900">
    <!-- 左侧导航 -->
    <Sidebar 
      :is-collapsed="isSidebarCollapsed"
      @toggle="toggleSidebar"
    />
    
    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部导航 -->
      <Header 
        @toggle-sidebar="toggleSidebar"
        @toggle-settings="toggleSettings"
      />
      
      <!-- 内容区域 -->
      <main class="flex-1 overflow-auto p-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    
    <!-- 右侧设置面板 -->
    <Settings 
      v-if="showSettings"
      @close="toggleSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/workspace/Sidebar.vue'
import Header from './components/workspace/Header.vue'
import Settings from './components/workspace/Settings.vue'

const isSidebarCollapsed = ref(false)
const showSettings = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}
</script> 