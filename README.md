# Pet Feeder

Like you press the button on your pet feeder, but for Internet. Cloud not required.

<img width="453" alt="image" src="https://user-images.githubusercontent.com/593274/130391582-253bd6c1-1b51-408f-b308-0bfefbfa7067.png">

## Install

Clone this repo to your VPS--configured such that the Pi can SSH to it.

* Copy the `teh` folder to `/opt/teh` on your `pi` and `sudo chown -vR pi:pi /opt/teh`
* Set up your `id_rsa.pem` in `~/.ssh/config` for easy tunnel from Pi to VPS.
* Install `env EDITOR=$(which nano) crontab -e` with feed schedule, etc.

On VPS, run: `make` to bring up the site, and use `ngrok` if needed.

## Notes for later

https://gist.github.com/ubergesundheit/7bdb6bdc818028a34a190363aed4d00a

### Wait, what is this?

In all seriousness, this project is full of hacks; it was fun though. I won't to post the feed-my-cat URL--not sorry.

> He took his defunct Petnet SmartFeeder, wired the motor to a relay board, then did some magic with a Raspberry Pi.

You'll need to figure out the hardware stuff on your own, or read my bad code to understand which pin(s) to pick.

* There is a (dumb) front-end for the script.
* There are cron jobs to run on the Raspberry Pi.
* There's a USB foot pedal (mouse) to "feed" ad hoc.

The foot pedal is completely optional; I bought the relay board and "mouse" foot pedal from some guy in China.

See: https://github.com/hagemt/footswitch

### Sorry, I still don't get it.

You're SOL, dude. I'm not saying you should use this to feed your pet. I'm just saying I did it, and it works for us.
