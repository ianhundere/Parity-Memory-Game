DC-Frontend-Project

# Parity

## Synopsis
Memory matching tile game to allow users to match tiles based on their matching picture and sound randomized each game. Allow users to pick from 3 options of image/sound themes. 

## Features
- Progressive level system. Allow users to play 5 levels of increasing difficulty game boards.
- Game continues with game win or game loss.
- Time limit to add difficulty to the game.
- Change between themes after each level completion or failure.
- Match either image or sound excellent for accessibility.

## Successes
- Avoided scope creep. Due to sufficient pre-planning we never encountered additional features that needed to be added that wasn't talked about in the initial stand-up.

## Challenges
- Dealing with issues of hindsight on program structure i.e. caching data, tons of api calls.
- Information hiding:
    -Issues with tracking current 'Level' without using a global variable.
    -No solution found for clearing timer outside of global variable.
- Intermingling all of our individual portions into one working project. 
- Getting a handle on multiple collaborators working on one project with git. 

## Dependancies
- [Free Sound API](https://freesound.org/docs/api/ "Free Sound API") for dynamic sounds.
- [Unsplash Image API]( https://unsplash.com/developers "Unsplash Image API") for dynamic images. 


![Parity Screenshots](/assets/ParityScreenshots.png)
