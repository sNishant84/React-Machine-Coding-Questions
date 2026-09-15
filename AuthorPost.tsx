import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch posts
        const postRes = await fetch("https://api.example.com/posts");
        const postData = await postRes.json();
        setPosts(postData);

        const authorIds = [...new Set(postData.map(p => p.authorId))];

        // Fetch authors safely
        const authorPromises = authorIds.map(async (id) => {
          try {
            const res = await fetch(`https://api.example.com/authors/${id}`);
            
            if (!res.ok) {
              // author not found (e.g. 404)
              return null;
            }

            return await res.json();
          } catch {
            return null;
          }
        });

        const authorData = await Promise.all(authorPromises);

        // Build map (skip null authors)
        const authorMap = {};
        authorData.forEach(author => {
          if (author) {
            authorMap[author.id] = author;
          }
        });

        setAuthors(authorMap);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          
          {/* If author doesn't exist → render empty */}
          {authors[post.authorId] && (
            <p>Author: {authors[post.authorId].name}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
