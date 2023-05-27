import axios from "axios"
import { useLoaderData } from "@remix-run/react"
import { useParams } from "@remix-run/react"


export async function loader({params}) {
    console.log("posts params", params)
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    return {
        post: data
    }
}

export default function PostWithId() {
  const params = useParams()
  console.log("params.....", params)
    const data = useLoaderData()
  return (
    <div>
        <h1>Individual Post</h1>
        <pre>
            {JSON.stringify(data.post, null, 2)}
        </pre>
    </div>
  )
}

// // export default PostDetails

// export default function PostDetails() {
//     return (
//         <div>
//             <h1>Im Dynamic</h1>
//         </div>
//     )
// }
