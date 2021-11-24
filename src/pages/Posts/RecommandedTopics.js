import React from 'react';
import Sticky from 'react-sticky-el';

const RecommandedTopics = (props) => {
  const { newClass, categories } = props;

  return (
    <div className={`recommandedTopics ${newClass ? newClass : ''}`}>
      <Sticky
        boundaryElement='.block'
        topOffset={40}
        stickyClassName={'recommandedTopics__sticky'}
      >
        <div className='recommandedTopics__title'>Recommanded Topics</div>
        <div className='recommandedTopics__topics'>
          {categories?.map((category) => {
            return (
              <div className='recommandedTopics__topic' key={category?._id}>
                {category?.category}
              </div>
            );
          })}
        </div>
      </Sticky>
    </div>
  );
};

export default RecommandedTopics;
