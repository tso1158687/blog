# Artemis-night

![Screenshot](screenshot.png "Screenshot")

#### [LIVE DEMO](https://yuugou727.github.io/artemis-night-demo/) HERE

This is a customized [Hexo](http://hexo.io) theme forked from [Dreyer/hexo-theme-artemis](https://github.com/Dreyer/hexo-theme-artemis), which is based on theme [pinggod/hexo-theme-apollo](https://github.com/pinggod/hexo-theme-apollo).

## Added / Modified Features

- Fix logo alignment and content margin on mobile screen.
- Add tags and categories of posts.
- Change colors to dark theme.
- Highlight code block with [Ocean theme](https://github.com/isagalaev/highlight.js/blob/master/src/styles/ocean.css)
- Replace theme dev-dependency [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) with [grunt-sass](https://github.com/sindresorhus/grunt-sass), which compiles SASS to CSS in Node.js. No need of Ruby anymore.

**For other original features and configs, please refer to [Artemis](https://github.com/Dreyer/hexo-theme-artemis) and [Apollo](https://github.com/pinggod/hexo-theme-apollo).**


## Setup

### Install

`cd` to your hexo project folder & install dependencies. This theme renders html layout from `.pug` files. 

```bash
npm install --save hexo-renderer-pug hexo-generator-feed hexo-generator-sitemap
```

Clone repo to path theme/artemis-night.

```bash
git clone https://github.com/yuugou727/hexo-theme-artemis-night.git themes/artemis-night
```

### Create Tags page

```bash
hexo new page tags
```
This creates `/tags/index.md` in the `/source` folder. 

Add two new lines to its front-matter block like this:

```
type: "tags"
comments: false
---
```

### Enable

In `_config.yml`, change `theme` to `artemis-night`.

## Development - Complie SASS

At `/artemis-night` folder, install dependencies.

```bash
npm install
```

There are two avaliable commands to complie `/scss` to `source/css/theme.css`:

- `npm run watch` - watch `.scss` files' change and build instantly
- `npm run build` - build for once


## Credits

This theme is forked from [Dreyer/hexo-theme-artemis](https://github.com/Dreyer/hexo-theme-artemis) and partly customized.

>According to classical Greek mythology, [Artemis](https://en.wikipedia.org/wiki/Artemis) is the twin sister of Apollo and as this theme is virtually identical to [hexo-theme-apollo](https://github.com/pinggod/hexo-theme-apollo) ...

While Apollo is the god of sun, Artemis is the goddess of moon. It's literal suitable to be a night-like dark theme.

## License

MIT