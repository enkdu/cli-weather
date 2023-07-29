import chalk from "chalk";
import dedent from "dedent-js";

export function printError(message) {
  console.log(chalk.bgRed("ERROR:") + " " + message);
}

export function printSuccess(message) {
  console.log(chalk.bgGreen("SUCCESS:") + " " + message);
}

export function printWeather(weather) {
  console.log(
    dedent(
      `${chalk.bgWhite("---------------")}
	${chalk.bgYellow("WEATHER FORECAST")} 
	${chalk.bgWhite("---------------")}

	${chalk.bgCyan("CITY:")} ${weather.name}
	${chalk.bgCyan("FORECAST:")} ${weather.weather[0].main}
	${chalk.bgCyan("TEMPERATURE:")} ${weather.main.temp}
	${chalk.bgCyan("FEELS LIKE:")} ${weather.main.feels_like}
`
    )
  );
}

export function printHelp() {
  console.log(
    dedent(` ${chalk.bgCyan("HELP:")}
    Без параметров - вывод погоды
    -s [CITY] - для установки города
    -h - для вывода помощи
    -t [API_KEY] - для сохранения токена
		`)
  );
}
