export default class Banner {
  constructor({ $target, onRandom }) {
    this.onRandom = onRandom;

    this.data = null;
    this.items = null;

    this.isMoving = false;
    this.current = 0;

    this.section = document.createElement('section');
    this.section.className = 'banner-section';
    $target.appendChild(this.section);

    document.addEventListener('DOMContentLoaded', () => {
      this.onRandom();
    });

  }

  getData(data) {
    this.data = data.splice(0, 5);
    this.render();
    this.init();
  }

  disableInteraction() {
    this.isMoving = true;
    setTimeout(() => {
      this.isMoving = false;
    }, 500);
  }

  moveNext() {
    if (!this.isMoving) {
      this.disableInteraction();
      if (this.current === (this.data.length - 1)) {
        this.current = 0;
      } else {
        this.current++;
      }
      this.slide();
    }
  }
  movePrev() {
    if (!this.isMoving) {
      this.disableInteraction();
      if (this.current === 0) {
        this.current = this.data.length - 1;
      } else {
        this.current--;
      }
      this.slide();
    }
  }

  setEventListener(e) {
    const targetName = e.target.className;
    targetName === 'right' ? this.moveNext() : this.movePrev()
  }

  init() {
    this.isMoving = false;
    this.items = this.section.querySelectorAll('.image-wrap');
    this.items[this.items.length - 1].classList.add('prev');
    this.items[0].classList.add('current');
    this.items[1].classList.add('next');
  }

  slide() {
    const container = document.querySelector('.image-container');
    let displayWidth = container.parentElement.clientWidth;

    let position = displayWidth * this.current * -1;

    container.style.transform = `translateX(${position}px)`

  }

  render() {
    if (!this.data) return;
    const display = document.createElement('div');
    display.className = 'display';
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    this.data.map((data) => {
      const imageWrap = document.createElement('div');
      imageWrap.className = 'image-wrap';
      const randomImage = document.createElement('img');
      randomImage.className = 'random-image';
      randomImage.src = data.url;

      imageWrap.appendChild(randomImage)
      imageContainer.appendChild(imageWrap);

    });
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    const button1 = document.createElement('button');
    button1.className = 'left';
    button1.innerText = '<';

    const button2 = document.createElement('button');
    button2.className = 'right';
    button2.innerText = '>';

    buttons.addEventListener('click', (event) => this.setEventListener(event))
    buttons.appendChild(button1);
    buttons.appendChild(button2);



    this.section.style.opacity = 1;
    display.appendChild(imageContainer)
    display.appendChild(buttons)
    this.section.appendChild(display);
    // this.section.appendChild(buttons);
  }
}