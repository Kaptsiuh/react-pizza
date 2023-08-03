import React from 'react';

const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategory = (index) => {
    setActiveCategory(index);
  }

  return ( 
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
        <li onClick={() => onClickCategory(index)} className={activeCategory === index ? 'active' : ''}>
          {value}
        </li>))}
      </ul>
    </div>
   );
}
 
export default Categories;