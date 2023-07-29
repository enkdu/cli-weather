import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage_service.js";

export const getWeather = async (argCity) => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  const city =
    argCity ?? process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
  if (!token) {
    throw new Error("Token don't added. Use flag -t [API_KEY]");
  }

  if (!city) {
    throw new Error("City don't added. Use flag -s [CITY_NAME]");
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};
