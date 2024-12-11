<template>
  <div class="min-h-screen bg-black flex items-center justify-center">
    <div class="max-w-md w-full mx-4 p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
      <div class="text-center">
        <!-- 失败图标 -->
        <div class="mx-auto flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-6">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        
        <h2 class="text-2xl font-bold mb-4">支付失败</h2>
        <p class="text-gray-400 mb-8">
          抱歉，支付过程中出现了问题。请稍后重试或联系客服获取帮助。
        </p>
        
        <!-- 按钮组 -->
        <div class="space-y-4">
          <button onclick="history.back()" class="btn-primary block w-full">
            重新支付
          </button>
          <a href="/" class="btn-secondary block w-full">
            返回首页
          </a>
        </div>
        
        <!-- 联系方式 -->
        <div class="mt-8 text-sm text-gray-400">
          需要帮助？请联系我们的客服
          <a href="mailto:support@fugatto-ai.com" class="text-green-500 hover:text-green-400">
            support@fugatto-ai.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template> 