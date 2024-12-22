// 支付处理函数
window.handleSubscription = async function(productId, currency) {
    try {
        console.log('Starting payment process:', { productId, currency });
        
        if (!window.KodePay) {
            throw new Error('KodePay SDK not loaded');
        }

        // 添加用户自定义数据
        const originalData = {
            order_id: Date.now(), // 使用时间戳作为订单号
            user_id: 'guest_' + Math.random().toString(36).substr(2, 9) // 临时用户ID
        };

        // 支付参数
        const paymentParams = {
            payment_channel: 'stripe',
            payment_method: 'card',
            redirect_url: window.location.origin + '/payment/success',
            price_id: productId,
            currency: currency,
            original_data: originalData,
            onSuccess: (result) => {
                console.log('Payment success:', result);
                window.location.href = '/payment/success';
            },
            onError: (error) => {
                console.error('Payment error:', error);
                alert('支付失败，请重试');
            },
            onClose: () => {
                console.log('Payment window closed');
            }
        };

        // 打开支付选择页面
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

// 支付成功回调
function paySuccessCallback(userInfo, status) {
    if (status === 'succeed') {
        console.log('Payment completed successfully:', userInfo);
        // 刷新页面或更新用户状态
        window.location.reload();
    } else {
        console.log('Payment failed:', status);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 注册支付成功回调
    if (window.KodePay) {
        window.KodePay.on_pay_completed.addListener(paySuccessCallback);
    }
});

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