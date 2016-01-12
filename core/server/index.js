import http from 'http';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import Jade from 'koa-jade';
import passport from 'koa-passport';
import serve from 'koa-static';
import session from 'koa-generic-session';
import json from 'koa-json';

import config from 'server/config';
import io from 'server/lib/socketio';
import store from 'server/lib/sessionStore';

import routes from 'server/routes';


const app = new Koa();


app.use(bodyParser());
app.use(convert(json()));


// Use middleware to serve static files

const jade = new Jade({
  viewPath: config.server.views,
  noCache: true,
  debug: false,
  pretty: true,
  compileDebug: false,
});

app.use(convert(jade.middleware));
app.use(convert(serve(config.server.assets)));


// Initialize authentication strategies

app.keys = [config.server.session.secret];
app.use(convert(session({ store })));
app.use(passport.initialize());
app.use(passport.session());


app.use(routes.routes(), routes.allowedMethods());

// Create the server and attach the application and SocketIO middlewares

const server = http.createServer(app.callback());
io.attach(server);

module.exports = server;
