const EventEmitter = require("events");
const emitter = new EventEmitter();

const eventCounts = {
    "user-login": 0,
    "user-logout": 0,
    "user-purchase": 0,
    "profile-update": 0,
};

// Listener for "user-login"
emitter.on("user-login", (username) => {
    eventCounts["user-login"] += 1;
    console.log(`${username}, you are logged in!`);
});

// Listener for "user-logout"
emitter.on("user-logout", (username) => {
    eventCounts["user-logout"] += 1;
    console.log(`${username}, you are logged out!`);
});

// Listener for "user-purchase"
emitter.on("user-purchase", (username, item) => {
    eventCounts["user-purchase"] += 1;
    console.log(`${username} purchased a ${item}.`);
});

// Listener for "profile-update"
emitter.on("profile-update", (username) => {
    eventCounts["profile-update"] += 1;
    console.log(`${username} updated his profile.`);
});

// Emit events
emitter.emit("user-login", "Anurag");
emitter.emit("user-purchase", "Anurag", "laptop");
emitter.emit("profile-update", "Anurag");
emitter.emit("user-logout", "Anurag");


// Display event counts
console.log("Event Counts:", eventCounts);