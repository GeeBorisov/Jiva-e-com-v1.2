import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../components/CartItem';
import { clearItems, selectCart } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const handleClick = () => {
    // Создание массива объектов с данными о товарах в корзине
    const itemsInCart = items.map(item => ({
      title: item.title,
      size: item.size,
      weight: item.weight,
      count: item.count,
      priceCoutn: item.pricer * item.count,
    }));

    // Перенаправление на страницу OrderForm с передачей данных о товарах
    navigate('/order', {
      state: {
        itemsInCart,
        totalPrice,
      },
    });
  };


  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }
  return (
    <div className="section-cart">
      <div className="container">
        <div className="section-cart__header">
          <h2 className="title-1">Корзина товаров</h2>
        </div>
        <div className="section-cart__body">
          <div className="cart">
            <div className="cart-header">
              <div className="cart-header__title">наименование</div>
              <div className="cart-header__count">количество</div>
              <div className="cart-header__cost">стоимость</div>
            </div>

            {items.map((item, index) => (
              <CartItem
                key={index}
                id={item.id}
                title={item.title}
                pricer={item.pricer}
                size={item.size}
                weight={item.weight}
                count={item.count}
                imageUrl={item.imageUrl}
                selectedSizeValue={item.selectedSizeValue}
                selectedWeightValue={item.selectedWeightValue}
              />
            ))}

            <div className="cart-footer">
              <div className="cart-footer__count">{totalCount} шт.</div>
              <div className="cart-footer__price">{totalPrice} ₽</div>
            </div>

            <div className="cart__btns">
              <Link to="/" className="button btn-back">
                <span>Вернуться назад</span>
              </Link>
              <button onClick={onClickClear} className="button button--remove">
                Очистить корзину
              </button>
              <button onClick={handleClick} className="button pay-btn">
                <span>Перейти к оплате</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
