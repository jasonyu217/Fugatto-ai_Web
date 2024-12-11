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
      window.KodePay.init && window.KodePay.init();
      console.log('KodePay initialized');
    }
  };
  document.head.appendChild(script);
})();

// 处理订阅
window.handleSubscription = function(priceId, currency) {
  console.log('开始处理订阅:', { priceId, currency });
  
  // 等待 SDK 加载完成
  if (!window.KodePay) {
    console.error('KodePay SDK 未加载');
    setTimeout(() => {
      if (window.KodePay) {
        handleSubscription(priceId, currency);
      } else {
        alert('支付服务未就绪，请刷新页面重试');
      }
    }, 1000);
    return;
  }

  try {
    console.log('正在打开支付页面...');
    // 支付配置
    const paymentConfig = {
      payment_channel: 'stripe',
      payment_method: 'card',
      currency: 'usd',
      redirect_url: 'https://fugatto-ai.com/payment/success'
    };

    // 打开支付页面
    window.KodePay.open_payment_page(priceId);
    console.log('支付页面已打开');

  } catch (error) {
    console.error('支付初始化失败:', error);
    alert('支付初始化失败，请重试');
  }
};

// 监听 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  console.log('Payment script loaded, KodePay status:', !!window.KodePay);
}); 