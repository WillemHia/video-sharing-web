export const videoTimeFormat = (time: number) => {
    const seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60);
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}