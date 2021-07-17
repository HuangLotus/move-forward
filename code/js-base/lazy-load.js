function checkImgs() {
  const imgs = document.querySelectorAll('.my-photo');
  Array.from(imgs).forEach(el => {
    if (isInSight(el)) {
      loadImg(el);
    }
  })
}

function loadImg(el) {
  if (!el.src) {
    const source = el.dataset.src;
    el.src = source;
  }
}

function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //const clientWidth = window.innerWeight;
  return bound.top <= clientHeight + 100;
}