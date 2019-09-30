const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const proxy = require('express-http-proxy');
const url = require('url');
const requestLogger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//API's
const categoryApi = 'http://localhost:8090/category';
const userApi = 'http://localhost:8091/user';
const channelApi = 'http://localhost:8091/channel';
const videoApi = 'http://localhost:8092/videos';
const sliderApi = 'http://localhost:8093/slider';
const opencastApi = 'http://beuthbox-opencast.beuth-hochschule.de';

app.use(requestLogger('dev'));


app.use(cors({
  origin: ['http://localhost:3333','http://localhost:8080', 'http://beuthbox.beuth-hochschule.de/'] ,
  credentials: true
}));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

//Proxies
app.use('/category', proxy(categoryApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl,
    limit: '1GB'
  })
);

app.use('/user', proxy(userApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl
  })
);

app.use('/channel', proxy(channelApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl,
    limit: '1GB'
  })
);

app.use('/videos', proxy(videoApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl,
    limit: '2GB'
  })
);

app.use('/opencast', proxy(videoApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl,
    limit: '1GB'
  })
);

app.use('/carousel', proxy(videoApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl
 
  })
);

app.use('/slider', proxy(sliderApi,
  {
    proxyReqPathResolver: (req) => req.originalUrl,
    limit: '1GB'
  })
);

app.use('/opencastapi', proxy(opencastApi,
  {
    limit: '10GB'
  })
);


app.listen(8888, () => console.log('server is running on port 8888'));