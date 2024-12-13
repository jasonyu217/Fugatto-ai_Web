// KodePay 配置
window.KODEPAY_APPLICATION_ID = '88fec018-b7ce-11ef-a86f-aa6962b9d5ea';
window.KODEPAY_CLIENT_ID = '0d74e6ec-b7cf-11ef-a3bb-4a5bb4ed3f3b';
window.KODEPAY_ENV = 'development';

// 加载 KodePay SDK
(function loadKodePaySDK() {
  const script = document.createElement('script');
  script.src = 'https://kodepay-global.zingfront.com/common/kodepay-website.js';
  script.async = 1;
  script.onload = () => {
    console.log('KodePay SDK loaded');
    // 确保 KodePay 对象存在
    if (window.KodePay) {
      // 等待初始化完成
      window.KodePay.init().then(() => {
        console.log('KodePay initialized');
      }).catch(error => {
        console.error('KodePay initialization failed:', error);
      });
    }
  };
  document.head.appendChild(script);
})();

// 处理订阅
function handleSubscription(productId, currency, priceId) {
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
    console.log('Opening payment page with config:', {
      productId,
      currency,
      payment_channel: 'stripe',
      payment_method: 'card',
      redirect_url: window.location.origin + '/payment/success'
    });

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
}

// 确保函数在全局范围可用
window.handleSubscription = handleSubscription;

// 监听 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  console.log('Payment script loaded, KodePay status:', !!window.KodePay);
}); 