export const iconMixin = {
  methods: {
    getIcon(icon_name) {
      let icon = ''
      switch (icon_name) {
        case '01d':
          icon = 'sun.png'
          break
        case '01n':
          icon = 'moon.png'
          break
        case '02d':
          icon = 'cloud_sun.png'
          break
        case '02n':
          icon = 'cloud_moon.png'
          break
        case '03d':
        case '03n':
          icon = 'cloud.png'
          break
        case '04d':
        case '04n':
          icon = 'clouds.png'
          break
        case '09d':
        case '09n':
          icon = 'clouds_rain.png'
          break
        case '10d':
          icon = 'sun_raining.png'
          break
        case '10n':
          icon = 'moon_raining.png'
          break
        case '11d':
        case '11n':
          icon = 'storm.png'
          break
        case '13d':
        case '13n':
          icon = 'ice.png'
          break
        case '50d':
        case '50n':
          icon = 'mist.png'
          break
        default:
          break
      }
      return require(`../assets/icons/${icon}`)
    }
  }
}
