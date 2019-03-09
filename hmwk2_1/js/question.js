function ansToChkBox(userAnswer){
    switch(userAnswer) {
        case "a":
          return chkBox = $('#ca');
        case "b":
          return chkBox = $('#cb');
        case "c":
         return chkBox = $('#cc');
        case "d":
        return chkBox = $('#cd');
        default:
        throw "Not a valid option " + userAnswer;
      }
}

function loadQuestion(qs, questionNumber){
        document.getElementById('questionTitle').innerHTML = (questionNumber + 1) + ". " + qs[questionNumber].question + " ?";
        $('label[for="ca"]').html("A)" + qs[questionNumber].a);
        $('label[for="cb"]').html("B)" + qs[questionNumber].b);
        $('label[for="cc"]').html("C)" + qs[questionNumber].c);
        $('label[for="cd"]').html("D)" + qs[questionNumber].d);
        let userAnswer = qs[questionNumber].usr_answer;
        $('input[name="answer"]:checked').prop('checked', false);
        if (userAnswer.length !=0) {
            console.log('useranswers: ' + userAnswer);
            for(let i =0; i < userAnswer.length; i++){
                console.log('checking: ' + userAnswer[i]);
                let chkBox = ansToChkBox(userAnswer[i]);
                chkBox.prop("checked", true);
            }
        }
            
        
}

function grade(q1, q2, isSure) {
    // CATUTION: LOW QUALITY CODE AHEAD. 
    if (isSure) {
        trueOptPts = 0;
        trueChkPts = 0;
   
       
        totalChkPts = 0;
        totalChkQs = 0;
        totalOptPts = 0;

        for (let i = 0; i < q2.length; i++) {
            totalChkQs += 1;
            let answers =  q2[i].usr_answer;
            let canswers = q2[i].answer;
            totalChkPts += canswers.length; 
        
            for (let j = 0; j < answers.length; j++) {
                if (canswers.includes(answers[j])){
                    trueChkPts ++;
                } 
            }
        }
        for(let i=0; i < q1.length; i++){
            totalOptPts += 1;
            if(q1[i].usr_answer.includes(q1[i].answer)){
                trueOptPts += 1;
            }
        }
        console.log('You have ' + (trueChkPts) + 'pts, out of ' + totalChkPts );
        console.log('You have ' + (trueOptPts) + 'pts, out of ' + totalOptPts );
        console.log(( (trueChkPts+trueOptPts) / (totalChkPts+totalChkQs) ) * 100)
        
        $('#mainContent').html(
        '<div><h2>Total number of questions: '+ (totalChkQs + totalOptPts) +'</br> Percentage:'+ ( (trueChkPts+trueOptPts) / (totalChkPts+totalOptPts) ) * 100 +'% </h2></div>' + 
        '<div id="chartContainer1" style="height: 300px; width: 100%;"></div>' + 
        '<div id="chartContainer2" style="height: 300px; width: 100%; margin-top:25px;"></div>'
        );
        let options1 = {
            title: {
                text: "One choice answer"
            },
            data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString:"#,##0.#"%"",
                    dataPoints: [
                        { label: "True Answers", y: trueOptPts },
                        { label: "False Answers", y: (totalOptPts -  trueOptPts)}
                    ]
            }]
        };
    
        let options2 = {
            title: {
                text: "Multichoice answers"
            },
            data: [{
                    type: "pie",
                    startAngle: 45,
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabel: "{label} ({y})",
                    yValueFormatString:"#,##0.#"%"",
                    dataPoints: [
                        { label: "True Answers", y: trueChkPts },
                        { label: "False Answers", y: (totalChkPts -  trueChkPts) }
                    ]
            }]
        };
        $("#chartContainer1").CanvasJSChart(options1);
        $("#chartContainer2").CanvasJSChart(options2);

    
    }

}

function selectAnswerOption(qs, qn){
    let selected_answers = []
    $('input[name="answer"]:checked').each(function() {
        selected_answers.push($(this).val());
    });
    qs[qn].usr_answer = selected_answers;
    console.log(selected_answers);
}