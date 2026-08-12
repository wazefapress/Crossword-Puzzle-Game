const TOTAL_LEVELS = 20;
const POINTS_PER_LEVEL = 5;
let unlockedStage = parseInt(localStorage.getItem('cw_unlocked')) || 1;
let currentPlayingLevel = 1;
let score = Math.min((unlockedStage - 1) * POINTS_PER_LEVEL, 100);

const stagesData = [
    {
        stage: 1, theme: "جغرافيا",
        words: ["أفقي: عاصمة مصر وأكبر مدنها", "عمودي: أكبر قارات العالم مساحة", "أفقي: أطول نهر في العالم", "عمودي: بحر يفصل بين أفريقيا وأوروبا", "أفقي: عاصمة فلسطين"],
        grid: [['ا','ل','ق','ا','ه','ر','ة'],['ل','#','#','س','#','#','#'],['م','#','ن','ي','ل','#','#'],['ت','#','#','ا','#','#','#'],['و','#','#','#','#','#','#'],['س','#','ا','ل','ق','د','س'],['ط','#','#','#','#','#','#']]
    },
    {
        stage: 2, theme: "علوم",
        words: ["أفقي: الكوكب الذي نعيش عليه", "عمودي: الغاز الضروري لتنفس الكائنات الحية", "أفقي: نجم يمثل مركز مجموعتنا الشمسية", "عمودي: وحدة البناء الأساسية في الجسم", "أفقي: سائل يتكون من الهيدروجين والأكسجين"],
        grid: [['ا','ل','ش','م','س','#','#'],['ل','#','#','#','#','خ','#'],['ا','#','#','ا','ل','م','ا','ء'],['ر','#','#','ك','#','ي','#'],['ض','#','#','س','#','ة','#'],['#','#','#','ج','#','#','#'],['#','#','#','ي','#','#','#'],['#','#','#','ن','#','#','#']]
    },
    {
        stage: 3, theme: "جغرافيا",
        words: ["المغرب", "الهادئ", "إفرست", "الصحراء", "طوكيو"],
        grid: [['ا','ل','م','غ','ر','ب','#'],['ل','#','#','#','#','#','#'],['ه','#','ط','و','ك','ي','و'],['ا','#','#','#','#','#','#'],['د','#','إ','ف','ر','س','ت'],['ئ','#','#','#','#','#','#'],['ا','ل','ص','ح','ر','ا','ء']]
    },
    {
        stage: 4, theme: "علوم",
        words: ["المريخ", "القلب", "تبخر", "نبات", "أسنان"],
        grid: [['ا','ل','م','ر','ي','خ','#'],['ل','#','#','#','#','#','#'],['ق','#','ت','ب','خ','ر','#'],['ل','#','#','#','#','#','#'],['ب','#','ن','ب','ا','ت','#'],['#','#','#','#','#','#','#'],['أ','س','ن','ا','ن','#','#']]
    },
    {
        stage: 5, theme: "جغرافيا",
        words: ["العراق", "الألب", "جزيرة", "البرازيل", "مكة"],
        grid: [['ا','ل','ع','ر','ا','ق','#','#'],['ل','#','#','#','#','#','#','#'],['أ','ل','ب','#','م','ك','ة','#'],['ل','#','#','#','#','#','#','#'],['ب','#','ج','ز','ي','ر','ة','#'],['#','#','#','#','#','#','#','#'],['ا','ل','ب','ر','ا','ز','ي','ل','#']]
    },
    {
        stage: 6, theme: "علوم",
        words: ["القمر", "المخ", "صلب", "ضوء", "عين"],
        grid: [['ا','ل','ق','م','ر','#'],['ل','#','#','#','#','#'],['م','#','ص','ل','ب','#'],['خ','#','#','#','#','#'],['#','#','ض','و','ء','#'],['#','#','#','#','#','#'],['ع','ي','ن','#','#','#']]
    },
    {
        stage: 7, theme: "جغرافيا",
        words: ["استواء", "الرياض", "كهف", "الصين", "أمازون"],
        grid: [['ا','س','ت','و','ا','ء','#'],['ل','#','#','#','#','#','#'],['ر','#','ك','ه','ف','#','#'],['ي','#','#','#','#','#','#'],['ا','ل','ص','ي','ن','#','#'],['ض','#','#','#','#','#','#'],['أ','م','ا','ز','و','ن','#']]
    },
    {
        stage: 8, theme: "علوم",
        words: ["مشتري", "معدة", "سائل", "صوت", "أذن"],
        grid: [['م','ش','ت','ر','ي','#'],['ع','#','#','#','#','#'],['د','#','س','ا','ئ','ل','#'],['ة','#','#','#','#','#'],['#','#','ص','و','ت','#','#'],['#','#','#','#','#','#'],['أ','ذ','ن','#','#','#']]
    },
    {
        stage: 9, theme: "جغرافيا",
        words: ["سودان", "أطلس", "خليج", "روسيا", "لندن"],
        grid: [['س','و','د','ا','ن','#'],['و','#','#','#','#','#'],['د','#','أ','ط','ل','س'],['ا','#','#','#','#','#'],['ن','#','خ','ل','ي','ج'],['#','#','#','#','#','#'],['ر','و','س','ي','ا','#'],['#','#','#','#','#','#'],['ل','ن','د','ن','#','#']]
    },
    {
        stage: 10, theme: "علوم",
        words: ["الزهرة", "رئة", "غاز", "حرارة", "أنف"],
        grid: [['ا','ل','ز','ه','ر','ة'],['ل','#','#','#','#','#'],['ر','ئ','ة','#','#','#'],['ز','#','#','#','#','#'],['غ','ا','ز','#','#','#'],['ة','#','#','#','#','#'],['ح','ر','ا','ر','ة','#'],['#','#','#','#','#','#'],['أ','ن','ف','#','#','#']]
    },
    {
        stage: 11, theme: "جغرافيا",
        words: ["الأردن", "واحة", "الهند", "باريس", "محيط"],
        grid: [['ا','ل','أ','ر','د','ن'],['ل','#','#','#','#','#'],['و','ا','ح','ة','#','#'],['ر','#','#','#','#','#'],['ا','ل','ه','ن','د','#'],['د','#','#','#','#','#'],['ب','ا','ر','ي','س','#'],['ن','#','#','#','#','#'],['م','ح','ي','ط','#','#']]
    },
    {
        stage: 12, theme: "علوم",
        words: ["زحل", "دم", "انصهار", "مغناطيس", "جلد"],
        grid: [['ز','ح','ل','#','#','#','#'],['ح','#','#','#','#','#','#'],['د','م','#','#','#','#','#'],['ل','#','#','#','#','#','#'],['ا','ن','ص','ه','ا','ر','#'],['#','#','#','#','#','#','#'],['م','غ','ن','ا','ط','ي','س'],['#','#','#','#','#','#','#'],['ج','ل','د','#','#','#','#']]
    },
    {
        stage: 13, theme: "جغرافيا",
        words: ["عمان", "بركان", "وادي", "كندا", "روما"],
        grid: [['ع','م','ا','ن','#'],['م','#','#','#','#'],['ب','ر','ك','ا','ن'],['ا','#','#','#','#'],['و','ا','د','ي','#'],['ن','#','#','#','#'],['ك','ن','د','ا','#'],['#','#','#','#','#'],['ر','و','م','ا','#']]
    },
    {
        stage: 14, theme: "علوم",
        words: ["جاذبية", "هيكل", "تجمد", "كهرباء", "لسان"],
        grid: [['ج','ا','ذ','ب','ي','ة'],['ا','#','#','#','#','#'],['ه','ي','ك','ل','#','#'],['ذ','#','#','#','#','#'],['ت','ج','م','د','#','#'],['ب','#','#','#','#','#'],['ك','ه','ر','ب','ا','ء'],['ي','#','#','#','#','#'],['ل','س','ا','ن','#','#']]
    },
    {
        stage: 15, theme: "جغرافيا",
        words: ["الكويت", "مضيق", "أستراليا", "برلين", "شبه"],
        grid: [['ا','ل','ك','و','ي','ت','#','#'],['ل','#','#','#','#','#','#','#'],['م','ض','ي','ق','#','#','#','#'],['ك','#','#','#','#','#','#','#'],['أ','س','ت','ر','ا','ل','ي','ا'],['و','#','#','#','#','#','#','#'],['ب','ر','ل','ي','ن','#','#','#'],['ي','#','#','#','#','#','#','#'],['ش','ب','ه','#','#','#','#','#']]
    },
    {
        stage: 16, theme: "علوم",
        words: ["فضاء", "عضلة", "تكثف", "بطارية", "جذر"],
        grid: [['ف','ض','ا','ء','#','#'],['ض','#','#','#','#','#'],['ع','ض','ل','ة','#','#'],['ا','#','#','#','#','#'],['ت','ك','ث','ف','#','#'],['ء','#','#','#','#','#'],['ب','ط','ا','ر','ي','ة'],['#','#','#','#','#','#'],['ج','ذ','ر','#','#','#']]
    },
    {
        stage: 17, theme: "جغرافيا",
        words: ["سوريا", "قارة", "شلال", "المكسيك", "مدريد"],
        grid: [['س','و','ر','ي','ا','#','#'],['و','#','#','#','#','#','#'],['ق','ا','ر','ة','#','#','#'],['ر','#','#','#','#','#','#'],['ش','ل','ا','ل','#','#','#'],['ي','#','#','#','#','#','#'],['ا','ل','م','ك','س','ي','ك'],['ا','#','#','#','#','#','#'],['م','د','ر','ي','د','#','#']]
    },
    {
        stage: 18, theme: "علوم",
        words: ["تلسكوب", "عصب", "احتكاك", "ظل", "ساق"],
        grid: [['ت','ل','س','ك','و','ب'],['ل','#','#','#','#','#'],['ع','ص','ب','#','#','#'],['س','#','#','#','#','#'],['ا','ح','ت','ك','ا','ك'],['ك','#','#','#','#','#'],['ظ','ل','#','#','#','#'],['و','#','#','#','#','#'],['س','ا','ق','#','#','#']]
    },
    {
        stage: 19, theme: "جغرافيا",
        words: ["اليمن", "قطب", "بحيرة", "الأرجنتين", "دمشق"],
        grid: [['ا','ل','ي','م','ن','#','#','#','#'],['ل','#','#','#','#','#','#','#','#'],['ق','ط','ب','#','#','#','#','#','#'],['ي','#','#','#','#','#','#','#','#'],['ب','ح','ي','ر','ة','#','#','#','#'],['م','#','#','#','#','#','#','#','#'],['ا','ل','أ','ر','ج','ن','ت','ي','ن'],['ن','#','#','#','#','#','#','#','#'],['د','م','ش','ق','#','#','#','#','#']]
    },
    {
        stage: 20, theme: "علوم",
        words: ["مجهر", "هضم", "مرآة", "صدى", "زهرة"],
        grid: [['م','ج','ه','ر','#'],['ه','#','#','#','#'],['ه','ض','م','#','#'],['ر','#','#','#','#'],['م','ر','آ','ة','#'],['#','#','#','#','#'],['ص','د','ى','#','#'],['#','#','#','#','#'],['ز','ه','ر','ة','#']]
    }
];

