// 主要的互動邏輯和功能實現

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadSavedProgress();
});

// 開始旅程
function startJourney() {
    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('journeyScreen').classList.add('active');
    loadDay(1);
}

// 載入特定天數
function loadDay(dayNumber) {
    journeyState.currentDay = dayNumber;
    const day = dayContent[dayNumber];
    
    if (!day) {
        console.error('Day content not found:', dayNumber);
        return;
    }
    
    renderDayContent();
    window.scrollTo(0, 0);
}

// 渲染當天內容
function renderDayContent() {
    const container = document.getElementById('dayContent');
    const day = dayContent[journeyState.currentDay];
    
    let html = '';
    
    // 渲染每張卡片
    day.cards.forEach(cardType => {
        if (cardType === 'header') {
            html += cardTemplates.header(journeyState.currentDay);
        } else if (cardTemplates[cardType] && cardTemplates[cardType][journeyState.currentDay]) {
            const cardHtml = cardTemplates[cardType][journeyState.currentDay]();
            
            // 如果這張卡片需要鎖定，添加locked類
            if (day.lockedCards.includes(cardType) && !day.interactionCompleted) {
                html += cardHtml.replace('<div class="card', '<div class="card locked');
            } else {
                html += cardHtml;
            }
        }
    });
    
    container.innerHTML = html;
    
    // 初始化互動元素
    initializeInteractions();
}

// 初始化當天的互動元素
function initializeInteractions() {
    const day = journeyState.currentDay;
    
    switch(day) {
        case 2:
            setTimeout(initEmotionCanvas, 100);
            break;
        case 3:
            setTimeout(initLeaf3D, 100);
            break;
        case 4:
            setTimeout(initWindAnimation, 100);
            break;
        case 5:
            setTimeout(initNightSky, 100);
            break;
    }
}

// 完成互動
function completeInteraction(dayNumber) {
    // 標記互動完成
    dayContent[dayNumber].interactionCompleted = true;
    journeyState.userData.entries[`day${dayNumber}_completed`] = true;
    
    // 更新按鈕狀態
    const btn = document.getElementById(`completeBtn${dayNumber}`);
    if (btn) {
        btn.innerHTML = '✓ 已完成';
        btn.disabled = true;
        btn.style.background = 'var(--deep-forest-green)';
    }
    
    // 解鎖後續卡片
    unlockCards(dayNumber);
    
    // 保存進度
    saveProgress();
}

// 解鎖卡片動畫
function unlockCards(dayNumber) {
    const day = dayContent[dayNumber];
    
    day.lockedCards.forEach((cardType, index) => {
        setTimeout(() => {
            const cardId = `${cardType}Card${dayNumber}`;
            const card = document.getElementById(cardId);
            
            if (card) {
                card.classList.remove('locked');
                card.classList.add('unlocking');
                
                // 移除unlocking類讓動畫只播放一次
                setTimeout(() => {
                    card.classList.remove('unlocking');
                }, 800);
            }
        }, index * 300); // 錯開動畫時間
    });
}

// Day 2: 情緒畫布
let selectedColor = '#4A90E2';
let selectedColorName = '寧靜的藍';

