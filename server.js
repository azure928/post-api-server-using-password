import http from 'http';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import routes from './components/indexRouter.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 10010;

server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
