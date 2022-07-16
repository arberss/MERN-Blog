import React from 'react';

const RecommandedTopics = (props) => {
  const { newClass, categories, handleCategory, categorySelected } = props;

  return (
    <div className={`recommandedTopics ${newClass ? newClass : ''}`}>
      <div className='recommandedTopics__title'>Recommanded Topics</div>
      <div className='recommandedTopics__topics'>
        {categories?.map((category) => {
          return (
            <div
              className={`recommandedTopics__topic ${
                categorySelected?.name?.toLowerCase() ===
                category?.category?.toLowerCase()
                  ? 'recommandedTopics__topic-active'
                  : ''
              }`}
              key={category?._id}
              onClick={() =>
                handleCategory({ name: category?.category, id: category?._id })
              }
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
