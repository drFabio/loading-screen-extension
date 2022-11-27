# loading screen

A chrome extension that display new information on every tab!

## Development

Run

```sh
npm run dev
```

Then go to http://127.0.0.1:5173/src/modules/newTab/index.html to check a new tab or http://127.0.0.1:5173/src/modules/options/index.html to check options.

## Loading as unpublished extension

Build

```sh
npm run build
```

Then go to chrome extensions [chrome://extensions/](chrome://extensions/) and open on developer mode.

For more info check the [tutorial](https://developer.chrome.com/docs/extensions/mv2/getstarted/#manifest).

## Tech aspects

This is a series of react apps that compile to a chrome extension through [parcel](https://parceljs.org/).
It has Typescript, Jest and react testing library for testing
