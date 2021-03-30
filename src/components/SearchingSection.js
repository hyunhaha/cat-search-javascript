export default class SearchBar {
  constructor({ $target, onSearch }) {
    this.onSearch = onSearch
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
  searchKeyword(keyword) {
    if (keyword.length === 0) return;
    this.onSearch(keyword)
  }
  render() {
    this.section.innerHTML = '';

    const wapper = document.createElement('div');
    wapper.className = 'search-box-wapper';

    const searchBox = document.createElement('input');
    searchBox.className = 'search-box';
    searchBox.placeholder = 'Enter keyword';

    const recentKeywords = document.createElement('div');
    recentKeywords.className = 'recent-keywords';

    searchBox.addEventListener('focus', () => this.deleteKeyword())
    searchBox.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        console.log('Enter');
        this.searchKeyword(searchBox.value)

      }
    });

    wapper.appendChild(searchBox);
    wapper.appendChild(recentKeywords)
    this.section.appendChild(wapper)
  }
}