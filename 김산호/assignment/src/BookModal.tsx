import style from './bookModal.module.less'
import { Book } from './types';

type Props = {
  selectedBook: Book;
  closeBookModal: () => void;
}

export default function BookModal({selectedBook, closeBookModal}: Props) {
  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <button className={style.closeButton} onClick={closeBookModal}>x</button>
        <div className={style.modalTop}>
          <img src={selectedBook.thumbnail} alt={selectedBook.title} className={style.bookImg}/>
          <div className={style.modalTopInfo}>
            <h2>{selectedBook.title}</h2>
            <p><strong>저자:</strong> {selectedBook.authors.join(', ')}</p>
            <p><strong>출판사:</strong> {selectedBook.publisher}</p>
            <p><strong>가격:</strong> {selectedBook.price.toLocaleString()}원</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
          </div>
        </div>
        <p className={style.modalBottom}>{selectedBook.contents}</p>
      </div>
    </div>
  );
}