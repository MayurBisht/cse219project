
const questions=[
    {
        question:"which is the largest animal ?",
        answers: [
            {text:"Shark",correct: false},
            {text:"Blue whale",correct: true},
            {text:"Elephant",correct: false},
            {text:"Giraffe",correct: false},
        ]
    },
    {
        question:"which is the largest continent ?",
        answers: [
            {text:"Asia",correct: true},
            {text:"Europe",correct: false},
            {text:"Africa",correct: false},
            {text:"Australia",correct: false},
        ]
    },
    {
        question:"Who is the goat ?",
        answers: [
            {text:"Ronaldo",correct: true},
            {text:"Messi",correct: false},
            {text:"Lebron",correct: false},
            {text:"Connor",correct: false},
        ]
    },
    {
        question:"What is the best sport ?",
        answers: [
            {text:"Football",correct: false},
            {text:"Tennis",correct: false},
            {text:"Basketball",correct: false},
            {text:"Cricket",correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function ShowScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Back to Home"; // Change button text to "Back to Home"
    nextButton.style.display="block";
    nextButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Redirect to index.html when button is clicked
    });
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        ShowScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();