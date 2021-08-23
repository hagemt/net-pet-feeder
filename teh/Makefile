.PHONY: cats mice

CC ?= $(shell command -v gcc)
CFLAGS ?= -Wall -Werror -Wextra

a.out: cats.c
	$(CC) $(CFLAGS) -o "$@" $^

cats: a.out
	sudo "./$<"

mice:
	# the /dev/input/mice device is NOT the same as the "event" device output format!
	# read this to understand: https://www.kernel.org/doc/Documentation/input/input.txt
	# https://github.com/torvalds/linux/blob/master/include/uapi/linux/input-event-codes.h
	while true; do od -N 96 -t x1 -w16 < /dev/input/event1 | cut -c9- ; done | node cats.js
