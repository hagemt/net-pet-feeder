import React from 'react'

import useSWR from 'swr'

const renderItem = (text, index) => (
  <li key={`line-${index}`}>{text}</li>
)

const getLines = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(res.statusText)
  const body = await res.json()
  return body
}

const postButton = async (e) => {
  const res = await fetch('/api', {
    method: 'POST'
  })
  if (!res.ok) throw new Error(res.statusText)
  const body = await res.json()
  console.log(body)
}

export default function Home () {
  const seconds = 10
  const { data, error } = useSWR('/api', getLines, {
    refreshInterval: seconds * 1000
  })
  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
  const lines = data.lines || []
  return (
    <main>
      <h1>Feed Jazmine</h1>
      <button onClick={postButton}>Now</button>
      <h2>(logs refresh every {seconds} seconds)</h2>
      <div>
        <ul>{Array.from(lines, renderItem)}</ul>
      </div>
    </main>
  )
}
