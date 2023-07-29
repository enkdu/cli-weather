#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log_service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage_service.js";
import { getWeather } from "./services/api_service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token not provided");
    return null;
  }
  try {
    saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved");
  } catch (e) {
    printError("Token didn't saved: " + e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("City not provided");
    return null;
  }
  try {
    await getWeather(city);
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City saved");
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Wrong city");
    } else {
      printError("City didn't saved: " + e.message);
    }
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather();
    printWeather(weather);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Wrong city");
    } else if (e?.response?.status === 401) {
      printError("Wrong token");
    } else if (e?.response?.status === 400) {
      printError("City don't added. Use flag -s [CITY_NAME]");
    } else {
      printError(e.message);
    }
  }
};

function initCLI() {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
}

initCLI();
