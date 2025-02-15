#!/usr/bin/env node


const { default: axios } = require("axios");
const { default: boxen } = require("boxen");
require('dotenv').config();
const chalk = require('chalk')

const location = process.argv[2]
const API = process.env.API_KEY

if (!API) {
    console.log("API KEY is not present plz enter key");
    
     process.exit(1)
}
if (!location) {
    console.log("plz enter location after start command");
     process.exit(1)
}

   

const fetchDataFromApi = async (location) => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API}&units=metric`)

          
            console.log(`${chalk.bold(res.data.name)}, ${chalk.green(res.data.sys.country)}`);

            const output = `
            📍 ${chalk.bold(res.data.name)}, ${chalk.green(res.data.sys.country)}
            🌡️ Temperature: ${chalk.yellow(res.data.main.temp)}°C (Feels like: ${chalk.yellow(res.data.main.feels_like)}°C)
            🌤️ Weather: ${chalk.blue(res.data.weather[0].main)} - ${chalk.gray(res.data.weather[0].description)}
            💨 Wind Speed: ${chalk.cyan(res.data.wind.speed)} m/s
            💧 Humidity: ${chalk.magenta(res.data.main.humidity)}%
            👀 Visibility: ${chalk.white(res.data.visibility)} meters
            `;

            console.log(boxen(output, { padding: 1, borderStyle: "round", borderColor: "white" }))
            
       
        } catch (error) {
            if (error.response) {
                console.log(chalk.red("error",error?.response?.data?.message))
            }
            else{
                console.log(chalk.red("Network Issue Try again"));
            }
          
             process.exit(1)

        }
       

    }

 fetchDataFromApi(location)



