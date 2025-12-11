// DOM元素选择
const shareButtons = document.querySelectorAll('.share-btn');
const modal = document.getElementById('shareModal');
const closeModal = document.querySelector('.close');
const copyBtn = document.querySelector('.share-btn.copy');

// 分享弹窗显示函数
function showModal() {
    modal.style.display = 'block';
}

// 分享弹窗隐藏函数
function hideModal() {
    modal.style.display = 'none';
}

// 复制链接功能
async function copyLink() {
    try {
        // 获取当前页面URL
        const url = window.location.href;
        // 复制到剪贴板
        await navigator.clipboard.writeText(url);
        // 显示成功弹窗
        showModal();
        // 3秒后自动关闭弹窗
        setTimeout(hideModal, 3000);
    } catch (err) {
        console.error('复制链接失败:', err);
        alert('复制链接失败，请手动复制页面URL');
    }
}

// 分享功能
function shareToPlatform(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('KFC疯狂星期四 - V我50');
    let shareUrl = '';

    switch (platform) {
        case 'wechat':
            // 微信分享需要特殊处理，这里显示提示
            alert('请在微信中打开页面进行分享');
            return;
        case 'weibo':
            shareUrl = `http://service.weibo.com/share/share.php?url=${url}&title=${title}`;
            break;
        case 'qq':
            shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`;
            break;
        default:
            return;
    }

    // 打开分享窗口
    window.open(shareUrl, '_blank', 'width=600,height=400');
    // 显示成功弹窗
    showModal();
    // 3秒后自动关闭弹窗
    setTimeout(hideModal, 3000);
}

// 事件监听器
shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('copy')) {
            copyLink();
        } else if (button.classList.contains('wechat')) {
            shareToPlatform('wechat');
        } else if (button.classList.contains('weibo')) {
            shareToPlatform('weibo');
        } else if (button.classList.contains('qq')) {
            shareToPlatform('qq');
        }
    });
});

// 关闭弹窗事件
closeModal.addEventListener('click', hideModal);

// 点击弹窗外部关闭弹窗
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// 添加页面滚动动画
function addScrollAnimation() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// 添加鼠标悬停效果到优惠卡片
function addHoverEffects() {
    const dealCards = document.querySelectorAll('.deal-card');

    dealCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 添加V50区域的交互效果
function addV50Effects() {
    const v50Section = document.querySelector('.v50-section');
    const v50Title = document.querySelector('.v50-title');

    v50Section.addEventListener('mouseenter', () => {
        v50Title.style.transform = 'scale(1.1)';
        v50Title.style.color = '#c2000f';
    });

    v50Section.addEventListener('mouseleave', () => {
        v50Title.style.transform = 'scale(1)';
        v50Title.style.color = '#e60012';
    });
}

// 添加点击效果到所有按钮
function addButtonClickEffects() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    addScrollAnimation();
    addHoverEffects();
    addV50Effects();
    addButtonClickEffects();

    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘事件监听
document.addEventListener('keydown', (e) => {
    // 按ESC键关闭弹窗
    if (e.key === 'Escape') {
        hideModal();
    }
});

// 添加分享成功后的回调函数
function shareSuccess() {
    showModal();
    setTimeout(hideModal, 3000);
}

// 导出函数供外部调用（如果需要）
window.shareSuccess = shareSuccess;
window.copyLink = copyLink;