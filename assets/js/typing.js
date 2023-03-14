// Code provided by elena

let sentences = ["Passionné d'informatique", "Étudiant dans le développement Web"];
let currentSentence = 0;
let currentSentenceChar = 0;
let intervalValue;
let textElement = document.querySelector("#text");
let myCursor = document.querySelector("#cursor");

function TypingEffect()
{
  let text = sentences[currentSentence].substring(0, currentSentenceChar +1);
  textElement.innerHTML = text;
  currentSentenceChar++;
  
  if(text === sentences[currentSentence])
  {
    clearInterval(intervalValue);
    setTimeout(function()
    {
      intervalValue = setInterval(DeletingEffect, 60);
    }, 130);
  }
}

function DeletingEffect()
{
  let text = sentences[currentSentence].substring(0, currentSentenceChar -1);
  textElement.innerHNTML = text;
  currentSentenceChar--;
  
  if(text === '')
  {
    clearInterval(intervalValue);
    if(currentSentence === (sentences.length-1))
       currentSentence = 0;
    else
      currentSentence++;
    
    currentSentenceChar = 0;
    
    setTimeout(function()
    {
      myCursor.style.display = 'inline-block';
      intervalValue = setInterval(TypingEffect,50);
    }, 100);
    
  }
}

intervalValue = setInterval(TypingEffect, 100);