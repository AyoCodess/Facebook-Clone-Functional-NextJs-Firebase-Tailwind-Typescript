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
