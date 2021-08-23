#!/usr/bin/env python3
from gpiozero import LED

import datetime, os, sys, time

SECONDS_PER_SERVING = os.getenv('SECONDS_PER_SERVING', '1')

def utc(now=datetime.datetime.utcnow()):
    return now.isoformat() + "Z"

def log(*args, target=sys.stdout):
    print(*args, file=target)

def feed(relay, seconds=1):
    log('---', utc(), 'feed', seconds)
    relay.off()
    time.sleep(seconds)
    relay.on()

def loop(relay, seconds=1):
    log('---', utc(), 'loop', seconds)
    try:
        while True:
            feed(relay, seconds)
            time.sleep(seconds)
    except KeyboardInterrupt:
        pass

def main(*args, pin=17):
    log('---', utc(), 'main', *args)
    relay = LED(pin)
    # control the relay with commands
    commands = frozenset(['help', 'feed', 'loop'])
    command = args[1] if len(args) > 1 else 'help'
    serving = args[2] if len(args) > 2 else '1'
    seconds = float(SECONDS_PER_SERVING) * float(serving)
    # default command is echo (print args)
    if (command not in commands): log('--- ignored relay:', relay)
    elif (command == 'feed'): feed(relay, seconds)
    elif (command == 'loop'): loop(relay, seconds)
    else: log('--- USAGE:', args[0], 'feed', target=sys.stderr)

if __name__ == '__main__':
    args = sys.argv
    main(*args)
