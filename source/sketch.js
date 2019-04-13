let canWidth = window.innerWidth * 0.98; //Width of canvas
let canHeight = window.innerHeight * 0.97; //Height of canvas
let margin;

let landScapeMode,dropdownSize,buttonSize,keyHeight,dropdownOffset,dropdownLeft,guitarHeightOffset,buttonHeightOffset,ButtonDistQuotiant,stringWidth,keyWidth,counter,playableScale,togglePosition,modeTextOffset;
let toggleWait,auditionWait;
let timer;

if (canWidth>canHeight){landScapeMode=true} //Check if landscape
else{landScapeMode=false};  //Or Portrait
if (landScapeMode){margin = canWidth*0.05}else{margin=0}//Set side margins

let keyLeftOffSet = canWidth * 0.02 + margin;
let keyHeightOffSet = canHeight * 0.03;
let fretSize = (canWidth-(margin*2))*0.078;
let guitarLeftOffset = keyLeftOffSet + fretSize*0.25;

let searchMode = "scales";
let isPlaying = false;
let currentNote = null;

if(landScapeMode){
  //buttonSize = canWidth * 0.065;
  buttonSize = (canWidth - margin*2) * 0.06;
  buttonDistance = (canWidth-margin*2-buttonSize*0.5)/12;
  buttonLeftOffset = keyLeftOffSet + buttonSize*0.5;
  keyHeight = canHeight * 0.2;
  keyWidth = keyHeight * 0.4;
  dropdownOffset = canHeight*0.53;
  modeTextOffset = canHeight*0.62;
  dropdownLeft = keyLeftOffSet;
  dropdownSize = [canWidth*0.35, canHeight*0.06]
  guitarHeightOffset = canHeight*0.68;
  buttonHeightOffset = canHeight*0.38;
  stringWidth = canHeight * 0.05;
  //keyWidth = canWidth * 0.05;
  togglePosition = [dropdownLeft+dropdownSize[0]+canWidth*0.01,dropdownOffset];
  playButtonPosition = [dropdownLeft+dropdownSize[0]+canWidth*0.2,togglePosition[1]]
}else{//Portrait Mode
  dropdownSize = [canWidth*0.6, canHeight*0.05]
  buttonSize = canWidth * 0.13;
  buttonLeftOffset = keyLeftOffSet*4.5;
  keyHeight = canHeight * 0.15;
  dropdownOffset = canHeight*0.66;
  modeTextOffset = canHeight*0.74;
  dropdownLeft = keyLeftOffSet * 2;
  togglePosition = [dropdownLeft+dropdownSize[0]+canWidth*0.04,dropdownOffset];
  playButtonPosition = [togglePosition[0],dropdownOffset+canHeight*0.08]
  guitarHeightOffset = canHeight*0.82
  buttonHeightOffset = canHeight*0.32;
  buttonDistance = canWidth*0.16;
  stringWidth = canHeight * 0.03;
  keyWidth = canWidth * 0.064;
}

let blackKeyOffset = keyWidth/6;
let playNoteDotSize = keyWidth/3.5
let blackKeys = [1,3,6,8,10];


//COLORS
let textColor = "#414535";
//let rootColor = [170,149,20];
let rootColor = [255,255,0];
let whiteLitColor = "#C19875";
//let backgroundColor = [39,36,34]; TOO DARK
//let backgroundColor = [82,62,66];
let backgroundColor = "#F2E3BC";
let litBlackKeyColor = whiteLitColor;
let blackKeyColor = "#414535";
let listFontSize = canHeight*0.04;
//let strokeColor = [88,80,67];
let strokeColor = [0,0,0];
//let buttonColor = [86,69,41];
//let buttonColor = [37,32,33];
//let buttonColor = [88,74,67];
let buttonColor = "#618985";
let blank = [255,255,255,0];
//let playKeyColor = [81,39,46];
let playKeyColor = 160;
let playingNoteColor = [255,0,0];
let rootOffset = keyHeightOffSet+keyHeight*1.5;


let currentRoot = 0; //Start with C
let currentScale = major.slice(0); //Start with major scale.
let currentScaleName = "Major";

