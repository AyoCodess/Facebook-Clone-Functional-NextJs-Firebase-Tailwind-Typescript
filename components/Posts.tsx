import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Post } from '../components';
import { useSession } from 'next-auth/react';
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

export const Posts = ({ forceUpdate }: Props) => {
  const { data: session } = useSession();
  const [realTimePosts, setRealTimePosts] = useState<any[] | null>(null);
  const { theme } = useContext(ThemeContext);
  const {
    setShow,
    setTitle,
    setDescription,
    viewEveryonesPosts,
    setViewEveryonesPosts,
  } = useContext(DataContext);

  useEffect(() => {
    getUserPostsFromFirebase();
  }, [session, forceUpdate, viewEveryonesPosts]);

  const getUserPostsFromFirebase = async () => {
    setRealTimePosts(null);
    try {
      if (viewEveryonesPosts) {
        setShow(true);
        setTitle('All users in our database posts are now loading');
        setDescription(
          'be careful what you share, only the admin can delete posts...'
        );

        const everyonesPosts = collection(db, 'posts');
        const everyonesPostsWithPhotos = collection(db, 'postsWithPhotos');

        let postsWithNoPhotosArray: Array<any> = [];
        let postsWithPhotosArray: Array<any> = [];

        const dataPostsWithNoPhotos = await getDocs(everyonesPosts);
        const dataPostsWithPhotos = await getDocs(everyonesPostsWithPhotos);

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
      }

      if (session?.user?.email && !viewEveryonesPosts) {
        setShow(true);
        setTitle('Your personal posts only are now loading...');
        setDescription('');

        console.log('getUserPostsFromFirebase');
        const queryByEmailNoPhotos = query(
          collection(db, 'posts'),
          where('email', '==', session?.user?.email)
        );
        const queryByEmailPhotos = query(
          collection(db, 'postsWithPhotos'),
          where('email', '==', session?.user?.email)
        );

        let postsWithNoPhotosArray: Array<any> = [];
        let postsWithPhotosArray: Array<any> = [];

        const dataPostsWithNoPhotos = await getDocs(queryByEmailNoPhotos);
        const dataPostsWithPhotos = await getDocs(queryByEmailPhotos);

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
