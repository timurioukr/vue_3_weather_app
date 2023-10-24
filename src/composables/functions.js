// Set average date from all dates
export const setAverageData = (data) => {
  const uniqueDays = {}
  data.forEach(entry => {
    const date = new Date(entry.dt * 1000)
    const dayKey = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`
    const dayOfWeek = setCurrentDataFormat(entry.dt)
    const time = date.getHours()
    if (!uniqueDays[dayKey]) {
      uniqueDays[dayKey] = {
        date: dayKey,
        title: dayOfWeek,
        weather: { description: entry.weather[0].description, icon: entry.weather[0].icon },
        day: { averageFeelsLike: 0, averageTemp: 0, temps: [] },
        night: { averageFeelsLike: 0, averageTemp: 0, temps: [] }
      }
    }
    if (time >= 6 && time <= 18) uniqueDays[dayKey].day.temps.push({ [`${time.toString().padStart(2, '0')}:00`]: entry.main.temp })
    else uniqueDays[dayKey].night.temps.push({ [`${time.toString().padStart(2, '0')}:00`]: Math.round(entry.main.temp) })
  })

  for (const dayKey in uniqueDays) {
    const dayData = uniqueDays[dayKey]
    dayData.day.averageTemp = setCurrentAverageTempFormat(dayData.day)
    dayData.night.averageTemp = setCurrentAverageTempFormat(dayData.night)
    dayData.day.averageFeelsLike = setCurrentAverageTempFormat(dayData.day)
    dayData.night.averageFeelsLike = setCurrentAverageTempFormat(dayData.night)
  }
  return Object.values(uniqueDays)
}

// Set current date format for visualization
export const setCurrentDataFormat = (value) => {
  const lang = localStorage.getItem('lang') || 'ua' 
  const correctLangFormat = lang === 'ua' ? 'uk-UA' : 'en-US'
  const currentDate = new Date(value * 1000)
  const result = {
    name: currentDate.toLocaleDateString(correctLangFormat, { weekday: 'long' }),
    date: currentDate.toLocaleDateString(correctLangFormat, { day: 'numeric', month: 'long', year: 'numeric' }),
  }
  return result
}

// Set current average temps
export const setCurrentAverageTempFormat = (value) => {
  return Math.round(value.temps.reduce((acc, temp) => {
    return acc + Object.values(temp)[0]
  }, 0) / value.temps.length)
}