    
      // --- Game State ---
        const TOTAL_LEVELS = 20;
        const POINTS_PER_LEVEL = 5;
        let unlockedStage = parseInt(localStorage.getItem('cw_unlocked')) || 1;
        let currentPlayingLevel = 1;
        let score = Math.min((unlockedStage - 1) * POINTS_PER_LEVEL, 100);

        // --- بيانات المراحل العشرين (JSON + Grids) ---
        const stagesData = [
            {
                stage: 1, theme: "جغرافيا",
                words: [
                    "أفقي: عاصمة مصر وأكبر مدنها", "عمودي: أكبر قارات العالم مساحة", 
                    "أفقي: أطول نهر في العالم", "عمودي: بحر يفصل بين أفريقيا وأوروبا", "أفقي: عاصمة فلسطين"
                ],
                grid: [
                    ['ا','ل','ق','ا','ه','ر','ة'],
                    ['ل','#','#','س','#','#','#'],
                    ['م','#','ن','ي','ل','#','#'],
                    ['ت','#','#','ا','#','#','#'],
                    ['و','#','#','#','#','#','#'],
                    ['س','#','ا','ل','ق','د','س'],
                    ['ط','#','#','#','#','#','#']
                ]
            },
            {
                stage: 2, theme: "علوم",
                words: [
                    "أفقي: الكوكب الذي نعيش عليه", "عمودي: الغاز الضروري لتنفس الكائنات الحية",
                    "أفقي: نجم يمثل مركز مجموعتنا الشمسية", "عمودي: وحدة البناء الأساسية في الجسم", "أفقي: سائل يتكون من الهيدروجين والأكسجين"
                ],
                grid: [
                    ['ا','ل','ش','م','س','#','#'],
                    ['ل','#','#','#','#','خ','#'],
                    ['ا','#','#','ا','ل','م','ا','ء'],
                    ['ر','#','#','ك','#','ي','#'],
                    ['ض','#','#','س','#','ة','#'],
                    ['#','#','#','ج','#','#','#'],
                    ['#','#','#','ي','#','#','#'],
                    ['#','#','#','ن','#','#','#']
                ]
            },
            {
                stage: 3, theme: "جغرافيا",
                words: ["المغرب", "الهادئ", "إفرست", "الصحراء", "طوكيو"],
                grid: [
                    ['ا','ل','م','غ','ر','ب','#'],
                    ['ل','#','#','#','#','#','#'],
                    ['ه','#','ط','و','ك','ي','و'],
                    ['ا','#','#','#','#','#','#'],
                    ['د','#','إ','ف','ر','س','ت'],
                    ['ئ','#','#','#','#','#','#'],
                    ['ا','ل','ص','ح','ر','ا','ء']
                ]
            },
            {
                stage: 4, theme: "علوم",
                words: ["المريخ", "القلب", "تبخر", "نبات", "أسنان"],
                grid: [
                    ['ا','ل','م','ر','ي','خ','#'],
                    ['ل','#','#','#','#','#','#'],
                    ['ق','#','ت','ب','خ','ر','#'],
                    ['ل','#','#','#','#','#','#'],
                    ['ب','#','ن','ب','ا','ت','#'],
                    ['#','#','#','#','#','#','#'],
                    ['أ','س','ن','ا','ن','#','#']
                ]
            },
            {
                stage: 5, theme: "جغرافيا",
                words: ["العراق", "الألب", "جزيرة", "البرازيل", "مكة"],
                grid: [
                    ['ا','ل','ع','ر','ا','ق','#'],
                    ['ل','#','#','#','#','#','#'],
                    ['أ','ل','ب','#','م','ك','ة'],
                    ['ل','#','#','#','#','#','#'],
                    ['ب','#','ج','ز','ي','ر','ة'],
                    ['#','#','#','#','#','#','#'],
                    ['ا','ل','ب','ر','ا','ز','ي','ل']
                ]
            },
            {
                stage: 6, theme: "علوم",
                words: ["القمر", "المخ", "صلب", "ضوء", "عين"],
                grid: [
                    ['ا','ل','ق','م','ر'],
                    ['ل','#','#','#','#'],
                    ['m','#','ص','ل','ب'],
                    ['خ','#','#','#','#'],
                    ['#','#','ض','و','ء'],
                    ['#','#','#','#','#'],
                    ['ع','ي','ن','#','#']
                ]
            },
            {
                stage: 7, theme: "جغرافيا",
                words: ["استواء", "الرياض", "كهف", "الصين", "أمازون"],
                grid: [
                    ['ا','س','ت','و','ا','ء','#'],
                    ['ل','#','#','#','#','#','#'],
                    ['ر','#','ك','ه','ف','#','#'],
                    ['ي','#','#','#','#','#','#'],
                    ['ا','ل','ص','ي','ن','#','#'],
                    ['ض','#','#','#','#','#','#'],
                    ['أ','م','ا','ز','و','ن','#']
                ]
            },
            {
                stage: 8, theme: "علوم",
                words: ["مشتري", "معدة", "سائل", "صوت", "أذن"],
                grid: [
                    ['م','ش','ت','ر','ي','#'],
                    ['ع','#','#','#','#','#'],
                    ['d','#','س','ا','ئ','ل'],
                    ['ة','#','#','#','#','#'],
                    ['#','#','ص','و','ت','#'],
                    ['#','#','#','#','#','#'],
                    ['أ','ذ','ن','#','#','#']
                ]
            },
            {
                stage: 9, theme: "جغرافيا",
                words: ["سودان", "أطلس", "خليج", "روسيا", "لندن"],
                grid: [
                    ['س','و','د','ا','ن','#'],
                    ['#','#','#','#','#','#'],
                    ['أ','ط','ل','س','#','#'],
                    ['#','#','#','#','#','#'],
                    ['خ','ل','ي','ج','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ر','و','س','ي','ا','#'],
                    ['#','#','#','#','#','#'],
                    ['ل','ن','د','ن','#','#']
                ]
            },
            {
                stage: 10, theme: "علوم",
                words: ["الزهرة", "رئة", "غاز", "حرارة", "أنف"],
                grid: [
                    ['ا','ل','ز','ه','ر','ة'],
                    ['#','#','#','#','#','#'],
                    ['ر','ئ','ة','#','#','#'],
                    ['#','#','#','#','#','#'],
                    ['غ','ا','ز','#','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ح','ر','ا','ر','ة','#'],
                    ['#','#','#','#','#','#'],
                    ['أ','ن','ف','#','#','#']
                ]
            },
            {
                stage: 11, theme: "جغرافيا",
                words: ["الأردن", "واحة", "الهند", "باريس", "محيط"],
                grid: [
                    ['ا','ل','أ','ر','د','ن'],
                    ['#','#','#','#','#','#'],
                    ['و','ا','ح','ة','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ا','ل','ه','ن','د','#'],
                    ['#','#','#','#','#','#'],
                    ['ب','ا','ر','ي','س','#'],
                    ['#','#','#','#','#','#'],
                    ['م','ح','ي','ط','#','#']
                ]
            },
            {
                stage: 12, theme: "علوم",
                words: ["زحل", "دم", "انصهار", "مغناطيس", "جلد"],
                grid: [
                    ['ز','ح','ل','#','#','#','#'],
                    ['#','#','#','#','#','#','#'],
                    ['د','م','#','#','#','#','#'],
                    ['#','#','#','#','#','#','#'],
                    ['ا','ن','ص','ه','ا','ر','#'],
                    ['#','#','#','#','#','#','#'],
                    ['م','غ','ن','ا','ط','ي','س'],
                    ['#','#','#','#','#','#','#'],
                    ['ج','ل','د','#','#','#','#']
                ]
            },
            {
                stage: 13, theme: "جغرافيا",
                words: ["عمان", "بركان", "وادي", "كندا", "روما"],
                grid: [
                    ['ع','م','ا','ن','#'],
                    ['#','#','#','#','#'],
                    ['ب','ر','ك','ا','ن'],
                    ['#','#','#','#','#'],
                    ['و','ا','د','ي','#'],
                    ['#','#','#','#','#'],
                    ['ك','ن','د','ا','#'],
                    ['#','#','#','#','#'],
                    ['ر','و','م','ا','#']
                ]
            },
            {
                stage: 14, theme: "علوم",
                words: ["جاذبية", "هيكل", "تجمد", "كهرباء", "لسان"],
                grid: [
                    ['ج','ا','ذ','ب','ي','ة'],
                    ['#','#','#','#','#','#'],
                    ['ه','ي','ك','ل','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ت','ج','م','د','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ك','ه','ر','ب','ا','ء'],
                    ['#','#','#','#','#','#'],
                    ['ل','س','ا','ن','#','#']
                ]
            },
            {
                stage: 15, theme: "جغرافيا",
                words: ["الكويت", "مضيق", "أستراليا", "برلين", "شبه"],
                grid: [
                    ['ا','ل','ك','و','ي','ت','#','#'],
                    ['#','#','#','#','#','#','#','#'],
                    ['م','ض','ي','ق','#','#','#','#'],
                    ['#','#','#','#','#','#','#','#'],
                    ['أ','س','ت','ر','ا','ل','ي','ا'],
                    ['#','#','#','#','#','#','#','#'],
                    ['ب','ر','ل','ي','ن','#','#','#'],
                    ['#','#','#','#','#','#','#','#'],
                    ['ش','ب','ه','#','#','#','#','#']
                ]
            },
            {
                stage: 16, theme: "علوم",
                words: ["فضاء", "عضلة", "تكثف", "بطارية", "جذر"],
                grid: [
                    ['ف','ض','ا','ء','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ع','ض','ل','ة','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ت','ك','ث','ف','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ب','ط','ا','ر','ي','ة'],
                    ['#','#','#','#','#','#'],
                    ['ج','ذ','ر','#','#','#']
                ]
            },
            {
                stage: 17, theme: "جغرافيا",
                words: ["سوريا", "قارة", "شلال", "المكسيك", "مدريد"],
                grid: [
                    ['س','و','ر','ي','ا','#','#'],
                    ['#','#','#','#','#','#','#'],
                    ['ق','ا','ر','ة','#','#','#'],
                    ['#','#','#','#','#','#','#'],
                    ['ش','ل','ا','ل','#','#','#'],
                    ['#','#','#','#','#','#','#'],
                    ['ا','ل','م','ك','س','ي','ك'],
                    ['#','#','#','#','#','#','#'],
                    ['م','د','ر','ي','د','#','#']
                ]
            },
            {
                stage: 18, theme: "علوم",
                words: ["تلسكوب", "عصب", "احتكاك", "ظل", "ساق"],
                grid: [
                    ['ت','ل','س','ك','و','ب'],
                    ['#','#','#','#','#','#'],
                    ['ع','ص','ب','#','#','#'],
                    ['#','#','#','#','#','#'],
                    ['ا','ح','ت','ك','ا','ك'],
                    ['#','#','#','#','#','#'],
                    ['ظ','ل','#','#','#','#'],
                    ['#','#','#','#','#','#'],
                    ['س','ا','ق','#','#','#']
                ]
            },
            {
                stage: 19, theme: "جغرافيا",
                words: ["اليمن", "قطب", "بحيرة", "الأرجنتين", "دمشق"],
                grid: [
                    ['ا','ل','ي','م','ن','#','#','#','#'],
                    ['#','#','#','#','#','#','#','#','#'],
                    ['ق','ط','ب','#','#','#','#','#','#'],
                    ['#','#','#','#','#','#','#','#','#'],
                    ['ب','ح','ي','ر','ة','#','#','#','#'],
                    ['#','#','#','#','#','#','#','#','#'],
                    ['ا','ل','أ','ر','ج','ن','ت','ي','ن'],
                    ['#','#','#','#','#','#','#','#','#'],
                    ['د','م','ش','ق','#','#','#','#','#']
                ]
            },
            {
                stage: 20, theme: "علوم",
                words: ["مجهر", "هضم", "مرآة", "صدى", "زهرة"],
                grid: [
                    ['م','ج','ه','ر'],
                    ['#','#','#','#'],
                    ['ه','ض','م','#'],
                    ['#','#','#','#'],
                    ['م','ر','آ','ة'],
                    ['#','#','#','#'],
                    ['ص','د','ى','#'],
                    ['#','#','#','#'],
                    ['ز','ه','ر','ة']
                ]
            }
        ];

        // --- Game Logic ---
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
                col.className = 'col-4 col-md-3 col-lg-2';
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
            document.getElementById('game-screen').style.display = 'block';
            
            const levelData = stagesData[levelNum - 1]; 
            document.getElementById('current-level-title').innerText = `${levelNum} (${levelData.theme})`;

            renderCrossword(levelData.grid);
            renderHints(levelData.words);
        }

        function showLevelsScreen() {
            document.getElementById('game-screen').style.display = 'none';
            document.getElementById('levels-screen').style.display = 'block';
            renderLevelsGrid();
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
                        const inputCell = document.createElement('input');
                        inputCell.type = 'text';
                        inputCell.maxLength = 1;
                        inputCell.className = 'crossword-cell';
                        inputCell.dataset.answer = cell;
                        rowDiv.appendChild(inputCell);
                        
                        inputCell.addEventListener('input', function() {
                            if (this.value.length === 1) {
                                const inputs = Array.from(document.querySelectorAll('.crossword-cell:not(.crossword-black)'));
                                const index = inputs.indexOf(this);
                                if (index < inputs.length - 1) inputs[index + 1].focus();
                            }
                        });
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

        function checkAnswer() {
            const inputs = document.querySelectorAll('.crossword-cell:not(.crossword-black)');
            let isCorrect = true;
            inputs.forEach(input => {
                if (input.value.trim() === '' || input.value.trim() !== input.dataset.answer) {
                    isCorrect = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = 'green';
                }
            });

            if (isCorrect) handleWin();
            else {
                Swal.fire({
                    icon: 'error', title: 'إجابة خاطئة!', text: 'راجع التلميحات وحاول مجدداً.',
                    confirmButtonText: 'حسناً', confirmButtonColor: '#0d6efd'
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
                    html: `<b>حصلت على المجموع النهائي: 100/100 نقطة!</b>`,
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
            var duration = 3 * 1000;
            var end = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
            var interval = setInterval(function() {
                if (Date.now() > end) return clearInterval(interval);
                confetti(Object.assign({}, defaults, { particleCount: 50, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
            }, 250);
        }

        // --- Share & Install ---
        function shareApp() {
            if (navigator.share) {
                navigator.share({ title: 'لعبة الكلمات المتقاطعة', url: window.location.href }).catch(console.error);
            } else {
                Swal.fire('تنبيه', 'المشاركة غير مدعومة هنا.', 'info');
            }
        }

        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            document.getElementById('installAppBtn').style.display = 'inline-block';
        });

        document.getElementById('installAppBtn').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') document.getElementById('installAppBtn').style.display = 'none';
                deferredPrompt = null;
            }
        });
        // تسجيل الـ Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker Registered Successfully'))
            .catch((err) => console.log('Service Worker Failed', err));
    });
}