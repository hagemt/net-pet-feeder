# Homebrew revives defunct Petnet SmartFeeder Gen 1/2

Feed cats, but for Internet. Cloud not required. (self-hosted, just ngrok/ssh with Raspberry Pi)

<img width="453" alt="image" src="https://user-images.githubusercontent.com/593274/130391582-253bd6c1-1b51-408f-b308-0bfefbfa7067.png">

## Install

Clone this repo to your Pi or VPS--configured so your Pi can start an SSH tunnel back to it.

* Copy the `teh` folder to `/opt/teh` on your `pi` and `sudo chown -vR pi:pi /opt/teh`
* Set up your `id_rsa.pem` in `~/.ssh/config` for easy tunnel between Pi and w/e.
* Install `env EDITOR=$(which nano) crontab -e` with auto-feed schedule, etc.

Via ssh, run: `make` to bring up the site, and add `ngrok` if needed.

## Notes for later

https://gist.github.com/ubergesundheit/7bdb6bdc818028a34a190363aed4d00a

### Wait, what is this?

> He took his defunct Petnet SmartFeeder, wired the motor to a relay board, then did basic magic with Raspberry Pi.

You'll need to figure out some hardware stuff on your own, or read my bad code to understand which pin(s) to pick.

In all seriousness, this project is full of cheap hacks; it was fun though. No, I won't post URLs to feed my cat.

* There is a (dumb) front-end for the script.
* There are cron jobs to run on the Raspberry Pi.
* There's a USB foot pedal (mouse) to "feed" ad hoc.

The foot pedal is completely optional; I bought the relay board and "mouse" foot pedal from some guy in China.

See also: https://github.com/hagemt/footswitch

### Sorry, I still don't get it.

You're SOL, dude. I'm not saying you should use this to feed your pet. I'm just saying I did it, and it works for us.

It's a mid/moderate intensity (few days) maker project: https://www.reddit.com/r/Petnet/comments/p9tjy7/so_i_made_my_own/

Only extra hardware: Pi, and Songle 5V DC relays from Amazon (e.g. JBtek or SunFounder board) plus some female-female wires.

You do need to spend ~$10 total, but no solder (screw terminals) if you just want to drive the feed motor for brief intervals.
