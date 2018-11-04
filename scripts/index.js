// a memory game that pulls images/sounds from an API. the user will match
// the face of the tiles. 8 tiles are randomized and displayed. only 2 tiles
// may be selected at a time. after 2 tiles are selected, tiles flip back
// unless the tiles are correct, in which case the tiles stay visible.
// guess count is reset after 2 guesses.

function button(queryStr, pageSize, numImages, numSounds, durationEnd) {
  // the promise.all will wait to pass its data to the anonymous function until both getImages and getSounds are resolved 
  Promise.all([getImages(queryStr, pageSize, numImages), getSounds(queryStr, pageSize, numSounds, durationEnd)]).then(function (data) {
    //dataObj will hold the array of imgs and the array of snds in one combined array
    let dataObj = [];
    // the promise.all passed an array of two values [images,sounds]
    // since the lengths are equal, just use the first array as our loop argument
    // when using forEach instead of a std for loop, the array index is handled behind the scenes
    // by including the 'i' as a parameter I can make that index available
    data[0].forEach((element, i) => {
      // with no conflicting keys across imgs and sounds, temp object will add all key/value pairs 
      // in a single object, (the empty object provided in the first argument), from the images and from the sounds object
      let temp = Object.assign({}, element, data[1][i]);
      // push each unified img/snd object into dataObj array
      dataObj.push(temp);
    });
    // return the completed dataObj array to promise.all which will pass it to the next link in the chain
    return dataObj;
  })
    .then(gameStart)
    .then(timer)
}

function gameStart(dataObj) {
  const arrayOfImgsSnds = dataObj;
  let numImages = arrayOfImgsSnds.length;
  // container for images is appended and array of images is concatenated to double up the images.
  let gameBoard = arrayOfImgsSnds.concat(arrayOfImgsSnds);

  // function to sort tiles randomly.
  gameBoard.sort(() => 0.5 - Math.random());

  let firstClick = "";
  let secondClick = "";
  let count = 0;
  let wait = 800;//in millisecs
  let numMatches = 0;

  const board = document.querySelector("[data-board]");
  const tileContainer = document.createElement("section");
  tileContainer.setAttribute("class", "boardy");
  board.appendChild(tileContainer);

  // loops through array of images to append to div
  gameBoard.forEach(item => {
    // tile elements are created with name
    const tile = document.createElement("section");
    tile.classList.add("memtile");
    tile.dataset.attrImg_name = item.attrImg_name;
    tile.dataset.attrImg_url = item.attrImg_url;
    tile.dataset.name = item.imgSrc;
    tile.dataset.soundFile = item.soundFile;

    // // sound anchor created
    const tileSound = document.createElement("audio");
    tileSound.src = item.soundFile;

    //   back of tile element created
    const tileBack = document.createElement("div");
    tileBack.classList.add("front");

    // face of tile element created
    const tileFace = document.createElement("div");
    tileFace.classList.add("back");
    tileFace.style.backgroundImage = `url(${item.imgSrc})`;

    tileContainer.appendChild(tile);
    tile.appendChild(tileBack);
    tile.appendChild(tileFace);
    tile.appendChild(tileSound);
    
    // an event listener to each tile
    tile.addEventListener("click", function (e) {
      let selected = e.target;
      //   only allow the div tiles to be selected and
      //   if there's a pair selected, the user cannot click
      //   the same tile again.
      if (
        selected.nodeName === "SECTION" ||
        selected.parentNode.classList.contains("clicked") ||
        selected.parentNode.classList.contains("paired")
      ) {
        return;
      }
      // reset counter after 2 clicks
      if (count < 2) {
        count++;
        if (count === 1) {
          firstClick = selected.parentNode.dataset.name;
          selected.parentNode.classList.add("clicked");
          selected.parentNode.querySelector("audio").play();
        } else {
          secondClick = selected.parentNode.dataset.name;
          selected.parentNode.classList.add("clicked");
          selected.parentNode.querySelector("audio").play();
        }
        // as long as the first and second clicks are not empty
        // and the first click matches the second click
        // the paired function is called.
        if (firstClick !== "" && secondClick !== "") {
          // if a match
          if (firstClick === secondClick) {
            // if at least two possible matches remain
            if (numMatches < numImages-1){
              // added a delay between resetting clicks and
              // matched pairs disappearing.
              setTimeout(paired, wait);
              setTimeout(resetClicks, wait);
              numMatches++;
            // else if only last match left
            }else{
              setTimeout(paired, wait);
              setTimeout(resetClicks, wait);
              // stops timer on win
              clearInterval(interval);
              // call gameEnd()
              let win = "win";
              // have to pass the gameEnd param so must be in function wrapper
              // or it will excecute immediately: gameEnd(win) vs gameEnd 
              setTimeout(transition, 1525);
              function transition (){
                gameEnd(win);
              }
            }    
          }else {
            setTimeout(resetClicks, wait);
          }
        }
      }
    });
  });

  const paired = () => {
    let chosen = document.querySelectorAll(".clicked");
    chosen.forEach(tile => {
      tile.classList.add("paired");
    });
  };

  // function to reset clicks
  const resetClicks = () => {
    firstClick = "";
    secondClick = "";
    count = 0;

    let clicked = document.querySelectorAll(".clicked");
    clicked.forEach(tile => {
      tile.classList.remove("clicked");
    });
  };

}

//Modal element for Game Start Screen
const modalElement = document.querySelector('[data-modal]');
const modalH2Element = document.querySelector('[data-modalTextH2]');
const modalPElement = document.querySelector('[data-modalTextP]');
