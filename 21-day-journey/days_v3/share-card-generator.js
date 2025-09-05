// 分享卡片生成器
class ShareCardGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1080;
        this.canvas.height = 1080;
        
        this.colors = {
            forest_dark: '#0a1f1b',
            forest_deep: '#1a3530',
            forest_medium: '#2d5449',
            forest_light: '#4a7c6e',
            forest_mist: '#7fa394',
            cream: '#faf8f5',
            gold: '#d4a574',
            moss: '#8b9556'
        };
        
        this.templates = {
            1: this.createSilenceCard.bind(this),
            2: this.createBreathCard.bind(this),
            3: this.createMicroCard.bind(this),
            4: this.createTreeCard.bind(this),
            5: this.createEmotionCard.bind(this),
            6: this.createGratitudeCard.bind(this),
            7: this.createPassportCard.bind(this)
        };
    }
    
    // 生成分享卡片
    async generateCard(day, data) {
        // 清空畫布
        this.ctx.fillStyle = this.colors.forest_dark;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 添加背景漸層
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, this.colors.forest_dark);
        gradient.addColorStop(1, this.colors.forest_deep);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 根據天數使用不同模板
        if (this.templates[day]) {
            await this.templates[day](data);
        }
        
        // 添加品牌標識
        this.addBranding(day);
        
        // 返回圖片URL
        return this.canvas.toDataURL('image/png');
    }
    
    // Day 1: 寂靜頻率卡
    createSilenceCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 繪製聲波視覺化
        this.ctx.strokeStyle = this.colors.gold;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = 0.6;
        
        // 繪製多層同心圓作為聲波
        for (let i = 0; i < 5; i++) {
            const radius = 100 + i * 50;
            const alpha = 1 - (i * 0.2);
            this.ctx.globalAlpha = alpha * 0.5;
            
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // 繪製中央聲波線
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 200, centerY);
        
        for (let x = -200; x <= 200; x += 5) {
            const y = Math.sin(x * 0.05) * 30 * Math.random();
            this.ctx.lineTo(centerX + x, centerY + y);
        }
        this.ctx.stroke();
        
        // 添加文字
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '48px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('聽見寂靜', centerX, centerY - 250);
        
        this.ctx.font = '32px serif';
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillText(data.sound || '心跳的聲音', centerX, centerY + 250);
        
        // 添加時間戳
        const now = new Date();
        this.ctx.font = '24px serif';
        this.ctx.globalAlpha = 0.6;
        this.ctx.fillText(
            `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
            centerX, centerY + 300
        );
    }
    
    // Day 2: 呼吸畫作卡
    createBreathCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 如果有呼吸圖像數據，繪製它
        if (data.breathImage) {
            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, centerX - 200, centerY - 200, 400, 400);
            };
            img.src = data.breathImage;
        } else {
            // 繪製預設呼吸圖案
            this.ctx.strokeStyle = this.colors.gold;
            this.ctx.lineWidth = 3;
            this.ctx.globalAlpha = 0.7;
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX - 150, centerY);
            
            // 繪製波浪形呼吸線
            for (let x = -150; x <= 150; x += 10) {
                const y = Math.sin(x * 0.05) * 50;
                this.ctx.quadraticCurveTo(
                    centerX + x - 5, centerY + y,
                    centerX + x, centerY - y
                );
            }
            this.ctx.stroke();
        }
        
        // 添加文字
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '48px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('呼吸的形狀', centerX, centerY - 250);
        
        this.ctx.font = '32px serif';
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillText(data.breathName || '如海浪般起伏', centerX, centerY + 250);
    }
    
    // Day 3: 微觀宇宙卡
    createMicroCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 繪製微觀圖案框架
        this.ctx.strokeStyle = this.colors.gold;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(centerX - 200, centerY - 200, 400, 400);
        
        // 繪製放大鏡效果
        this.ctx.beginPath();
        this.ctx.arc(centerX + 150, centerY - 150, 80, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(centerX + 200, centerY - 100);
        this.ctx.lineTo(centerX + 250, centerY - 50);
        this.ctx.stroke();
        
        // 繪製微觀紋理
        this.ctx.globalAlpha = 0.3;
        for (let i = 0; i < 50; i++) {
            const x = centerX + (Math.random() - 0.5) * 350;
            const y = centerY + (Math.random() - 0.5) * 350;
            const size = Math.random() * 5 + 2;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colors.moss;
            this.ctx.fill();
        }
        
        // 添加文字
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '48px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('微觀宇宙', centerX, centerY - 250);
        
        // 添加詩句
        if (data.poem) {
            this.ctx.font = '28px serif';
            this.ctx.globalAlpha = 0.9;
            const lines = data.poem.split('\n');
            lines.forEach((line, index) => {
                this.ctx.fillText(line, centerX, centerY + 200 + index * 40);
            });
        }
    }
    
    // Day 4: 樹的密語卡
    createTreeCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 繪製樹的剪影
        this.ctx.fillStyle = this.colors.forest_medium;
        this.ctx.globalAlpha = 0.5;
        
        // 樹幹
        this.ctx.fillRect(centerX - 30, centerY, 60, 200);
        
        // 樹冠 - 使用多個圓形組合
        const circles = [
            { x: centerX, y: centerY - 50, r: 100 },
            { x: centerX - 60, y: centerY - 30, r: 80 },
            { x: centerX + 60, y: centerY - 30, r: 80 },
            { x: centerX, y: centerY - 100, r: 70 }
        ];
        
        circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // 添加樹根
        this.ctx.strokeStyle = this.colors.forest_light;
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.4;
        
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY + 200);
            const endX = centerX + (Math.random() - 0.5) * 300;
            const endY = centerY + 300;
            this.ctx.quadraticCurveTo(
                centerX + (endX - centerX) / 2,
                centerY + 250,
                endX, endY
            );
            this.ctx.stroke();
        }
        
        // 添加文字
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '48px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('樹的智慧', centerX, 100);
        
        // 樹的訊息
        this.ctx.font = '36px serif';
        this.ctx.fillStyle = this.colors.gold;
        this.ctx.fillText(`"${data.message || '慢一點，深呼吸'}"`, centerX, this.canvas.height - 100);
    }
    
    // Day 5: 情緒漸層卡
    createEmotionCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 繪製情緒漸層
        if (data.colors && data.colors.length > 0) {
            const gradient = this.ctx.createLinearGradient(
                centerX - 200, centerY - 100,
                centerX + 200, centerY + 100
            );
            
            data.colors.forEach((color, index) => {
                gradient.addColorStop(index / (data.colors.length - 1), color);
            });
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(centerX - 200, centerY - 100, 400, 200);
        } else {
            // 預設漸層
            const gradient = this.ctx.createLinearGradient(
                centerX - 200, centerY - 100,
                centerX + 200, centerY + 100
            );
            gradient.addColorStop(0, '#FF6B6B');
            gradient.addColorStop(0.5, '#4ECDC4');
            gradient.addColorStop(1, '#45B7D1');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(centerX - 200, centerY - 100, 400, 200);
        }
        
        // 添加波浪邊緣
        this.ctx.strokeStyle = this.colors.cream;
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.7;
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 200, centerY - 100);
        for (let x = -200; x <= 200; x += 20) {
            const y = Math.sin(x * 0.05) * 10;
            this.ctx.lineTo(centerX + x, centerY - 100 + y);
        }
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - 200, centerY + 100);
        for (let x = -200; x <= 200; x += 20) {
            const y = Math.sin(x * 0.05) * 10;
            this.ctx.lineTo(centerX + x, centerY + 100 + y);
        }
        this.ctx.stroke();
        
        // 添加文字
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '48px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('情緒的顏色', centerX, 100);
        
        this.ctx.font = '32px serif';
        this.ctx.fillText('從早到晚的心情流動', centerX, this.canvas.height - 100);
    }
    
    // Day 6: 感恩漣漪卡
    createGratitudeCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 繪製漣漪效果
        this.ctx.strokeStyle = this.colors.gold;
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 6; i++) {
            const radius = 50 + i * 60;
            const alpha = 1 - (i * 0.15);
            this.ctx.globalAlpha = alpha * 0.5;
            
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // 中心點
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.colors.gold;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 添加光芒
        this.ctx.strokeStyle = this.colors.cream;
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.3;
        
        for (let angle = 0; angle < 360; angle += 30) {
            const radian = (angle * Math.PI) / 180;
            const x1 = centerX + Math.cos(radian) * 30;
            const y1 = centerY + Math.sin(radian) * 30;
            const x2 = centerX + Math.cos(radian) * 300;
            const y2 = centerY + Math.sin(radian) * 300;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
        
        // 添加文字
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '48px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('感恩的迴響', centerX, 100);
        
        this.ctx.font = '32px serif';
        this.ctx.globalAlpha = 0.9;
        this.ctx.fillText(data.gratitude || '謝謝今天的美好', centerX, this.canvas.height - 100);
    }
    
    // Day 7: 森林護照卡
    createPassportCard(data) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // 繪製護照邊框
        this.ctx.strokeStyle = this.colors.gold;
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(100, 100, this.canvas.width - 200, this.canvas.height - 200);
        
        // 繪製內框
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(130, 130, this.canvas.width - 260, this.canvas.height - 260);
        
        // 標題
        this.ctx.fillStyle = this.colors.gold;
        this.ctx.font = 'bold 56px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('森林護照', centerX, 250);
        
        // 副標題
        this.ctx.font = '32px serif';
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.fillText('FOREST PASSPORT', centerX, 300);
        
        // 繪製七個印章
        const stamps = ['🔇', '🍃', '🔍', '🌲', '🎨', '💫', '🦋'];
        const positions = [
            { x: centerX - 150, y: centerY - 50 },
            { x: centerX, y: centerY - 50 },
            { x: centerX + 150, y: centerY - 50 },
            { x: centerX - 150, y: centerY + 100 },
            { x: centerX, y: centerY + 100 },
            { x: centerX + 150, y: centerY + 100 },
            { x: centerX, y: centerY + 250 }
        ];
        
        positions.forEach((pos, index) => {
            // 印章背景
            this.ctx.fillStyle = this.colors.moss;
            this.ctx.globalAlpha = 0.3;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 40, 0, Math.PI * 2);
            this.ctx.fill();
            
            // 印章圖標
            this.ctx.globalAlpha = 1;
            this.ctx.font = '36px serif';
            this.ctx.fillStyle = this.colors.cream;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(stamps[index], pos.x, pos.y);
        });
        
        // 邀請碼
        this.ctx.fillStyle = this.colors.gold;
        this.ctx.font = 'bold 40px monospace';
        this.ctx.fillText('FOREST7', centerX, this.canvas.height - 150);
        
        // 完成日期
        const date = new Date().toLocaleDateString('zh-TW');
        this.ctx.font = '24px serif';
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillText(`完成於 ${date}`, centerX, this.canvas.height - 100);
    }
    
    // 添加品牌標識
    addBranding(day) {
        const centerX = this.canvas.width / 2;
        
        // 底部品牌
        this.ctx.globalAlpha = 0.5;
        this.ctx.fillStyle = this.colors.cream;
        this.ctx.font = '20px serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('靜謐森林 · 七日旅程', centerX, this.canvas.height - 30);
        
        // 天數標記
        this.ctx.globalAlpha = 0.7;
        this.ctx.font = '24px serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Day ${day}/7`, this.canvas.width - 50, 50);
    }
    
    // 下載圖片
    downloadImage(imageUrl, filename = 'forest-journey.png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = imageUrl;
        link.click();
    }
    
    // 轉換為 Blob
    async toBlob() {
        return new Promise((resolve) => {
            this.canvas.toBlob(resolve, 'image/png');
        });
    }
}

// 導出給主頁面使用
window.ShareCardGenerator = ShareCardGenerator;