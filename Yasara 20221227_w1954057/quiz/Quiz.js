const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressTest = document.querySelector('#progressTest');
const scoreTest = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availablequestions = []

let questions = [
    {
        question : 'Which team won the last t20 cricket world cup?',
        choice1: 'Sri lanka',
        choice2: 'India',
        choice3: 'New Zeland',
        choice4: 'Australia',
        answer: '4',
    },

    {
        question : 'Which Country won the first  2022 FIFA World Cup??',
        choice1: 'Brazil',
        choice2: 'Argentina',
        choice3: 'Korea',
        choice4: 'Germany',
        answer: '2',
    },

    {
        question : 'Who hold the 50m freestyle world record?',
        choice1: 'Roland Schoeman ',
        choice2: 'Florent Manaudou ',
        choice3: 'Cesar Cielo',
        choice4: 'Michael Phelps',
        answer: '3',
    },

    {
        question : 'In which country table tennis was first played ?',
        choice1: 'Sri lanka',
        choice2: 'USA',
        choice3: 'England',
        choice4: 'China',
        answer: '3',
    },

    {
        question : 'Who is the greatest football player of all time??',
        choice1: "Pele",
        choice2: 'Cristiano Ronaldo',
        choice3: 'Mbappe',
        choice4: 'Lionel Messi',
        answer: '4',
    },

    {
        question : 'Which team has won the most cricket world cup trophy?',
        choice1: 'Sri Lanka',
        choice2: 'India',
        choice3: 'New Zeland',
        choice4: 'Australia',
        answer: '4',
    },

    {
        question : 'Which team has won the most football world cups?',
        choice1: ' Brazil',
        choice2: ' Argentina',
        choice3: ' France',
        choice4: ' Germany',
        answer: '1',
    },

    {
        question : 'The Olympics are held every how many years?',
        choice1: '5 Years',
        choice2: '7 Years',
        choice3: '1 Years',
        choice4: '4 Years',
        answer: '4',
    },

    {
        question : 'What sport is best known as the ‘king of sports’?',
        choice1: 'Cricket',
        choice2: 'Football',
        choice3: 'Swimming',
        choice4: 'Hockey',
        answer: '2',
    },

    {
        question : "Who is world no 1  tennis player now?",
        choice1: 'C.Alcaraz',
        choice2: 'N.Djokovic',
        choice3: 'S.Tsitsipas',
        choice4: 'Casper Ruud',
        answer: '1',
    },
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 11
let timeValue =  120;

startQuiz = () => {
    questionCounter = 0
    score = 0
    var widthValue=1
    availablequestions = [...questions]
    getNewQuestion()
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
}

getNewQuestion = () => {
    
    if (availablequestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score)
        // alert(getNewQuestion);

        return window.location.assign('endQuizPg.html')
    }

    questionCounter ++
    progressTest.innerText = `Question ${questionCounter} of ${"10"}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}% `

    const questionsindex =Math.floor(Math.random() * availablequestions.length)
    currentQuestion = availablequestions[questionsindex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availablequestions.splice(questionsindex,1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        // alert(classToApply);

        if (classToApply == 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
 
        setTimeout(() => {
	
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        },1000)
    })
})

incrementScore = num =>{
    score += num
    scoreTest.innerText = score
}
startTimer = time => {
    const countDown = setInterval(() => {
        time -= 1
        timeCount.textContent = time
        if (time <= 0 || questionCounter >= MAX_QUESTIONS) {
            clearInterval(countDown)
            localStorage.setItem('mostRecentScore',score)
            return window.location.assign('endQuizPg.html')
        }
    }, 1000)
}

startTimerLine = time => {
    const countDown = setInterval(() => {
        time += 1
        time_line.style.width = time + "px"
        if (time > 549) { //549px is the width of the time_line div
            clearInterval(countDown)
            localStorage.setItem('mostRecentScore',score)
            return window.location.assign('endQuizPg.html')
        }
    }, 1000)
}
function startTimer(time){
    
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
    
}

startQuiz()