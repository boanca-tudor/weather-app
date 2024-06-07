import { LitElement, html, css} from "lit";
import { customElement, property} from "lit/decorators.js";

@customElement('weather-day')
export class WeatherHourEntry extends LitElement {
    static override styles = css`
    .weather-widget {
        display: flex;
        flex-direction: column;
    }
    .temperature {
        font-size: 2em;
        font-weight: bold;
        margin: 8px 0;
    }
    .details {
        font-size: 0.9em;
    }
    .detail {
        display: flex;
        justify-content: space-between;
    }
    .label {
        font-weight: bold;
    }
    `;

    @property()
    minTemp: number | undefined;

    @property()
    maxTemp: number | undefined;

    override render() {
        return html`
            <div class="weather-widget">
                <div class="detail">
                    <span class="label">Min Temperature: </span>
                    <span>${Math.floor(this.minTemp!)}°C</span>
                </div>
                <div class="detail">
                    <span class="label">Max Temperature: </span>
                    <span>${Math.floor(this.maxTemp!)}°C</span>
                </div>
            </div>
        `;
    }
}