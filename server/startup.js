import express from 'express';
import login from './login';
import routes from './routes';
import path from 'path';

let app = express();

app.use(express.static(path.join(__dirname, '/../client/public')));
app.use('/', routes);

app.listen(process.env.PORT || 8080);
