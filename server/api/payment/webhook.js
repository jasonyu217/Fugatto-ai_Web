// 处理支付回调的服务端代码
export default defineEventHandler(async (event) => {
  try {
    // 获取请求体
    const body = await readBody(event)
    
    // 验证签名（需要从 KodePay 获取签名密钥）
    const signature = event.headers.get('x-kodepay-signature')
    if (!verifySignature(body, signature)) {
      return {
        statusCode: 400,
        body: 'Invalid signature'
      }
    }

    // 处理不同的事件类型
    switch (body.event_type) {
      case 'payment.succeeded':
        // 支付成功
        await handlePaymentSuccess(body.data)
        break
      case 'subscription.created':
        // 订阅创建
        await handleSubscriptionCreated(body.data)
        break
      case 'subscription.canceled':
        // 订阅取消
        await handleSubscriptionCanceled(body.data)
        break
    }

    return {
      statusCode: 200,
      body: 'Webhook received'
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return {
      statusCode: 500,
      body: 'Webhook processing failed'
    }
  }
}) 