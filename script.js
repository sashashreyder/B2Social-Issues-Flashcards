const data = [
  {
    word: 'poverty',
    prompt: 'They launched a program that helps families escape ___.',
    answer: 'poverty',
    hint: 'extreme lack of money'
  },
  {
    word: 'to advocate',
    prompt: 'She’s someone who ___ for equal education rights.',
    answer: 'advocates',
    hint: 'supports a cause'
  },
  {
    word: 'activist',
    prompt: 'The ___ who organized the march was interviewed on TV.',
    answer: 'activist',
    hint: 'social campaigner'
  },
  {
    word: 'refugee',
    prompt: 'They built a center where every ___ receives support.',
    answer: 'refugee',
    hint: 'forced to flee'
  },
  {
    word: 'petition',
    prompt: 'We signed a ___ that demanded cleaner air.',
    answer: 'petition',
    hint: 'formal request'
  },
  {
    word: 'sustainability',
    prompt: 'They promote policies which support ___.',
    answer: 'sustainability',
    hint: 'eco-friendly use'
  },
  {
    word: 'empathy',
    prompt: 'Empathy, which helps build trust, is vital in leadership.',
    answer: 'empathy',
    hint: 'understanding feelings'
  },
  {
    word: 'to volunteer',
    prompt: 'He’s the guy who has ___ at that shelter for years.',
    answer: 'volunteered',
    hint: 'offered free help'
  },
  {
    word: 'discrimination',
    prompt: 'They passed laws that protect workers from ___.',
    answer: 'discrimination',
    hint: 'unfair treatment'
  },
  {
    word: 'inequality',
    prompt: 'We discussed economic ___, which affects millions.',
    answer: 'inequality',
    hint: 'unfair difference'
  }
];

let current = 0;
let score   = 0;

const container = document.querySelector('.card-container');

/* ---------- RENDER CARD ---------- */
function renderCard(idx) {
  const { prompt, hint } = data[idx];

  container.innerHTML = `
    <div class="card">
      <h2>${idx + 1}/${data.length}</h2>
      <p>${prompt}</p>

      <div class="input-wrap">
        <input type="text" id="answerInput" placeholder="Type your answer" />
        <span class="qmark" data-tip="${hint}">?</span>
      </div>

      <div class="button-row">
        <button id="submitBtn" class="btn">Submit</button>
        <button id="nextBtn" class="btn next">→</button>
      </div>

      <p class="feedback" id="feedback"></p>
    </div>`;

  // focus removed to prevent page jump
  // document.getElementById('answerInput').focus();

  document.getElementById('submitBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextCard);

  // Mobile tooltip toggle
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    const qmark = document.querySelector('.qmark');
    qmark.addEventListener('click', e => {
      document.querySelectorAll('.qmark').forEach(t => {
        if (t !== e.target) t.classList.remove('active');
      });
      qmark.classList.toggle('active');
    });
  }

  // Enter key logic
  const input = document.getElementById('answerInput');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const feedback = document.getElementById('feedback');
      const nextBtn = document.getElementById('nextBtn');
      if (feedback.textContent) {
        nextCard();
      } else {
        checkAnswer();
      }
    }
  });
}

/* ---------- CHECK ---------- */
function checkAnswer() {
  const inp = document.getElementById('answerInput');
  const fb  = document.getElementById('feedback');
  if (!inp || fb.textContent) return; // prevent double scoring

  const user    = inp.value.trim().toLowerCase();
  const correct = data[current].answer.toLowerCase();

  fb.textContent = user === correct ? '✓ Correct!' : `✗ ${correct}`;
  fb.className   = 'feedback ' + (user === correct ? 'correct' : 'incorrect');
  if (user === correct) score++;

  document.getElementById('nextBtn').classList.add('show');
}

/* ---------- RESULT ---------- */
function showResult() {
  const msg =
    score <= 5 ? '😅 Try again!' :
    score <= 7 ? '👍 Not bad — you can do better!' :
    score <= 9 ? '✅ Well done!' :
                 '🌟 You\'re a pro!';

  container.innerHTML = `
    <div class="card result-card">
      <img src="mascot-result-unscreen.gif" alt="Mascot" class="mascot-gif" />
      <h2>${msg}</h2>
      <p>You got&nbsp;<strong>${score}</strong>&nbsp;out of&nbsp;<strong>${data.length}</strong>&nbsp;correct.</p>
      <button id="restartBtn" class="btn">🔁 Try Again</button>
    </div>`;

  document.getElementById('restartBtn').addEventListener('click', () => {
    current = 0;
    score   = 0;
    renderCard(current);
  });
}

/* ---------- NEXT ---------- */
function nextCard() {
  current++;
  current < data.length ? renderCard(current) : showResult();
}

/* ---------- INIT ---------- */
renderCard(current);














