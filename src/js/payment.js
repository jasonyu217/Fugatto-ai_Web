// KodePay 配置
window.KODEPAY_APPLICATION_ID = 'dbb7a9f0-b7d3-11ef-9e3f-fafce7015687';
window.KODEPAY_CLIENT_ID = 'f7c10b9c-b903-11ef-90bd-4a5bb4ed3f3b';
window.KODEPAY_ENV = 'production';

// 确保在全局范围内定义 handleSubscription
window.handleSubscription = function(productId, currency, priceId) {
    try {
        console.log('Starting payment process:', { productId, currency, priceId });
        // 防止重复点击
        const button = event.currentTarget;
        if (button.disabled) return;
        button.disabled = true;
        
        // 检查 KodePay SDK 是否已加载
        if (!window.KodePay) {
            console.error('KodePay SDK not loaded yet');
            throw new Error('KodePay SDK not loaded');
        }
        console.log('KodePay SDK status:', window.KodePay);
        
        // 使用 open_payment_choose_page 方法
        window.KodePay.open_payment_choose_page(
            productId,
            currency,
            {
                payment_channel: 'stripe',
                payment_method: 'card',
                redirect_url: window.location.origin + '/payment/success',
                price_id: priceId
            }
        );
        
    } catch (error) {
        console.error('Payment error:', error);
        alert('支付初始化失败，请稍后重试');
    } finally {
        // 重新启用按钮
        button.disabled = false;
    }
};

// 添加调试日志
console.log('Payment.js loaded');
console.log('handleSubscription function:', window.handleSubscription);

// DOM加载完成后的检查
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('Payment script status:', !!window.handleSubscription);
    if (window.KodePay) {
        window.KodePay.init().then(() => {
            console.log('KodePay initialized');
        }).catch(error => {
            console.error('KodePay initialization failed:', error);
        });
    } else {
        console.error('KodePay not found');
    }
}); 