import React from 'react';

const RecommandedTopics = (props) => {
  const { newClass, categories, handleCategory } = props;

  return (
    <div className={`recommandedTopics ${newClass ? newClass : ''}`}>
      <div className='recommandedTopics__title'>Recommanded Topics</div>
      <div className='recommandedTopics__topics'>
        <div
          className='recommandedTopics__topic'
          onClick={() => handleCategory()}
        >
          All
        </div>
        {categories?.map((category) => {
          return (
            <div
              className='recommandedTopics__topic'
              key={category?._id}
              onClick={() => handleCategory(category?._id)}
            >
              {category?.category}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommandedTopics;
