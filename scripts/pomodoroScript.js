$(document).ready(function() {
var sessionLength = 25;
var breakLength = 5;
	function updateSessionScreen(){
		$("#sessionScreen").empty().append("<h3 class = 'text-center'>"+sessionLength+"</h3>")
	}
	function updateBreakScreen(){
		$("#breakScreen").empty().append("<h3 class = 'text-center'>"+sessionLength+"</h3>")
	}
	function reset(){
		sessionLength = 25;
		breakLength = 5;
		updateSessionScreen();
		updateBreakScreen();
	}
	$("#sessionMinus").click(function(){
		sessionLength--;
		updateSessionScreen()
	});
	$("#sessionPlus").click(function(){
		sessionLength++;
		updateSessionScreen();
	});
	$("#resetButton").click(function(){
		reset();
	});
	
});