// 添加处理URL参数的函数
function handleTabNavigation() {
    // 获取URL中的tab参数
    const urlParams = new URLSearchParams(window.location.search);
    const targetTab = urlParams.get('tab');
    
    if (targetTab) {
        // 获取所有tab元素
        const tabs = document.querySelectorAll('.workspace-tab');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // 移除所有active类
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 激活目标tab
        const selectedTab = document.querySelector(`[data-tab="${targetTab}"]`);
        const selectedContent = document.querySelector(`#${targetTab}-content`);
        
        if (selectedTab && selectedContent) {
            selectedTab.classList.add('active');
            selectedContent.classList.add('active');
            
            // 平滑滚动到选中的tab
            selectedTab.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    handleTabNavigation();
}); 