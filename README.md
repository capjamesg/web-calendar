# web-calendar

A web component for rendering static calendars.

## Demo

[Try the component](https://capjamesg.github.io/web-calendar/)

Here is an example of the component on a web page:

<img width="481" alt="demo" src="https://github.com/capjamesg/web-calendar/assets/37276661/0126595c-7e35-4be9-9c61-ece11a08f595">

## Setup

To use this component, first clone this repository:

```
git clone https://github.com/capjamesg/web-calendar
cd web-calendar/
```

Copy the `webcalendar.js` file onto your own website.

Add the following code to theweb page where you want to use the component, before you want to use the component:

```html
<script src="./path/to/webcalendar.js"></script>
```

You can then add the component. To do so, add the following code:

```html
<calendar-element
  data-month="January"
  data-year="2024"
  data-starting-day="Mon"
  data-heading="Days I walked in January">
</calendar-element>
```

Set:

- `data-month`: The month to show. Must be written in full (i.e. `January`, `February`).
- `data-year`: The year to show.
- `data-starting-day`: The first day of the month. Must be `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, or `Sun`.
- `data-heading`: The heading to show at the top of the calendar.

You can set squares to be green by specifying the following code before a `calendar-element` element:

```html
<script>
    var greens = [3, 4];
</script>
```

This is intended for use in applications where you want to track if a goal was completed on a day (i.e. a personal habit tracker).

## License

This project is licensed under an [MIT license](LICENSE).
