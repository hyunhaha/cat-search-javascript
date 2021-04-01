import SearchingSection from './components/SearchingSection.js';
import ResultsSection from './components/ResultsSection.js';
import DetailModal from './components/detailModal.js';
import Loading from './components/Loading.js';
import { api } from './api.js'
import { getItem, setItem } from './util/sessionStorage.js'
export default class App {
  constructor($target) {
    const keywords = getItem('keywords');
    const data = getItem('data')

    const searchingSection = new SearchingSection({
      $target,
      keywords,
      onSearch: async (keyword) => {
        //keyword를 받아와서  api에 검색하기
        console.log(keyword)
        loading.toggleSpinner();
        const response = await api.fetchCats(keyword);
        console.log(response)
        if (!response.isError) {
          resultsSection.setState(response.data)
          loading.toggleSpinner()
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
    const loading = new Loading({
      $target
    })

    const darkModeButton = document.createElement('span');
    darkModeButton.className = 'dark-mode-button';
    darkModeButton.innerText = '🌕';
    $target.appendChild(darkModeButton)
  }
}