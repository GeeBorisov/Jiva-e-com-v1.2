import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const ItemBlock = ({ id, title, price, imageUrl, sizes, weight, description }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [activeSize, setActiveSize] = React.useState(sizes[0]);
  const [activeWeight, setActiveWeight] = React.useState(weight[0]);
  const [activeSizeValue, setActiveSizeValue] = React.useState(sizes[0]?.value);
  const [activeWeightValue, setActiveWeightValue] = React.useState(weight[0]?.value);
  const [pricer, setPricer] = React.useState(activeSize?.price || activeWeight?.price);


  const popupRet = React.useRef();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(popupRet.current)) {
        setIsOpen(false);
      };
    }

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);


  const handleSizeClick = (size) => {
    setActiveSize(size);
    setActiveSizeValue(size.value);
    setPricer(size.price);
  };

  const handleWeightClick = (weight) => {
    setActiveWeight(weight);
    setActiveWeightValue(weight.value);
    setPricer(weight.price);
  };

  React.useEffect(() => {
    const selectedSize = sizes.find((size) => size.value === activeSizeValue);
    const selectedWeight = weight.find((weight) => weight.value === activeWeightValue);

    if (selectedSize && selectedSize.price) {
      setPricer(selectedSize.price);
    } else if (selectedWeight && selectedWeight.price) {
      setPricer(selectedWeight.price);
    }
  }, [activeSizeValue, activeWeightValue, sizes, weight]);

  const cartItem = cartItems.find(
    (item) => item.id === id && item.size === activeSizeValue && item.weight === activeWeightValue,
  );
  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      pricer,
      imageUrl,
      size: activeSizeValue,
      weight: activeWeightValue,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="item-block">
      <img ref={popupRet} onClick={handleImageClick} className="item-block__image" src={imageUrl} alt="" />
      {isOpen && (
        <div className="item-block__popupq">
          <div className='item-block__popupq-content'>
          <h2 className='item-block__popupq-title'>{title}</h2>
          <p className='item-block__popupq-text'>{description}</p>
          <button className='button item-block__popupq-close' onClick={closePopup}>Закрыть</button>
          </div>
        </div>
      )}

      <h4 className="item-block__title">{title}</h4>
      <div className="item-block__selector">
        <ul>
          {sizes.map((size) => (
            <li
              key={size.value}
              onClick={() => handleSizeClick(size)}
              className={activeSizeValue === size.value ? 'active' : ''}>
              {size.value} мл.
            </li>
          ))}
        </ul>
        <ul>
          {weight.map((weight) => (
            <li
              key={weight.value}
              onClick={() => handleWeightClick(weight)}
              className={activeWeightValue === weight.value ? 'active' : ''}>
              {weight.value} гр.
            </li>
          ))}
        </ul>
      </div>
      <div className="item-block__bottom">
        <div className="item-block__price"> {pricer} ₽ </div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"></path>
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default ItemBlock;
