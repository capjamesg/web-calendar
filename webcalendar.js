var month_day_count = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "October": 31,
    "November": 30,
    "December": 31
};

function is_leap_year(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

function get_month_day_count(month, year) {
    if (month == "February") {
        if (is_leap_year(year)) {
            return 29;
        }
        return 28;
    }
    return month_day_count[month];
}

class Calendar extends HTMLElement {
    constructor () {
        super();
    }

    connectedCallback() {
        var starting_idx = {
            "Mon": 0,
            "Tue": 1,
            "Wed": 2,
            "Thu": 3,
            "Fri": 4,
            "Sat": 5,
            "Sun": 6
        };
        this.attachShadow({mode: "open"});

        this.month = this.getAttribute("data-month") || Date().split(" ")[1];
        this.year = this.getAttribute("data-year") || Date().split(" ")[3];
        this.heading = this.getAttribute("data-heading") || this.month + " " + this.year;
        this.starting_day = this.getAttribute("starting_day");
        this.starting_day_idx = starting_idx[this.starting_day];
        this.has_added_prepending_spaces = false;
        this.month_day_count = get_month_day_count(this.month, this.year);
        this.greens = greens;

        this.weeks = Math.ceil((this.month_day_count + starting_idx[this.starting_day]) / 7);

        var table = this.shadowRoot.appendChild(document.createElement("table"));

        var header_row = table.appendChild(document.createElement("tr"));
        var header = header_row.appendChild(document.createElement("th"));

        header.setAttribute("colspan", "7");
        header.classList.add("header");
        
        header.innerHTML = this.heading;

        // add styles from template
        var template = document.querySelector("#calendar");
        var template_content = template.content;
        var style = template_content.querySelector("style");
        this.shadowRoot.appendChild(style.cloneNode(true));

        // add table body
        var tbody = table.appendChild(document.createElement("tbody"));

        // add day row
        var day_row = tbody.appendChild(document.createElement("tr"));
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        for (var i = 0; i < 7; i++) {
            var day = day_row.appendChild(document.createElement("th"));
            day.innerHTML = days[i];
        }
        console.log(this.greens, "x");
        var table = this.shadowRoot.querySelector("table");
        for (var i = 0; i < this.weeks; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                var cell = document.createElement("td");
                if (this.greens.includes((i * 7) + j - this.starting_day_idx + 1)) {
                    console.log("green", i, j);
                    cell.classList.add("green");
                }
                // break if we've reached the end of the month
                if ((i * 7) + j - this.starting_day_idx + 1 > this.month_day_count) {
                    break;
                }

                if (this.has_added_prepending_spaces == false) {
                    if (j < this.starting_day_idx) {
                        cell.classList.add("empty");
                        cell.classList.add("item");
                    } else {
                        this.has_added_prepending_spaces = true;
                        cell.classList.add("item");
                        cell.innerHTML = j - this.starting_day_idx + 1;
                    }
                } else {
                    cell.classList.add("item");
                    cell.innerHTML = (i * 7) + j - this.starting_day_idx + 1;
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }
}

customElements.define("calendar-element", Calendar);
