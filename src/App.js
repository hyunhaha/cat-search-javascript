import SearchingSection from './components/SearchingSection.js';
import ResultsSection from './components/ResultsSection.js';
import { api } from './api.js'
import DetailModal from './components/detailModal.js';
export default class App {
  constructor($target) {
    const searchingSection = new SearchingSection({
      $target,
      onSearch: async (keyword) => {
        //keyword를 받아와서  api에 검색하기
        console.log(keyword)
        const response = await api.fetchCats(keyword)
        console.log(response)
        if (!response.isError) {
          resultsSection.setState(response.data)
        }
      }
    })
    const resultsSection = new ResultsSection({
      $target,
      onClick: (data) => {
        detailModal.setState(data);
      }
    });
    const detailModal = new DetailModal({
      $target
    })

    const darkModeButton = document.createElement('span');
    darkModeButton.className = 'dark-mode-button';
    darkModeButton.innerText = '🌕';
    $target.appendChild(darkModeButton)
  }
}