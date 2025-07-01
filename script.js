const data = [
  {
    word: 'poverty',
    prompt: 'Many families are still trapped in ___.',
    answer: 'poverty',
    hint: 'extreme lack of money'
  },
  {
    word: 'to advocate',
    prompt: 'She ___ for better access to education.',
    answer: 'advocates',
    hint: 'supports a cause'
  },
  {
    word: 'activist',
    prompt: 'The ___ gave a speech about climate justice.',
    answer: 'activist',
    hint: 'social campaigner'
  },
  {
    word: 'refugee',
    prompt: 'The ___ was welcomed into the community.',
    answer: 'refugee',
    hint: 'forced to flee'
  },
  {
    word: 'petition',
    prompt: 'They’ve launched a ___ to ban plastic bags.',
    answer: 'petition',
    hint: 'formal request'
  },
  {
    word: 'sustainability',
    prompt: 'The city promotes ___ in transport and housing.',
    answer: 'sustainability',
    hint: 'eco-friendly use'
  },
  {
    word: 'empathy',
    prompt: 'Good leaders show ___ toward others.',
    answer: 'empathy',
    hint: 'understanding feelings'
  },
  {
    word: 'to volunteer',
    prompt: 'He has ___ at the shelter every weekend.',
    answer: 'volunteered',
    hint: 'offered free help'
  },
  {
    word: 'discrimination',
    prompt: 'The law protects workers from ___.',
    answer: 'discrimination',
    hint: 'unfair treatment'
  },
  {
    word: 'inequality',
    prompt: 'Economic ___ has grown in recent years.',
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














