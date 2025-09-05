// 完整的7天旅程內容配置
const dayContent = {
    1: {
        title: '第一口森呼吸',
        subtitle: 'The First Breath',
        quote: '在一切開始之前，先回到自己。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive',
            'practice',  // 完成儀式後才展開
            'souvenir'   // 完成儀式後才展開
        ],
        lockedCards: ['practice', 'souvenir'],  // 需要完成儀式才解鎖的卡片
        interactionCompleted: false
    },
    2: {
        title: '內在的地貌',
        subtitle: 'The Inner Landscape', 
        quote: '你不是天氣，你是容納所有天氣的天空。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive',
            'practice',
            'souvenir'
        ],
        lockedCards: ['practice', 'souvenir'],
        interactionCompleted: false
    },
    3: {
        title: '一片葉的語言',
        subtitle: 'The Language of a Leaf',
        quote: '一片葉，就是一部生命的史詩。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive',
            'practice',
            'souvenir'
        ],
        lockedCards: ['practice', 'souvenir'],
        interactionCompleted: false
    },
    4: {
        title: '聆聽風的去向',
        subtitle: 'Listening to the Wind',
        quote: '真正的聆聽，是為了理解，而非回應。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive',
            'practice',
            'souvenir'
        ],
        lockedCards: ['practice', 'souvenir'],
        interactionCompleted: false
    },
    5: {
        title: '無聲的橋樑',
        subtitle: 'The Silent Bridge',
        quote: '最深刻的連結，時常無需言語。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive',
            'practice',
            'souvenir'
        ],
        lockedCards: ['practice', 'souvenir'],
        interactionCompleted: false
    },
    6: {
        title: '營火旁的歇息',
        subtitle: 'Rest by the Campfire',
        quote: '有時，最好的前進，就是停下來。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive',
            'practice',
            'souvenir'
        ],
        lockedCards: ['practice', 'souvenir'],
        interactionCompleted: false
    },
    7: {
        title: '唯一的行囊',
        subtitle: 'The Only Baggage',
        quote: '旅程的終點，不是抵達，而是回家。',
        cards: [
            'header',
            'diary',
            'audio',
            'interactive'
        ],
        lockedCards: [],
        interactionCompleted: false
    }
};

