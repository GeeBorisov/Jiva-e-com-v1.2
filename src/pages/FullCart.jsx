import React from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullCart = () => {
  const [jivaCarts, setJivaCarts] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchJivaCarts() {
      try {
        const { data } = await axios.get('https://6566ee3064fcff8d730f5568.mockapi.io/item/' + id);
        setJivaCarts(data);
      } catch (error) {
        alert('Error!!!');
        navigate('/');
      }
    }
    fetchJivaCarts();
  }, [id, navigate]);
  return (
    <div className="container">
      {jivaCarts ? (
        <>
          <div className="fullCart__wrapper">
            <img src={jivaCarts.imageUrl} alt="" />
            <div className="fullCart__right">
              <h2>{jivaCarts.title}</h2>
              <p>{jivaCarts.description}</p>
              <Link to='/'><button className='button button--fullCart__button'>Назад в магазин</button></Link>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FullCart;
