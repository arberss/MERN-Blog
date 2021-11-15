import React from 'react';
import Sticky from 'react-sticky-el';

const RecommandedTopics = (props) => {
  const { newClass } = props;

  return (
    <div className={`recommandedTopics ${newClass ? newClass : ''}`}>
      <Sticky
        boundaryElement='.block'
        topOffset={40}
        stickyClassName={'recommandedTopics__sticky'}
      >
        <div className='recommandedTopics__title'>Recommanded Topics</div>
        <div className='recommandedTopics__topics'>
          <div className='recommandedTopics__topic'>Technology</div>
          <div className='recommandedTopics__topic'>Money</div>
          <div className='recommandedTopics__topic'>Business</div>
        </div>
      </Sticky>
    </div>
  );
};

export default RecommandedTopics;
