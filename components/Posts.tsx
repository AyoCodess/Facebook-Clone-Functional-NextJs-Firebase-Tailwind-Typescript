import React, { useState, useEffect, useContext } from 'react';
import {
  collection,
  getDocs,
  query,
  collectionGroup,
  doc,
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
  const { theme } = useContext(ThemeContext);
  const {
    setShow,
    setTitle,
    setDescription,
    viewEveryonesPosts,
    forceUpdate,
    loading,
    setLoading,
    commentForceUpdate,
    emailRefState,
    postIdRefState,
    setPostIdRefState,
  } = useContext(DataContext);

  useEffect(() => {
    getUserSession();
  }, [forceUpdate, viewEveryonesPosts]);

  const [realTimePosts, setRealTimePosts] = useState<any[] | null>(null);
  // - updates individual post comment every time a new post comment is added to the database
  const [updatedComments, setUpdatedComments] = useState<any[] | null>(null);
  const [userCommentsList, setUserCommentsList] = useState<any[] | null>(null);

  async function getUserSession() {
    const theSession = await getSession();
    if (theSession) {
      initiateGetUserPostsFromFirebase();
    }
  }

  async function initiateGetUserPostsFromFirebase() {
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
  }

  async function getUserPostsFromFirebase(isQuery: 'individual' | 'everyone') {
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
  }

  useEffect(() => {
    async function updatePostComments() {
      if (updatedComments || realTimePosts) {
        try {
          const userQuery = query(
            collection(db, 'users', emailRefState, 'posts')
          );

          doc(db, 'users', emailRefState, 'posts', postIdRefState);

          const snapshot = await getDocs(userQuery);

          setUpdatedComments(snapshot.docs.map((posts: any) => posts.data()));
        } catch (err) {
          console.error('UPDATE POSTS ERROR', err);
        } finally {
        }
      }
    }
    updatePostComments();
  }, [commentForceUpdate, emailRefState, postIdRefState]);

  return (
    <div>
      <>
        {loading && <LoadingSpinner />}
        {realTimePosts &&
          !loading &&
          realTimePosts.map((post, i) => {
            let updatedPost;

            if (updatedComments) {
              //   setPostIdRefState(post.id);
              updatedPost = updatedComments.find(
                (updatedPost: any) => updatedPost.id === post.id
              );
            }
            return (
              <Post
                key={i}
                onClick={() => {
                  setPostIdRefState(post.id);
                  //   setCommentForceUpdate((prev) => !prev);
                }}
                name={post.name}
                id={post.id}
                message={post.message}
                email={post.email}
                timestamp={post.timestamp}
                image={post.image}
                postImage={post.imageURL}
                userComments={
                  updatedPost ? updatedPost.comments : post.comments
                }
                updatedComments={updatedPost ? updatedPost.comments : null}
                setUpdatedComments={setUpdatedComments}
              />
            );
          })}
      </>
    </div>
  );
};
