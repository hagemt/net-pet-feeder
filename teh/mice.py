#!/usr/bin/env python3
import cats # main feed
import struct, sys, time

"""
FORMAT represents the format used by linux kernel input event struct
See https://github.com/torvalds/linux/blob/v5.5-rc5/include/uapi/linux/input.h#L28
Stands for: long int, long int, unsigned short, unsigned short, unsigned int
"""
FORMAT = 'llHHI'
EVENT_SIZE = struct.calcsize(FORMAT)

# https://github.com/kdart/pycopia/blob/master/core/pycopia/OS/Linux/event.py
BTN_MIDDLE = 0x112

def poll(f: str, fn, bc = BTN_MIDDLE) -> int:
    try:
        with open(f, "rb") as fp:
            while True:
                try:
                    event = fp.read(EVENT_SIZE)
                    (tv_sec, tv_usec, kind, code, value) = struct.unpack(FORMAT, event)
                    if kind == 1 and code == bc and value == 0: fn()
                except KeyboardInterrupt:
                    return 0
                except:
                    return 1
    except FileNotFoundError:
        return 2
    except:
        return 3

def main():
    f = sys.argv[1] if len(sys.argv) > 1 else "/dev/input/event1"
    fn = lambda: cats.main('mice.py', 'feed')
    cats.log('---', cats.utc(), 'poll:', f)
    if poll(f, fn) != 0:
        print('---', cats.utc(), 'pedal unplugged?')
    else:
        print('---', cats.utc(), 'done')

if __name__ == '__main__':
    main()
