import { LitElement, html, css} from "lit";
import { customElement, property} from "lit/decorators.js";

@customElement('weather-hour-entry')
export class WeatherHourEntry extends LitElement {
    static override styles = css`
      .weather-widget {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid #75b4e3;
        border-radius: 8px;
      }
      .temperature {
        font-size: 2em;
        font-weight: bold;
        margin: 8px 0;
      }
      .details {
        font-size: 0.9em;
        width: 100%;
      }
      .detail {
        display: flex;
        justify-content: space-between;
      }
      .label {
        font-weight: bold;
      }
      .time {
        font-size: 2em;
        font-weight: bold;
        margin: 8px 0;
      }
    `;

    @property()
    temperature: number | undefined;

    @property()
    time: Date | undefined;

    @property()
    windSpeed: number | undefined;

    @property()
    rainProbability: number | undefined;

    @property()
    timeZone: string | undefined;

    override render() {
        return html`
            <div class="weather-widget">
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="20" fill="yellow" />
                  
                  <line x1="50" y1="5" x2="50" y2="25" stroke="orange" stroke-width="2"/>
                  <line x1="50" y1="75" x2="50" y2="95" stroke="orange" stroke-width="2"/>
                  <line x1="5" y1="50" x2="25" y2="50" stroke="orange" stroke-width="2"/>
                  <line x1="75" y1="50" x2="95" y2="50" stroke="orange" stroke-width="2"/>
                  <line x1="15" y1="15" x2="30" y2="30" stroke="orange" stroke-width="2"/>
                  <line x1="70" y1="70" x2="85" y2="85" stroke="orange" stroke-width="2"/>
                  <line x1="15" y1="85" x2="30" y2="70" stroke="orange" stroke-width="2"/>
                  <line x1="70" y1="30" x2="85" y2="15" stroke="orange" stroke-width="2"/>
                </svg>
                <div class="time">${this.time ? `${new Date(this.time).toLocaleTimeString('en-US', { timeZone: this.timeZone, timeZoneName: 'long'})}`: ''}</div>
                <div class="temperature">${Math.floor(this.temperature!)}°C</div>
                <div class="details">
                    <div class="detail">
                        <span class="label">Wind Speed:</span>
                        <span>${Math.floor(this.windSpeed!)} km/h</span>
                    </div>
                    <div class="detail">
                        <span class="label">Rain Probability:</span>
                        <span>${this.rainProbability}%</span>
                    </div>
                </div>
            </div>
        `;
    }
}