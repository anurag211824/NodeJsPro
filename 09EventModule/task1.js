const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

const emitter = new EventEmitter();
const countsFilePath = path.join(__dirname, "eventCounts.json");

// Initialize or load event counts
let eventCounts = {
    "user-login": 0,
    "user-logout": 0,
    "user-purchase": 0,
    "profile-update": 0,
};

// Load previous counts if the file exists
if (fs.existsSync(countsFilePath)) {
    const data = fs.readFileSync(countsFilePath, "utf8");
    eventCounts = JSON.parse(data);
}

// Save counts to the file
function saveCounts() {
    fs.writeFileSync(countsFilePath, JSON.stringify(eventCounts,null,2));
}

// Listener for "user-login"
emitter.on("user-login", (username) => {
    eventCounts["user-login"] += 1;
    console.log(`${username}, you are logged in!`);
    saveCounts();
});

// Listener for "user-logout"
emitter.on("user-logout", (username) => {
    eventCounts["user-logout"] += 1;
    console.log(`${username}, you are logged out!`);
    saveCounts();
});

// Listener for "user-purchase"
emitter.on("user-purchase", (username, item) => {
    eventCounts["user-purchase"] += 1;
    console.log(`${username} purchased a ${item}.`);
    saveCounts();
});

// Listener for "profile-update"
emitter.on("profile-update", (username) => {
    eventCounts["profile-update"] += 1;
    console.log(`${username} updated his profile.`);
    saveCounts();
});

// Emit events
emitter.emit("user-login", "Anurag");
emitter.emit("user-purchase", "Anurag", "laptop");
emitter.emit("profile-update", "Anurag");
emitter.emit("user-logout", "Anurag");

// Display event counts
console.log("Event Counts:", eventCounts);