// هندسة السحب والإفلات للعمل باللمس والماوس بكفاءة
let draggedElement = null;
let dragGhost = null;

window.onload = () => {
    updateScoreDisplay();
    renderLevelsGrid();
};

function updateScoreDisplay() {
    document.getElementById('score-display').innerText = score;
}

function renderLevelsGrid() {
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= TOTAL_LEVELS; i++) {
        const isUnlocked = i <= unlockedStage;
        const col = document.createElement('div');
        col.className = 'col-3 col-md-2';
        const btn = document.createElement('button');
        btn.className = `btn w-100 level-btn ${isUnlocked ? 'btn-outline-primary' : 'btn-secondary'}`;
        
        if (!isUnlocked) {
            btn.disabled = true;
            btn.innerHTML = `${i} <i class="fas fa-lock"></i>`;
        } else {
            btn.innerText = i;
            btn.onclick = () => loadLevel(i);
        }
        col.appendChild(btn);
        grid.appendChild(col);
    }
}

function loadLevel(levelNum) {
    currentPlayingLevel = levelNum;
    document.getElementById('levels-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    
    const levelData = stagesData[levelNum - 1]; 
    document.getElementById('current-level-title').innerText = `${levelNum} (${levelData.theme})`;

    let allLetters = levelData.grid.flat().filter(c => c !== '#');
    allLetters.sort(() => Math.random() - 0.5);

    renderLetters(allLetters);
    renderCrossword(levelData.grid);
    renderHints(levelData.words);
}

function showLevelsScreen() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('levels-screen').style.display = 'flex';
    renderLevelsGrid();
}

