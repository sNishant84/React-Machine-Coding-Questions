import React, { useState } from "react";


// 👥 Dummy users for @mention
const USERS = ["john", "jane", "jack", "joe", "josh", "jenny"];

// 🧠 Recursive function to add reply
const addReplyToTree = (tree, parentId, text) => {
  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [
          ...node.children,
          { id: Date.now(), text, children: [] },
        ],
      };
    }

    return {
      ...node,
      children: addReplyToTree(node.children, parentId, text),
    };
  });
};

// 🔍 Mention Input Component
function MentionInput({ value, setValue, onSubmit, placeholder }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);

    const match = val.match(/@(\w*)$/);

    if (match) {
      const query = match[1].toLowerCase();
      const filtered = USERS.filter((user) =>
        user.toLowerCase().includes(query)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectUser = (user) => {
    const newText = value.replace(/@(\w*)$/, `@${user} `);
    setValue(newText);
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative", marginBottom: "10px" }}>
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ width: "300px" }}
      />

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            position: "absolute",
            background: "#fff",
            width: "300px",
            zIndex: 10,
          }}
        >
          {suggestions.map((user) => (
            <div
              key={user}
              onClick={() => selectUser(user)}
              style={{ padding: "5px", cursor: "pointer" }}
            >
              {user}
            </div>
          ))}
        </div>
      )}

      <button onClick={onSubmit} style={{ marginLeft: "10px" }}>
        Post
      </button>
    </div>
  );
}

// 💬 Comment Component (Recursive)
function Comment({ comment, addReply }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    addReply(comment.id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div
      style={{
        marginLeft: "20px",
        borderLeft: "1px solid gray",
        paddingLeft: "10px",
        marginTop: "10px",
      }}
    >
      <p>{comment.text}</p>

      <button onClick={() => setShowReply((prev) => !prev)}>
        Reply
      </button>

      {showReply && (
        <MentionInput
          value={replyText}
          setValue={setReplyText}
          onSubmit={handleReply}
          placeholder="Write a reply..."
        />
      )}

      {/* 🔁 Recursive children */}
      {comment.children.map((child) => (
        <Comment key={child.id} comment={child} addReply={addReply} />
      ))}
    </div>
  );
}

// 🏠 Main App
export default function CommentSection() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const addComment = () => {
    if (!input.trim()) return;

    const newComment = {
      id: Date.now(),
      text: input,
      children: [],
    };

    setComments((prev) => [...prev, newComment]);
    setInput("");
  };

  const addReply = (parentId, text) => {
    setComments((prev) => addReplyToTree(prev, parentId, text));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 Nested Comments with @Mention</h2>

      {/* Add top-level comment */}
      <MentionInput
        value={input}
        setValue={setInput}
        onSubmit={addComment}
        placeholder="Write a comment..."
      />

      {/* Render comments */}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
}
