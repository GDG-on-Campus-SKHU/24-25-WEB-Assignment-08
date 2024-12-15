import React, { useState, useEffect } from 'react';
import { Book } from './types';
import axios from 'axios';
import style from './app.module.less';
import { useInView } from "react-intersection-observer";
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import BookModal from './BookModal';
import CategoryBooks from './CategoryBooks';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [novels, setNovels] = useState<Book[]>([]);
  const [essays, setEssays] = useState<Book[]>([]);
  const [economies, setEconomies] = useState<Book[]>([]);
  const [developments, setDevelopments] = useState<Book[]>([]);
  const [healths, setHealths] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const KAKAO_API_KEY = import.meta.env.VITE_SERVICE_KEY;
  
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
      getSearchBooks();
    }
  }, [inView]);

  useEffect(() => {
    getNovels();
    getEssays();
    getEconomies();
    getDevelopments();
    getHealths();
  }, []);
  
  const getNovels = async () => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          query: '소설',
          size: 5
        }
      });
      setNovels(response.data.documents);
    } catch (error) {
      console.error('책 로딩 중 오류:', error);
    }
  };

  const getEssays = async () => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          query: '에세이',
          size: 5
        }
      });
      setEssays(response.data.documents);
    } catch (error) {
      console.error('책 로딩 중 오류:', error);
    }
  };

  const getEconomies = async () => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          query: '경제',
          size: 5
        }
      });
      setEconomies(response.data.documents);
    } catch (error) {
      console.error('책 로딩 중 오류:', error);
    }
  };

  const getDevelopments = async () => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          query: '프론트엔드',
          size: 5
        }
      });
      setDevelopments(response.data.documents);
    } catch (error) {
      console.error('책 로딩 중 오류:', error);
    }
  };

  const getHealths = async () => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          query: '건강',
          size: 5
        }
      });
      setHealths(response.data.documents);
    } catch (error) {
      console.error('책 로딩 중 오류:', error);
    }
  };

  const getSearchBooks = async () => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v3/search/book`, {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          query: searchQuery,
          page: page,
          size: 10
        }
      });
      setSearchedBooks([...searchedBooks, ...response.data.documents]);
    } catch (error) {
      console.error('책 검색 중 오류:', error);
    }
  };

  const onSearchBooks = () => {
    setSearchedBooks([]);
    getSearchBooks();
    setIsSearching(true);
  }

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const closeBookModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className={style.main}>
      <div className={style.header}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchBooks={onSearchBooks}/>
      </div>
      {isSearching ? (
        <div>
          <h2 className={style.content}>검색결과</h2>
          <div className={style.booksWrapper}>
          {searchedBooks.map((book, index) => (
            <BookCard index={index} book={book} handleBookClick={handleBookClick}/>
          ))}
          </div>
          <div ref={ref} style={{height: 50}}/>
        </div>
        ) :
        <>
          <CategoryBooks category={"📖소설"} books={novels} handleBookClick={handleBookClick}/>
          <CategoryBooks category={"🖊️에세이"} books={essays} handleBookClick={handleBookClick}/>
          <CategoryBooks category={"📈경제"} books={economies} handleBookClick={handleBookClick}/>
          <CategoryBooks category={"💻개발"} books={developments} handleBookClick={handleBookClick}/>
          <CategoryBooks category={"❤️건강"} books={healths} handleBookClick={handleBookClick}/>
        </>
      }
      {selectedBook && (
        <BookModal selectedBook={selectedBook} closeBookModal={closeBookModal}/>
      )}
    </div>
  );
};
