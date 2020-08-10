import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { getDomain } from "../../utils";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import FirebaseContext from "../../firebase/context";

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);

  const handleVote = (e) => {
    if (!user) {
      history.push("/login");
    } else {
      const voteRef = firebase.db.collection("links").doc(link.id);
      voteRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = {
            votedBy: { id: user.uid, name: user.displayName },
          };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length;
          voteRef.update({ votes: updatedVotes, voteCount });
        }
      });
    }
  };

  const handleDeleteLink = async (e) => {
    const linkRef = firebase.db.collection("links").doc(link.id);
    await linkRef.delete();
    console.log(`Document with ID ${link.id} was removed from FireStore`);
  };

  const isLinkAuthor = user && user.uid === link.postedBy.id;
  return (
    <div className="flex items-start mt2 mb4">
      <div className="flex items-center link-container pa3">
        {showCount && <span>{index}</span>}
        <div
          onClick={handleVote}
          className="vote-button"
          style={{ cursor: "pointer" }}
        >
          <span role="img" aria-label="upvote">
            🔼
          </span>
        </div>
        <div className="ml1">
          <a
            href={`${link.url}`}
            to={`${link.url}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>
              {link.description}{" "}
              <span className="link">({getDomain(link.url)})</span>
            </div>
          </a>
          <div className="f6 lh-copy link">{link.voteCount} votes</div>
          <div className="ml5">
            Posted by {link.postedBy.name}{" "}
            <span className="link-create-time">
              {distanceInWordsToNow(link.created)} ago
            </span>
            {" | "}
            <Link
              to={`/link/${link.id}`}
              style={{
                textDecoration: "none",
                color: "red",
                borderRadius: "5px",
                background: "palegreen",
                padding: "2px 4px",
              }}
            >
              {link.comments.length > 0
                ? `${link.comments.length} comments`
                : "discussion"}
            </Link>
            {isLinkAuthor && (
              <>
                {" | "}
                <span className="delete-button" onClick={handleDeleteLink}>
                  Delete
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
