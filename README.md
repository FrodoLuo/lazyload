# Lazy-Load

this is only a simple react lazy loading component. As the main purpose is to learn how to use npm publish.

## Install

```bash
npm install --save lazy-laod
```

## Usage

Simply import and use it as a ``<img />``

``offset``could be set to tell how many pixels to load image before the actual position. 

```javascript react
import LazyLoad from 'lazy-load';
import React from 'react';

export default () => {
    return (
        <LazyLoad src={/**/} offset={200} />
    );
}
```

## Browser Supporting

This component doesn't support IE, Safari and Oepera for the missing of ``IntersectionObserver API``