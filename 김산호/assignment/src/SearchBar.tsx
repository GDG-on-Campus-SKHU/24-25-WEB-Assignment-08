import style from './searchBar.module.less';

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearchBooks: () => void;
}

export default function SearchBar({searchQuery, setSearchQuery, onSearchBooks}: Props) {
  return (
    <div className={style.searchBar}>
      <input className={style.searchInput} type="text" placeholder="책 제목, 저자를 검색하세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <button className={style.searchButton} onClick={onSearchBooks}>
        <svg width={26} viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e" fill="white">
          <g>
            <path
              d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
      </button>
    </div>
  )
}