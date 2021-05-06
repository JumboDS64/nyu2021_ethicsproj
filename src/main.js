const questions = [
    {
        question: "Question 1",
        answers: {
            a: "Answer Choice 1",
            b: "Answer Choice 2",
            c: "Answer Choice 3",
        },
        updates: {
            a: [1,0,0],
            b: [0,1,0],
            c: [0,0,1]
        }
    },
    {
        question: "Question 2",
        answers: {
            a: "Answer Choice 1",
            b: "Answer Choice 2",
            c: "Answer Choice 3",
        },
        updates: {
            a: [1,0,0],
            b: [0,1,0],
            c: [0,0,1]
        }
    },
]

var current_question = 0;
var category1 = 0; //virtues
var category2 = 0; //deonto
var category3 = 0; //consequential

function killChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

function displayQuestion() {
    var quizBox = document.getElementById('quizBox');
    killChildren(quizBox);

    if (current_question < questions.length) {
        var question = document.createElement("p");
        question.innerText = questions[current_question].question;
        question.setAttribute("class", "");

        quizBox.appendChild(question);

        for (const [key,val] of Object.entries(questions[current_question].answers)) {
            var label = document.createElement("label");
            var option = document.createElement("input");
            option.setAttribute("type", "radio");
            option.setAttribute("name", "answer");
            option.setAttribute("class", "form-check-input");
            option.setAttribute("value", key);
            label.textContent = val;

            label.insertBefore(option, label.firstChild);

            quizBox.appendChild(label);
            quizBox.append(document.createElement("br"));
        }

    }
}

function updateScores() {
    var updates = questions[current_question-1].updates;

    var choices = document.getElementById("quizBox");
    var selected_choice;

    for (let child of choices.children) {
        if (child.nodeName == "LABEL") {
            if (child.firstChild.checked) {
                selected_choice = child.firstChild;
                break;
            }
        }
    }
    var selected_key = selected_choice.value;
    var updates = questions[current_question-1].updates[selected_key];

    category1 += updates[0];
    category2 += updates[1];
    category3 += updates[2];
}

function getScore() {
    var result = document.getElementById("result");

    result.textContent = "hi " + category1 + " " + category2 + " " + category3;
}

function doNext() {
    if (current_question == 0) {
        var btn = document.getElementById("btn");
        btn.textContent = "Next";

        displayQuestion();
    }
    else if (current_question < questions.length - 1) {
        updateScores();
        displayQuestion();
    }
    else if (current_question == questions.length - 1) {
        var btn = document.getElementById("btn");
        btn.textContent = "Submit";

        updateScores();
        displayQuestion();
    }
    else {
        updateScores();
        getScore();
    }

    current_question++;
}
