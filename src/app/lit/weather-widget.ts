import { LitElement, html, css } from "lit";
import { customElement, property, state} from "lit/decorators.js";
import { fetchWeatherApi } from "openmeteo";
import './weather-hour-entry'
import './weather-day'

interface HourlyData {
    temperature : number | undefined
    rainProbability: number | undefined
    windSpeed: number | undefined
    time: Date | undefined
}

interface DailyData {
    maxTemp: number | undefined
    minTemp: number | undefined
    time: Date | undefined
}

interface CurrentInfo {
    temp: number | undefined
    precipitation: number | undefined
    windSpeed: number | undefined
    time: Date | undefined
}

@customElement('weather-widget')
export class WeatherWidget extends LitElement {
    static override styles = css`
        .centrer {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            padding: 16px;
            width: 50%;
            border: 1px solid #ccc;
            border-radius: 8px;
            background: linear-gradient(135deg, #31255a, #2b235a);
            font-family: Arial, sans-serif;
            color: #8fe0ff;
        }
        .hour-container {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            width: 75%;
        }
        .label {
            font-weight: bold;
        }
    `;
    @property()
    lat: number | undefined;
    long: number | undefined;

    constructor() {
        super();
    }

    @state()
    private _weatherInfoAvailable: boolean = false;

    @state()
    private _hourlyInfo : HourlyData[] = [];

    @state()
    private _dailyInfo : DailyData[] = [];

    @state()
    private _currentInfo : CurrentInfo = {} as CurrentInfo;

    override render() {
        let todayHourlyData = this._hourlyInfo.filter((hourlyData: HourlyData) => hourlyData.time?.getDate() === this._currentInfo.time?.getDate());
        let todayDailyData = this._dailyInfo.filter((dailyData: DailyData) => dailyData.time?.getDate() === this._currentInfo.time?.getDate());
        console.log(todayHourlyData);
        return html`
            <button @click=${this.getWeatherData}>Get Weather Forecast</button>
            ${this._weatherInfoAvailable 
                ? html` 
                    <div class="centrer">
                        <div class="container">
                            <p class="label">
                                Currently:
                            </p>
                            <div class="hour-container">
                                <weather-hour-entry temperature=${this._currentInfo.temp} time=${this._currentInfo.time}
                                                    windSpeed=${this._currentInfo.windSpeed} rainProbability=${this._currentInfo.precipitation}></weather-hour-entry>
                            </div>
                            <weather-day minTemp=${todayDailyData[0].minTemp} maxTemp=${todayDailyData[0].maxTemp}></weather-day>
                            <div class="hour-container">
                            ${todayHourlyData.map((data) => html`
                            <weather-hour-entry temperature=${data.temperature} time=${data.time}
                                                windSpeed=${data.windSpeed} rainProbability=${data.rainProbability}></weather-hour-entry>`
                        )}  <div>
                        </div>
                    </div>
                `
                : html``
            }
        `;
    }

    private async getWeatherData() {
        const params = {
            "latitude": this.lat,
            "longitude": this.long,
            "current": ["temperature_2m", "precipitation", "wind_speed_10m"],
            "hourly": ["temperature_2m", "precipitation_probability", "wind_speed_10m"],
            "daily": ["temperature_2m_max", "temperature_2m_min"],
            "timezone": "auto"
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const responses = await fetchWeatherApi(url, params);
        
        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature2m: current.variables(0)!.value(),
                precipitation: current.variables(1)!.value(),
                windSpeed10m: current.variables(2)!.value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
                precipitationProbability: hourly.variables(1)!.valuesArray()!,
                windSpeed10m: hourly.variables(2)!.valuesArray()!,
            },
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2mMax: daily.variables(0)!.valuesArray()!,
                temperature2mMin: daily.variables(1)!.valuesArray()!,
            },

        };
        let hourlyArray : HourlyData[] = [];
        for (let i = 0; i < weatherData.hourly.time.length; ++i) {
            let hourlyData = {} as HourlyData;
            hourlyData.time = weatherData.hourly.time[i];
            hourlyData.temperature = weatherData.hourly.temperature2m[i];
            hourlyData.windSpeed = weatherData.hourly.windSpeed10m[i];
            hourlyData.rainProbability = weatherData.hourly.precipitationProbability[i];
            hourlyArray.push(hourlyData);
        }
        let dailyArray : DailyData[] = [];
        for (let i = 0; i < weatherData.daily.time.length; ++i) {
            let dailyData = {} as DailyData;
            dailyData.time = weatherData.daily.time[i];
            dailyData.minTemp = weatherData.daily.temperature2mMin[i];
            dailyData.maxTemp = weatherData.daily.temperature2mMax[i];
            dailyArray.push(dailyData);
        }
        this._hourlyInfo = hourlyArray;
        this._dailyInfo = dailyArray;
        this._currentInfo = {
            temp: weatherData.current.temperature2m,
            precipitation: weatherData.current.precipitation,
            windSpeed: weatherData.current.windSpeed10m,
            time: new Date()
        }
        this._weatherInfoAvailable = true;
    }
}