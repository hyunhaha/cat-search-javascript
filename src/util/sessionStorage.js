const getItem = (key) => {
  const value = sessionStorage.getItem(key);
  if (key === 'data') return value === null ? null : JSON.parse(value)
  return value === null ? [] : JSON.parse(value)
}
const setItem = (key, value) => {
  if (key === null || value === null) return;
  const toJson = JSON.stringify(value);
  sessionStorage.setItem(key, toJson)

}
export { getItem, setItem }