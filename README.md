
# krasserpFlashCards

Udacity React course work.
Mobile application for Android (tested via expo on a Sanmsung Galaxy A3 phone; Android version 6.0.1) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.



This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).



## Table of Contents

* [Installation](#installation)

* [Project testing](#project-testing)
  * [npm start](#npm-start)
  * [npm run android](#npm-run-android)
  * [npm run eject](#npm-run-eject)
* [Project Coursework Requirements](#project-coursework-requirements)
  * [Specific Requirements](#specific-requirements)
  * [Views](#views)


## Installation

Clone or download this repo.
`cd toRepoPath`  and run `yarn install` (yarn or npm).
Once installed you can start the project via
`yarn start`
follow the console instructions on how to test. See below testing instructions

## Project testing

Below instructions on how to test this demo

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```


#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:



#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.



## Project Coursework Requirements

### Specific Requirements
* Use create-react-native-app to build your project.
* Allow users to create a deck which can hold an unlimited number of cards.
* Allow users to add a card to a specific deck.
* The front of the card should display the question.
* The back of the card should display the answer.
* Users should be able to quiz themselves on a specific deck and receive a score once they're done.
* Users should receive a notification to remind themselves to study if they haven't already for that day.

### Views
Your application should have, at a minimum, five views.
* Deck List View (Default View)
  * displays the title of each Deck
  * displays the number of cards in each deck

* Individual Deck View
  * displays the title of the Deck
  * displays the number of cards in the deck
  * displays an option to start a quiz on this specific deck
  * An option to add a new question to the deck

* Quiz View
  * displays a card question
  * an option to view the answer (flips the card)
  * a "Correct" button
  * an "Incorrect" button
  * the number of cards left in the quiz
  * Displays the percentage correct once the quiz is complete

* New Deck View
  * An option to enter in the title for the new deck
  * An option to submit the new deck title

* New Question View
  * An option to enter in the question
  * An option to enter in the answer
  * An option to submit the new question
