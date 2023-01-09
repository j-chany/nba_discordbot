import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { API_key } = process.env;

export default async () => {
  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: { live: "all" },
    headers: {
      "X-RapidAPI-Key": API_key,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };
  try {
    const fetchData = await axios.request(options);
    const result = {};
    fetchData.data.response.forEach((game) => {
      result[`${game.teams.home.nickname} vs ${game.teams.visitors.nickname}`] =
        {
          currentP: game.periods.current,
          score: `${game.teams.home.nickname}: ${game.scores.home.points} ${game.teams.visitors.nickname}: ${game.scores.visitors.points} `,
        };
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
