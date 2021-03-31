import Card from './Card.js'
export default class ResultsSection {
  constructor({ $target, onClick }) {
    this.data = null
    this.onClick = onClick;
    this.section = document.createElement('section');
    this.section.className = 'results-section';
    $target.appendChild(this.section)

    this.render()
  }
  setState(data) {
    this.data = data;
    this.render();


  }
  findCatByID(id) {
    const result = this.data.find(cat => cat.id === id);
    console.log(result)
    return result
  }
  render() {
    if (!this.data) return;
    this.section.innerHTML = '';
    if (this.data.length > 0) {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';
      this.data.map(cat => {
        new Card({ $target: cardContainer, data: cat })
      });
      cardContainer.addEventListener('click', e => {
        console.log(e.path[0].className)
        console.log('clicked')
        const path = e.path;
        const card = path.find(e => e.className === 'card');
        if (card) {
          console.log(card)
          console.log(card.dataset.id)
          const id = card.dataset.id;
          const catInfo = this.findCatByID(id);
          this.onClick(catInfo);
        }
      })
      this.section.appendChild(cardContainer);
    } else {
      const noticeSection = document.createElement('section');
      noticeSection.className = 'notice-section';

      const notice = document.createElement('h2');
      notice.className = 'notice';
      notice.innerText = '검색결과가 없습니다.'

      const noticeImage = document.createElement('img');
      noticeImage.className = 'notice-image';

      noticeSection.appendChild(notice);
      noticeSection.appendChild(noticeImage)
      this.section.append(noticeSection);
    }
  }
}