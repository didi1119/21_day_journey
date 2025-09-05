// 音頻模擬器 - 模擬音頻播放和互動時間點
class AudioSimulator {
    constructor() {
        this.audioScripts = {
            1: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'close_notifications', prompt: '現在請關閉所有通知' },
                    { time: 90, action: 'listen_far', prompt: '聽見最遠處的聲音' },
                    { time: 150, action: 'listen_near', prompt: '聽見中間距離的聲音' },
                    { time: 210, action: 'listen_self', prompt: '聽見自己的呼吸和心跳' },
                    { time: 240, action: 'record_silence', prompt: '記錄你的寂靜頻率' }
                ]
            },
            2: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'touch_heart', prompt: '將手放在心口' },
                    { time: 90, action: 'start_drawing', prompt: '開始畫出你的呼吸' },
                    { time: 240, action: 'name_breath', prompt: '為你的呼吸命名' }
                ]
            },
            3: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'find_nature', prompt: '尋找一個自然物件' },
                    { time: 90, action: 'take_photo', prompt: '拍攝微距照片' },
                    { time: 210, action: 'read_poem', prompt: 'AI正在解讀你的照片' }
                ]
            },
            4: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'find_tree', prompt: '找到你的樹' },
                    { time: 90, action: 'become_tree', prompt: '開始成為樹的冥想' },
                    { time: 240, action: 'receive_message', prompt: '接收樹的訊息' }
                ]
            },
            5: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'body_scan', prompt: '開始身體情緒掃描' },
                    { time: 150, action: 'choose_color', prompt: '選擇你的情緒顏色' },
                    { time: 240, action: 'create_gradient', prompt: '創造情緒漸層' }
                ]
            },
            6: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'recall_kindness', prompt: '回想被善待的時刻' },
                    { time: 120, action: 'write_gratitude', prompt: '寫下感謝訊息' },
                    { time: 240, action: 'send_or_keep', prompt: '選擇傳送或保存' }
                ]
            },
            7: {
                duration: 300,
                interactions: [
                    { time: 30, action: 'review_journey', prompt: '回顧七天旅程' },
                    { time: 120, action: 'choose_moment', prompt: '選出最觸動的時刻' },
                    { time: 180, action: 'write_letter', prompt: '寫給未來的自己' },
                    { time: 270, action: 'receive_passport', prompt: '領取森林護照' }
                ]
            }
        };
        
        this.currentDay = 1;
        this.currentTime = 0;
        this.isPlaying = false;
        this.timer = null;
        this.interactionQueue = [];
        this.completedInteractions = [];
    }
    
    // 設置當前天數
    setDay(day) {
        this.currentDay = day;
        this.currentTime = 0;
        this.completedInteractions = [];
        this.loadInteractions();
    }
    
    // 載入當天的互動點
    loadInteractions() {
        const dayScript = this.audioScripts[this.currentDay];
        this.interactionQueue = [...dayScript.interactions];
    }
    
    // 播放/暫停
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    }
    
    // 播放
    play() {
        this.isPlaying = true;
        this.timer = setInterval(() => {
            this.currentTime++;
            this.checkInteractions();
            this.updateProgress();
            
            if (this.currentTime >= this.audioScripts[this.currentDay].duration) {
                this.complete();
            }
        }, 1000);
    }
    
    // 暫停
    pause() {
        this.isPlaying = false;
        clearInterval(this.timer);
    }
    
    // 檢查互動點
    checkInteractions() {
        const nextInteraction = this.interactionQueue[0];
        if (nextInteraction && this.currentTime >= nextInteraction.time) {
            this.triggerInteraction(nextInteraction);
            this.interactionQueue.shift();
            this.completedInteractions.push(nextInteraction);
        }
    }
    
    // 觸發互動
    triggerInteraction(interaction) {
        // 發送自定義事件
        const event = new CustomEvent('audioInteraction', {
            detail: {
                action: interaction.action,
                prompt: interaction.prompt,
                time: interaction.time
            }
        });
        window.dispatchEvent(event);
        
        // 顯示提示
        this.showInteractionPrompt(interaction.prompt);
    }
    
    // 顯示互動提示
    showInteractionPrompt(prompt) {
        // 創建或更新提示元素
        let promptEl = document.getElementById('audioPrompt');
        if (!promptEl) {
            promptEl = document.createElement('div');
            promptEl.id = 'audioPrompt';
            promptEl.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(212, 165, 116, 0.9);
                color: #0a1f1b;
                padding: 15px 30px;
                border-radius: 30px;
                font-size: 1rem;
                z-index: 1000;
                animation: slideDown 0.5s ease;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(promptEl);
        }
        
        promptEl.textContent = prompt;
        promptEl.style.display = 'block';
        
        // 5秒後自動隱藏
        setTimeout(() => {
            promptEl.style.display = 'none';
        }, 5000);
    }
    
    // 更新進度
    updateProgress() {
        const duration = this.audioScripts[this.currentDay].duration;
        const progress = (this.currentTime / duration) * 100;
        
        // 更新進度條
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        // 更新時間顯示
        const currentTimeEl = document.getElementById('currentTime');
        if (currentTimeEl) {
            currentTimeEl.textContent = this.formatTime(this.currentTime);
        }
    }
    
    // 格式化時間
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    // 跳轉到指定時間
    seek(percent) {
        const duration = this.audioScripts[this.currentDay].duration;
        this.currentTime = Math.floor(duration * percent);
        
        // 重新載入互動佇列
        this.loadInteractions();
        this.interactionQueue = this.interactionQueue.filter(i => i.time > this.currentTime);
        this.completedInteractions = this.audioScripts[this.currentDay].interactions.filter(i => i.time <= this.currentTime);
        
        this.updateProgress();
    }
    
    // 完成音頻
    complete() {
        this.pause();
        this.currentTime = this.audioScripts[this.currentDay].duration;
        
        // 發送完成事件
        const event = new CustomEvent('audioComplete', {
            detail: { day: this.currentDay }
        });
        window.dispatchEvent(event);
    }
    
    // 重置
    reset() {
        this.pause();
        this.currentTime = 0;
        this.completedInteractions = [];
        this.loadInteractions();
        this.updateProgress();
    }
    
    // 取得當前狀態
    getStatus() {
        return {
            day: this.currentDay,
            currentTime: this.currentTime,
            duration: this.audioScripts[this.currentDay].duration,
            isPlaying: this.isPlaying,
            progress: (this.currentTime / this.audioScripts[this.currentDay].duration) * 100,
            completedInteractions: this.completedInteractions,
            pendingInteractions: this.interactionQueue
        };
    }
}

// 導出給主頁面使用
window.AudioSimulator = AudioSimulator;