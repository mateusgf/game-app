# Getting Started

UPDATE NOVEMBER/15: increase test coverage:
<https://github.com/mateusgf/game-app/pull/1>

create-react-app + typescript + sass + prettier + jest

## Installing

```
npm install
```

## Dev server

```
npm start
```

## Run tests

```
npm run test
```

## Info

This is a simple Rock, Paper & Scissors game that supports 2 players simultaneously.

- A player can start a game and he will become a HOST.
- A second player can visit the page and click on "Join game", type the game ID as well as a nickname

Both HOST and GUEST can re-join the game and continue from they have stopped.

A user can join an existing hame with a previus used nickname but CAN'T impersonate a new game with previous created nickname.
Every time a user creates a game, it must use a new nickname. Already used nicknames can only be used to re-join games.

```
"node": "18.12.1",
"npm": "8.19.2"
```

