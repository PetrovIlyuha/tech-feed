import React, { useContext } from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import { FirebaseContext } from "../../firebase";

const initialState = {
  description: "",
  url: "",
};

function CreateLink({ history }) {
  const { firebase, user } = useContext(FirebaseContext);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values: { description, url },
    errors,
  } = useFormValidation(initialState, validateCreateLink, handleCreateLink);

  function handleCreateLink() {
    if (!user) {
      history.push("/login");
    } else {
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        voteCount: 0,
        votes: [],
        comments: [],
        created: Date.now(),
      };
      firebase.db.collection("links").add(newLink);
      history.push("/");
    }
  }

  return (
    <form className="flex flex-column mt3" onSubmit={handleSubmit}>
      <input
        name="description"
        onChange={handleChange}
        value={description}
        onBlur={handleBlur}
        style={{
          padding: 10,
          marginBottom: 10,
          border: "none",
          borderRadius: "3px",
          boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.4)",
        }}
        placeholder="A description for your link"
        autoComplete="off"
        className={errors.description && "error-input"}
        type="text"
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        onChange={handleChange}
        value={url}
        onBlur={handleBlur}
        style={{
          padding: 10,
          marginBottom: 10,
          border: "none",
          borderRadius: "3px",
          boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.4)",
        }}
        className={errors.url && "error-input"}
        type="url"
        autoComplete="off"
        placeholder="The URL for the link"
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="custom-button" style={{ width: 120 }} type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
