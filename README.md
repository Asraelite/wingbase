Wingbase
===

Wingbase is a top-down spaceship game in which two teams of four players each compete to destroy their enemy's base while at the same time collecting resources for their own base. These resources can then be used to purchase more powerful ships upon respawn, to build defense turrets, or to research new weapons and upgrades.

The game is built in Javascript using HTML5 Canvas for client rendering, Box2D for physics, and Node.js with Socket.io for the server.

###Installation

Clone the Git repository, install Node.js version 5.6.0 or higher then run `npm install` in the project directory.

Make sure that the command `node` links to this Node.js version and not `nodejs`.

If you have an older version of Node.js you can upgrade by running `sudo npm install -g n` and then `sudo n latest`.

###Running

Run `node index` or `npm start`.

If you use `npm start` arguments must be preceded by `--` e.g. `npm start -- -p 8000`.

Run `node index --help` or `node index -h` for a list of command line arguments.

###Tests

To run tests, use `npm test`. At the moment it doesn't test very much though but it can be useful to see if a player is at least able to connect without you having to go and open a browser tab.

###Controls

WASD to move.

Mouse to aim and shoot.

E/Q to change weapons.

Enter to chat.

Type `/commands` in chat for a list of in-game commands.
