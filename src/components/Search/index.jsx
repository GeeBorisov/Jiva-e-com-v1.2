import React from 'react';
import { debounce } from 'lodash';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();
  // const location = useLocation();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useMemo(
    () =>
      debounce((str) => {
        dispatch(setSearchValue(str));
      }, 350),
    [setSearchValue],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  
  };

  const handleClick = () => {
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



  return (
    <>
      <div className="search">
        <svg
          className="search__icon"
          enableBackground="new 0 0 32 32"
          height="32px"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px"
          xmlns="http://www.w3.org/2000/svg">
          <g id="search_magnifier_magnifying_glass_loupe">
            <g id="search_funds_x2C__magnifying_glass_x2C__magnifier_x2C__loupe_1_">
              <g id="analysis_2_">
                <g>
                  <g>
                    <g>
                      <path
                        d="M23.586,23.586c0.122-0.122,0.262-0.217,0.408-0.299l-2.276-2.277c-0.195-0.195-0.512-0.195-0.707,0        c-0.195,0.196-0.195,0.512,0,0.708l2.271,2.271C23.368,23.846,23.464,23.707,23.586,23.586z"
                        fill="rgb(253, 199, 49)"
                      />
                      <path
                        d="M28.5,31c-0.667,0-1.295-0.26-1.768-0.732l-3.5-3.5C22.76,26.295,22.5,25.668,22.5,25        s0.26-1.295,0.732-1.768c0.906-0.906,2.629-0.906,3.535,0l3.5,3.5C30.74,27.205,31,27.832,31,28.5s-0.26,1.295-0.732,1.768        S29.167,31,28.5,31z M25,23.52c-0.407,0-0.793,0.152-1.061,0.42C23.656,24.223,23.5,24.6,23.5,25s0.156,0.777,0.439,1.061        l3.5,3.5c0.567,0.566,1.554,0.566,2.121,0C29.844,29.277,30,28.9,30,28.5s-0.156-0.777-0.439-1.061l-3.5-3.5        C25.793,23.672,25.407,23.52,25,23.52z"
                        fill="rgb(253, 199, 49)"
                      />
                    </g>
                    <g>
                      <path
                        d="M13,22.45c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5c3.767,0,7.035-2.404,8.133-5.981        c0.081-0.264,0.361-0.415,0.625-0.331c0.264,0.081,0.413,0.36,0.332,0.624C20.861,19.763,17.209,22.45,13,22.45z"
                        fill="rgb(184, 139, 17)"
                      />
                    </g>
                    <path
                      d="M13,25C6.383,25,1,19.617,1,13S6.383,1,13,1s12,5.383,12,12S19.617,25,13,25z M13,2       C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z"
                      fill="rgb(253, 199, 49)"
                    />
                  </g>
                </g>
              </g>
            </g>
            <circle cx="22" cy="13" fill="rgb(184, 139, 17)" r="0.5" />
          </g>
        </svg>
        <input
          ref={inputRef}
          onClick={handleClick}
          value={value}
          onChange={onChangeInput}
          className="search__input"
          placeholder="Поиск..."
        />
        {value && (
          <svg
            onClick={onClickClear}
            className="search__clear-icon"
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
              fill="rgb(253, 199, 49)"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default Search;
