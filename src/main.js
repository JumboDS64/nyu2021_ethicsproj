const questions = [
    {
        question: "A vigilante kills someone they believe is a criminal, but they accidentally killed an innocent person.",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,0,0], b: [0,1,1] }
    }, {
        question: "good intent, bad abidance, bad outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,0,0], b: [0,1,1] }
    }, {
        question: "good intent, bad abidance, bad outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,0,0], b: [0,1,1] }
    }, {
        question: "A store owner lowers the wages of its employees so that they themselves can earn more cash.",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,1,0], b: [1,0,1] }
    }, {
        question: "bad intent, good abidance, bad outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,1,0], b: [1,0,1] }
    }, {
        question: "bad intent, good abidance, bad outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,1,0], b: [1,0,1] }
    }, {
        question: "Someone misses an important appointment, causing an important project to not be finished on time.",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,1,0], b: [0,0,1] }
    }, {
        question: "good intent, good abidance, bad outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,1,0], b: [0,0,1] }
    }, {
        question: "good intent, good abidance, bad outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,1,0], b: [0,0,1] }
    }, {
        question: "A psychopath kills someone they believe is someone they've hated for a long time, but they accidentally instead killed a wanted serial killer right before said serial killer could kill a family of four.",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,0,1], b: [1,1,0] }
    }, {
        question: "bad intent, bad abidance, good outcom",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,0,1], b: [1,1,0] }
    }, {
        question: "bad intent, bad abidance, good outcom",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,0,1], b: [1,1,0] }
    }, {
        question: "A poor person steals food to eat.",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,0,1], b: [0,1,0] }
    }, {
        question: "Someone steals resources (money, food, ect.) from the rich and gives those resources to the poor.",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,0,1], b: [0,1,0] }
    }, {
        question: "good intent, bad abidance, good outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [1,0,1], b: [0,1,0] }
    }, {
        question: "bad intent, good abidance, good outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,1,1], b: [1,0,0] }
    }, {
        question: "bad intent, good abidance, good outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,1,1], b: [1,0,0] }
    }, {
        question: "bad intent, good abidance, good outcome",
        answers: { a: "Ethical", b: "Unethical" },
        updates: { a: [0,1,1], b: [1,0,0] }
    }
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
    // export {category1};
    var result = document.getElementById("result");
    var defi = document.getElementById("definition");
    // var virRes = category1;
    // var deoRes = category2;
    // var conRes = category3;
    // console.log(virRes);
    var dif1 = ((category1 - category2) * -1);
    var dif2 = ((category1 - category3) * -1);
    var dif3 = ((category2 - category3) * -1);
    var difAll = ((category1 - category2) * -1);

    if((category1 > category2) && (category1 > category3)){
        result.textContent = "Virtue";
        defi.textContent = "You think mainly in terms of good and bad, you focus heavily on the intent and moral character of a person";
    }
    else if((category2 > category1) && (category2 > category3)){
        result.textContent = "Deontological";
        defi.textContent = "You tend decide whether something is right or wrong under a set of rules or laws, rather than on the consquences of action";

    }
    else if((category3 > category1) && (category3 > category2)){
        result.textContent = "Consequentialism";
        defi.textContent = "The consequences of one's conduct are the ultimate basis for your judgment about the rightness or wrongness of an action";

    }

    else if( ((-2 <= dif1 <= 2)) && (category1 > category3)){
        result.textContent = "Virtue/Deontological";
        defi.textContent = "A mix of both, you focus heavily on the intent and moral character of a person as well as on a set of rules/laws when dictating right or wrong";

    }
    else if( ((-2 <= dif2 <= 2))  && (category1 > category2)){
        result.textContent = "Virtue/Consequentialism";
        defi.textContent = "A mix of both, you focus heavily on the intent and moral character of a person as well as on the consequences of an action when dictating right or wrong";

    }

    else if( ((-2 <= dif3 <= 2))  && (category2 > category1)){
        result.textContent = "Deontological/Consequentialism";
        defi.textContent = "A mix of both, you decide what is right or wrong based on a set of rules/law and on the consequence of an action.";

    }

    else{
        result.textContent = "Virtue/Deontological/Consequientialism";
        defi.textContent = "You have a balanced stance, a good mix of all three...";
    }




    //result.textContent = "hi " + category1 + " " + category2 + " " + category3;
    document.getElementById('results').style.display='block';


    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Ethical Report"
        },
        axisY: {
            title: "Score",
        },
        data: [{
            type: "column",
            showInLegend: true,
            legendMarkerColor: "grey",
            legendText: "Ethical Stances",
            dataPoints: [
                { y : category1, label: "Virtue" },
                { y : category2, label: "Deontological" },
                { y : category3, label: "Consequentialism" },
            ]
        }]
    });

    chart.render();
}

function doNext() {
    if (current_question == 0) {
        var btn = document.getElementById("btn");
        btn.textContent = "Next";

        document.getElementById("startTxt").textContent = "Please respond honestly to the best of your ability, and you will be given a categorization of your ethical values.";

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