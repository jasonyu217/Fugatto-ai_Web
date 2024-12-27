<template>
  <router-view></router-view>
  <header>
    <nav>
      <RouterLink to="/" class="logo">
        <!-- logo内容 -->
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/workspace">工作台</RouterLink>
        <RouterLink to="/voice-community">声音社区</RouterLink>
        <!-- 其他导航链接 -->
      </div>
    </nav>
  </header>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 复制现有的全局样式 */
body {
  @apply bg-gray-900 text-white;
}
</style>

<style scoped>
/* 确保导航链接样式一致 */
.nav-links a {
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: var(--color-background-soft);
}

.nav-links a.router-link-active {
  color: var(--color-primary);
  background-color: var(--color-background-mute);
}
</style> 