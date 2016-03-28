Wingbase
===

This is a stupid little game where you fly around and bump into asteroids and stuff.

###Installation

Clone the Git repository, install Node.js version 5.6.0 or higher then run `npm install` in the project directory.

Make sure that the command `node` links to this Node.js version and not `nodejs`.

###Running

Run `node index.js` or `npm start`.

Port 8080 is used by default and this must be open for people to play across the internet. To use a different port, set the `process.env.PORT` variable.

###Tests

To run tests, use `npm test`. At the moment it doesn't test very much though but it can be useful to see if a player is at least able to connect without you having to go and open a browser tab.

###Controls

WASD to move.

Mouse to aim and shoot.

E/Q to change weapons.

Enter to chat.
