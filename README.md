# Lazy-Img

this is only a simple react lazy loading component. As the main purpose is to learn how to use npm publish.

In case someone may accidently dependent on the poor lib. Here is the [Github](https://github.com/FrodoLuo/lazyload) where he/she can report bugs or just to tell the unsatisfactory :D


## Install

```bash
npm install --save frodo-lazy-img
```


## Usage

Simply import and use it as a ``<img />``

``offset``could be set to tell how many pixels to load image before the actual position. 

```javascript react
import LazyLoad from 'frodo-lazy-img';
import React from 'react';

export default () => {
    return (
        <LazyLoad src={/**/} offset={200} />
    );
}
```

### API

Properties | Description
-|-
src | the src of the image
offset | if set, this will set a pilot to tell the browser to prefetch
retry | retry times when the loading is fail.
onLoadStart | expose a method to invoke when image start, success, fail to load.
onLoadSuccess|
onLoadFailed|

## Browser Supporting

~~This component doesn't support IE, Safari and Oepera for the missing of ``IntersectionObserver API``~~

I added an option to deal with those browser which doesn't support ``IntersectionObserver API``
