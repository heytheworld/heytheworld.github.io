let currentQuestion = 0;
let answers = [];

const questions = [
    {
        img: "q1.gif",
        text: "剛掉進異世界，發現前面有一群豬豬正跟你打招呼，你會：",
        options: [
            { text: "熱情的朝向他們走過去開始攀談", answer: "E" },
            { text: "開始東張西望確認是不是跟我打招呼", answer: "I" }
        ]
    },
    {
        img: "q2.gif",
        text: "走著走著來到了豬豬村莊，他們熱情的邀請你來到廚房，你發現裡面有好多奇特的食材。你的第一個想法是：",
        options: [
            { text: "叫我來廚房幹嘛，會被當成食材料理嗎", answer: "S" },
            { text: "豬豬大力推薦的彩虹水果好像很不錯欸", answer: "N" },
            { text: "哇那什麼螢光四季豆，真的可以吃嗎", answer: "S" },
            { text: "發光的蘑菇！好酷！想吃！", answer: "N" }
        ]
    },
    {
        img: "q3.gif",
        text: "你在村莊中發現了豬豬女孩，她看起來很煩惱，因為掉了一條魔法項鍊。你會說：",
        options: [
            { text: "還好嗎？沒事吧？我幫你一起找", answer: "F" },
            { text: "什麼是魔法項鍊啊？", answer: "T" },
            { text: "你最後一次看到它在哪呢？", answer: "T" },
            { text: "別哭啦！沒事的～一定找得到的！", answer: "F" }
        ]
    },
    {
        img: "q4.gif",
        text: "不知不覺走進了一片奇幻的森林，在這你遇到了一隻修行豬豬，完成他的謎題就可以獲得寶藏地圖。你會：",
        options: [
            { text: "看能不能用神秘髮夾交換地圖", answer: "P" },
            { text: "試圖揭開謎題", answer: "J" }
        ]
    },
    {
        img: "q5.gif",
        text: "獲得寶藏地圖後你在森林中迷路了，突然看到前方有兩條路，一條通向光明的湖邊，另一條通向陰暗的山洞。你的第一個念頭是：",
        options: [
            { text: "先走到有光的地方吧", answer: "N" },
            { text: "等一下看有沒有人經過可以問", answer: "S" },
            { text: "讓我仔細研究一下地圖", answer: "S" },
            { text: "洞穴看起來就很適合埋寶藏", answer: "N" }
        ]
    },
    {
        img: "q6.gif",
        text: "突然聽到一陣音樂聲傳來，原來是一群愛跳舞的豬豬在舉行派對。仔細看，會選擇哪隻豬豬問路：",
        options: [
            { text: "A", answer: "N" },
            { text: "B", answer: "S" },
            { text: "C", answer: "S" },
            { text: "D", answer: "N" }
        ]
    },
    {
        img: "q7.png",
        text: "走出森林後你發現了豬豬市場，每個攤位上有各種奇異的商品，你會：",
        options: [
            { text: "好不容易穿越了一定要買的吧", answer: "P" },
            { text: "每攤都逛起來！", answer: "P" },
            { text: "想買指南針，不然老是迷路", answer: "J" },
            { text: "等等應該會肚子餓，先看看有沒有食物", answer: "J" }
        ]
    },
    {
        img: "q8.gif",
        text: "跋山涉水之後，你終於到達了寶藏所在地。在那裡你第一個注意到的是：",
        options: [
            { text: "漂浮在半空中的巨大水晶", answer: "P" },
            { text: "上面刻滿了神秘符文的石碑", answer: "J" },
            { text: "漂浮的發光小豬豬", answer: "P" },
            { text: "大門上的印記", answer: "J" }
        ]
    }
];

document.querySelector('.start-btn').addEventListener('click', () => {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.show-screen').style.display = 'block';
});

document.querySelector('.understand-btn').addEventListener('click', () => {
    document.querySelector('.show-screen').style.display = 'none';
    showNextQuestion();
});

function showNextQuestion() {
    if (currentQuestion === 8) {
        analyzeResults();
        return;
    }

    if (currentQuestion === 3) {
        document.querySelector('.question-screen').style.display = 'none';
        document.querySelector('.finding-gif').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.finding-gif').style.display = 'none';
            showQuestion();
        }, 1000);
    } else {
        showQuestion();
    }
}

function showQuestion() {
    const questionScreen = document.querySelector('.question-screen');
    document.querySelector('.question-screen').style.display = 'block';
    document.querySelector('.question-screen').classList.add('fade-in');
    const question = questions[currentQuestion];
    document.getElementById('question-img').src = question.img;
    document.getElementById('question-text').innerText = question.text;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = option.text;
        btn.dataset.answer = option.answer;
        btn.addEventListener('click', selectOption);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(e) {
    e.target.classList.remove('option-btn:active');
    e.target.classList.remove('option-btn:hover');
    answers.push(e.target.dataset.answer);
    currentQuestion++;
    showNextQuestion();
}

function analyzeResults() {
    document.querySelector('.question-screen').style.display = 'none';
    document.querySelector('.loading-gif').style.display = 'block';

    setTimeout(() => {
        document.querySelector('.loading-gif').style.display = 'none';
        showResults();
    }, 2000);
}

function showResults() {
    const result = calculateMBTI(answers);
    document.getElementById('result-img').src = `${result}.png`;
    document.querySelector('.result-screen').style.display = 'block';
}

function calculateMBTI(answers) {
    let counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach(answer => {
        counts[answer]++;
    });

    const result = [
        counts.E > counts.I ? 'E' : 'I',
        counts.S > counts.N ? 'S' : 'N',
        counts.T > counts.F ? 'T' : 'F',
        counts.J > counts.P ? 'J' : 'P'
    ];

    return result.join('');
}

document.querySelector('.music-toggle').addEventListener('click', toggleMusic);

function toggleMusic() {
    const music = document.getElementById('background-music');
    const btn = document.querySelector('.music-toggle');
    if (music.paused) {
        music.play();
        btn.innerText = "Music On";
    } else {
        music.pause();
        btn.innerText = "Music Off";
    }
}

document.querySelector('.retry-btn').addEventListener('click', () => {
    currentQuestion = 0;
    answers = [];
    document.querySelector('.result-screen').style.display = 'none';
    document.querySelector('.start-screen').style.display = 'block';
});

document.querySelector('.share-btn').addEventListener('click', () => {
    // 分享功能的實現，例如通過社交媒體API
});

