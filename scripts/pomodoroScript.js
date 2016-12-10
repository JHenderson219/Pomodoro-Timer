$(document).ready(function() {
var isSessionRunning = false;
var isBreakRunning = false;
var sessionReady = true;
var breakReady = false;
var sessionLength = 25;
//Length of a session; with default ratio (60000) this will represent minutes; ratio 1000 will represent seconds.
var breakLength = 5;
//Length of a break; with default ratio (60000) this will represent minutes; ratio 1000 will represent seconds.
var timeRatio = 60000;
//Multiplier applied to milisecond ratings
var sessionAlertTimeout;
var sessionCountDownInterval;
var breakAlertTimeout;
var breakCountDownTInterval;
var beep = new Audio ("alert.wav");

	function updateSessionScreen(){
		$("#sessionScreen").empty().append("<h3 class = 'text-center'>"+sessionLength+"</h3>")
	}
	function updateBreakScreen(){
		$("#breakScreen").empty().append("<h3 class = 'text-center'>"+breakLength+"</h3>")
	}
	function stopBreakOrSession(){
		if (isSessionRunning){
			console.log("Session was stopped!")
			window.clearInterval(sessionCountDownInterval);
			window.clearTimeout(sessionAlertTimeout);
			isSessionRunning=false;
		} else if (isBreakRunning){
			console.log("Break was stopped!");
			window.clearInterval(breakCountDownInterval);
			window.clearInterval(breakAlertTimeout);
			isBreakRunning=false;
		}
	}
	function reset(){
		stopBreakOrSession();
		sessionLength = 25;
		breakLength = 5;
		isSessionRunning = false;
		isBreakRunning = false;
		breakReady=false;
		sessionReady=true;
		updateSessionScreen();
		updateBreakScreen();
	}


	function sessionOverAlert(duration){
		sessionAlertTimeout=window.setTimeout(function(){
			isSessionRunning=false;
			breakReady=true;
			sessionReady=false;
			console.log ("Session over. Is session running? "+ isSessionRunning);
			console.log ("Session over. Is break running? "+isBreakRunning);
			console.log ("Session over. Is session ready? "+ isSessionRunning);
			console.log ("Session over. Is break ready? "+breakReady);
			beep.play();
			alert("Session Complete! Time for a break of "+breakLength+" minutes. Press the start button below to begin.")
			window.clearInterval(sessionCountDownInterval);
			window.clearTimeout(sessionAlertTimeout);
		},duration);
	}

	function countDownSession(){
		console.log("Session has begun");
		sessionCountDownInterval=window.setInterval(function(){
			sessionLength--;
			updateSessionScreen();
		},timeRatio);
	}

	function breakOverAlert(duration){
		breakAlertTimeout=window.setTimeout(function(){
			isBreakRunning=false;
			console.log ("Break complete, session reset.")
			console.log ("Break over. Is session running? "+ isSessionRunning);
			console.log ("Break over. Is break running? "+isBreakRunning);
			console.log ("Break over. Is session ready? "+ isSessionRunning);
			console.log ("Break over. Is break ready? "+breakReady);
			alert("Your break is complete! Time to get back to work.");
			window.clearInterval(breakCountDownInterval);
			window.clearTimeout(breakAlertTimeout);
			reset();
		},duration);
	}

	function countDownBreak(){
		breakCountDownInterval=window.setInterval(function(){
			breakLength--;
			updateBreakScreen();
		},timeRatio);
	}


	function startButton(){
		console.log ("Start Button clicked. Is session running? "+isSessionRunning);
		console.log ("Start button clicked. Is break running? "+isBreakRunning);
		console.log ("Start button clicked. Is session ready? "+ sessionReady);
		console.log ("Start button clicked. Is break ready? "+breakReady);
		if (!isSessionRunning && !isBreakRunning && sessionReady){
			var sessionTime=sessionLength*timeRatio;
			isSessionRunning=true;
			countDownSession();
			sessionOverAlert(sessionTime);
		} else if(!isSessionRunning && !isBreakRunning && breakReady){
			console.log("Break has started!");
			var breakTime=breakLength*timeRatio;
			countDownBreak();
			breakOverAlert(breakTime);
		} else if(isSessionRunning || isBreakRunning){
			stopBreakOrSession();
		}	
	}

	function sessionMinus(){
		if(sessionLength>1){
		sessionLength--;
		updateSessionScreen();
		} else{
			alert ("Can not decrease session time below 1 minute!");
		}
	}

	function sessionPlus(){
		sessionLength++;
		updateSessionScreen();		
	}

	function breakMinus(){
		if(breakLength>1){
			breakLength--;
			updateBreakScreen()
		} else{
			alert("Can not decrease break length below 1 minute!");
		}
	}

	function breakPlus(){
		breakLength++;
		updateBreakScreen();
	}

	//Click events for buttons
	$("#sessionMinus").click(function(){
		sessionMinus();
	});
	$("#sessionPlus").click(function(){
		sessionPlus();
	});
	$("#breakMinus").click(function(){
		breakMinus();
	});
	$("#breakPlus").click(function(){
		breakPlus();
	});
	$("#resetButton").click(function(){
		console.log ("Timer was reset!");
		reset();
	});
	$("#startButton").click(function(){
		startButton();
	});
	//Tap events for buttons
	$("#sessionMinus").on("tap",function(){
		sessionMinus();
	});
	$("#sessionPlus").on("tap",function(){
		sessionPlus();
	});
	$("#breakMinus").on("tap",function(){
		breakMinus();
	});
	$("#breakPlus").on("tap",function(){
		breakPlus();
	});
	$("#resetButton").on("tap",function(){
		console.log ("Timer was reset!");
		reset();
	});
	$("#startButton").on("tap",function(){
		startButton();
	});
	
});