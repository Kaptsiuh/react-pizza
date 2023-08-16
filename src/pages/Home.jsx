import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from '../components/pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector(state => state.filter);
  const sortType = sort.sortProperty;


  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `q=${searchValue}` : '';

    axios.get(`http://localhost:3666/items?_page=${currentPage}&_limit=4&${category}&_sort=${sortBy}&_order=${order}&${search}`)
    .then(res => {
      setItems(res.data);
      setIsLoading(false);
    })
      window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return ( 
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
   );
}