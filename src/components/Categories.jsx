import React from 'react';

const Categories = ({id}) => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Гриль', 'Острые', 'Закрытые']

  return ( 
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
        <li 
          key={index} 
          onClick={() => setActiveCategory(index)} 
          className={activeCategory === index ? 'active' : ''}>
          {value}
        </li>))}
      </ul>
    </div>
   );
}
 
export default Categories;