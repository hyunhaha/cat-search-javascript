export function lazyLoad() {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  console.log(lazyImages)
  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver(function (entries, observer) {

      entries.forEach((entry) => {
        if (entry.isIntersecting) {//타겟 엘리먼트가 교차 영역에 있는 동안 true를 반환하고, 그 외의 경우 false를 반환합니다.
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);//IntersectionObserver.unobserve(targetElement)타겟 엘리먼트에 대한 관찰을 멈추고 싶을 때 사용하면 됩니다. 예를 들어 Lazy-loading(지연 로딩)을 할 때는 한 번 처리를 한 후에는 관찰을 멈춰도 됩니다.
        }
      });
    });
    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);//IntersectionObserver.observe(targetElement)타겟 엘리먼트에 대한 IntersectionObserver를 등록할 때(관찰을 시작할 때) 사용합니다.
    });
  }
}