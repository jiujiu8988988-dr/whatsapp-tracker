// script.js - 数据处理核心逻辑

// 跟踪点击函数
function trackClick(clickData) {
    // 获取现有数据
    let clicks = getClickData();
    
    // 添加新点击记录
    clicks.push(clickData);
    
    // 保存回localStorage
    localStorage.setItem('whatsappClicks', JSON.stringify(clicks));
    
    // 更新总点击计数
    updateTotalClickCount();
}

// 获取点击数据
function getClickData() {
    const data = localStorage.getItem('whatsappClicks');
    return data ? JSON.parse(data) : [];
}

// 更新总点击计数
function updateTotalClickCount() {
    let totalCount = parseInt(localStorage.getItem('clickCount') || '0');
    totalCount++;
    localStorage.setItem('clickCount', totalCount.toString());
    return totalCount;
}

// 获取总点击次数
function getTotalClickCount() {
    return parseInt(localStorage.getItem('clickCount') || '0');
}

// 更新点击计数显示
function updateClickCount() {
    const countElement = document.getElementById('clickCount');
    if (countElement) {
        countElement.textContent = getTotalClickCount().toLocaleString();
    }
}

// 获取设备信息
function getDeviceInfo() {
    const ua = navigator.userAgent;
    return {
        isMobile: /Mobile|Android|iPhone/i.test(ua),
        isTablet: /Tablet|iPad/i.test(ua),
        browser: getBrowserName(ua),
        os: getOSName(ua)
    };
}

function getBrowserName(userAgent) {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
}

function getOSName(userAgent) {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown';
}

// 时间处理函数
function formatTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
}

// 数据统计分析
function analyzeClickData(clicks) {
    const analysis = {
        total: clicks.length,
        byHour: {},
        byDay: {},
        byDevice: {},
        byBrowser: {},
        byReferrer: {}
    };
    
    clicks.forEach(click => {
        // 按小时统计
        const hour = new Date(click.timestamp).getHours();
        analysis.byHour[hour] = (analysis.byHour[hour] || 0) + 1;
        
        // 按设备统计
        const device = click.platform;
        analysis.byDevice[device] = (analysis.byDevice[device] || 0) + 1;
        
        // 按来源统计
        analysis.byReferrer[click.referrer] = (analysis.byReferrer[click.referrer] || 0) + 1;
    });
    
    return analysis;
}