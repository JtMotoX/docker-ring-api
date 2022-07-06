#!/bin/sh

set -e

# CONVERT 1PASSWORD ENVIRONMENT VARIABLES
if env | grep -E '^[^=]*=OP:' >/dev/null; then
	curl -sS -o /tmp/1password-vars.sh "https://raw.githubusercontent.com/JtMotoX/1password-docker/main/1password/op-vars.sh"
	chmod 755 /tmp/1password-vars.sh
	. /tmp/1password-vars.sh || exit 1
	rm -f /tmp/1password-vars.sh
fi

# GET LIST OF MODULES
MODULE_LIST="$(ls *.js | sort | grep -v 'pushover.js')"
if echo "${MODULE_LIST}" | grep -w -q -E "^$1(\.js)?$"; then
	node $1
	exit
fi

if [ "$1" = "" ] || [ "$(command -v "$1")" = "" ]; then
	echo "You must specify a module to run:"
	echo '---'
	echo "${MODULE_LIST}" | sed 's/\.js$//g'
	echo '---'
	exit
fi

exec "$@"
