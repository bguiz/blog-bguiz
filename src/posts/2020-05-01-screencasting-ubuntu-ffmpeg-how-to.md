---
title: 'How to screencast on Ubuntu using FFmpeg'
date: '2020-04-01T22:45:00+08:00'
tags: [video, ffmpeg]
socialImage: /images/posts/screencasting-ubuntu-how-to.png
---

Screencasting, for the purposes of this post,
is where you want to capture a video of your screen,
plus the audio of your voice sync'ed with your video.

Recently, I have been running a slew of webinars,
and so I have been searching for a way to figure out
how to record myself **without** having to rely on
whichever webinar platform I happened to have used.

The main point in recording your webinars is for replay-ability,
and for this, you would ideally upload them
to your choice video CDN such as Youtube or Vimeo.
However, they tend to get interrupted for a variety of reasons,
such as the webinar platform itself being flaky.
This results in several unintended "intermissions",
and these are the parts that you'd preferably want to redact
from the recording prior to uploading it.

It turns out that there are lot of different video editing software available,
however, they tend to offer more features than you actually need.
Specifically, in the context of screencasting,
the typical use case is very straightforward:

1. Slice the original recorded video(s) into pieces, and then
2. Stitch them back together into a single video

There is no need for fancy features such as transitions,
multiple overlays, or anything else that would necessitate
that the video be transcoded.

## Enter FFmpeg

As it turns out, there is a low level video processing tool which
has all the features necessary to both record a screencast,
as well as perform the split-and-stitch type post-processing:
[FFmpeg](https://ffmpeg.org/).

Perfect for some experimentation!

## Recording

(1) Get screen dimensions

If you have a single monitor:

```shell
xdpyinfo | awk '/dimensions/{print $2}'
# 2560x1080
```

If you have multiple monitors, select one of them:

```shell
xrandr
# ...
# HDMI-1 connected primary 2560x1080+0+0 (normal left inverted right x axis y axis) 798mm x 335mm
# ...

xrandr | awk '/connected/{print $4}' | grep -oP '\d+x\d+'
# 2560x1080
```

(2) Use `ffmpeg` to start recording

The following records
sound via Pulse Audio,
and video via X11:

```shell
ffmpeg \
  -video_size 2560x1050 \
  -framerate 25 \
  -f x11grab \
  -i :0.0+0,30 \
  -f pulse \
  -i default \
  -ac 2 \
  rec-01.mp4
```

The dimensions for my screen are `2560x1080`,
however, I wished to trim the top 30 pixels off to remove
the operating system status bar.
To do this I use a video size of `2560x1050`
(subtract 30 from 1080),
and specify an input offset of `:0.0+0,30`
(x-axis offset of zero, and y-axis offset of 30).

I was not able to get FFmpeg to talk to ALSA properly,
however Pulse Audio appeared to work just fine.

Reference documentation from FFmpeg:

- [trac.ffmpeg.org/wiki/Capture/Desktop](https://trac.ffmpeg.org/wiki/Capture/Desktop)
- [trac.ffmpeg.org/wiki/Capture/ALSA](https://trac.ffmpeg.org/wiki/Capture/ALSA)

(3) Kill `ffmpeg` to stop recording

Hit `Ctrl+C` in the terminal to kill the process.
FFmpeg writes to disk as it records,
so the file is already there and ready to be played.

## Post-processing

Post-processing is, unfortunately not as straightforward as recording.
FFmpeg provides the basic tools necessary for this,
however it is very tedious to write all the commands by hand.

To solve this, I've written a script that automates this process,
and it is available on `npm`:
[`screencast-splicer`](https://www.npmjs.com/package/screencast-splicer).
It is still proof-of-concept quality, so YMMV.

(1) Create an instructions file

To use this, create an `instructions.json` file,
which contains an object that contains just one key, `events`,
which is an array.

```json
{
  "events": [
  ]
}
```

Each event is an instruction in this array
is to get a particular part of a recording.

```json
{
  "sourceClip": "rec-01.mp4",
  "sourceStart": "00:05:10.0000",
  "sourceDuration": "00:15:10.5000"
}
```

Here:

- `sourceClip`: The name of the file from which to extract the clip
- `sourceStart`: The exact timestamp at which the clip starts.
  Format is `hh:mm:ss.tttt` (hours, minutes, seconds, milliseconds).
- `sourceDuration`: The length of the clip.
  Format is the same as that of `sourceStart`.

Putting that into a concrete example,
let's say we recorded two files `rec-01.mp4` and `rec-02.mp4`,
we can create the following file, and save it as `instructions.json`:


```json
{
  "events": [
    {
      "sourceClip": "rec-01.mp4",
      "sourceStart": "00:05:10.0000",
      "sourceDuration": "00:15:10.5000"
    },
    {
      "sourceClip": "rec-02.mp4",
      "sourceStart": "00:00:25.0000",
      "sourceDuration": "00:32:15.5000"
    }
  ]
}
```

(2) Run the `screencast-splicer` tool

Like so:

```shell
npx screencast-splicer instructions.json rec-spliced.mp4

```

This will generate a shell script with the various FFmpeg commands
that are necessary to create `rec-spliced.mp4`,
which should be about 45 minutes long,
containing about 15 minutes from the first recorded file,
and about 30 minutes from the second recorded file.

(3) Run the generated shell script

This will create several temporary files,
one for each of the events defined in the instructions file,
a text file needed by FFmpeg;
and will delete them plus the script itself automatically upon completion.

Most importantly, you should now have your intended `rec-spliced.mp4` file.

Reference documentation from `screencast-splicer`:

- [github.com/bguiz/screencast-splicer](https://github.com/bguiz/screencast-splicer)

## Thoughts

I'm amazed by how many features the
[FFmpeg](https://ffmpeg.org/) tool packs.
Truly amazing what it does!

That being said, there is something that feels "unresolved" -
that I'm still looking for a proper means to accomplish.
From what I can tell, during the split and stitch operations,
FFmpeg does not use the exact seek start and stop times,
so clips may start slightly later than they are meant to,
or end slightly earlier than they are supposed to.
Sometimes this appears to affect audio and video channels separately.
This is more of an issue when joining multiple short clips,
and not so much with longer clips.

**Suggestions** for improving this are **very welcome**!