/*
The specific enharmonic decision on each note when generating a scale (flat or sharp) is decided by first setting the preference for each major key and then using an enharmonic index for each scale.
0 = no preference, 1 = sharp, 2 = flat.
*/
let enharmPref = 0; //Sets enharmonic preference for the major key of a given root.
let enharmIndex = [0,0,0,0,0,0,0]; //Sets enharmonic preference for each note of a given scale.
let intervals = [1,2,3,4,5,6,7];
let currentDiatonicNote = 0;




//Constructor for note objects.
class note{
  constructor(name, num, addOffset, enharm){
    this.name = name;
    this.yStart = buttonHeightOffset + addOffset;

    if(landScapeMode){
      this.xStart = buttonLeftOffset + (num%12)*buttonDistance;
    }else{
      if(num%12<6){
        this.xStart = buttonLeftOffset + (num%12)*buttonDistance;
      }
      else{
        this.xStart = buttonLeftOffset + (num%12 - 6)*buttonDistance;
        this.yStart += canHeight*0.22
      }
    }

    this.enharmPref = enharm;
  }
}


function preload(){
  playSounds = [];
  //Load up piano keys.
  for (i=0;i<24;i++){
    playSounds[i] = loadSound("pianoNotes/"+i+".mp3")
    playSounds[i].setVolume(0.3)
  }
}

function setup(){
  //setupInfo();
  createCanvas(canWidth,canHeight);
  noLoop()
  textAlign(CENTER);
  
  
  var addOffset;
  var enharm;
  roots = []
  
  //fill "roots" with note objects.
  //e.g. root[0] is C.
  for(i=0;i<24;i++){
    if ([0,2,4,5,7,9,11].includes(i%12)){
      noteName = setClass[i%12][0];
      addOffset = 0;
    }else if(i<12){
      noteName = setClass[i][0];
      addOffset = buttonSize * -0.45;
    }else if(i>12){
      noteName = setClass[i%12][1];
      addOffset = buttonSize * 0.45;
    }

    //Set enharmonic preference for each note.
    if (i<12){
      if(i==5){enharm = 2}
      else if(i==0){enharm = 0}
      else{enharm = 1};
    }else{enharm = 2};
    
    roots[i] = new note(noteName,i,addOffset, enharm)
  }

  toggle = createButton("SCALES");
  toggle.position(togglePosition[0],togglePosition[1])
  toggle.size(dropdownSize[0]/2,dropdownSize[1])
  toggle.style('background-color', whiteLitColor)
  toggle.style('font-size', JSON.stringify(listFontSize*0.8)+'px');
  toggle.mousePressed(toggleModes);
  makeDropdown();
  toggleWait = false;

  playButton = createButton("PLAY!");
  playButton.position(playButtonPosition[0],playButtonPosition[1])
  playButton.size(dropdownSize[0]/2,dropdownSize[1])
  playButton.style('background-color', whiteLitColor)
  playButton.style('font-size', JSON.stringify(listFontSize*0.8)+'px');
  playButton.mousePressed(audition);
  auditionWait = false;


  

  //setInterval(bang,300);
}

function toggleModes(){
  if(toggleWait == false){
    toggleWait = true;
    if (searchMode == "scales"){
      searchMode = "chords";
      toggle.html("CHORDS")
    }else{searchMode = "scales";toggle.html("SCALES");}

    mode.remove();
    makeDropdown();
    console.log("search mode is now", searchMode)
    makeMode();
    setTimeout(function(){toggleWait=false;}, 200)
  }
  draw()
}

let bangCount = 0;
function bang(){
  if (isPlaying && bangCount <= playableScale.length+1){
    if(bangCount < playableScale.length){
      var noteIndex = playableScale[bangCount]
      playSounds[noteIndex].play();
    }
    bangCount += 1;
    currentNote = playableScale[bangCount-1];
  }
  else{
      isPlaying = false;
      currentNote = null;
      clearInterval(timer);
    }
  draw();
}

function audition(){
  if(isPlaying == false){//If not already playing a scale.
      bangCount = 0;
      playableScale = currentScale.slice(0);
      playableScale.push(playableScale[0])
      for (i=1;i<playableScale.length;i++){
        if (playableScale[i] < playableScale[i-1]){
          playableScale[i] += 12
        }
      }
      if(searchMode == "scales"){ //Scale Mode
        timer = setInterval(bang,300);
        isPlaying = true;
      }else{ //Chord Mode
        if (auditionWait == false){
          auditionWait = true;
          for(chordTone=0;chordTone<playableScale.length;chordTone++){
            playSounds[playableScale[chordTone]].play()
          }

          setTimeout(function(){auditionWait=false;}, 400);
        }
          
      }
  }
}

