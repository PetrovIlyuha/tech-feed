import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    getInitialLinks();
  }, []);

  const getInitialLinks = () => {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const query = filter.toLowerCase();
    const searchMatchesInLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(searchMatchesInLinks);
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <div>
          Search{" | "}
          <input
            onChange={(e) => setFilter(e.target.value)}
            className="custom-input"
          />{" "}
          {" | "}
          <button className="custom-button">OK</button>
        </div>
      </form>
      {filteredLinks.map((link, idx) => (
        <LinkItem showCount={false} link={link} key={idx} index={idx} />
      ))}
    </>
  );
}

export default SearchLinks;