function renderLetters(letters) {
    const container = document.getElementById('letters-container');
    container.innerHTML = '';

    letters.forEach((letter, index) => {
        const span = document.createElement('div');
        span.className = 'letter-box';
        span.innerText = letter;
        span.id = 'l-' + index;

        span.addEventListener('pointerdown', handleDragStart);

        span.addEventListener('click', () => {
            if (span.parentElement.classList.contains('crossword-cell')) {
                span.parentElement.style.borderColor = '#6c757d';
                document.getElementById('letters-container').appendChild(span);
            }
        });

        container.appendChild(span);
    });
}

function renderCrossword(gridData) {
    const container = document.getElementById('crossword-container');
    container.innerHTML = '';
    
    gridData.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'crossword-row';
        row.forEach(cell => {
            if (cell === '#') {
                const blackCell = document.createElement('div');
                blackCell.className = 'crossword-cell crossword-black';
                rowDiv.appendChild(blackCell);
            } else {
                const dropCell = document.createElement('div');
                dropCell.className = 'crossword-cell';
                dropCell.dataset.answer = cell;
                rowDiv.appendChild(dropCell);
            }
        });
        container.appendChild(rowDiv);
    });
}

function renderHints(hints) {
    const list = document.getElementById('hints-list');
    list.innerHTML = '';
    hints.forEach(hint => {
        const li = document.createElement('li');
        li.innerText = hint;
        list.appendChild(li);
    });
}

