import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react"
import { useTransition } from "react";

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve()
    }, (timeout = 1000))
  })
}

export async function action({request}) {
    const formData = await request.formData();
    const title = formData.get('title');
    const body = formData.get('body')

    console.log("title is ", title);
    console.log("Title is ", body)
    // return null
    await delay(2000)
    // return redirect('/posts')
    return {
      title,
      body
    }
}

function newPost() {

  const data = useActionData()
  console.log(data)

  const transition = useTransition()
  console.log(transition)
  return (
    <div>
        <h1>create a new form</h1>
        <Form method="POST">
            <label htmlFor="title">Title</label>
            <input type="text" id='title' name='title' />
            <br />
            <lable htmlFor="body" >Body</lable>
            <input type="text" id='body' name='body' />
            <br />
            <button type="submit">Create a post</button>
        </Form>
      
    </div>
  )
}

export default newPost
