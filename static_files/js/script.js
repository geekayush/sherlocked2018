//function one(element, eventType, callback, self) {
//    var one = function (event) {
//        try {
//            callback.call(self, event);
//        } finally {
//            element.removeEventListener(eventType, one);
//        }
//    }
//    element.addEventListener(eventType, one);
//}

sessionStorage.setItem('skipped', false);

function toggleNav() {
    document.getElementById('navbar').classList.toggle('enlarge');
    document.getElementById('sher').classList.toggle('hidden');
    document.getElementById('answer').classList.toggle('hidden');
    document.getElementById('solve').classList.toggle('hidden');
}

//document.getElementById('description_container').one('click', function (e) {
//    e.classList.remove('hidden');
//})

//function open_des(e) {
//    var x = document.getElementById('description_container');
//    x.classList.remove('hidden');
//    x.classList.add('fadeInDownBig');
//    x.classList.remove('fadeOutDownBig');
//}
var wrongmessages = ["Your key didn't open the door!", "Be like Bill and just do it!", "Server says... it's wrong.", "Use the force! Luke. ", "Boom!.. But incorrect :P", "Our Alien couldn't digest your answer.", "Remember.. Google is there for help.", "Sorry dude...", "Keep trying. You can do it!!", "Just don't bang your head on wall :P", "C'mon let's give it another shot", "String didn't match.", "Whoops! couldn't launch the next question.", "Sherlock ignored your answer", "Still waiting to say hurray!!", "Mayday! Mayday! Unknown response!!", "Are you still knocking at the door? ", "Ahoy!! but you still missed it."];
$('#solve').click(function(e){
    e.preventDefault();
    var answer = document.getElementById('answer').value;
    var csrf = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    $.ajax({
      type: "POST",
      url: '/check_answer',
      data: {
            answer: answer
        },
    headers: {
        'X-CSRFToken': csrf
    },
      success: function(response){
            var check = response.answer;
            if(check=='false'){
                var x = document.getElementById('wrong_message');
                x.innerHTML=wrongmessages[Math.floor((Math.random() * 17) + 0)];
                setTimeout(function(){
                    x.innerHTML="";
                },2000);
            }
            else if(check=='true'){
                window.open('/mystery','_self');
            }
        },
        error: function() {
            console.log('error');
        },
      dataType: 'json'
    });
});
