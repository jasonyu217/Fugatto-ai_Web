<template>
  <div class="min-h-screen bg-black">
    <!-- 顶部导航 -->
    <nav class="bg-black/50 backdrop-blur-md border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="text-xl font-bold">Fugatto AI</div>
          </div>
          <div class="flex items-center">
            <button class="btn-secondary">退出</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 订阅状态卡片 -->
      <div class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">订阅状态</h2>
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <p class="text-sm text-gray-400">当前套餐</p>
            <p class="text-lg font-medium">入门版</p>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-400">状态</p>
            <p class="text-green-500">生效中</p>
          </div>
          <div class="flex-1">
            <p class="text-sm text-gray-400">到期时间</p>
            <p>2024-12-31</p>
          </div>
        </div>
      </div>

      <!-- 使用统计 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <h3 class="text-lg font-medium mb-2">API 调用次数</h3>
          <p class="text-2xl font-bold">1,234</p>
          <p class="text-sm text-gray-400">本月额度：5,000</p>
        </div>
        <!-- 其他统计卡片 -->
      </div>

      <!-- 使用记录 -->
      <div class="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <h2 class="text-xl font-bold mb-4">使用记录</h2>
        <!-- 记录列表 -->
      </div>
    </main>
  </div>
</template> 