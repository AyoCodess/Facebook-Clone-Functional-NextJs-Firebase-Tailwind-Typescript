import React, { useState, useEffect, useContext, SetStateAction } from 'react';
import {
  collection,
  getDocs,
  query,
  collectionGroup,
} from 'firebase/firestore';
import { db } from '../firebase';
import { LoadingSpinner, Post } from '../components';
import { useSession, getSession } from 'next-auth/react';
import { ThemeContext } from '../ThemeContext';
import { DataContext } from '../DataContext';

// used when firebase quota has been exceeded
// const testData = [
//   {
//     name: 'Ayo',
//     message: 'post.message',
//     email: 'post.email',
//     timestamp: 54534534545,
//     image: 'https://i.imgur.com/fKt5tuD.jpg',
//     imageURL: 'https://i.imgur.com/yYI0g50.png',
//   },
//   {
//     name: 'chris',
//     message: 'post.message',
//     email: 'post.email',
//     timestamp: 54534534545,
//     image: 'https://i.imgur.com/fKt5tuD.jpg',
//     imageURL: 'https://i.imgur.com/KfrhNKl.pnge',
//   },
//   {
//     name: 'ruban',
//     message: 'post.message',
//     email: 'post.email',
//     timestamp: 54534534545,
//     image: 'https://i.imgur.com/fKt5tuD.jpg',
//     imageURL: 'https://i.imgur.com/FRIs3ds.png?',
//   },
// ];

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
    emailRefState,
    postIdRefState,
    openCommentBox,
    commentBoxClicked,
  } = useContext(DataContext);

  useEffect(() => {
    getUserSession();
  }, [forceUpdate, viewEveryonesPosts]);

  const getUserSession = async () => {
    const theSession = await getSession();
    if (theSession) {
      initiateGetUserPostsFromFirebase();
    }
  };

  const getUserPostsFromFirebase = async (
    isQuery: 'individual' | 'everyone'
  ) => {
    setLoading(true);

    let userPosts: Array<any> = [];
    let allUserPosts: Array<any> = [];

    if (isQuery === 'individual') {
      const userQuery = query(
        collection(db, 'users', `${session?.user?.email}`, 'posts')
      );

      const snapshot = await getDocs(userQuery);
      userPosts = snapshot.docs.map((posts: any) => posts.data());
    }

    if (isQuery === 'everyone') {
      const getAllUsers = query(collectionGroup(db, 'posts'));
      const getAllUsersSnapshot = await getDocs(getAllUsers);

      getAllUsersSnapshot.forEach((posts: any) => {
        allUserPosts.push(posts.data());
      });
    }

    const combined = [...userPosts, ...allUserPosts];

    const sorted = combined.sort(
      (a, b) => b.timestamp.seconds - a.timestamp.seconds
    );

    setRealTimePosts(sorted);
    setLoading(false);
  };

  const initiateGetUserPostsFromFirebase = async () => {
    setRealTimePosts(null);

    try {
      if (session?.user?.email && !viewEveryonesPosts) {
        getUserPostsFromFirebase('individual');
      }

      if (viewEveryonesPosts) {
        getUserPostsFromFirebase('everyone');
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
                id={post.id}
                message={post.message}
                email={post.email}
                timestamp={post.timestamp}
                image={post.image}
                postImage={post.imageURL}
                userComments={post.comments}
              />
            );
          })}
      </>
    </div>
  );
};
