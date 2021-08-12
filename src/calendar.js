import L10n from "@lxg/l10n"
import L10nDate, { L10nDateFormat } from "@lxg/l10n/date"
import translations from "./translations.json"

class Calendar extends HTMLElement
{
    static get observedAttributes() {
        return ["month", "year", "lang"]
    }

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        this._l10n = new L10n(translations, this.getAttribute("lang") || "en-GB")
        this._date = new L10nDate(this._l10n)
        this._dform = new L10nDateFormat(this._l10n)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue && oldValue !== newValue) {

            if (name === "lang") {
                this._l10n.setLocale(newValue)
            }

            this.connectedCallback()
        }
    }

    connectedCallback() {
            const dayOffset = this._date.getFirstDayOfWeek() // 0: Sunday, 1: Monday
            const year = parseInt(this.getAttribute("year"))
            const month = parseInt(this.getAttribute("month"))
            const monthLength = (new Date(Date.UTC(year, month, 0))).getDate()
            const firstDayWeekday = (new Date(Date.UTC(year, month - 1, 1))).getDay()
            const padColsBefore = (7 - dayOffset + firstDayWeekday) % 7
            const padColsAfter = 7 - ((monthLength + firstDayWeekday - dayOffset) % 7);

            let rows = `<tr>${this._date.shiftWeekdays(this._date.getWeekdaysShort()).map(day => `<th>${day}</th>`).join('')}</tr>`
            let row = "<tr>"

            if (padColsBefore) {
                row += `<td colspan="${padColsBefore}"></td>`
            }

            for (let monthDay = 1; monthDay <= monthLength; monthDay++) {
                row += `<td title="${this._dform.fmt(new Date(year, month - 1, monthDay), this._l10n.x("date format", "l, F j, Y"))}">${monthDay}</td>`;

                if ((firstDayWeekday + monthDay) % 7 === dayOffset)
                {
                    rows += row
                    row = "</tr><tr>"
                }
            }

            if (padColsAfter > 0 && padColsAfter < 7)
            {
                row += `<td colspan="${padColsAfter}"></td>`
            }

            rows += `${row}</tr>`;

        this.shadow.innerHTML = `
            <style>
                table {
                    border-collapse: collapse;
                }

                th, td {
                    border: 1px solid #aaa;
                    padding: 3px 5px;
                    text-align: right;
                }

                th {
                    background: #eee;
                }
            </style>

            <table>
                <tbody>${rows}</tbody>
            </table>
        `
    }
}

customElements.define('l10n-demo-calendar', Calendar)
