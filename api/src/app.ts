import express from 'express';
import * as dotenv from 'dotenv';
import { connectDB } from './database';
import userRoutes from './routes/user.routes'
import comment from './routes/comment.router'
import event from './routes/events.routes'
import post from './routes/posts.router'

dotenv.config()
const app = express();
app.use(express.json())

app.set('port', process.env.PORT);
app.listen(app.get('port'),() => {
    console.log(`Server listening on port ${app.get('port')}`)
    connectDB()
});

app.use('/newcomment',comment)
app.use(userRoutes)
app.use('/newEvent',event)
app.use('/newPost',post)
