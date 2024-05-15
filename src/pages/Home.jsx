import React from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectFilter, setCategoryId, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/ItemBlock/Skeleton';
import ItemBlock from '../components/ItemBlock';
import Header from '../components/Header';
import { sortList } from '../components/Sort';
import { fetchJivas, selectJivaData } from '../redux/slices/jivaSlice';
import NotFoundFilters from './NotFoundFilters';
import Search from '../components/Search';
// import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectJivaData);
  const { categoryId, sort, searchValue } = useSelector(selectFilter);
  const [currentCategory, setCurrentCategory] = React.useState('Все товары');

  const onChangeCategory = (id, categoryName) => {
    dispatch(setCategoryId(id));
    setCurrentCategory(categoryName);
    if (window.innerWidth <= 460) {
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    } else if (window.innerWidth <= 1370) {
      window.scrollTo({
        top: 540,
        behavior: 'smooth',
      });
    }  else if (window.innerWidth <= 2370) {
      window.scrollTo({
        top: 540,
        behavior: 'smooth',
      });
    }
  };

  const getJivas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(fetchJivas({ sortBy, order, category }));
    // window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    getJivas();
    isSearch.current = false;
  }, [categoryId, sort.sortProperty]);

  const product = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <ItemBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <Header />

      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <div className='sort__wrapper'>
            <Search /> 
            <Sort />
            </div>
          </div>
          <h2 className="content__title">{currentCategory}</h2>
          {status === 'error' ? (
            <div className="content__error-info">
              <h3>Произошла ошибка 😕</h3>
              <p>К сожалению, не удалось получить товары. Попробуйте повторить попытку позже.</p>
            </div>
          ) : (
            <div className="content__items">
              {status === 'loading' ? (
                <div className="content__loading">{skeletons}</div>
              ) : product.length === 0 && searchValue ? (
                <NotFoundFilters />
              ) : (
                product
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