function handleDragStart(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    
    draggedElement = e.target;
    draggedElement.style.opacity = '0.3'; 

    dragGhost = document.createElement('div');
    dragGhost.className = 'drag-ghost';
    dragGhost.innerText = draggedElement.innerText;
    
    dragGhost.style.width = draggedElement.offsetWidth + 'px';
    dragGhost.style.height = draggedElement.offsetHeight + 'px';
    
    document.body.appendChild(dragGhost);
    moveGhost(e.clientX, e.clientY);

    document.addEventListener('pointermove', handleDragMove, { passive: false });
    document.addEventListener('pointerup', handleDragEnd);
}

function handleDragMove(e) {
    if (!dragGhost) return;
    e.preventDefault(); 
    moveGhost(e.clientX, e.clientY);
}

function moveGhost(x, y) {
    if (!dragGhost) return;
    dragGhost.style.left = (x - dragGhost.offsetWidth / 2) + 'px';
    dragGhost.style.top = (y - dragGhost.offsetHeight / 2) + 'px';
}

function handleDragEnd(e) {
    document.removeEventListener('pointermove', handleDragMove);
    document.removeEventListener('pointerup', handleDragEnd);

    if (!dragGhost || !draggedElement) return;

    dragGhost.style.display = 'none';
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
    
    dragGhost.remove();
    dragGhost = null;
    draggedElement.style.opacity = '1';

    if (dropTarget) {
        const cell = dropTarget.closest('.crossword-cell:not(.crossword-black)');
        const lettersArea = dropTarget.closest('#letters-container');
        
        if (cell) {
            if (cell.children.length > 0 && cell.children[0] !== draggedElement) {
                document.getElementById('letters-container').appendChild(cell.children[0]);
            }
            cell.appendChild(draggedElement);
            cell.style.borderColor = '#6c757d';
        } else if (lettersArea) {
            document.getElementById('letters-container').appendChild(draggedElement);
        } else {
            document.getElementById('letters-container').appendChild(draggedElement);
        }
    } else {
        document.getElementById('letters-container').appendChild(draggedElement);
    }
    
    draggedElement = null;
}

