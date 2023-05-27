import { useLoaderData, Link } from '@remix-run/react';
import axios from 'axios';

export const meta = () => {
    return [
      { title: "New Remix App" },
      { name: "description", content: "Welcome to Remix!" },
    ];
  };

export async function loader() {

    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

    return {
        posts: data
    }
}

function PostHome() {
    const data = useLoaderData();
    return (
        <div>
            <h1>Post Home</h1>
            <ul>
                {data.posts.map(post => (<li key={post.id}>
                    <Link to={`\/${post.id}`}>{post.title}</Link>
                </li>))
                }
            </ul>
        </div>
    )
}

export default PostHome
