function welcome() {
	/*
	speakParagraph("Welcome to Voice Wikipedia. \
		Use your voice to tell which Wikipedia entry to search for.\
		No need to use your eyes, the entry's content will be reading to you!.\
		Let's try it. Say. Show me.")
*/
	speakParagraph("Welcome to Voice Wikipedia.")
}

function recentList() {
	speakParagraph("There are new 10 recent wikipedia articles.\
		");
	window.location = "/list";
}

function help() {
	speakParagraph("Welcome to Voice Wikipedia. \
		You can using voice commands to control this application.\
		If you want to search for a wikipedia entry. Say. Show me.\
		If you want to hear recent wikpedia. Say. List.")
}

var globalTerm = "";

function search(term) {
    para = "You want to search for " + term + ".";
    globalTerm = term;
    writelog(para);
    speakParagraph(para);
    $.getJSON("/api/search?q=" + term, function(data) {
	if (data != null && data.length > 0) {
	    speakParagraph("Found an article. Do you want to hear this?.");
	    globalTerm = data[0].id
	} else {
	    speakParagraph("Article not found.")
	}
    })
}

function yes() {
	if (globalTerm != "") {
	    speakParagraph("You said yes.");
	    window.location = "/article/" + globalTerm
	}	
}

function no() {
	// speakParagraph("You said no.");
	globalTerm = "";
}

function writelog(str) {
	console.log(str);
	node = document.getElementById("log");
	node.innerHTML = str;
	// $(".log").text(str);
}

function initAnnyang() {
	console.log("INIT");
	console.log(annyang);
	if (annyang) {
	
	  // Let's define our first command. First the text we expect, and then the function it should call
	  var commands = {
	  	'show me *entry': search,
	  	'list': recentList,
	  	'help': help,
	  	'help me': help,
	  	'yes': yes,
	  	'no': no,
	  };
	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening. You can call this here, or attach this call to an event, button, etc.
	  annyang.start();
	}
}

function initGestures() {
	var gestures = new Array();
	// gestures["L"] = "46";
	gestures["L"] = "64";
	gestures["S"] = "432101234";
	gestures["?"] = "6701232";
	gestures["R"] = "267012341";
	gestures["Z"] = "030";
	gestures["Y"] = "21076234567";
	gestures["N"] = "616";
	gestures["P"] = "670123456";

	$('body').gestures(gestures, function (data) {
		// document.getElementById('outputbox').innerHTML += data;
		// document.getElementById('outputbox').innerHTML = data;
		if (data !== "") {
			// writelog(data);
			// speakEnglish(data);	
			switch(data) {
			    case "S":
			    search("Taylor Swift");
			        break;
			    case "R":
			        recentList();
			        break;
			    case "?": 
			    	help();
			    	break;
			   	case "P": 
			    	pauseSpeak();
			    	break;
			    case "Y": 
			    	yes();
			    	break;
			    case "N": 
			    	no();
			    	break;
			    default:			        
			}
		}		
	});
}

function initPad() {
	// setup a new canvas for drawing wait for device init
   //  setTimeout(function(){
	   // newCanvas();
	   $(".main").pad("#fff");
    // }, 1000);	
}

function init() {
	initAnnyang();
	initGestures();
	initPad();
}


welcome();
init();