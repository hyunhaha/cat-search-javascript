import { throttling } from './throttle.js'
const throttler = throttling()
const scrollFetch = (fetchData) => {
  window.addEventListener('scroll', () => {
    throttler.throttle(() => {
      console.log('scrollevent');
      if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
      fetchData();
    }, 700)
  })
}
const getScrollTop = () => {
  return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

}
const getDocumentHeight = () => {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(
    body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight
  );
}
export { scrollFetch }