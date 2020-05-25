// this functions returns a readable string with calculated hours, minutes and seconds of given miliseconds
export const calculateVideoDuration = duration => {
    duration = Number(duration);
    let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    return hours !== '00' ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds
}