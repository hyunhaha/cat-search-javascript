import { setItem } from '../util/sessionStorage.js';

export default class SearchBar {
  constructor({ $target, keywords, onSearch, onRandom }) {
    this.recentSearchWords = keywords;
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    this.section = document.createElement('section');
    this.section.className = 'searching-section';

    $target.appendChild(this.section);
    this.render();
    this.focusSeachBox()
  }

  focusSeachBox() {
    const searchBox = document.querySelector('.search-box');
    searchBox.focus()
  }
  deleteKeyword() {
    const searchBox = document.querySelector('.search-box');
    searchBox.value = ''
  }
  addRecentKeyword(keyword) {
    if (this.recentSearchWords.includes(keyword)) return;
    if (this.recentSearchWords.length === 5) this.recentSearchWords.shift();
    this.recentSearchWords.push(keyword);
    setItem('keywords', this.recentSearchWords);
    this.render()
  }
  searchKeyword(keyword) {
    if (keyword.length === 0) return;
    this.addRecentKeyword(keyword)
    this.onSearch(keyword)
  }
  render() {
    this.section.innerHTML = '';

    const randomButton = document.createElement('button');
    randomButton.className = 'random-button';
    randomButton.innerText = '😺'

    const wapper = document.createElement('div');
    wapper.className = 'search-box-wrapper';

    const searchBox = document.createElement('input');
    searchBox.className = 'search-box';
    searchBox.placeholder = 'Enter keyword';

    const recentKeywords = document.createElement('div');
    recentKeywords.className = 'recent-keywords';

    const recentKeywordsTitle = document.createElement('div');
    recentKeywordsTitle.className = 'recent-keywords-title'
    recentKeywordsTitle.innerText = '최근 검색어';

    recentKeywords.appendChild(recentKeywordsTitle)


    this.recentSearchWords.map(keyword => {
      const link = document.createElement('span');
      link.className = 'keyword';
      link.innerText = keyword;

      recentKeywords.appendChild(link)

      link.addEventListener('click', () => {
        this.searchKeyword(keyword);
      })
    })

    randomButton.addEventListener('click', () => { this.onRandom() })

    searchBox.addEventListener('focus', () => this.deleteKeyword());
    searchBox.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        this.searchKeyword(searchBox.value)

      }
    });

    wapper.appendChild(randomButton);
    wapper.appendChild(searchBox);
    this.section.appendChild(wapper);
    this.section.appendChild(recentKeywords);
  }
}