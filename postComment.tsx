import { useEffect, useMemo, useState } from "react";
import CommentsChart from "./components/CommentsChart";
import PostsTable from "./components/PostsTable";
import { Post, Comment } from "./types";
import "./App.css";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
      fetch("https://jsonplaceholder.typicode.com/comments").then((r) =>
        r.json()
      ),
    ]).then(([postsData, commentsData]) => {
      setPosts(postsData);
      setComments(commentsData);
    });
  }, []);

  const chartData = useMemo(() => {
    return posts.map((post) => ({
      title: `Post ${post.id}`,
      comments: comments.filter((c) => c.postId === post.id).length,
    }));
  }, [posts, comments]);


  const chartData = useMemo(() => {
  const commentMap: Record<number, number> = {};

  // Count comments for each post
  comments.forEach((comment) => {
    commentMap[comment.postId] = (commentMap[comment.postId] || 0) + 1;
  });

  // Create chart data
  return posts.map((post) => ({
    title: `Post ${post.id}`,
    comments: commentMap[post.id] || 0,
  }));
}, [posts, comments]);

  return (
    <div className="container">
      <CommentsChart data={chartData} />
      <PostsTable posts={posts} data={chartData} />
    </div>
  );
}

export default App;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    title: string;
    comments: number;
  }[];
}

export default function CommentsChart({ data }: Props) {
  return (
    <div className="chart">
      <h2>Comments by Post</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="title" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="comments" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

import { Post } from "../types";

interface Props {
  posts: Post[];
  data: {
    title: string;
    comments: number;
  }[];
}

export default function PostsTable({ posts, data }: Props) {
  return (
    <div className="table">
      <h2>Posts</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Comments</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{data.find((d) => d.title === `Post ${post.id}`)?.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
