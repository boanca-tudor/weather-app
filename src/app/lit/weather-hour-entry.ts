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

    override render() {
        return html`
            <div class="weather-widget">
                <i class="fas fa-sun icon"></i>
                <div class="time">${this.time ? `${new Date(this.time).toLocaleTimeString()}`: ''}</div>
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