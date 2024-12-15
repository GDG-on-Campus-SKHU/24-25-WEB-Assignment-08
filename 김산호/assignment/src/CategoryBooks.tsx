import BookCard from './BookCard';
import style from './categoryBooks.module.less';
import { Book } from './types';

type Props = {
  category: string;
  books: Book[];
  handleBookClick: (book: Book) => void;
}

export default function CategoryBooks({category, books, handleBookClick}: Props) {
  return (
    <div className={style.categoryDiv}> 
      <h2 className={style.content}>{category}</h2>
      <div className={style.booksWrapper}>
        {books.map((book, index) => (
          <BookCard index={index} book={book} handleBookClick={handleBookClick}/>
        ))}
      </div>
    </div>
  );
}