import React from 'react'

import useSWR from 'swr'

const okJSON = async (url, method = 'GET') => {
  const res = await fetch(url, { method })
  if (res.ok) return res.json()
  throw new Error(res.statusText)
}

const renderItem = (text, index) => (
  <li key={`line-${index}`}>{text}</li>
)

export default function Home () {
  const [isFeeding, setFeeding] = React.useState(false)
  const { data, error } = useSWR('/api', okJSON)
  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
  const lines = data.lines || []
  console.log('logs:', data)

  const onClick = () => {
    setFeeding(true)
    okJSON('/api', 'POST')
      .catch(err => err)
      .then((out) => {
        setFeeding(false)
        console.log('feed:', out)
      })
  }
  return (
    <main>
      <h1>Pet Feeder</h1>
      <button disabled={isFeeding} onClick={onClick}>POST</button>
      <h2>(refresh page to GET latest logs)</h2>
      <div>
        <ul>{Array.from(lines, renderItem)}</ul>
      </div>
    </main>
  )
}
