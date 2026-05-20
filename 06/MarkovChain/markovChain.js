const { listenerCount } = require("cluster");
const fs = require("fs");
const { workerData } = require("worker_threads");

let text = fs.readFileSync("cleaned.txt", "utf8");

text = text
  .replace(/\r/g, "")
  .replace(/\n+/g, " ")
  .replace(/ +/g, " ")
  .trim();


function buildMarkov(text){
  const words = text.split(" "); // --> words[0]= The / words[1]= beautiful / words[2]= Bird / ...
  const index = {}; // --> The: {words, Bird, ...} / House: {is / ...
  const wordsCounter = {};



  for(let i = 0; i < words.length - 1; i++){
    const current = words[i];
    const next = words[i + 1];

    wordsCounter[current] = (wordsCounter[current] || 0) + 1;

    if(!index[current]){
      index[current] = [];
    }

    index[current].push(next);
  }

  const lastWord = words[words.length-1];
  wordsCounter[lastWord] = (wordsCounter[lastWord] || 0) +1;

  // console.log(wordsCounter);
  // console.log(wordsCounter["tame;"]);
  
  // for(const word in wordsCounter){
  //   console.log("Word ",word, "Value ", wordsCounter[word]);
  // }

  return {index, wordsCounter};
}

const markov = buildMarkov(text);

function generateText(index, length = 50){
  const words = Object.keys(index);
  let current = words[Math.floor(Math.random() * words.length)]; // --> Mot de départ
  let result = current;

  for(let i = 0; i < length; i++){
    const nextWords = index[current];

    if(!nextWords || nextWords.length === 0){ // --< Si le prochain existe pas
      current = words[Math.floor(Math.random() * words.length)];
      continue;
    }
    
    const next = nextWords[Math.floor(Math.random() * nextWords.length)];
    result += " " + next;
    current = next;
  }

  return result;
  console.log(result);
}

console.log("\nGenerated Text: ");
console.log(generateText(markov.index, 80));


function buildCloud(){
  for(const word in wordsCounter){
    if(wordsCounter[word] != 0){
      document.getElementById("canvas").innerHTML = `<p>${wordsCounter}</p>`
    }
  }
}