var questions = [
	{"text":"Q1"},
	{"text":"Q2"},
	{"text":"Q3"}
]
var currentQuestion = 0;

function init() {
	renderQuestion();
}

function submitAnswer(val) {
	currentQuestion++;
	if(currentQuestion < questions.length) renderQuestion();
	else showQuizResults();
}
function renderQuestion() {
	document.getElementById("curQ").innerHTML = questions[currentQuestion].text;
}
function showQuizResults() {
	document.getElementById("quizResults").innerHTML = "Reults";
}