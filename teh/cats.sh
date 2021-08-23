#!/usr/bin/env bash

set -e
set -o pipefail
set -u
#set -x

: "${SELF_SERVER:=22222:localhost:22}" # VPS jump box reaches back into RPi
: "${SITE_SERVER:=vps}" # or "site" or "pi" you configured in ~/.ssh/config

function _log {
	echo 1>&2 "--- $(date --iso-8601=seconds --utc | cut -f1 -d+).000000Z $*"
}

function _ssh {
	_log "new tunnel $SITE_SERVER:$SELF_SERVER"
	ssh -f -N -T -R "$SELF_SERVER" "$SITE_SERVER"
	sleep 1
	_log "all tunnel(s): $(pidof ssh)"
}

case "${1:-}" in
	rssh) _ssh ;;
	*)
		_log "unknown command: $0 $*"
		_log "try: $0 rssh"
esac
