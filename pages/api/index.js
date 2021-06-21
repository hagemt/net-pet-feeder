import { spawnSync } from 'child_process'

// ssh to pi and execute the appropriate command
const handle = async (req, now = new Date()) => {
  const args = 'pi@localhost -p 22222'.split(' ')
  switch (req.method) {
    case 'GET':
      args.push('tail', '-n100', './cats.log')
      break
    case 'POST':
      args.push('./cats.py', 'feed')
      break
    default:
      throw new Error('expected GET or POST request')
  }

  const child = spawnSync('/usr/bin/ssh', args, {
    env: {}
  })
  const stamp = now.toISOString()
  if (args.length === 5) console.log(`--- ${stamp} did? ${child.status}`)
  else console.log(`--- ${stamp}: PID ${child.pid} exit ${child.status}`)
  const text = Buffer.concat(child.output.slice(1)).toString()
  const lines = text.split('\n')
  lines.pop()
  return { lines, stamp }
}

export default async (req, res) => {
  try {
    // always responds 200 OK
    const json = await handle(req)
    res.json(json)
  } catch (err) {
    res.status = 400
    res.json({
      message: err.message
    })
  }
}