function bangNote(){
  if (bangCount < playableScale.length){
    playSounds[playableScale[bangCount]].play();
    bangCount = bangCount + 1;
    setTimeout(()=>{bangNote()},200);
  }
}



//Promises, async functions

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/*
async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two seconds later');
}
*/








function makeDropdown(){

  mode = createSelect(); //Scale Menu
  mode.position(dropdownLeft, dropdownOffset);
  mode.size(dropdownSize[0],dropdownSize[1])
  mode.style('font-size', JSON.stringify(listFontSize)+'px');
  mode.style('color', "252021");
  mode.style('background-color', whiteLitColor);
  
  if (searchMode == "scales"){fillScales()}
  else{fillChords()}

  mode.changed(function(){makeMode();draw()});
}


function fillScales(){
  mode.option("Major");
  mode.option("Natural Minor");
  mode.option("Harmonic Minor");
  mode.option("Melodic Minor")
  mode.option("Dorian");
  mode.option("Phrygian");
  mode.option("Lydian");
  mode.option("Mixolydian");
  mode.option("Locrian");
  mode.option("Whole Tone");
  mode.option("Major Pentatonic");
  mode.option("Minor Pentatonic");
  mode.option("Maj Blues Pentatonic");
  mode.option("Min Blues Pentatonic");
  mode.option("Diminished (Whole-Half)");
  mode.option("Diminished (Half-Whole)");
  mode.option("Bebop Dominant");
  mode.option("Bebop Major");
  mode.option("Hungarian Minor");
  mode.option("Phrygian Dominant");
  mode.option("Lydian Dominant");
  mode.option("Yo");
  mode.option("In Sen");
}

function fillChords(){
  mode.option("Major ");
  mode.option("Minor ");
  mode.option("Augmented");
  mode.option("Diminished");
  mode.option("7th");
  mode.option("minor7th");
  mode.option("minor7th♭5");
  mode.option("dim7th");
  mode.option("maj7");
  mode.option("minor/major7th");
  mode.option("9th");
  mode.option("minor9th");
  mode.option("minor7th♭9");
  mode.option("maj9");
  mode.option("add9");
  mode.option("minor add9");
  mode.option("7th♯9");
  mode.option("min7♭5♭9");
  mode.option("sus2");
  mode.option("sus4");
  mode.option("POWER CHORD");
  mode.option("6th");
  mode.option("min6th");
  mode.option("6/9");
  mode.option("11th");
  mode.option("♯11th");
  mode.option("min♯11th");
  mode.option("13th");
  mode.option("min13th");
  mode.option("maj13th");
  mode.option("aug7th");
  mode.option("Petrushka");
  mode.option("Farben");

}


