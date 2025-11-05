// ====== Data Soal (bisa kamu ubah sendiri) ======
const questions = [
  {
    question: "Apa kepanjangan dari 'Dasa Darma Pramuka'?",
    answers: [
      { text: "Sepuluh janji Pramuka", correct: true },
      { text: "Sepuluh tugas Pramuka", correct: false },
      { text: "Sepuluh lambang Pramuka", correct: false },
      { text: "Sepuluh aturan umum", correct: false },
    ]
  },
  {
    question: "Siapa pencipta lambang tunas kelapa?",
    answers: [
      { text: "Soekarno", correct: false },
      { text: "Sri Sultan Hamengkubuwono IX", correct: true },
      { text: "Moh. Yamin", correct: false },
      { text: "Ki Hajar Dewantara", correct: false },
    ]
  },
  {
    question: "Apa warna bendera Pramuka?",
    answers: [
      { text: "Merah Putih", correct: false },
      { text: "Cokelat dan Putih", correct: true },
      { text: "Hijau dan Kuning", correct: false },
      { text: "Hitam dan Putih", correct: false },
    ]
  },
  {
    question: "Kapan Hari Pramuka diperingati?",
    answers: [
      { text: "17 Agustus", correct: false },
      { text: "14 Agustus", correct: true },
      { text: "28 Oktober", correct: false },
      { text: "20 Mei", correct: false },
    ]
  },
  {
    question: "Apa arti lambang kelapa yang tumbuh di mana saja?",
    answers: [
      { text: "Pramuka bisa hidup di semua tempat", correct: true },
      { text: "Pramuka suka kelapa", correct: false },
      { text: "Kelapa adalah pohon nasional", correct: false },
      { text: "Tidak ada artinya", correct: false },
    ]
  }
];

// ====== Ambil elemen HTML ======
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressText = document.getElementById("progress");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// ====== Variabel awal ======
let currentQuestionIndex = 0; // posisi soal yang sedang dikerjakan
let score = 0; // skor benar

// ====== Fungsi memulai kuis ======
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Soal Berikutnya ➡️";
  showQuestion(); // tampilkan soal pertama
}

// ====== Fungsi menampilkan soal ======
function showQuestion() {
  resetState(); // hapus tombol lama
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  // tampilkan pertanyaan dan nomor soal
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  progressText.textContent = `Soal ke-${questionNo} dari ${questions.length}`;

  // buat tombol untuk setiap jawaban
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    // tambahkan event saat tombol diklik
    button.addEventListener("click", () => selectAnswer(answer, button));
  });
}

// ====== Fungsi menghapus tampilan lama sebelum soal baru ======
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// ====== Fungsi ketika memilih jawaban ======
function selectAnswer(answer, button) {
  const correct = answer.correct;

  // beri warna hijau kalau benar, merah kalau salah
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  // kunci semua tombol setelah memilih
  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    const ans = questions[currentQuestionIndex].answers.find(a => a.text === btn.innerHTML);
    if (ans.correct) {
      btn.classList.add("correct"); // tampilkan jawaban benar
    }
  });

  // tampilkan tombol "berikutnya"
  nextButton.style.display = "block";
}

// ====== Event tombol berikutnya ======
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  // cek apakah masih ada soal
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult(); // tampilkan hasil akhir
  }
});

// ====== Fungsi menampilkan hasil akhir ======
function showResult() {
  document.querySelector(".quiz-container").classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `Kamu menjawab benar ${score} dari ${questions.length} soal!`;
}

// ====== Event tombol restart kuis ======
restartBtn.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  document.querySelector(".quiz-container").classList.remove("hidden");
  startQuiz();
});

// ====== Jalankan fungsi pertama kali ======
startQuiz();
