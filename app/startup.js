import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './routes';
import userRoutes from './routes/user';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import './config/passport';

let app = express();
app.set('views', path.join(__dirname,'../assets/views'));
app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/nouha');

app.use(express.static(path.join(__dirname, '/../assets/dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/user', userRoutes);

app.listen(process.env.PORT || 8080);
