import React from 'react';
import FeedMenu from './FeedMenu';

const { REACT_APP_WEB_API_IMG_URL } = process.env;

const FeedsList = (props) => {
  const { data } = props;

  return data.map((feed) => {
    const nameInitials = feed.creator.name.split(' ');

    return (
      <div className='feedsCard'>
        <div className='feedsCard__top'>
          <div className='feedsCard__top-left'>
            {feed?.creator?.imageUrl ? (
              <img
                src={`${REACT_APP_WEB_API_IMG_URL}${feed.creator?.imageUrl}`}
                className='feedsCard__top-left-img'
                alt=''
              />
            ) : (
              <div className='feedsCard__top-left-noimg'>
                {nameInitials?.length < 2
                  ? `${nameInitials?.[0]?.charAt(0)}`
                  : `${nameInitials?.[0]?.charAt(
                      0
                    )} ${nameInitials?.[1]?.charAt(0)}`}
              </div>
            )}
            <div className='feedsCard__top-left-name'>
              {feed?.creator?.name}
            </div>
          </div>
          <div className='feedsCard__top-right'>
            <FeedMenu />
          </div>
        </div>
        <div className='feedsCard__content'>
          <div className='feedsCard__content-title'>{feed?.title}</div>
          <img
            src={`${REACT_APP_WEB_API_IMG_URL}${feed?.imageUrl}`}
            className='feedsCard__content-img'
            alt=''
          />
        </div>
        <div className='feedsCard__line'></div>
      </div>
    );
  });
};

export default FeedsList;
