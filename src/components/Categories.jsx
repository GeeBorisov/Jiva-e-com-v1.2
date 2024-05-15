import React from 'react';



const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Масла', 'Пасты / Урбечи', 'Мука', 'Жмых'];

  return (
    <div className="categories">
      <ul className="categories__list">
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i, categoryName)}

            className={value === i ? 'categories__list-item active' : 'categories__list-item'}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;


