export function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const arrow = button.querySelector('svg');
        
        button.addEventListener('click', () => {
            // 切换当前FAQ的状态
            answer.classList.toggle('active');
            
            // 旋转箭头
            arrow.style.transform = answer.classList.contains('active') 
                ? 'rotate(180deg)' 
                : 'rotate(0)';
                
            // 更新aria-expanded状态
            button.setAttribute('aria-expanded', 
                answer.classList.contains('active'));
                
            // 关闭其他打开的FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherArrow = otherItem.querySelector('svg');
                    otherAnswer.classList.remove('active');
                    otherArrow.style.transform = 'rotate(0)';
                    otherItem.querySelector('.faq-question')
                        .setAttribute('aria-expanded', 'false');
                }
            });
        });
    });
} 