// @flow
export function getPositionFromScroll(el: HTMLElement) {
  let xPos = 0;
  let yPos = 0;

  while (el) {
    if (el.tagName === 'BODY') {
      const xScroll = el.scrollLeft || (document.documentElement && document.documentElement.scrollLeft) || 0;
      const yScroll = el.scrollTop || (document.documentElement && document.documentElement.scrollTop) || 0;

      xPos += el.offsetLeft - xScroll + el.clientLeft;
      yPos += el.offsetTop - yScroll + el.clientTop;
    } else {
      xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPos += el.offsetTop - el.scrollTop + el.clientTop;
    }

    // $FlowFixMe
    el = el.offsetParent;
  }

  return {
    left: xPos,
    top: yPos,
  };
}

export function getPosition(el: HTMLElement) {
  let xPos = 0;
  let yPos = 0;

  while (el) {
    if (el.tagName !== 'BODY') {
      xPos += el.offsetLeft + el.clientLeft;
      yPos += el.offsetTop + el.clientTop;
    }

    // $FlowFixMe
    el = el.offsetParent;
  }

  return {
    left: xPos,
    top: yPos,
  };
}

export function scrollToElement(el: HTMLElement): Promise<void> {
  const elTop = getPosition(el).top;

  return new Promise(resolve => {
    const animate = () => {
      const currentTop = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;

      if (elTop < currentTop + window.innerHeight - 50) {
        resolve();
        return;
      }

      const inc = Math.ceil((elTop - currentTop) / 10);
      const top = currentTop + inc;

      if (currentTop < elTop) {
        window.scrollTo(0, top);
        window.requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };

    animate();
  });
}
