export function toCelsius(ferenheit) {
  return Math.round(((ferenheit - 32) * 5) / 9);
}
export function setLS(key, data) {
  const dataToSet = JSON.stringify(data);
  localStorage.setItem(key, dataToSet);
}
export function getLS(key) {
  const dataToGet = localStorage.getItem(key);
  return JSON.parse(dataToGet);
}
export function clearCache() {
  const timeSinceLastFetch = Date.now() - getLS('lastCached');
  if (timeSinceLastFetch >= 300000) {
    localStorage.removeItem('weatherData');
  }
}
