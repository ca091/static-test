### emoji

- emoji'unicode is out of \u0000 ~ \uFFFF

> [emoji unicode](https://apps.timwhitlock.info/emoji/tables/unicode)

> [emoji 3.0](https://emojipedia.org/emoji-3.0/)

> [Unicode Version 9.0](https://emojipedia.org/unicode-9.0/)

> [emoji list](http://getemoji.com/)

> [get emoji ttf from google](https://www.google.com/get/noto/)

### [cubic-bezier.com](http://cubic-bezier.com/#.17,.67,.83,.67)

### 使用[pdf.js](https://github.com/mozilla/pdf.js)支持ios微信端显示盖章

- data.fieldType === 'Sig' => 注释掉
- /test/iframe.html
- 支持同域或相对.pdf文件

### css3 滤镜

- [filter at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- [understanding filter](https://www.html5rocks.com/en/tutorials/filters/understanding-css/)

### other

- [Motion Path Module Level 1](https://drafts.fxtf.org/motion-1/#offset-distance-property)

- [SVG_animation_with_SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL)

### 字体设置

- Window
  - 宋体（'\5b8b\4f53'，衬线字体）👎
  - 黑体（SimHei）👎
  - 微软雅黑（Microsoft Yahei，无衬线字体）👌👌
  - Arial（西文，无衬线字体）👌
  - Tahoma（西文，无衬线字体）👌👌
  - Verdana（无衬线字体）
  - Segoe UI（西文，无衬线字体）

- Mac OS
  - 华文黑体（STHeiTi）👎
  - 华文细黑（STXihei）👎
  - 黑体-简（Heiti SC）👎
  - 冬青黑体（Hiragino Sans GB）👎
  - Times New Roman（西文，衬线字体）👎
  - Helvetica、Helvetica Neue（西文）👌
  - 苹方（PingFang SC）👌👌
  - San Francisco（西文）👌👌

- Android
  - Roboto（西文，无衬线字体）👌
  - 思源黑体（Noto Sans，中文）
  - Droid Sans（无衬线字体）👌
  - Droid Sans Fallback

- iOS 同 Mac OS

- Linux
  - 文泉驿点阵宋 👎
  - 文泉驿微米黑（WenQuanYi Micro Hei） 👌

- 补充字体族：衬线字体（serif）、无衬线字体（sans-serif）

- 声明顺序：英文字体 => 中文字体 => 兼容字体 => 补充字体族
  - 英文：San Francisco, "Helvetica Neue", Helvetica, Tahoma, Arial
  - 中文："PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei"
  - 兼容字体："Hiragino Sans GB", "Heiti SC", STXihei, SimHei
  - 补充字体族：serif, sans-serif

- 推荐写法："San Francisco", "Helvetica Neue", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft
  YaHei"
  , "WenQuanYi Micro Hei", sans-serif
