import React from 'react';
import { Link,  useParams  } from 'react-router-dom';
import styles from './OrderSuccessBlock.module.scss';

const OrderSuccessBlock = ( ) => {
  const { orderNumber } = useParams();

  return (
    <div>
      <div className={styles.root}>
        <h1 className={styles.description}>
          <span>👍</span>
          <br />
          Заказ создан, скоро с вами свяжется наш менеджер
        </h1>
        <span>Номер вашего заказ: {orderNumber} </span>
        <Link to="/">
          <button className='button button--orderBack'>Вернуться в магазин</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessBlock;
