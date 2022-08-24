import React, { useState, useEffect, useContext } from 'react';
import {
  Query,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { LoadingSpinner, Post } from '../components';
import { useSession, getSession } from 'next-auth/react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';

// used when firebase quota has been exceeded
const testData = [
  {
    name: 'Ayo',
    message: 'post.message',
    email: 'post.email',
    timestamp: 54534534545,
    image: 'https://i.imgur.com/fKt5tuD.jpg',
    imageURL: 'https://i.imgur.com/yYI0g50.png',
  },
  {
    name: 'chris',
    message: 'post.message',
    email: 'post.email',
    timestamp: 54534534545,
    image: 'https://i.imgur.com/fKt5tuD.jpg',
    imageURL: 'https://i.imgur.com/KfrhNKl.pnge',
  },
  {
    name: 'ruban',
    message: 'post.message',
    email: 'post.email',
    timestamp: 54534534545,
    image: 'https://i.imgur.com/fKt5tuD.jpg',
    imageURL: 'https://i.imgur.com/FRIs3ds.png?',
  },
];

interface Props {
  forceUpdate: boolean;
}

export const Posts = () => {
  const { data: session } = useSession();
  const [realTimePosts, setRealTimePosts] = useState<any[] | null>(null);
  const { theme } = useContext(ThemeContext);
  const {
    setShow,
    setTitle,
    setDescription,
    viewEveryonesPosts,
    forceUpdate,
    loading,
    setLoading,
  } = useContext(DataContext);

  useEffect(() => {
    getUserSession();
  }, [forceUpdate, viewEveryonesPosts]);

  const getUserSession = async () => {
    const theSession = await getSession();
    if (theSession) {
      getUserPostsFromFirebase();
    }
  };

  const useGetUserPostsFromFirebase = async (
    isQuery: 'individual' | 'everyone'
  ) => {
    setLoading(true);
    // gets individual user posts by EMAIL or everyones posts from firebase
    let queryByEmailNoPhotos: Query<DocumentData>;
    let queryByEmailPhotos: Query<DocumentData>;

    if (isQuery === 'individual') {
      queryByEmailNoPhotos = query(
        collection(db, 'posts'),
        where('email', '==', session?.user?.email)
      );
      queryByEmailPhotos = query(
        collection(db, 'postsWithPhotos'),
        where('email', '==', session?.user?.email)
      );
    }

    if (isQuery === 'everyone') {
      queryByEmailNoPhotos = collection(db, 'posts');
      queryByEmailPhotos = collection(db, 'postsWithPhotos');
    }

    const dataPostsWithNoPhotos = await getDocs(queryByEmailNoPhotos!);
    const dataPostsWithPhotos = await getDocs(queryByEmailPhotos!);

    let postsWithNoPhotosArray: Array<any> = [];
    let postsWithPhotosArray: Array<any> = [];

    dataPostsWithNoPhotos.forEach((doc: any) => {
      postsWithNoPhotosArray.push(doc.data());
    });

    dataPostsWithPhotos.forEach((doc: any) => {
      postsWithPhotosArray.push(doc.data());
    });

    const combined = [...postsWithNoPhotosArray, ...postsWithPhotosArray];

    const allPosts = combined.sort(
      (a, b) => b.timestamp.seconds - a.timestamp.seconds
    );
    setRealTimePosts(allPosts);
    setLoading(false);
  };

  const getUserPostsFromFirebase = async () => {
    setRealTimePosts(null);

    try {
      if (session?.user?.email && !viewEveryonesPosts) {
        useGetUserPostsFromFirebase('individual');
      }

      if (viewEveryonesPosts) {
        useGetUserPostsFromFirebase('everyone');
      }
      //   setRealTimePosts(testData); // for testing purposes
    } catch (error) {
      console.error(error);
      setShow(true);
      setTitle('There was an error');
      setDescription(`
      Cannot get posts due to "${error}". Please try again tomorrow`);
    }
  };

  return (
    <div>
      <>
        {loading && <LoadingSpinner />}
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
      </>
    </div>
  );
};