function selectColor(color, name) {
    selectedColor = color;
    selectedColorName = name;
    
    document.querySelectorAll('.color-option').forEach(el => {
        el.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function initEmotionCanvas() {
    const canvas = document.getElementById('emotionCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let drawing = false;
    
    // 背景
    ctx.fillStyle = '#F5F5F3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 繪製事件處理
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    // 觸控支援
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    function startDrawing(e) {
        drawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!drawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = selectedColor;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function stopDrawing() {
        drawing = false;
        // 保存畫作
        if (canvas.toDataURL) {
            journeyState.userData.entries[`day2_drawing`] = canvas.toDataURL();
        }
    }
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        if (!touch) return;
        
        const mouseEvent = new MouseEvent(
            e.type === 'touchstart' ? 'mousedown' : 
            e.type === 'touchmove' ? 'mousemove' : 'mouseup', 
            {
                clientX: touch.clientX,
                clientY: touch.clientY
            }
        );
        canvas.dispatchEvent(mouseEvent);
    }
}

// Day 3: 3D葉子
function initLeaf3D() {
    const container = document.getElementById('leafContainer');
    const leaf = document.getElementById('leafVisual');
    
    if (!container || !leaf) return;
    
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    // 滑鼠事件
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('mousemove', drag);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('mouseleave', dragEnd);
    
    // 觸控事件
    container.addEventListener('touchstart', dragStart);
    container.addEventListener('touchmove', drag);
    container.addEventListener('touchend', dragEnd);
    
    // 點擊葉子不同部位
    container.addEventListener('click', function(e) {
        const rect = container.getBoundingClientRect();
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        const height = rect.height;
        
        let message = '';
        if (y < height / 3) {
            message = '連結，是力量的來源。';
        } else if (y < (height * 2) / 3) {
            message = '不完美，即是完整。';
        } else {
            message = '每一次凋零，都是重生的序曲。';
        }
        
        document.getElementById('leafMessage').textContent = message;
        journeyState.userData.entries['day3_leaf'] = message;
    });
    
    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === container || container.contains(e.target)) {
            isDragging = true;
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        
        xOffset = currentX;
        yOffset = currentY;
        
        // 根據拖曳計算3D旋轉
        const rotateY = (currentX / 5) % 360;
        const rotateX = (-currentY / 5) % 360;
        
        leaf.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
    
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
}

// Day 4: 風的動畫
function initWindAnimation() {
    const windSymbols = document.querySelectorAll('.wind-symbol');
    
    windSymbols.forEach((symbol, index) => {
        // 錯開顯示時間
        setTimeout(() => {
            symbol.classList.add('visible');
        }, index * 500);
        
        // 點擊事件
        symbol.addEventListener('click', function() {
            const sound = this.dataset.sound;
            let message = '';
            
            switch(sound) {
                case 'leaf':
                    message = '你聽見了，細節中的詩意。';
                    break;
                case 'bird':
                    message = '你聽見了，遠方傳來的生命力。';
                    break;
                case 'melody':
                    message = '你聽見了，藏在尋常中的和諧。';
                    break;
            }
            
            document.getElementById('windMessage').textContent = message;
            journeyState.userData.entries['day4_wind'] = message;
            
            // 視覺反饋
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '1';
            setTimeout(() => {
                this.style.transform = 'scale(1.2)';
            }, 300);
        });
    });
}

// Day 5: 星空祝福
function initNightSky() {
    const sky = document.getElementById('nightSky');
    if (!sky) return;
    
    // 創建星星
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        sky.appendChild(star);
    }
}

function sendBlessing() {
    const word = document.getElementById('blessingWord').value;
    if (!word) {
        alert('請輸入你的祝福');
        return;
    }
    
    const sky = document.getElementById('nightSky');
    
    // 創建祝福種子
    let seed = document.getElementById('blessingSeed');
    if (!seed) {
        seed = document.createElement('div');
        seed.className = 'blessing-seed';
        seed.id = 'blessingSeed';
        sky.appendChild(seed);
    }
    
    seed.textContent = word;
    seed.classList.remove('hidden');
    
    // 拖曳功能
    let isDragging = false;
    let currentY = 0;
    
    seed.addEventListener('mousedown', startDrag);
    seed.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
        isDragging = true;
        e.preventDefault();
    }
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientY = e.clientY || e.touches[0].clientY;
        const rect = sky.getBoundingClientRect();
        currentY = clientY - rect.top;
        
        seed.style.bottom = (rect.height - currentY) + 'px';
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        // 如果拖到上方，觸發動畫
        if (currentY < 200) {
            seed.style.animation = 'floatUp 3s ease-out forwards';
            
            // 創建新星星
            setTimeout(() => {
                const newStar = document.createElement('div');
                newStar.className = 'star';
                newStar.style.left = '50%';
                newStar.style.top = '20%';
                newStar.style.width = '4px';
                newStar.style.height = '4px';
                newStar.style.animation = 'twinkle 2s ease-in-out infinite';
                sky.appendChild(newStar);
                
                seed.remove();
                completeInteraction(5);
            }, 3000);
            
            journeyState.userData.entries['day5_blessing'] = word;
            document.getElementById('blessingSouvenirText').textContent = 
                `今日，我為一份『${word}』，點亮了一顆星。`;
        }
    }
}

// Day 6: 營火
function addToCampfire() {
    const word = document.getElementById('campfireWood').value;
    if (!word) {
        alert('請輸入你的收穫');
        return;
    }
    
    const flame = document.getElementById('campfireFlame');
    
    // 火焰變大動畫
    flame.classList.add('big');
    
    setTimeout(() => {
        flame.classList.remove('big');
    }, 2000);
    
    journeyState.userData.entries['day6_harvest'] = word;
    document.getElementById('campfireSouvenirText').textContent = 
        `今日，我用『${word}』，溫暖了整個夜晚。`;
    
    completeInteraction(6);
}

// Day 7: 打包行囊
function packBaggage() {
    const item = document.getElementById('baggageItem').value;
    if (!item) {
        alert('請寫下你要帶走的力量');
        return;
    }
    
    // 行囊發光動畫
    const glow = document.getElementById('baggageGlow');
    glow.classList.add('active');
    
    journeyState.userData.entries.baggage = item;
    
    setTimeout(() => {
        completeJourney();
    }, 1500);
}

// 完成旅程
function completeJourney() {
    saveProgress();
    document.getElementById('journeyScreen').classList.remove('active');
    document.getElementById('completionScreen').classList.add('active');
    
    const baggageText = document.getElementById('baggageText');
    baggageText.textContent = `我將帶著『${journeyState.userData.entries.baggage || '平靜'}』，繼續前行。`;
}

// 導航
function nextDay() {
    saveProgress();
    
    if (journeyState.currentDay < 7) {
        journeyState.currentDay++;
        loadDay(journeyState.currentDay);
    } else {
        completeJourney();
    }
}

function previousDay() {
    if (journeyState.currentDay > 1) {
        journeyState.currentDay--;
        loadDay(journeyState.currentDay);
    }
}

// 音頻控制
let audioPlaying = {};
let audioTimers = {};
const audioDurations = {
    1: 180, // 3:00
    2: 150, // 2:30
    3: 120, // 2:00
    4: 210, // 3:30
    5: 180, // 3:00
    6: 240, // 4:00
    7: 270  // 4:30
};

function toggleAudio(dayNumber) {
    const btn = event.currentTarget;
    const progressBar = document.getElementById(`audioProgress${dayNumber}`);
    const timeDisplay = document.getElementById(`audioTime${dayNumber}`);
    
    if (!progressBar || !timeDisplay) return;
    
    if (audioPlaying[dayNumber]) {
        // 暫停
        clearInterval(audioTimers[dayNumber]);
        audioPlaying[dayNumber] = false;
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    } else {
        // 播放
        audioPlaying[dayNumber] = true;
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        
        let progress = parseInt(progressBar.dataset.progress) || 0;
        const duration = audioDurations[dayNumber];
        
        audioTimers[dayNumber] = setInterval(() => {
            progress++;
            progressBar.dataset.progress = progress;
            const percent = (progress / duration) * 100;
            progressBar.style.width = percent + '%';
            
            const mins = Math.floor(progress / 60);
            const secs = progress % 60;
            const totalMins = Math.floor(duration / 60);
            const totalSecs = duration % 60;
            
            timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')} / ${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
            
            if (progress >= duration) {
                toggleAudio(dayNumber);
            }
        }, 1000);
    }
}

function seekAudio(event, dayNumber) {
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const progressBar = document.getElementById(`audioProgress${dayNumber}`);
    
    if (progressBar) {
        const duration = audioDurations[dayNumber];
        const progress = Math.floor(duration * percent);
        progressBar.dataset.progress = progress;
        progressBar.style.width = (percent * 100) + '%';
    }
}

// 分享功能
function shareSouvenir(dayNumber) {
    const messages = {
        1: '我正在靜謐森林的7日旅程中，今天憶起了呼吸。',
        2: '我繪製了內在的地貌，看見了情緒的色彩。',
        3: '一片葉教會了我，不完美即是完整。',
        4: '今天我練習聆聽，在風中聽見了未言說的訊息。',
        5: '我為某個人點亮了一顆星，祝福正在宇宙中流動。',
        6: '營火的溫暖提醒我，最好的前進，有時是停下來。',
        7: '七日旅程完成，我找回了內在的力量。'
    };
    
    const text = messages[dayNumber] || '我正在參與靜謐森林的心靈之旅。';
    
    if (navigator.share) {
        navigator.share({
            title: '靜謐森林 - 心靈之旅',
            text: text,
            url: window.location.href
        }).catch(err => console.log('分享取消'));
    } else {
        // 複製到剪貼板
        navigator.clipboard.writeText(text + ' ' + window.location.href)
            .then(() => alert('分享連結已複製'));
    }
}

// 保存紀念品
function saveMemento() {
    const dataStr = JSON.stringify(journeyState.userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportName = `forest-journey-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

// 進度管理
function saveProgress() {
    localStorage.setItem('forestJourneyV2', JSON.stringify(journeyState));
    localStorage.setItem('forestJourneyV2Content', JSON.stringify(dayContent));
}

function loadSavedProgress() {
    const savedState = localStorage.getItem('forestJourneyV2');
    const savedContent = localStorage.getItem('forestJourneyV2Content');
    
    if (savedState) {
        Object.assign(journeyState, JSON.parse(savedState));
    }
    
    if (savedContent) {
        const saved = JSON.parse(savedContent);
        // 恢復互動完成狀態
        Object.keys(saved).forEach(day => {
            if (saved[day].interactionCompleted) {
                dayContent[day].interactionCompleted = true;
            }
        });
    }
}