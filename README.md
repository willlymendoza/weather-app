# WeatherApp

Made with:
HTML
CSS
JAVASCRIPT
VUE.JS v2.6.11
VUETIFY v2.2.11

This application allows you to know the current weather based on your location, city or country.

Look at the [App Preview](https://weatherapp-by-willy.netlify.app/).

For the operation of this app, the https://openweathermap.org/ API was used as the source of weather data and the API of https://ipgeolocation.io/ to detect the user's current location.

Follow the instructions below to start using this application:

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Create API accounts

After having installed all the dependencies based on the previous instructions, you need to register on both pages https://openweathermap.org/ and https://ipgeolocation.io/ to get your access keys for each one.

## Create .env file

Once you have your access keys to these APIs, you need to create an .env file in the root directory of the application and then put the following data in it:

```
VUE_APP_GEO_LOCATION_KEY='your ipgeolocation access key'
VUE_APP_GEO_LOCATION_URI='https://api.ipgeolocation.io/ipgeo'
VUE_APP_WEATHER_KEY='your openweathermap access key'
VUE_APP_WEATHER_URI='https://api.openweathermap.org/data/2.5/'
```

## You're Done!!!

Start using this app and feel free to modify it if you want.
