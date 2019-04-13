//Dictionary to convert pitch classes to multiple enharmonic notes.
const setClass = {
    0:["C", "B♯","D♭♭"],
    1:["C♯", "D♭"],
    2:["D", "Cx", "E♭♭"],
    3:["D♯", "E♭"],
    4:["E", "Dx", "F♭"],
    5:["F", "E♯","G♭♭"],
    6:["F♯", "G♭"],
    7:["G", "Fx","G♭♭"],
    8:["G♯", "A♭"],
    9:["A", "Gx","B♭♭"],
    10:["A♯", "B♭"],
    11:["B", "Ax","C♭"]
  }
  const blackKeyClasses = [1,3,6,8,10];
  const whiteKeyClasses = [0,2,4,5,7,9,11];
  
  
  //SCALES
  major = [0,2,4,5,7,9,11];
  natMinor = [0,2,3,5,7,8,10];
  harmMinor = [0,2,3,5,7,8,11];
  melMinor = [0,2,3,5,7,9,11];
  locrian = [0,1,3,5,6,8,10]
  dorian = [0,2,3,5,7,8,10];
  phrygian = [0,1,3,5,7,8,10];
  lydian = [0,2,4,6,7,9,11];
  mixolydian = [0,2,4,5,7,9,10];
  wholeTone = [0,2,4,6,8,10];
  pentaMaj = [0,2,4,7,9];
  pentaMin = [0,3,5,7,10];
  pentaMajB = [0,2,3,4,7,9];
  pentaMinB = [0,3,5,6,7,10];
  dimWholeHalf = [0,2,3,5,6,8,9,11];
  dimHalfWhole = [0,1,3,4,6,7,9,10];
  hungarMinor = [0,2,3,6,7,8,11];
  phrygDom = [0,1,4,5,7,8,10];
  lydDom = [0,2,4,6,7,9,10];
  yo = [0,2,5,7,9];
  insen = [0,1,5,7,10];
  bebopDom = [0,2,4,5,7,9,10,11];
  bebopMaj = [0,2,4,5,7,8,9,11];
  
  
  //CHORDS
  majChord = [0,4,7];
  minChord = [0,3,7];
  augChord = [0,4,8];
  dimChord = [0,3,6];
  sevenChord = [0,4,7,10];
  min7Chord = [0,3,7,10];
  min7b5Chord = [0,3,6,10];
  dim7Chord = [0,3,6,9];
  maj7Chord = [0,4,7,11];
  minMaj7Chord = [0,3,7,11];
  ninthChord = [0,2,4,7,10];
  min9Chord = [0,2,3,7,10];
  min7b9Chord = [0,1,3,7,10];
  maj9Chord = [0,2,4,7,11];
  add9Chord = [0,2,4,7];
  minAdd9Chord = [0,2,3,7];
  sevenSharp9Chord = [0,3,4,7,10];
  sus2Chord = [0,2,7];
  sus4Chord = [0,5,7];
  powerChord = [0,7];
  sixthChord = [0,4,7,9];
  minSixthChord = [0,3,7,8];
  sixNineChord = [0,2,4,7,9];
  thirteenthChord = [0,4,7,9,10];
  min13thChord = [0,3,7,8,10];
  maj13thChord = [0,4,7,9,11];
  eleventhChord = [0,4,5,7,10];
  sharp11Chord = [0,4,6,7,10];
  minSharp11Chord = [0,3,6,7,10];
  min7Flat5Flat9Chord = [0,1,3,6,10];
  aug7thChord = [0,4,8,10];
  petrushka = [0,1,4,6,7,10];
  farben = [0,4,8,9,11];
  
  
  //Transpose scale to root, output new scale.
  function ps(root, scale){
    var newScale = [];
    for (note in scale){
      newScale[note] = ((root + scale[note])%12)
    }
    console.log(newScale);
    return(newScale);
  }
  
  //Create new scale when using dropdown menu.
  function makeMode(){
    currentScaleName = mode.value();
    currentScale = ps(currentRoot,modeConvert(mode.value()));
  }
  
  //Convert string name of scale to list.
  function modeConvert(modeName){
    console.log(modeName)
    var vals = [];
    switch (modeName){
        case "Major": vals = major.slice(0);
          enharmIndex = [0,0,0,0,0,0,0];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Natural Minor": vals = natMinor.slice(0); 
          enharmIndex = [0,0,2,0,0,2,2];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Harmonic Minor": vals = harmMinor.slice(0);
          enharmIndex = [0,0,2,0,0,2,0];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Melodic Minor": vals = melMinor.slice(0);
          enharmIndex = [0,0,2,0,0,0,0];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Dorian": vals = dorian.slice(0);
          enharmIndex = [0,0,2,0,0,0,2];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Phrygian": vals = phrygian.slice(0);
          enharmIndex = [0,2,2,0,0,2,2];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Lydian": vals = lydian.slice(0);
          enharmIndex = [0,0,0,1,0,0,0];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Mixolydian": vals = mixolydian.slice(0);
          enharmIndex = [0,0,0,0,0,0,1];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Locrian": vals = locrian.slice(0);
          enharmIndex = [0,2,2,0,2,2,2];
          intervals = [1,2,3,4,5,6,7]; break;
        case "Whole Tone": vals = wholeTone.slice(0);//Special Scale
          if([1,6,8,11].includes(currentRoot)){//If F#,G#,B,or C# whole tone.
            enharmIndex = [0,0,0,2,2,2];
            intervals = [1,2,3,5,6,7]; break;
          }else if(currentRoot==3 ||currentRoot==10){//If A# or D# whole tone.
            enharmIndex = [0,4,2,2,2,2];
            intervals = [1,3,4,5,6,7]; break;
          }else{
          enharmIndex = [0,0,0,1,1,1];
          intervals = [1,2,3,4,5,6]; break;
          }
        case "Major Pentatonic": vals = pentaMaj.slice(0);
          enharmIndex = [0,0,0,0,0];
          intervals = [1,2,3,5,6]; break;
        case "Minor Pentatonic": vals = pentaMin.slice(0);
          enharmIndex = [0,2,0,0,2];
          intervals = [1,3,4,5,7]; break;
        case "Maj Blues Pentatonic": vals = pentaMajB.slice(0);
          enharmIndex = [0,0,2,0,0,0];
          intervals = [1,2,3,3,5,6]; break;
        case "Min Blues Pentatonic": vals = pentaMinB.slice(0);
          enharmIndex = [0,2,0,2,0,2];
          intervals = [1,3,4,5,5,7]; break;
        case "Diminished (Whole-Half)": vals = dimWholeHalf.slice(0);
          enharmIndex = [0,0,2,0,2,2,0,0];
          intervals = [1,2,3,4,5,6,6,7];break;
        case "Diminished (Half-Whole)": vals = dimHalfWhole.slice(0);
          enharmIndex = [0,2,2,2,2,0,0,2];
          intervals = [1,2,3,4,5,5,6,7];break;
        case "Phrygian Dominant": vals = phrygDom.slice(0);
          enharmIndex = [0,2,0,0,0,2,2];
          intervals = [1,2,3,4,5,6,7];break;
        case "Lydian Dominant": vals = lydDom.slice(0);
          enharmIndex = [0,0,0,1,0,0,2];
          intervals = [1,2,3,4,5,6,7];break;
        case "Yo": vals = yo.slice(0);
          enharmIndex = [0,0,0,0,2];
          intervals = [1,2,4,5,6];break;
        case "In Sen": vals = insen.slice(0);
          enharmIndex = [0,2,0,0,2];
          intervals = [1,2,4,5,7];break;
        case "Hungarian Minor": vals = hungarMinor.slice(0);
          enharmIndex = [0,0,2,1,0,2,0];
          intervals = [1,2,3,4,5,6,7];break;
        case "Bebop Dominant": vals = bebopDom.slice(0);
          enharmIndex = [0,0,0,0,0,0,2,0];
          intervals = [1,2,3,4,5,6,7,7];break;
        case "Bebop Major": vals = bebopMaj.slice(0);
          enharmIndex = [0,0,0,0,0,1,0,0];
          intervals = [1,2,3,4,5,5,6,7];break;
  
  
        //Chords (NEEDS LOTS OF WORK)
        //1 sharp, 2 flat
        case "Major ": vals = majChord.slice(0);
          enharmIndex = [0,0,0];
          intervals = [1,3,5]; break;
        case "Minor ": vals = minChord.slice(0);
          enharmIndex = [0,1,0];
          intervals = [1,3,5]; break;
        case "Augmented": vals = augChord.slice(0);
          enharmIndex = [0,0,2];
          intervals = [1,3,5]; break;
        case "Diminished": vals = dimChord.slice(0);
          enharmIndex = [0,1,1];
          intervals = [1,3,5]; break;
        case "7th": vals = sevenChord.slice(0);
          enharmIndex = [0,0,0,2];
          intervals = [1,3,5,7]; break;
        case "minor7th": vals = min7Chord.slice(0);
          enharmIndex = [0,2,0,2];
          intervals = [1,3,5,7]; break;
        case "minor7th♭5": vals = min7b5Chord.slice(0);
          enharmIndex = [0,2,2,2];
          intervals = [1,3,5,7]; break;
        case "dim7th": vals = dim7Chord.slice(0);
          enharmIndex = [0,2,2,4];
          intervals = [1,3,5,7]; break;
        case "maj7": vals = maj7Chord.slice(0);
          enharmIndex = [0,0,0];
          intervals = [1,3,5,7]; break;
        case "minor/major7th": vals = minMaj7Chord.slice(0);
          enharmIndex = [0,2,0,0];
          intervals = [1,3,5,7]; break;
        case "9th": vals = ninthChord.slice(0);
          enharmIndex = [0,0,0,2,0];
          intervals = [1,3,5,7,2]; break;
        case "minor9th": vals = min9Chord.slice(0);
          enharmIndex = [0,2,0,2,0];
          intervals = [1,3,5,7,2]; break;
        case "minor7th♭9": vals = min7b9Chord.slice(0);
          enharmIndex = [0,2,0,2,2];
          intervals = [1,3,5,7,2]; break;
        case "maj9": vals = maj9Chord.slice(0);
          enharmIndex = [0,0,0,0,0];
          intervals = [1,3,5,7,2]; break;
        case "add9": vals = add9Chord.slice(0);
          enharmIndex = [0,0,0,0];
          intervals = [1,3,5,2];break;
        case "minor add9": vals = minAdd9Chord.slice(0);
          enharmIndex = [0,2,0,0];
          intervals = [1,3,5,2];break;
        case "7th♯9": vals = sevenSharp9Chord.slice(0);
          enharmIndex = [0,0,0,2,1];
          intervals = [1,3,5,7,2];break;
        case "min7♭5♭9": vals = min7Flat5Flat9Chord.slice(0);
          enharmIndex = [0,2,2,2,2];
          intervals = [1,3,5,7,2];break;
        case "sus2": vals = sus2Chord.slice(0);
          enharmIndex = [0,0,0];
          intervals = [1,2,5];break;
        case "sus4": vals = sus4Chord.slice(0);
          enharmIndex = [0,0,0];
          intervals = [1,4,5];break;
        case "POWER CHORD": vals = powerChord.slice(0);
          enharmIndex = [0,0];
          intervals = [1,5];break;
        case "6th": vals = sixthChord.slice(0);
          enharmIndex = [0,0,0,0];
          intervals = [1,3,5,6]; break;
        case "min6th": vals = minSixthChord.slice(0);
          enharmIndex = [0,0,0,2];
          intervals = [1,3,5,6]; break;
        case "6/9": vals = sixNineChord.slice(0);
          enharmIndex = [0,0,0,0,0];
          intervals = [1,3,5,6,2]; break;
        case "11th": vals = eleventhChord.slice(0);
          enharmIndex = [0,0,0,2,0];
          intervals = [1,3,5,7,4]; break;
        case "♯11th": vals = sharp11Chord.slice(0);
          enharmIndex = [0,0,0,2,1];
          intervals = [1,3,5,7,4]; break;
        case "min♯11th": vals = minSharp11Chord.slice(0);
          enharmIndex = [0,2,0,2,1];
          intervals = [1,3,5,7,4]; break;
        case "13th": vals = thirteenthChord.slice(0);
          enharmIndex = [0,0,0,2,0];
          intervals = [1,3,5,7,6]; break;
        case "min13th": vals = min13thChord.slice(0);
          enharmIndex = [0,2,0,2,2];
          intervals = [1,3,5,7,6]; break;
        case "maj13th": vals = maj13thChord.slice(0);
          enharmIndex = [0,0,0,0,0];
          intervals = [1,3,5,7,6]; break;
        case "aug7th": vals = aug7thChord.slice(0);
          enharmIndex = [0,0,1,0];
          intervals = [1,3,5,7]; break;
        case "Petrushka": vals = petrushka.slice(0);
          if(currentRoot == 10){//If A# Petrushka
            enharmIndex = [0,2,2,2,2,2];
            intervals = [1,4,6,5,7,2]; break;
          }else if ([3,8].includes(currentRoot)){
            enharmIndex = [0,2,4,2,2,2];
            intervals = [1,4,6,5,7,2]; break;
          }else if([1,6].includes(currentRoot)){
            enharmIndex = [0,0,0,2,2,2];
            intervals = [1,3,5,5,7,2]; break;
          }else
          enharmIndex = [0,0,0,1,1,1];
          intervals = [1,3,5,4,6,1];break;
        case "Farben": vals = farben.slice(0);
          enharmIndex = [0,1,0,0,0];
          intervals = [1,5,7,3,6]; break;
      }
    return vals;
  }
  
  
  function intervalConvert(val, alt){
    var newNote = (currentDiatonicNote+val-1)%7
    var majIndex = circleOfFifths[currentRoot][newNote];
    var accidental;
    if (alt==1){accidental=1}else if(alt==2){accidental=-1}
    else if(alt==3){accidental=2}else if(alt==4){accidental=-2}
    else{accidental=0};
    
    return diatonicNoteNames[newNote][2+majIndex+accidental];
  
  }
  
  const diatonicNoteNames = {
    0:["C♭♭","C♭","C", "C♯","Cx"],
    1:["D♭♭","D♭","D","D♯","Dx"],
    2:["E♭♭","E♭","E", "E♯","Ex"],
    3:["F♭♭","F♭","F", "F♯","Fx"],
    4:["G♭♭","G♭","G", "G♯","Gx"],
    5:["A♭♭","A♭","A", "A♯","Ax"],
    6:["B♭♭","B♭","B", "B♯","Bx"]
  }
  
  const circleOfFifths = {
    0:[0,0,0,0,0,0,0],//C
    1:[1,1,1,1,1,1,1],//C#
    2:[1,0,0,1,0,0,0],//D
    3:[2,1,1,2,1,1,1],//D#
    4:[1,1,0,1,1,0,0],//E
    5:[0,0,0,0,0,0,-1],//F
    6:[1,1,1,1,1,1,0],//F#
    7:[0,0,0,1,0,0,0],//G
    8:[1,1,1,2,1,1,1],//G#
    9:[1,0,0,1,1,0,0],//A
    10:[2,1,1,2,2,1,1],//A#
    11:[1,1,0,1,1,1,0],//B
    13:[0,-1,-1,0,0,-1,-1],//Db
    15:[0,0,-1,0,0,-1,-1],//Eb
    18:[-1,-1,-1,0,-1,-1,-1],//Gb
    20:[0,-1,-1,0,0,-1,-1],//Ab
    22:[0,0,-1,0,0,0,-1],//Bb
  }
  