async function updatePostComments() {
  console.log('running updatePostComments');
  console.log(emailRefState, postIdRefState);
  try {
    const userQuery = await getDoc(
      doc(db, 'users', emailRefState, 'posts', postIdRefState)
    );

    setPostComments(userQuery.data().comments);

    console.log('dynamic', userCommentList);
  } catch (err) {
    console.error(err);
  } finally {
    console.log('finished');
  }
}

//   async function updatePostComments2() {
//     console.log('running updatePostComments');
//     console.log(emailRefState, postIdRefState);
//     try {
//       const userQuery = query(collection(db, 'users', emailRefState, 'posts'));

//       doc(db, 'users', emailRefState, 'posts', postIdRefState),

//       const snapshot = await getDocs(userQuery);

//       setUpdatedComments(snapshot.docs.map((posts: any) => posts.data()));
//     } catch (err) {
//       console.error('UPDATE POSTS ERROR', err);
//     } finally {
//       console.log('updating Post Comments is complete', updatedComments);
//     }
//   }
