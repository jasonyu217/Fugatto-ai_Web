// 添加调试日志
console.log('Payment.js loaded');

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

// 在使用KodePay之前先确保它已经准备就绪
async function initializePayment() {
    let retries = 3;
    while (retries > 0) {
        try {
            await ensureKodePayReady();
            console.log('Payment system initialized from local CDN');
            break;
        } catch (error) {
            retries--;
            console.error(`Failed to initialize payment (${retries} retries left):`, error);
            if (retries === 0) {
                // 显示用户友好的错误信息
                alert('支付系统暂时无法使用,请稍后重试');
                throw error;
            }
            // 等待2秒后重试
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
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

// 定义全局支付处理函数
const initializeHandleSubscription = () => {
    if (window.handleSubscription) {
        console.warn('handleSubscription already exists, will be overwritten');
    }
    window.handleSubscription = async function(productId, currency) {
        try {
            console.log('Starting payment process:', { productId, currency });
            
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
    // 添加属性描述符，防止函数被意外覆盖
    Object.defineProperty(window, 'handleSubscription', {
        configurable: false,
        writable: false
    });
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化全局支付函数
    initializeHandleSubscription();
    console.log('Payment initialization complete:', {
        handleSubscriptionExists: !!window.handleSubscription,
        handleSubscriptionType: typeof window.handleSubscription,
        isFunction: typeof window.handleSubscription === 'function'
    });
    console.log('DOM loaded, handleSubscription available:', !!window.handleSubscription);
    // 注册支付成功回调
    if (window.KodePay) {
        window.KodePay.on_pay_completed.addListener(paySuccessCallback);
    }
});

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