// 卡片內容生成器
const cardTemplates = {
    header: (day) => `
        <div class="card card-header">
            <p style="color: var(--warm-wood-brown); margin-bottom: 0.5rem;">Day ${day} / 7</p>
            <h1>${dayContent[day].title}</h1>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(day/7)*100}%;"></div>
            </div>
            <p class="quote">${dayContent[day].quote}</p>
        </div>
    `,
    
    diary: {
        1: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>旅人，你好。</p>
                <p>昨夜下了一場雨，此刻的森林聞起來有種乾淨又清甜的味道。我剛為自己泡了杯茶，正坐在小屋的門廊上，看著葉梢的露珠。</p>
                <p>在森林裡，一天最奢侈的開始，就是像這樣，不急不忙地，吸入第一口真正屬於自己的空氣。</p>
                <p>今天，我想把這份寧靜，寄給你。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `,
        2: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>這裡的山，天氣說變就變。剛剛還是晴空萬里，轉眼間，遠方的山頭就攏上了一層霧。</p>
                <p>森林從不評價天氣的好壞，只是允許它發生。或許，我們的心也是。</p>
                <p>晴有晴的開闊，雨有雨的洗滌。</p>
                <p>我們需要的，不是控制天氣，而是學會欣賞每一種內在的地貌。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `,
        3: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>晨間散步時，我撿起了一片剛落下的葉子。陽光穿透它的脈絡，像一張細緻的地圖。</p>
                <p>上面有它奮力生長的痕跡，也有被蟲蛀蝕的孔洞。</p>
                <p>它不完美，卻很完整。</p>
                <p>森林教會我，生命中最深刻的美，往往藏在這些不完美的細節裡。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `,
        4: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>風是森林的信使。有時它帶來遠方的雨意，有時它捎來花開的消息。</p>
                <p>你無法看見風，只能透過樹葉的搖曳、竹林的婆娑去感受它的存在。</p>
                <p>人與人的溝通，或許也是如此。</p>
                <p>重要的往往不是說了什麼，而是話語背後那未曾言說的、如風一般的意圖與情緒。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `,
        5: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>森林裡的樹木看似獨立，但在我們看不見的地底下，它們的根系彼此交織，形成一張巨大的網絡，分享養分，傳遞警訊。</p>
                <p>這份支持，無聲卻強大。</p>
                <p>或許，我們也能成為這樣的人，在心中為某個人，默默地建一座橋，送一份祝福，不為回報，只為連結。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `,
        6: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>週末愉快，旅人。</p>
                <p>森林裡的週末，沒有特別的區分，但步調會不自覺地更慢一些。</p>
                <p>我喜歡在這樣的日子，升起一堆營火，什麼也不做，只是看著火焰發呆。</p>
                <p>營火有一種魔力，能讓人卸下防備，讓連結自然發生。</p>
                <p>今天，我想邀請你，一同來感受這份溫暖。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `,
        7: () => `
            <div class="card card-diary">
                <h2 style="margin-bottom: 1rem;">主理人森居日記</h2>
                <p>親愛的旅人，</p>
                <p>恭喜你走到了這裡。</p>
                <p>七天前，你帶著一身塵囂走入森林；此刻，我相信你內心的土壤已然鬆動，準備好長出新的風景。</p>
                <p>這趟旅程的意義，從來不是要你帶走森林的任何一片葉子，而是要你憶起，你自己的根，早已深植於大地。</p>
                <p>森林的門即將為你開啟，是時候，回到你的世界了。</p>
                <p class="signature">— 森林主理人</p>
            </div>
        `
    },
    
    audio: {
        1: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《森呼吸》(3:00)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">請找一個不被打擾的角落，戴上耳機。<br>
                讓這段聲音，引導你找回身體的節奏。<br>
                無需用力，只需跟隨。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(1)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 1)">
                        <div class="audio-progress-fill" id="audioProgress1"></div>
                    </div>
                    <span class="audio-time" id="audioTime1">0:00 / 3:00</span>
                </div>
                <p style="text-align: center; margin-top: 1rem; opacity: 0.7;">當你準備好時，請按下播放</p>
            </div>
        `,
        2: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《心靈天氣觀測》(2:30)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">戴上耳機，讓音樂流淌。<br>
                在接下來的儀式中，沒有對錯，只有感受。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(2)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 2)">
                        <div class="audio-progress-fill" id="audioProgress2"></div>
                    </div>
                    <span class="audio-time" id="audioTime2">0:00 / 2:30</span>
                </div>
            </div>
        `,
        3: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《一葉一世界》(2:00)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">戴上耳機，這段聲音將引導你，<br>
                將整個世界的紛擾，暫時縮小到掌心之間。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(3)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 3)">
                        <div class="audio-progress-fill" id="audioProgress3"></div>
                    </div>
                    <span class="audio-time" id="audioTime3">0:00 / 2:00</span>
                </div>
            </div>
        `,
        4: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《風之語》(3:30)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">戴上耳機。風帶來了森林的訊息。<br>
                請仔細聆聽，不只用耳朵，也用心。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(4)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 4)">
                        <div class="audio-progress-fill" id="audioProgress4"></div>
                    </div>
                    <span class="audio-time" id="audioTime4">0:00 / 3:30</span>
                </div>
            </div>
        `,
        5: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《漣漪》(3:00)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">戴上耳機。今天的祝福，如同一圈漣漪，<br>
                將從你的心，擴散至你所思念之處。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(5)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 5)">
                        <div class="audio-progress-fill" id="audioProgress5"></div>
                    </div>
                    <span class="audio-time" id="audioTime5">0:00 / 3:00</span>
                </div>
            </div>
        `,
        6: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《營火絮語》(4:00)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">戴上耳機，想像你正坐在溫暖的營火旁。<br>
                這段聲音沒有指引，只有陪伴。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(6)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 6)">
                        <div class="audio-progress-fill" id="audioProgress6"></div>
                    </div>
                    <span class="audio-time" id="audioTime6">0:00 / 4:00</span>
                </div>
            </div>
        `,
        7: () => `
            <div class="card card-audio">
                <h2 style="margin-bottom: 1rem;">今日的祝福音</h2>
                <p style="margin-bottom: 1.5rem;">《回家的路》(4:30)</p>
                <p class="quote" style="margin-bottom: 1.5rem;">這是最後一段聲音的祝福。<br>
                請戴上耳機，閉上眼。<br>
                讓音樂陪伴你，走完這最後一哩路。</p>
                <div class="audio-player">
                    <button class="play-btn" onclick="toggleAudio(7)">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                    <div class="audio-progress" onclick="seekAudio(event, 7)">
                        <div class="audio-progress-fill" id="audioProgress7"></div>
                    </div>
                    <span class="audio-time" id="audioTime7">0:00 / 4:30</span>
                </div>
            </div>
        `
    },
    
    interactive: {
        1: () => `
            <div class="card card-interactive">
                <h2>與光同步</h2>
                <p class="quote" style="text-align: center; margin-bottom: 2rem;">
                    聆聽音頻時，請凝視著畫布中的光。<br>
                    吸氣時，光會溫柔擴張；吐氣時，光會緩緩收攏。<br>
                    讓你的呼吸，與森林的光同步。
                </p>
                <div class="breathing-light"></div>
                <button class="btn btn-primary" id="completeBtn1" onclick="completeInteraction(1)">我已完成呼吸練習</button>
            </div>
        `,
        2: () => `
            <div class="card card-interactive">
                <h2>繪製此刻的心靈地貌</h2>
                <p class="quote" style="text-align: center;">選取能代表你此刻心情的色彩，在森林畫布上自由地塗抹與揮灑。</p>
                <div class="color-palette">
                    <div class="color-option" style="background: #4A90E2;" onclick="selectColor('#4A90E2', '寧靜的藍')">
                        <span class="color-label">寧靜的藍</span>
                    </div>
                    <div class="color-option" style="background: #7B7B7B;" onclick="selectColor('#7B7B7B', '擔憂的灰')">
                        <span class="color-label">擔憂的灰</span>
                    </div>
                    <div class="color-option" style="background: #F5D547;" onclick="selectColor('#F5D547', '喜悅的黃')">
                        <span class="color-label">喜悅的黃</span>
                    </div>
                    <div class="color-option" style="background: #FF8C42;" onclick="selectColor('#FF8C42', '溫暖的橘')">
                        <span class="color-label">溫暖的橘</span>
                    </div>
                    <div class="color-option" style="background: #7CB342;" onclick="selectColor('#7CB342', '希望的綠')">
                        <span class="color-label">希望的綠</span>
                    </div>
                </div>
                <canvas id="emotionCanvas" class="drawing-canvas"></canvas>
                <button class="btn btn-primary" id="completeBtn2" onclick="completeInteraction(2)">封存我的心靈地貌</button>
            </div>
        `,
        3: () => `
            <div class="card card-interactive">
                <h2>觸碰葉之語</h2>
                <p class="quote" style="text-align: center;">請用手指或滑鼠，自由地探索這片葉子。<br>
                感受它的紋理、它的光澤、它的不完美。</p>
                <div class="leaf-3d-container" id="leafContainer">
                    <div class="leaf-visual" id="leafVisual"></div>
                </div>
                <p id="leafMessage" style="text-align: center; margin-top: 1rem; font-style: italic; color: var(--warm-wood-brown); min-height: 1.5rem;"></p>
                <button class="btn btn-primary" id="completeBtn3" onclick="completeInteraction(3)">接收這份啟示</button>
            </div>
        `,
        4: () => `
            <div class="card card-interactive">
                <h2>捕捉風中的訊息</h2>
                <p class="quote" style="text-align: center;">在風中，你聽見了什麼？<br>
                請在音頻播放時，點擊那個最先引起你注意的聲音。</p>
                <div class="wind-visual" id="windVisual">
                    <div class="wind-symbol" data-sound="leaf" style="top: 30%; left: 20%;">🍃</div>
                    <div class="wind-symbol" data-sound="bird" style="top: 50%; left: 50%;">🕊️</div>
                    <div class="wind-symbol" data-sound="melody" style="top: 70%; left: 75%;">🎵</div>
                </div>
                <p id="windMessage" style="text-align: center; margin-top: 1rem; font-style: italic; color: var(--warm-wood-brown); min-height: 1.5rem;"></p>
                <button class="btn btn-primary" id="completeBtn4" onclick="completeInteraction(4)">接收這份訊息</button>
            </div>
        `,
        5: () => `
            <div class="card card-interactive">
                <h2>編織光的祝福</h2>
                <p class="quote" style="text-align: center;">請在心中，想起一個你想給予祝福的人。</p>
                <input type="text" id="blessingWord" placeholder="用一個詞來代表你的祝福（如：平靜、勇氣、溫暖）" style="margin: 2rem 0;">
                <div class="night-sky" id="nightSky"></div>
                <button class="btn btn-primary" id="completeBtn5" onclick="sendBlessing()">將祝福送入星空</button>
            </div>
        `,
        6: () => `
            <div class="card card-interactive">
                <h2>為營火添薪</h2>
                <p class="quote" style="text-align: center;">回顧過去五天的旅程，<br>
                你最大的『收穫』或『看見』是什麼？</p>
                <input type="text" id="campfireWood" placeholder="用一個詞或一句話來描述" style="margin: 2rem 0;">
                <div class="campfire-container">
                    <div class="campfire">
                        <div class="flame" id="campfireFlame"></div>
                    </div>
                </div>
                <button class="btn btn-primary" id="completeBtn6" onclick="addToCampfire()">添入營火</button>
            </div>
        `,
        7: () => `
            <div class="card card-interactive">
                <h2>打包你的行囊</h2>
                <p class="quote" style="text-align: center;">你無法帶走整座森林，<br>
                但你可以帶走此行最重要的、<br>
                那份已內化為你一部分的力量。</p>
                <p style="text-align: center; margin-top: 2rem;">如果，你只能帶走一樣東西，那會是什麼？</p>
                <input type="text" id="baggageItem" placeholder="請寫下那個唯一的詞語..." style="margin: 2rem 0;">
                <div class="baggage-visual">
                    <div class="baggage-icon"></div>
                    <div class="baggage-glow" id="baggageGlow"></div>
                </div>
                <button class="btn btn-primary" onclick="packBaggage()">封存這份力量</button>
            </div>
        `
    },
    
    practice: {
        1: () => `
            <div class="card locked" id="practiceCard1">
                <div class="practice-card">
                    <div class="practice-title">今日的生活實踐</div>
                    <p>今天，為自己設定三次『呼吸鬧鈴』。當它響起時，無論你正在做什麼，都請暫停下來，進行一次深長的呼吸。這就是你的定錨。</p>
                </div>
            </div>
        `,
        2: () => `
            <div class="card locked" id="practiceCard2">
                <div class="practice-card">
                    <div class="practice-title">今日的生活實踐</div>
                    <p>今天，當任何情緒升起時，試著像個氣象預報員一樣，在心中為它命名：『啊，原來是『擔憂』這片雲來了。』只是看見，不帶評判。</p>
                </div>
            </div>
        `,
        3: () => `
            <div class="card locked" id="practiceCard3">
                <div class="practice-card">
                    <div class="practice-title">今日的生活實踐</div>
                    <p>今天，請在你的生活路徑中，撿起一件真實的自然物（一片葉、一顆石頭）。花60秒，專注地凝視它，就像在凝視整個宇宙。將它放在你的口袋或桌上，讓它整天陪伴你。</p>
                </div>
            </div>
        `,
        4: () => `
            <div class="card locked" id="practiceCard4">
                <div class="practice-card">
                    <div class="practice-title">今日的生活實踐</div>
                    <p>今天與人交談時，試著練習『聆聽風的去向』。在對方說話時，暫時放下你想回應的衝動，專注於感受他話語背後的風向——那未言說的情緒與意圖。</p>
                </div>
            </div>
        `,
        5: () => `
            <div class="card locked" id="practiceCard5">
                <div class="practice-card">
                    <div class="practice-title">今日的生活實踐</div>
                    <p>今天，請在心中默默地為你遇到的三個人送上祝福。可以是為你服務的店員，也可以是擦肩而過的陌生人。這份祝福無需言語，只需在心中升起。</p>
                </div>
            </div>
        `,
        6: () => `
            <div class="card locked" id="practiceCard6">
                <div class="practice-card">
                    <div class="practice-title">今日的生活實踐</div>
                    <p>今天，允許自己有一段『無所事事』的時光。可以是一杯茶的時間，或只是望著窗外。在這段時間裡，放下所有『應該做』的事，只是單純地『存在』。</p>
                </div>
            </div>
        `
    },
    
    souvenir: {
        1: () => `
            <div class="card locked" id="souvenirCard1">
                <div class="souvenir-card">
                    <div class="souvenir-content">
                        <h3 style="margin-bottom: 1rem;">你的數位紀念品</h3>
                        <div class="souvenir-image">
                            <div class="breathing-light" style="width: 80px; height: 80px;"></div>
                        </div>
                        <p style="font-size: 1.125rem; color: var(--deep-forest-green);">今日，我憶起了呼吸。</p>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="shareSouvenir(1)">分享這份寧靜</button>
                    </div>
                </div>
                <div class="journey-nav">
                    <button class="btn btn-secondary" onclick="previousDay()" disabled>前一天</button>
                    <button class="btn btn-primary" onclick="nextDay()">完成今日旅程</button>
                </div>
            </div>
        `,
        2: () => `
            <div class="card locked" id="souvenirCard2">
                <div class="souvenir-card">
                    <div class="souvenir-content">
                        <h3 style="margin-bottom: 1rem;">你的數位紀念品</h3>
                        <div class="souvenir-image" id="emotionSouvenir">
                            <canvas width="300" height="200"></canvas>
                        </div>
                        <p style="font-size: 1.125rem; color: var(--deep-forest-green);">${new Date().toLocaleDateString('zh-TW')} | 我心之森的氣象</p>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="shareSouvenir(2)">分享這份內在風景</button>
                    </div>
                </div>
                <div class="journey-nav">
                    <button class="btn btn-secondary" onclick="previousDay()">前一天</button>
                    <button class="btn btn-primary" onclick="nextDay()">完成今日旅程</button>
                </div>
            </div>
        `,
        3: () => `
            <div class="card locked" id="souvenirCard3">
                <div class="souvenir-card">
                    <div class="souvenir-content">
                        <h3 style="margin-bottom: 1rem;">你的數位紀念品</h3>
                        <div class="souvenir-image">
                            <div style="font-size: 3rem;">🍃</div>
                        </div>
                        <p id="leafSouvenirText" style="font-size: 1.125rem; color: var(--deep-forest-green); margin-top: 1rem;">一片葉的智慧</p>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="shareSouvenir(3)">分享這份自然啟示</button>
                    </div>
                </div>
                <div class="journey-nav">
                    <button class="btn btn-secondary" onclick="previousDay()">前一天</button>
                    <button class="btn btn-primary" onclick="nextDay()">完成今日旅程</button>
                </div>
            </div>
        `,
        4: () => `
            <div class="card locked" id="souvenirCard4">
                <div class="souvenir-card">
                    <div class="souvenir-content">
                        <h3 style="margin-bottom: 1rem;">你的數位紀念品</h3>
                        <div class="souvenir-image">
                            <div style="font-size: 3rem;">🌬️</div>
                        </div>
                        <p id="windSouvenirText" style="font-size: 1.125rem; color: var(--deep-forest-green); margin-top: 1rem;">風的訊息</p>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="shareSouvenir(4)">分享這份聆聽</button>
                    </div>
                </div>
                <div class="journey-nav">
                    <button class="btn btn-secondary" onclick="previousDay()">前一天</button>
                    <button class="btn btn-primary" onclick="nextDay()">完成今日旅程</button>
                </div>
            </div>
        `,
        5: () => `
            <div class="card locked" id="souvenirCard5">
                <div class="souvenir-card">
                    <div class="souvenir-content">
                        <h3 style="margin-bottom: 1rem;">你的數位紀念品</h3>
                        <div class="souvenir-image">
                            <div style="font-size: 3rem;">⭐</div>
                        </div>
                        <p id="blessingSouvenirText" style="font-size: 1.125rem; color: var(--deep-forest-green); margin-top: 1rem;">今日，我點亮了一顆星</p>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="shareSouvenir(5)">分享這片星空</button>
                    </div>
                </div>
                <div class="journey-nav">
                    <button class="btn btn-secondary" onclick="previousDay()">前一天</button>
                    <button class="btn btn-primary" onclick="nextDay()">完成今日旅程</button>
                </div>
            </div>
        `,
        6: () => `
            <div class="card locked" id="souvenirCard6">
                <div class="souvenir-card">
                    <div class="souvenir-content">
                        <h3 style="margin-bottom: 1rem;">你的數位紀念品</h3>
                        <div class="souvenir-image">
                            <div style="font-size: 3rem;">🔥</div>
                        </div>
                        <p id="campfireSouvenirText" style="font-size: 1.125rem; color: var(--deep-forest-green); margin-top: 1rem;">營火的溫暖</p>
                        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="shareSouvenir(6)">分享這份溫暖</button>
                    </div>
                </div>
                <div class="journey-nav">
                    <button class="btn btn-secondary" onclick="previousDay()">前一天</button>
                    <button class="btn btn-primary" onclick="nextDay()">完成今日旅程</button>
                </div>
            </div>
        `
    }
};

// 導出給主頁面使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dayContent, cardTemplates };
}