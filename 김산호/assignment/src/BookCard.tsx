import style from './book.module.less';
import { Book } from './types';

type Props = {
  index: number;
  book: Book;
  handleBookClick: (book: Book) => void;
}


export default function BookCard({index, book, handleBookClick}: Props) {
  return (
    <div key={index} onClick={() => handleBookClick(book)} className={style.bookCard}>
      <img className={style.bookCardImg} src={book.thumbnail} alt={book.title}/>
      <div className={style.bookCardTexts}>
        <h3>{book.title}</h3>
        <h5>{book.authors.join(', ')}</h5>
        <p>{book.price.toLocaleString()}원</p>
      </div>
    </div>
  );
}