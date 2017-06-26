function hangman(words){
	for (var i = 0; i < words.length; i ++){
		words[i] = words[i].toLowerCase();
	}
	this.arrayOfWords = words;
	this.allGuesses = [];
	this.shownGuesses = [];
	this.wins = 0;
	this.nameIndex = Math.floor(Math.random() * this.arrayOfWords.length);
	this.chosenName = Array.from(this.arrayOfWords[this.nameIndex]);
	this.shownName = Array(this.chosenName.length);
	for (var i = 0; i < this.chosenName.length; i++){
		if (this.chosenName[i] === " "){
			this.shownName[i] =  " ";
		}else{
			this.shownName[i] = "_";
		}
	}
	console.log(this.chosenName);
	this.attemptsLeft = this.chosenName.length + 5;
	this.findI = function(word){
		for (var i = 0; i < this.chosenName.length; i++){
			if (word === this.chosenName[i]){
				return i;
			}
		}
		return -1;
	}
	this.chooseLetter = function (guess){
		if (!this.allGuesses.includes(guess)){
			if (this.chosenName.includes(guess)){
				while (this.findI(guess) != -1){
					console.log("guessindex: " + this.findI(guess));
					this.shownName[this.findI(guess)] = guess;
					console.log(this.shownName);
					console.log(this.chosenName);
					this.allGuesses.push(guess);
					this.chosenName.splice(this.findI(guess),1);
					// console.log(this.chosenName);
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
	var rappers = ["Eminem", "Pharrel", "Drake", "Nas", "Migos", "Future"];
	var rhangman = new hangman(rappers);
	var nrappers;
	var word_text = "";
	for (var i = 0; i < rhangman.shownName.length; i++){
			word_text += rhangman.shownName[i];
			word_text += " ";
	}
	document.onload = function(){
		console.log(word_text);
		document.getElementById("line").innerHTML = word_text;
	}




	document.onkeyup = function(event){
		var guessed = "";
		var userGuess = event.key;
		userGuess = userGuess.toLowerCase();
		if (rhangman.attemptsLeft === 0 && rhangman.chosenName.length !== 0){
			// insert message saying game is over.
		return;
		}
		rhangman.chooseLetter(userGuess);
		word_text = "";
		for (var i = 0; i < rhangman.shownName.length; i++){
			word_text += rhangman.shownName[i];
			word_text += " ";
		}
		document.getElementById("line").innerHTML = word_text;
		for (var i = 0; i < rhangman.chosenName.length; i++){
			if (rhangman.chosenName[i] === " "){
				word_text += " ";
			}else{
				word_text += "_"
		}
	}
		if (rhangman.chosenName.length === 0){
			//insert image, play audio
			rhangman.wins++;
			document.getElementById("wins").innerHTML = rhangman.wins;
			rhangman.arrayOfWords.splice(this.nameIndex,1);
			nrappers = rhangman.arrayOfWords;
			rhangman = new hangman(nrappers);
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
