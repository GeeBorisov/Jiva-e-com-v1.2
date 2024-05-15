import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice';
import { selectSort } from '../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности ↓', sortProperty: 'rating' },
  { name: 'популярности ↑', sortProperty: '-rating' },
  { name: 'цене ↓', sortProperty: 'price' },
  { name: 'цене ↑', sortProperty: '-price' },
  { name: 'алфавиту ↓', sortProperty: 'title' },
  { name: 'алфавиту ↑', sortProperty: '-title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef();

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg height="22" viewBox="0 0 21 21" width="22" xmlns="http://www.w3.org/2000/svg">
          <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(2 4)">
            <path d="m8.5 8.5 4 4.107 4-4.107" />
            <path d="m8.5 4.5-4-4-4 3.997" />
            <path d="m4.5.5v12" />
            <path d="m12.5.5v12" />
          </g>
        </svg>
        {/* <b>Сортировка по:</b> */}
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