function draw(){
  background(backgroundColor)
  stroke(strokeColor)

  //WHITE KEYS
  for (i=0; i < 15;i++){
    var startX = keyLeftOffSet+(keyWidth*i)
    var startY = keyHeightOffSet;
    var scaleIndex;

    switch (i){
        case 0: scaleIndex = 0; break;
        case 1: scaleIndex = 2; break;
        case 2: scaleIndex = 4; break;
        case 3: scaleIndex = 5; break;
        case 4: scaleIndex = 7; break;
        case 5: scaleIndex = 9; break;
        case 6: scaleIndex = 11; break;
        case 7: scaleIndex = 12; break;
        case 8: scaleIndex = 14; break;
        case 9: scaleIndex = 16; break;
        case 10: scaleIndex = 17; break;
        case 11: scaleIndex = 19; break;
        case 12: scaleIndex = 21; break;
        case 13: scaleIndex = 23; break;
        case 14: scaleIndex = 24; break;


      }
      fill(whiteLitColor);

      
      
      if (scaleIndex%12 === currentRoot%12){ //If root note.
        fill(rootColor); //Root color.
      }
      if(currentNote != null){
        if(scaleIndex === currentNote){
          fill(playingNoteColor);
        }
        
      }
      
    rect(startX, startY, keyWidth,keyHeight); //Draw key.
    if (currentScale.includes(scaleIndex%12)){
        fill(playKeyColor)
        ellipse(startX+(keyWidth*0.5), startY+keyHeight*0.8, playNoteDotSize)
      }
  }

  //BLACK KEYS
  for (i=0; i < 14;i++){
    if((i % 7) != 2 && (i % 7) != 6){ //Only include the correct black notes.
      var scaleIndex;
      var startX = keyLeftOffSet+blackKeyOffset+(keyWidth*0.5)+(keyWidth*i)
      var startY = keyHeightOffSet;

      //Set "scale index" to correct pitch class for a given black key.
      switch (i){
        case 0: scaleIndex = 1; break;
        case 1: scaleIndex = 3; break;
        case 3: scaleIndex = 6; break;
        case 4: scaleIndex = 8; break;
        case 5: scaleIndex = 10; break;
        case 7: scaleIndex = 13; break;
        case 8: scaleIndex = 15; break;
        case 10: scaleIndex = 18; break;
        case 11: scaleIndex = 20; break;
        case 12: scaleIndex = 22; break;
      }

      fill(blackKeyColor)//Black color.
      
      
      if (scaleIndex%12 === currentRoot%12){ //If root note.
        fill(rootColor); //Root color.
      }
      if(currentNote != null){
        if(scaleIndex === currentNote){
          fill(playingNoteColor);
        }
      }
      
      rect(startX, startY, keyWidth-(blackKeyOffset*2),keyHeight*2/3); //Draw key.
      if (currentScale.includes(scaleIndex%12)){
        fill(playKeyColor)
        ellipse(startX-blackKeyOffset+(keyWidth*0.5), startY+keyHeight*0.5, playNoteDotSize)//
      }
      
    }
  }

  //BUTTONS
  textSize(buttonSize*0.35);
  textAlign(CENTER, CENTER);
  for(i=0;i<24;i++){
    //Remove noise notes.
    if([12,14,16,17,19,21,23].includes(i) == false){
      if(i === currentRoot){//If root.
        fill(rootColor);//Make yellow.
      }else{fill(buttonColor)};
      ellipse(roots[i].xStart,roots[i].yStart,buttonSize, buttonSize*0.75)
      fill(textColor)
      if(blackKeys.includes(i%12)){
        text(roots[i].name,roots[i].xStart+buttonSize*0.04,roots[i].yStart)
      }else{
        text(roots[i].name,roots[i].xStart,roots[i].yStart)
      }
    }
  }

  //Building the notes of the scale display.
  textAlign(LEFT);
  textFont('Georgia');
  var modeText = "";
  for(i=0;i<currentScale.length;i++){
    modeText += intervalConvert(intervals[i],enharmIndex[i]);
    modeText += " "
  }


  if (landScapeMode || modeText.length<18){
    text(modeText, dropdownLeft-(canWidth*0.01),modeTextOffset)
  }else{
    var slicePos;
    if(modeText[17] === " "){slicePos = 18}
    else if(modeText[18] === " "){slicePos = 19}
    else if(modeText[19] === " "){slicePos = 20}
    else{slicePos = 20}
    text(modeText.slice(0,slicePos), dropdownLeft-(canWidth*0.01),modeTextOffset);
    text(modeText.slice(slicePos), dropdownLeft-(canWidth*0.01),modeTextOffset + canHeight*0.04);
  }
  
  


  

  //BUILD GUITAR 
  noFill()
  for (var fret = 0; fret<13; fret++){
    //var fretSize = 
    //Draw frets down the guitar.
    for(i=0;i<6;i++){
      if(i !== 5){
        rect(guitarLeftOffset,
            guitarHeightOffset+stringWidth*i,
            fretSize * fret,
            stringWidth)
      }
    }
  }

  //Draw spacing dots on the guitar.
  stroke(0,0,0,0);
  var spacingDots = [2.5,4.5,6.5,8.5];
  for(i=0;i<spacingDots.length;i++){
      fill(0,0,0,100);
      ellipse(guitarLeftOffset + fretSize*spacingDots[i],guitarHeightOffset + stringWidth*2.5,fretSize/4,fretSize/4);
  }
  ellipse(guitarLeftOffset + fretSize*11.5,guitarHeightOffset + stringWidth*1.5,fretSize/4,fretSize/4);
  ellipse(guitarLeftOffset + fretSize*11.5,guitarHeightOffset + stringWidth*3.5,fretSize/4,fretSize/4);
  stroke(0,0,0,255);


  for(string=1;string<7;string++){
    switch(string){
      case 1: stringRoot = 4; break;
      case 2: stringRoot = 11; break;
      case 3: stringRoot = 7; break;
      case 4: stringRoot = 2; break;
      case 5: stringRoot = 9; break;
      case 6: stringRoot = 4; break;
    }

    //Draw dots for notes belonging to the scale.
    for(i=0;i<13;i++){
      if (currentScale.includes((stringRoot+i)%12)){
        var xStart = guitarLeftOffset - fretSize/2 + fretSize*i;
        var yStart = guitarHeightOffset + ((string-1)*stringWidth)

        if(i===0){xStart+=(fretSize/4)}; //If open String, move over the dot to look correct.

        if((stringRoot+i)%12 == currentRoot%12){//If root note.
          fill(rootColor); //Root color.
        }else{fill(whiteLitColor)}; //Else regular color.
        ellipse(xStart,
                yStart,
                fretSize/4,
                fretSize/4)
      }
    }
  }


  //Add in some explanations for the user.
  if(landScapeMode){
    fill(blackKeyColor)
    textSize(canWidth * 0.012);
    textAlign(CENTER)

    text("Toggle between scales and chords.",togglePosition[0] + dropdownSize[0]/4,dropdownOffset + dropdownSize[1] + canHeight*0.02)



    textAlign(LEFT,TOP)

    welcome1 = "Welcome to the music"
    welcome2 = "theory cheat sheet!"
    welcome3 = "Find the notes for any"
    welcome4 = "scale or chord and"
    welcome5 = "listen to any of them!"
    welcome6 = "Choose a root to start."

    

    text(welcome1,margin + keyWidth*16,keyHeightOffSet+canHeight*0.01);
    text(welcome2,margin + keyWidth*16,keyHeightOffSet+canHeight*0.04);
    text(welcome3,margin + keyWidth*16,keyHeightOffSet+canHeight*0.07);
    text(welcome4,margin + keyWidth*16,keyHeightOffSet+canHeight*0.10);
    text(welcome5,margin + keyWidth*16,keyHeightOffSet+canHeight*0.13);
    text(welcome6,margin + keyWidth*16,keyHeightOffSet+canHeight*0.16);




    //text('rhgfhgxfndfgjndgfndgh', togglePosition[0], dropdownOffset+canWidth*0.05);
  }




    //fretSize = fretSize+(fretSize/1.059463) 
}



