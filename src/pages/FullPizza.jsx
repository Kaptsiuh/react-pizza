import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await  axios.get(`http://localhost:3666/items/` + id);
        setPizza(data);
      } catch (err) {
        alert('Error to get pizza!');
        navigate('/');
      }
    }

    fetchPizza()
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return ( 
    <div className='container'>
      <img src={pizza.imageUrl} alt="Pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
   );
}
 
export default FullPizza;