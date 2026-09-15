import React, { useEffect, useState } from 'react';

export function Todo() {
  const [userTodos, setUserTodos] = useState({});

  useEffect(() => {
    fetch('https://dummyjson.com/todos?limit=10&skip=80')
      .then(res => res.json())
      .then(data => {
        const grouped = {};

        data.todos.forEach(todo => {
          const { userId } = todo;
          if (!grouped[userId]) {
            grouped[userId] = [];
          }
          grouped[userId].push(todo);
        });
        console.log(grouped)
        setUserTodos(grouped);
      })
      .catch(err => console.error('Failed to fetch todos:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {Object.entries(userTodos).map(([userId, todos]) => (
        <div key={userId} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>User {userId}</h3>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.todo} {todo.completed ? '✅' : '❌'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
