# api-loader

async load script

## Installation

```
npm i api-loader -S
```

## Usage

```
import Loader from 'api-loader';
const jqueryUrl = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js';
const mapUrl = 'https://webapi2.amap.com/maps?v=1.4.13&key=XXXX';
new Loader([jqueryUrl, mapUrl]).load().then(()=>{
    // ready to load script
})
```