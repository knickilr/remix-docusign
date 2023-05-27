import React from 'react'

export const meta = () => {
  return [
    { title: "New Page" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

//we can give different style here
export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'
    }
  ]
}

function New() {
  return (
    <div>
      <h1>New Route</h1>
    </div>
  )
}

export default New