function checkAnswer() {
    const cells = document.querySelectorAll('.crossword-cell:not(.crossword-black)');
    let isCorrect = true;
    let isFull = true;

    cells.forEach(cell => {
        const letterBox = cell.querySelector('.letter-box');
        
        if (!letterBox) {
            isFull = false;
            isCorrect = false;
            cell.style.borderColor = '#dc3545';
        } else if (letterBox.innerText !== cell.dataset.answer) {
            isCorrect = false;
            cell.style.borderColor = '#dc3545';
        } else {
            cell.style.borderColor = '#198754';
        }
    });

    if (isCorrect) {
        handleWin();
    } else if (!isFull) {
        Swal.fire({
            icon: 'warning', title: 'الشبكة غير مكتملة', 
            text: 'يرجى تعبئة جميع الفراغات.', confirmButtonColor: '#0d6efd'
        });
    } else {
        Swal.fire({
            icon: 'error', title: 'إجابة خاطئة!', 
            text: 'راجع المربعات الحمراء. يمكنك النقر على الحرف لإعادته للصندوق.',
            confirmButtonColor: '#dc3545'
        });
    }
}

function handleWin() {
    if (currentPlayingLevel === unlockedStage && unlockedStage <= TOTAL_LEVELS) {
        unlockedStage++;
        score += POINTS_PER_LEVEL;
        localStorage.setItem('cw_unlocked', unlockedStage);
        updateScoreDisplay();
    }

    if (currentPlayingLevel === TOTAL_LEVELS) {
        document.getElementById('audio-win-game').play();
        fireConfetti();
        Swal.fire({
            icon: 'success', title: 'مبروك لقد أتممت اللعبة! 🏆',
            html: `<b>المجموع النهائي: ${score}/100</b>`,
            confirmButtonText: 'العودة للمراحل', confirmButtonColor: '#198754'
        }).then(() => showLevelsScreen());
    } else {
        document.getElementById('audio-win-level').play();
        Swal.fire({
            icon: 'success', title: 'عمل رائع!',
            text: `اجتزت المرحلة بنجاح! كسبت ${POINTS_PER_LEVEL} نقاط.`,
            confirmButtonText: 'المرحلة التالية', confirmButtonColor: '#0d6efd'
        }).then(() => loadLevel(currentPlayingLevel + 1));
    }
}

function fireConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

function shareApp() {
    if (navigator.share) {
        navigator.share({ title: 'لعبة الكلمات المتقاطعة', url: window.location.href }).catch(console.error);
    } else {
        Swal.fire('تنبيه', 'المشاركة غير مدعومة هنا.', 'info');
    }
}
// --- PWA Install Prompt Logic ---
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('installAppBtn');
    if (installBtn) installBtn.style.display = 'inline-block';
});

const installBtnEl = document.getElementById('installAppBtn');
if (installBtnEl) {
    installBtnEl.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                document.getElementById('installAppBtn').style.display = 'none';
            }
            deferredPrompt = null;
        }
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .catch((err) => console.log('Service Worker Failed', err));
    });
}