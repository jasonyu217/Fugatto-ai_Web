// 设置面板控制
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('translate-x-full');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.add('translate-x-full');
});

// 路由处理
function handleRoute() {
    const hash = window.location.hash || '#text-to-speech';
    const mainContent = document.getElementById('mainContent');
    
    // 更新活动菜单项
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('bg-white/5', 'text-white');
        } else {
            link.classList.remove('bg-white/5', 'text-white');
        }
    });
    
    // 根据hash加载不同内容
    switch(hash) {
        case '#text-to-speech':
            mainContent.innerHTML = `
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-2xl font-bold text-white mb-6">文字转语音</h1>
                    <div class="grid grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <select class="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white">
                                    <option>中文</option>
                                    <option>English</option>
                                    <option>日本語</option>
                                </select>
                                <select class="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white">
                                    <option>专业女声</option>
                                    <option>亲切男声</option>
                                    <option>温暖女声</option>
                                </select>
                            </div>
                            <textarea 
                                class="w-full h-48 bg-black/20 border border-white/10 rounded-lg p-4 text-white resize-none"
                                placeholder="在此输入要转换的文字..."
                            ></textarea>
                            <button class="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                                生成语音
                            </button>
                        </div>
                        <div class="bg-black/20 border border-white/10 rounded-lg p-6">
                            <div class="text-gray-400 text-center">
                                音频输出区域
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
        case '#speech-to-text':
            // 语音转文本内容
            break;
        case '#speech-to-speech':
            // 语音转语音内容
            break;
        case '#voice-cloning':
            // 语音克隆内容
            break;
    }
}

// 监听路由变化
window.addEventListener('hashchange', handleRoute);
handleRoute(); // 初始加载 