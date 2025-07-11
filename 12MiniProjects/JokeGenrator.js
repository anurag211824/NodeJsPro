import https from "https";
import chalk from "chalk";

const getJoke = () => {
  const url = "https://official-joke-api.appspot.com/random_joke";
  
  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const joke = JSON.parse(data);
        console.log(`Here is a random ${joke.type} joke:`);
        console.log(chalk.red(`${joke.setup}`));
        console.log(chalk.blue.bgRed.bold(`${joke.punchline}`));
      } catch (err) {
        console.error("Error parsing the joke data:", err.message);
      }
    });

  })
};

getJoke();
