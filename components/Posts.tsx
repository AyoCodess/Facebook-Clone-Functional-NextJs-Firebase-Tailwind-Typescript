import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import { Post } from '../components';

import React from 'react';

export const Posts = () => {
  const [realTimePostsNoImage, loadingOne, errorOne] = useCollection(
    collection(db, 'posts')
  );

  const [realTimePostsWithImage, loadingTwo, errorTwo] = useCollection(
    collection(db, 'postsWithPhotos')
  );

  let realTimePosts = null;
  let postsNoImages = null;
  let postsWithImages = null;

  if (realTimePostsNoImage) {
    postsNoImages = realTimePostsNoImage.docs.map((doc) => doc.data());
  }

  if (realTimePostsWithImage) {
    postsWithImages = realTimePostsWithImage.docs.map((doc) => doc.data());
  }

  if (postsWithImages instanceof Array && postsNoImages instanceof Array) {
    realTimePosts = [...postsNoImages, ...postsWithImages].sort((a, b) => {
      return b.timestamp.seconds - a.timestamp.seconds;
    });
  }

  return (
    <div>
      {realTimePosts &&
        realTimePosts.map((post, i) => {
          return (
            <Post
              key={i}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.imageURL}
            />
          );
        })}
    </div>
  );
};
