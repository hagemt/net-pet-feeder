import { spawnSync } from 'child_process'

const DIR = process.env.FEED_DIR || '/opt/feed'
const CLI = process.env.CATS_CLI || `${DIR}/cats.py`
const LOG = process.env.CATS_LOG || `${DIR}/cats.log`
const MAX = process.env.CATS_MAX || '100' // lines
const SSH = process.env.CATS_SSH || '/usr/bin/ssh'
const URI = process.env.CATS_URI || 'pi@localhost -p 22222'

// ssh to pi and execute the appropriate command
const handle = async (req, now = new Date()) => {
  const args = URI.split(' ')
  if (req.method !== 'POST' && req.method !== 'GET') throw new Error(req.method)
  else if (req.method === 'POST') args.push(`${CLI} feed 2>&1 | tee -a ${LOG}`)
  else if (req.method === 'GET') args.push(`tail -n ${MAX} ${LOG}`)

  const stamp = now.toISOString()
  console.log(`--- ${stamp}:`, args.join(' '))
  const child = spawnSync(SSH, args)
  console.log(`--- ${stamp}: PID ${child.pid} exit ${child.status}`)

  const text = Buffer.concat(child.output.slice(1)).toString()
  const lines = text.split('\n').reverse()
  lines.shift() // ignore empty line
  return { lines, stamp }
}

// TODO: consider local TZ for logs?
export default async (req, res) => {
  const start = process.hrtime()
  try {
    // try to respond 200 OK
    const body = await handle(req)
    res.json(body)
  } catch (err) {
    res.status = 400
    res.json({
      message: err.message
    })
  } finally {
    const [s, ns] = process.hrtime(start)
    const ms = (s * 1e3 + ns / 1e6).toFixed(3)
    console.log(`--- ${req.method} took ${ms}ms`)
  }
}
