<template>
  <div class="min-h-screen bg-black flex items-center justify-center">
    <div class="max-w-md w-full mx-4 p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
      <div class="text-center">
        <!-- 成功图标 -->
        <div class="mx-auto flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
          <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 class="text-2xl font-bold mb-4">支付成功！</h2>
        <p class="text-gray-400 mb-8">
          感谢您的订阅。您现在可以使用所有高级功能了。
        </p>
        
        <!-- 按钮组 -->
        <div class="space-y-4">
          <a href="/dashboard" class="btn-primary block w-full">
            进入控制台
          </a>
          <a href="/" class="btn-secondary block w-full">
            返回首页
          </a>
        </div>
      </div>
    </div>
  </div>
</template> 