export default s => {
    if (s === 0) return '00:00'
    let minutes = Math.floor(s/60)
    let lastSeconds = Math.floor(s-minutes*60)
    if (minutes >= 60) {
        let hours = Math.floor(minutes/60)
        let lastMinutes = Math.floor(minutes-hours*60)
        if (String(hours).length < 2) {
            hours = `0${hours}`
        }
        if (String(lastMinutes).length < 2) {
            lastMinutes = `0${lastMinutes}`
        }
        if (String(lastSeconds).length < 2) {
            lastSeconds = `0${lastSeconds}`
        }
        return `${hours}:${lastMinutes}:${lastSeconds}`
    }
    if (String(minutes).length < 2) {
        minutes = `0${minutes}`
    }
    if (String(lastSeconds).length < 2) {
        lastSeconds = `0${lastSeconds}`
    }
    return `${minutes}:${lastSeconds}`
} 
