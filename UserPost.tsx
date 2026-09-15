import { useEffect, useState } from "react";


const user=[
    {
      "id": 1,
      "name": "Alice",
      "postIds": [101, 102]
    },
    {
      "id": 2,
      "name": "Bob",
      "postIds": [201]
    }
  ]
const post=[
    { "id": 101, "title": "Hello World" },
    { "id": 102, "title": "React Post" },
    { "id": 201, "title": "Bob's Post" }
  ]

function UserPost() {
  const [users, setUsers] = useState(user);
  const [posts, setPosts] = useState(post);
  const [likes, setLikes] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);

//   useEffect(() => {
//     Promise.all([
//         fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
//         fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json())
//     ]).then(([usersData, postsData]) => {
//       setUsers(usersData);
//       setPosts(postsData);
//     });
//   }, []);

  const toggleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const selectedUser = users.find(
    user => user.id === selectedUserId
  );

  const userPosts = selectedUser
    ? posts.filter(post =>
        selectedUser.postIds.includes(post.id)
      )
    : [];

  return (
    <>
      {!selectedUserId ? (
        <UserList users={users} onSelect={setSelectedUserId} />
      ) : (
        <UserPosts
          posts={userPosts}
          likes={likes}
          onToggleLike={toggleLike}
          onBack={() => setSelectedUserId(null)}
        />
      )}
    </>
  );
}
function UserList({ users, onSelect }) {
    return (
      <div>
        <h2>Users</h2>
        {users.map(user => (
          <button key={user.id} onClick={() => onSelect(user.id)}>
            {user.name}
          </button>
        ))}
      </div>
    );
  }
  
  function UserPosts({ posts, likes, onToggleLike, onBack }) {
    return (
      <div>
        <button onClick={onBack}>⬅ Back</button>
  
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.title}</p>
            <input
              type="checkbox"
              checked={!!likes[post.id]}
              onChange={() => onToggleLike(post.id)}
            />
            Like
          </div>
        ))}
      </div>
    );
  }

export default UserPost;