function mousePressed(){
  for(i=0;i<24;i++){ //For each button.
    if([12,14,16,17,19,21,23].includes(i) == false){
      var distance;
      distance = dist(mouseX,mouseY,roots[i].xStart,roots[i].yStart) //Distance from mouse.
      if (distance<buttonSize/2){ //If on button.
        currentRoot = i //Change root of scale.
        currentScale = ps(currentRoot,modeConvert(currentScaleName)); //Refresh scale.

        switch(currentRoot){
          case 0: currentDiatonicNote=0; break;
          case 1: currentDiatonicNote=0; break;
          case 2: currentDiatonicNote=1; break;
          case 3: currentDiatonicNote=1; break;
          case 4: currentDiatonicNote=2; break;
          case 5: currentDiatonicNote=3; break;
          case 6: currentDiatonicNote=3; break;
          case 7: currentDiatonicNote=4; break;
          case 8: currentDiatonicNote=4; break;
          case 9: currentDiatonicNote=5; break;
          case 10: currentDiatonicNote=5; break;
          case 11: currentDiatonicNote=6; ;break;
          case 13: currentDiatonicNote=1; ;break;
          case 15: currentDiatonicNote=2; ;break;
          case 18: currentDiatonicNote=4; ;break;
          case 20: currentDiatonicNote=5; ;break;
          case 22: currentDiatonicNote=6; ;break;
        }
        

      }
    }
  }
  draw();
}







