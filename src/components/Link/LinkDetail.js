import React, { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import LinkItem from "./LinkItem";

function LinkDetail(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState("");
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("links").doc(linkId);
  useEffect(() => {
    getLink();
  }, []);

  const getLink = (e) => {
    linkRef.get().then((doc) => {
      setLink({ ...doc.data(), id: doc.id });
    });
  };

  const handleAddComment = (e) => {
    if (!user) {
      props.history.push("/login");
    }
    linkRef.get().then((doc) => {
      if (doc.exists) {
        const previousComments = doc.data().comments;
        const comment = {
          postedBy: { id: user.uid, name: user.displayName },
          created: Date.now(),
          text: commentText,
        };
        const updatedComments = [...previousComments, comment];
        linkRef.update({ comments: updatedComments });
        setLink((prevState) => ({
          ...prevState,
          comments: updatedComments,
        }));
        setCommentText("");
      }
    });
  };

  return !link ? (
    <div>Loading...</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <textarea
        onChange={(e) => setCommentText(e.target.value)}
        cols="60"
        rows="6"
      />
      <div>
        <button className="custom-button" onClick={handleAddComment}>
          Comment
        </button>
      </div>
      {link.comments.map((comment, idx) => (
        <div key={idx}>
          <p className="comment-author">
            {comment.postedBy.name} | {distanceInWordsToNow(comment.created)}{" "}
            ago
          </p>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
