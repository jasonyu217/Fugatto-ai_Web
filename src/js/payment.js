// 确保函数在全局作用域可用
window.handleSubscription = async function(productId, currency) {
    try {
        console.log('Starting payment process:', { productId, currency });
        
        await ensureKodePayReady(); // 确保 KodePay 已加载
        
        if (!window.KodePay) {
            throw new Error('KodePay SDK not loaded');
        }

        const originalData = {
            order_id: Date.now(),
            user_id: 'guest_' + Math.random().toString(36).substr(2, 9)
        };

        const paymentParams = {
            payment_channel: 'stripe',
            payment_method: 'card',
            redirect_url: 'https://fugatto-ai.com/payment/success',
            price_id: productId,
            currency: currency,
            original_data: originalData,
            onSuccess: (result) => {
                console.log('Payment success:', result);
                window.location.href = 'https://fugatto-ai.com/payment/success';
            },
            onError: (error) => {
                console.error('Payment error:', error);
                alert('支付失败，请重试');
            },
            onClose: () => {
                console.log('Payment window closed');
            }
        };

        await window.KodePay.open_payment_choose_page(
            productId,
            currency,
            paymentParams
        );

    } catch (error) {
        console.error('Payment error:', error);
        alert('支付初始化失败，请稍后重试');
    }
};

// 确保KodePay已经加载完成
function ensureKodePayReady() {
    return new Promise((resolve, reject) => {
        if (window.KodePay) {
            resolve();
            return;
        }

        // 增加超时时间到10秒
        const timeout = setTimeout(() => {
            reject(new Error('KodePay SDK load timeout from local CDN'));
        }, 10000);

        // 定期检查KodePay是否已加载
        const checkInterval = setInterval(() => {
            if (window.KodePay) {
                clearTimeout(timeout);
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
    });
}

// 防止函数被覆盖
Object.defineProperty(window, 'handleSubscription', {
    configurable: false,
    writable: false
});

console.log('handleSubscription initialized:', {
    exists: !!window.handleSubscription,
    type: typeof window.handleSubscription
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 注册支付成功回调
    if (window.KodePay) {
        window.KodePay.on_pay_completed.addListener(paySuccessCallback);
    }
});

// 支付成功回调
function paySuccessCallback(userInfo, status) {
    if (status === 'succeed') {
        console.log('Payment completed successfully:', userInfo);
        window.location.reload();
    } else {
        console.log('Payment failed:', status);
    }
}

// 添加全局错误处理
window.addEventListener('error', function(event) {
    console.error('Global error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
}); 