// 确保KodePay已经加载完成
function ensureKodePayReady() {
    return new Promise((resolve, reject) => {
        if (window.KodePay) {
            resolve();
            return;
        }

        // 如果5秒内没有加载完成，就报错
        const timeout = setTimeout(() => {
            reject(new Error('KodePay SDK load timeout'));
        }, 5000);

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

// 在使用KodePay之前先确保它已经准备就绪
async function initializePayment() {
    try {
        await ensureKodePayReady();
        // 这里写您的支付初始化逻辑
        console.log('Payment system initialized');
    } catch (error) {
        console.error('Failed to initialize payment:', error);
        // 这里可以添加适当的错误处理，比如显示错误提示给用户
    }
}

// 调用支付功能时先确保初始化完成
async function handlePayment() {
    try {
        await ensureKodePayReady();
        // 这里写您的支付处理逻辑
    } catch (error) {
        console.error('Payment failed:', error);
        // 处理支付错误
    }
}

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

    // 为所有支付按钮添加点击事件
    const paymentButtons = document.querySelectorAll('.payment-button');
    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const currency = button.getAttribute('data-currency');
            handleSubscription(productId, currency);
        });
    });
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