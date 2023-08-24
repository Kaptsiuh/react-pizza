import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from "../components/Categories";
import { Sort } from "../components/Sort";
import { sortCriteria } from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";
import Pagination from '../components/pagination';
import { SearchContext } from '../App';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const {items, status} = useSelector(state => state.pizza);
  const sortType = sort.sortProperty;
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }
  
  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `q=${searchValue}` : '';

      dispatch(fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }));

    window.scrollTo(0, 0);
  }

    React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });
  
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      
      const sort = sortCriteria.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true
    }
  }, []);

  React.useEffect(() => {
      getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
   );
}