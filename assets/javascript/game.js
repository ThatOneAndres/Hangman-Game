function hangman(words,correctInputs){
	// Makes every name in object array uppercase
	for (var i = 0; i < words.length; i ++){
		words[i].name = words[i].name.toUpperCase();
	}
	this.arrayOfWords = words;
	// List of inputs to be accepted by hangman game
	this.correctInputs = correctInputs;
	// Correct and Wrong Guesses
	this.allGuesses = [];
	// Wrong guesses
	this.shownGuesses = [];
	// Random Index to choose name
	this.nameIndex = Math.floor(Math.random() * this.arrayOfWords.length);
	// Chosen object including name, image path, song
	this.chosenObject = this.arrayOfWords[this.nameIndex];
	// Array of characters of name
	this.chosenName = Array.from(this.chosenObject.name)
	// Correct letters left to get correct
	this.correctLeft = this.chosenName.length;
	// Attempts the player has left
	this.attemptsLeft = this.chosenName.length + 5;
	// Array of name that will be dsiplayed to show progress of player
	this.shownName = Array(this.chosenName.length);
	for (var i = 0; i < this.chosenName.length; i++){
		if (this.chosenName[i] === " "){
			this.correctLeft--;
			this.attemptsLeft--;
			this.shownName[i] =  "&nbsp;";
		}else{
			this.shownName[i] = "_";
		}
	}


	this.findI = function(word){
		for (var i = 0; i < this.chosenName.length; i++){
			if (word === this.chosenName[i]){
				return i;
			}
		}
		return -1;
	}
	this.chooseLetter = function (guess){
		guess = guess.toUpperCase();
		if (this.correctInputs.includes(guess)){
			if (!this.allGuesses.includes(guess)){
				if (this.chosenName.includes(guess)){
					while (this.findI(guess) != -1){
						this.shownName[this.findI(guess)] = guess;
						this.allGuesses.push(guess);
						this.chosenName[this.findI(guess)] = null;
						this.correctLeft--;

					}
				}
				else{
					this.attemptsLeft--;
					this.allGuesses.push(guess);
					this.shownGuesses.push(guess);
				}
			}
		}
	}
	this.stringName = function(){
		var word_text = "";
		for (var i = 0; i < rhangman.shownName.length; i++){
			word_text += rhangman.shownName[i];
			word_text += " ";
		}
		return word_text;
	}
}
function rapper(name, img, songpath, songname){
	this.name = name;
	this.image = img;
	this.songpath = songpath;
	this.songname = songname;
}

	// Rapper objects with name, imagepath, song path and song name
	var em = new rapper("Eminem", "assets/images/Eminem.jpg","assets/audio/Eminem.mp3","The Real Slim Shady");
	var pharrell = new rapper("Pharrell", "assets/images/Pharrell.jpg","assets/audio/Pharrell.mp3", "Happy");
	var drake = new rapper("Drake", "assets/images/Drake.jpg","assets/audio/Drake.mp3", "Started From The Bottom");
	var nas = new rapper("Nas", "assets/images/Nas.jpg","assets/audio/Nas.mp3","Nas Is Like");
	var migos = new rapper("Migos", "assets/images/Migos.jpg","assets/audio/Migos.mp3","Bad and Boujee");
	var future = new rapper("Future", "assets/images/Future.jpg","assets/audio/Future.mp3", "Mask Off");
	var snoop = new rapper("Snoop Dogg", "assets/images/SnoopDogg.jpg","assets/audio/SnoopDogg.mp3","Drop It Like It's Hot")
	var kanye = new rapper("Kanye West","assets/images/Kanye.jpg","assets/audio/KanyeWest.mp3","Can't Tell Me Nothing");
	var kendrick = new rapper("Kendrick Lamar","assets/images/Kendrick.jpg","assets/audio/KendrickLamar.mp3","Humble");
	var jay = new rapper("Jay Z","assets/images/JayZ.jpg","assets/audio/JayZ.mp3","Dirt Off Your Shoulder");
	var joey = new rapper("Joey Bada$$","assets/images/Joey.jpg","assets/audio/JoeyBada$$.mp3","Land of the Free");
	var tech = new rapper("Tech N9ne","assets/images/TechN9ne.jpg","assets/audio/TechN9ne.mp3","Dysfunctional");
	var chainz = new rapper("2 Chainz","assets/images/2Chainz.jpg","assets/audio/2Chainz.mp3","I'm Different");
	var cole = new rapper("J Cole","assets/images/JCole.jpg","assets/audio/JCole.mp3","No Role Modelz");

	
	var rappers = [em, pharrell, drake, nas, migos, future, snoop,kanye,kendrick,jay,joey,tech,chainz,cole];
	var correct_inputs = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","$","-","@","#","!","1","2","3","4","5","6","7","8","9","0"];

	var rhangman = new hangman(rappers,correct_inputs);
	var nrappers;

	var word_text = "";
	var wins = 0;

	var audio;
	
	document.addEventListener("DOMContentLoaded", function(event){
	document.getElementById("line").innerHTML = rhangman.stringName();
	});


	document.onkeyup = function(event){
		var guessed = "";
		var userGuess = event.key;


		rhangman.chooseLetter(userGuess);


		//If player loses
		if (rhangman.attemptsLeft === 0 && rhangman.correctLeft !== 0){
			rhangman.arrayOfWords.splice(rhangman.nameIndex,1);
			nrappers = rhangman.arrayOfWords;
			rhangman = new hangman(nrappers,correct_inputs);
		}

		document.getElementById("line").innerHTML = rhangman.stringName();

		// If player wins, will update HTML, play audio and start new game
		if (rhangman.correctLeft === 0){
			wins++;
			if (typeof audio !== "undefined"){
				audio.pause();
			}
			audio = new Audio(rhangman.chosenObject.songpath);
			audio.play();
			document.getElementById("wins").innerHTML = wins;
			document.getElementById("image").src = rhangman.chosenObject.image;
			document.getElementById("song-name").innerHTML = rhangman.chosenObject.songname + " by " + rhangman.chosenObject.name;
			setTimeout(function(){audio.pause();}, 60000);
			rhangman.arrayOfWords.splice(rhangman.nameIndex,1);
			nrappers = rhangman.arrayOfWords;
			rhangman = new hangman(nrappers,correct_inputs);
			document.getElementById("line").innerHTML = rhangman.stringName();
		}


		document.getElementById("remaining").innerHTML = rhangman.attemptsLeft;

		for (var i = 0; i < rhangman.shownGuesses.length; i++){
			if (i === rhangman.shownGuesses.length-1){
				guessed += rhangman.shownGuesses[i];
			}else{
				guessed += rhangman.shownGuesses[i] + ", ";
			}
		}
		document.getElementById("lettersguessed").innerHTML = guessed;
	}
