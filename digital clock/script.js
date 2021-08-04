var hour = document.getElementById("hour")
var minute = document.getElementById("minute")
var second = document.getElementById("second")



var clocck=setInterval(
function showTime(){
    let time=new Date();
    var days=time.getDay();    var hours=time.getHours();
    var minutes=time.getMinutes();
    var seconds=time.getSeconds();

    if(hours<10){
        hours="0"+ hours;
    }
    if(minutes<10){
        minutes="0"+ minutes;
    }
    if(seconds<10){
        seconds="0"+ seconds;
    }


    hour.textContent=hours;
    minute.textContent=minutes;
    second.textContent=seconds ;
},1000
);

