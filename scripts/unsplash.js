// query will be hardcoded to button intialization
// let queryStr = "dogs";
// pageSize should increase as level size increases so not to pull
// down unnecessary amounts of data. Should leave enough overhead
// for some randomization though
// let pageSize = 50;
// numImages is dynamically passed to function at init as more tiles are created
// let numImages = 8;

function getImages(queryStr, pageSize, numImages) {
    // fetch photos from api dynamically based on query 
    // abstracted accessKey into seperate file
    const URI = `https://api.unsplash.com/search/photos/?query=${queryStr}&orientation=squarish&page=1&per_page=${pageSize}&client_id=${accessKeyUnsplash}`;
    return fetch(URI, {
        headers: {
            'Content-Type': 'application/json',
            // api reccomended this addition
            'Accept-Version': 'v1'
        }
    })
        //stringified data needs to be converted to json for use
        .then(str => {
            return Promise.all([str.json(), numImages]);
        })
        //pass json to image extractor
        .then(packageImg)
        .catch(networkError)
    }

function networkError (){
    window.alert("Network error please confirm connection and refresh.")
}
// loop json array, extract small images, append attribution data
function packageImg([jsonData, numImages]) {
    //a given query will return the same images from the api
    //randomizing the images taken will allow for a better user experience accross
    //games with the same query 
    function getRandomIntInclusive(min = 0, max = jsonData.results.length - 1) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    //non-repeating number logic
    let rand = [];
    while (rand.length < numImages) {
        let num = getRandomIntInclusive();
        // ! reverses logic
        // .includes would return true if found
        // so if num not found add it else try again
        if (!rand.includes(num)) {
            rand.push(num);
        }
    }
    // console.log(`rand[] ${rand}`);
    let imgArray = [];
    rand.forEach(index => {
        // keep reintializing a new imgObj in the loop
        // else if outside, just accesing memory pointers to one object
        let imgObj = {
            imgSrc: "",
            attrImg_name: "",
            attrImg_url: ""
        };
        imgObj.imgSrc = `${jsonData.results[index].urls.small}`;
        imgObj.attrImg_name = `${jsonData.results[index].user.name}`;
        imgObj.attrImg_url = `${jsonData.results[index].links.html}`;
        imgArray.push(imgObj);
    });

    //uncomment the below to get a handle on what is being passed back to the promise chain
    //console.table(imgArray);
    return imgArray;
}