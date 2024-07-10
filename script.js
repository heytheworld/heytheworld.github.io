// script.js

let currentQuestionIndex = 0;
let answers = [];

const questions = [
    {
        question: "剛來到異世界，你發現一群熱情的豬豬朝你走過來。他們圍著你開始跳舞，你會怎麼反應？",
        options: [
            "加入他們，和豬豬們一起跳舞，並熱情地和他們打招呼。",
            "笑著看他們跳舞，並與幾個豬豬進行簡短的對話。",
            "禮貌地微笑，然後找個安靜的地方觀察他們。",
            "悄悄地退後幾步，觀察他們，並思考下一步應該怎麼辦。"
        ],
        background: "lib/q1.gif"
    }, 
    {
        question: "來到了豬豬村莊，他們熱情的邀請你來到廚房，你發現裡面有好多奇特的食材。你的第一個想法是?",
        options: [
            "叫我來廚房幹嘛，會被當成食材料理嗎",
            "豬豬大力推薦的彩虹水果好像很不錯欸",
            "哇那什麼螢光四季豆，真的可以吃嗎?",
            "發光的蘑菇！好酷！想吃！"
        ],
        background: "lib/q2.gif"
    },
    {
        question: "你在村莊中發現了豬豬女孩，她看起來很煩惱，似乎是因為掉了一條魔法項鍊。",
        options: [
            "還好嗎？沒事吧？我幫你一起找",
            "魔法項鍊可以施展什麼魔法啊？",
            "你最後一次看到它在哪呢？",
            "別哭啦！沒事的～一定找得到的！"
        ],
        background: "lib/q3.gif"
    },
    {
        question: "不知不覺走進了一片奇幻的森林，在這你遇到了一隻修行豬豬，完成他的謎題就可以獲得寶藏地圖。你會：",
        options: [
            "看能不能用神秘髮夾交換地圖。",
            "試圖揭開謎題",
        ],
        background: "lib/q4.gif"
    },
    {
        question: "獲得寶藏地圖後你在森林中迷路了，突然看到前方有兩條路，一條通向光明的湖邊，另一條通向發光的山洞。你的第一個念頭是：",
        options: [
            "先走到有光的地方吧",
            "等一下看有沒有人經過可以問",
            "讓我仔細研究一下地圖",
            "發光的洞穴感覺起來就有寶藏"
        ],
        background: "lib/q5.gif"
    },
    {
        question: "突然聽到一陣音樂聲傳來，原來是一群愛跳舞的豬豬在舉行派對。仔細看，你會選擇哪隻豬豬問路",
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        background: "lib/q6.gif"
    },
    {
        question: "走出森林後你發現了豬豬市場，每個攤位上有各種奇異的商品，你會：",
        options: [
            "好不容易穿越了一定要逛逛的吧",
            "喔食物好香，過去看一下",
            "太陽快下山了，等等晚上不知道會發生什麼先走好了",
            "剛剛一直迷路，找找看有沒有指南針好了"
        ],
        background: "lib/q7.gif"
    },
    {
        question: "跋山涉水之後，你終於到達了寶藏所在地。在那裡你第一個注意到的是：",
        options: [
            "漂浮在半空中的巨大水晶",
            "飛舞的豬豬精靈",
            "門上的印記",
            "圓石上的複雜符文"
        ],
        background: "lib/q8.gif"
    },
];


function startQuiz() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    const music = document.getElementById('background-music');
    music.play();
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = questionData.options[index];
    });
    setBackground(questionData.background);
}

function setBackground(background) {
    const backgroundContainer = document.getElementById('background-container');
    backgroundContainer.innerHTML = '';
    if (background.endsWith('.jpg') || background.endsWith('.png')) {
        const img = document.createElement('img');
        img.src = background;
        backgroundContainer.appendChild(img);
    } else if (background.endsWith('.gif') || background.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = background;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        backgroundContainer.appendChild(video);
    }
}

function selectOption(optionIndex) {
    answers.push(optionIndex);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}
const loadingElement = document.getElementById('loading');

function showLoading() {
    loadingElement.style.display = 'block';
}

function hideLoading() {
    loadingElement.style.display = 'none';
}

function showResult() {
    showLoading();
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    const resultDescription = calculateResult();
    document.getElementById('result-description').textContent = resultDescription;
    hideLoading();
    generateResultImage(resultDescription);
}


function calculateResult() {
    // 計算結果的邏輯
    return "你的結果是...";
}

function generateResultImage(resultDescription) {
    const canvas = document.getElementById('result-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    // 繪製背景
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 繪製文字
    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    ctx.fillText(resultDescription, 50, 200);

    // 將畫布轉換為圖像
    const resultImage = document.getElementById('result-image');
    resultImage.src = canvas.toDataURL('image/png');
    resultImage.style.display = 'block';
}

function downloadResult() {
    const resultImage = document.getElementById('result-image');
    const link = document.createElement('a');
    link.href = resultImage.src;
    link.download = '測驗結果.png';
    link.click();
}

function toggleMusic() {
    const music = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    if (music.paused) {
        music.play();
        musicControl.textContent = '暫停音樂';
    } else {
        music.pause();
        musicControl.textContent = '播放音樂';
    }
}

