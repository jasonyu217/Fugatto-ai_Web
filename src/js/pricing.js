// 创建新的 pricing.js 文件

// 处理计费周期切换
function initBillingToggle() {
  const billingToggles = document.querySelectorAll('.billing-toggle');
  const monthlyPrices = document.querySelectorAll('.monthly-price');
  const yearlyPrices = document.querySelectorAll('.yearly-price');

  billingToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      billingToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');
      
      const isMonthly = toggle.dataset.billing === 'monthly';
      monthlyPrices.forEach(price => price.classList.toggle('hidden', !isMonthly));
      yearlyPrices.forEach(price => price.classList.toggle('hidden', isMonthly));
    });
  });
}

// FAQ功能
function initFAQ() {
  console.log('Initializing FAQ...');
  const faqItems = document.querySelectorAll('.faq-item');
  console.log(`Found ${faqItems.length} FAQ items`);
  
  // 初始化：确保所有FAQ都是收起状态
  faqItems.forEach((item, index) => {
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      answer.classList.remove('active');
      console.log(`Initialized FAQ item ${index + 1}`);
    }
  });
  
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('svg');
    
    question.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Clicked FAQ item ${index + 1}`);
      
      const isExpanded = answer.classList.contains('active');
      
      // 关闭其他展开的FAQ
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-question svg');
          if (otherAnswer) {
            otherAnswer.classList.remove('active');
          }
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });
      
      // 切换当前FAQ的状态
      if (isExpanded) {
        console.log(`Closing FAQ item ${index + 1}`);
        answer.classList.remove('active');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        console.log(`Opening FAQ item ${index + 1}`);
        answer.classList.add('active');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// 添加滚动动画
function initScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察需要动画的元素
  document.querySelectorAll('.price-card, .faq-item, tr').forEach(el => {
    observer.observe(el);
  });
}

// 初始化所有功能
export function initPricingPage() {
  console.log('Initializing pricing page...');
  initBillingToggle();
  initFAQ();
  initScrollAnimation();
  
  // 添加语言切换监听
  document.addEventListener('languageChanged', (event) => {
    updatePricingContent(event.detail.language);
  });
}

function updatePricingContent(language) {
  // 更新页面上的所有翻译文本
  // ...
}

// 导出函数供外部使用
export { initPricingPage, initFAQ };

// 确保DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingPage);
} else {
  initPricingPage();
} 