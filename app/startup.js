import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './routes';
import userRoutes from './routes/user';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import config from './config';

let app = express();
app.set('views', config.path.views);
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/nouha');

app.use(express.static(config.path.dist));
app.use(cookieParser());
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/user', userRoutes);
import './config/passport';

app.listen(process.env.PORT || 8080);

