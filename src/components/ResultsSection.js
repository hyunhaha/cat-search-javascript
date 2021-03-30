import Card from './Card.js'
export default class ResultsSection {
  constructor({ $target }) {
    this.data = null
    this.section = document.createElement('section');
    this.section.className = 'results-section';
    $target.appendChild(this.section)

    this.render()
  }
  setState(data) {
    this.data = data;
    this.render();


  }

  render() {
    if (!this.data) return;
    this.section.innerHTML = '';
    if (this.data.length > 0) {
      const cardContainer = document.createElement('div');
      cardContainer.className = 'card-container';
      this.data.map(cat => {
        new Card({ $target: cardContainer, data: cat })
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