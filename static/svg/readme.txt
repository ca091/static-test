html引入svg: img-src  css-background  dom-svg
基本属性:
        stroke stroke-width fill
        opacity fill-opacity stroke-opacity
        transform
基本形状
dom:
        rect -- x y width height rx ry
        circle -- cx cy r
        ellipse -- cx cy rx ry
        line -- x1 y1 x2 y2
        polyline -- points (折线不闭合)
        polygon -- points (折线闭合)
        path -- d(路径)
描边
stroke:
    stroke : 颜色
    stroke-width: 粗细
    stroke-linecap: 描边线的末端样式
    stroke-dasharray: defining the pattern of dashes and gaps used to paint the outline of the shape
    stroke-dashoffset

滤镜
defs>filter:
    feBlend - 与图像相结合的滤镜
    feColorMatrix - 用于彩色滤光片转换
    feComponentTransfer
    feComposite
    feConvolveMatrix
    feDiffuseLighting
    feDisplacementMap
    feFlood
    feGaussianBlur
    feImage
    feMerge
    feMorphology
    feOffset - 过滤阴影
    feSpecularLighting
    feTile
    feTurbulence
    feDistantLight - 用于照明过滤
    fePointLight - 用于照明过滤
    feSpotLight - 用于照明过滤

图案
defs>pattern

渐变
defs>linearGradient / radialGradient

图形变换
animate

路径详解
path
M = moveto(移动到)

L = lineto(绘制直线到)

H = horizontal lineto(水平绘制直线到)

V = vertical lineto(垂直绘制直线到)

C = curveto(3次曲线到) C(c1x c1y ，  c2x  c2y ，x y)

S = smooth curveto(光滑曲线到) S(x，y  x1，y1)

Q = quadratic Bézier curve(2次贝塞尔曲线到) (x,y x1,y1)

T = smooth quadratic Bézier curveto(光滑2次贝塞尔曲线到) T(x,y)

A = elliptical Arc(椭圆弧) (rx  ry  x-axis-rotation  large-arc-flag  sweep-flag  x  y)

Z = closepath(闭合图形)