// query will be hardcoded to button intialization
// let queryStr = "animals";
// durationEnd allows for searching longer or shorter effects
// may not be necessary in final build, but can be dynamically created
// let durationEnd = 3;
// pageSize should increase as level size increases so not to pull
// down unnecessary amounts of data. Should leave enough overhead
// for some randomization though
// let pageSize = 50;
// numsounds is dynamically passed to function at init as more tiles are created
//  let numSounds = 8;



function getSounds(queryStr, pageSize, numSounds, durationEnd) {
    
    // fetch sounds from api dynamically based on query 
    // include parameter for duration match in secondsgit
    // include parameter of pageSize for num results per fetch
    // abstracted accessKey into seperate file
    const URI = `https://freesound.org/apiv2/search/text/?query=${queryStr}&page_size=${pageSize}&filter=duration:[1 TO ${durationEnd}]&fields=name,url,id,username,previews&token=${accessKeyFreesound}`;

    return fetch(URI)
        //stringified data needs to be converted to json for use
        .then(str => {
            return Promise.all([str.json(), numSounds]);
        })
        //pass json to sound extractor
        .then(packageSoundID)
        .catch(networkError)
    }

function networkError (){
    window.alert("Network error please confirm connection and refresh.")
}
    
// loop json array, extractd small sounds, append attribution data
function packageSoundID([jsonData, numSounds]) {
    //a given query will return the same sounds from the api
    //randomizing the sounds taken will allow for a better user experience accross
    //games with the same query 

    function getRandomIntInclusive(min = 0, max = jsonData.results.length - 1) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    //non-repeating number logic
    let rand = [];
    while (rand.length < numSounds) {
        let num = getRandomIntInclusive();
        // ! reverses logic
        // .includes would return true if found
        // so if num not found add it else try again
        if (!rand.includes(num)) {
            rand.push(num);
        }
    }
    let soundsArray = [];
    rand.forEach(index => {
        // keep reintializing a new soundObj in the loop
        // else if outside, just accesing memory pointers to one object
        let soundObj = {
            id: "",
            attrSnd_name: "",
            attrSnd_url: "",
            soundFile: ""
        }
        soundObj.id = `${jsonData.results[index].id}`;
        soundObj.attrSnd_name = `${jsonData.results[index].username}`;
        soundObj.attrSnd_url = `${jsonData.results[index].url}`;
        soundObj.soundFile = `${jsonData.results[index].previews["preview-hq-mp3"]}`;
        soundsArray.push(soundObj);
    });
    //uncomment the below to get a handle on what is being passed back to the promise chain
    //console.table(soundsArray);
    return soundsArray;
}
