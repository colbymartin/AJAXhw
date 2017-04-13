let score = 0;
let currentQuestion = null;

function makeQuestion(question) {

    let category = document.querySelector('.category');
    category.textContent = "Category: " + question.title;

    let ask = document.querySelector('.ask');
    ask.textContent = question.questText;

    let points = document.querySelector('.points');
    points.textContent = "Points: " + question.points;

    let textbox = document.querySelector('.textbox');
    
    let scoreboard = document.querySelector('.score');
    scoreboard.textContent = score;

}

function getQuestion () {
   let pull = new XMLHttpRequest();
   pull.open('GET', 'http://jservice.io/api/random');
   pull.addEventListener('load', function () {
       let response = JSON.parse(pull.responseText);
       let question = {
           title: response[0].category.title,
           questText: response[0].question,
           points: response[0].value,
           answer: response[0].answer,
       };

       currentQuestion = question;
       console.log(question.answer);
    makeQuestion(question);
   });
   pull.send();
}

window.addEventListener('load', function () {
    getQuestion();
    let btn = document.querySelector('.button');
    btn.addEventListener('click', function () {
        getQuestion();
    });

    btn.addEventListener('click', function () {
        let textbox = document.querySelector('.textbox'); 
        if (textbox.value === currentQuestion.answer) {
            score = score + currentQuestion.points;

        }
        textbox.value = "";
        // if (textbox.value !== question.answer) {
        //     textbox.value = "";
        // }  
    })

});

