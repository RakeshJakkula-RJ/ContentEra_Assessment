import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then((res) => res.json())
      .then((data) => {
        const children = data.data.children.map(item => item.data);
        setPosts(children);
      })
      .catch((error) => console.log('Error fetching Reddit data:', error));
  }, []);

  return (
    <div className="container">
      <h1>Reactjs - Reddit Feed</h1>
      <div className="grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
            <p><strong>Score:</strong> {post.score}</p>
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
              View Post
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
