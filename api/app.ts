import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config()
const app = express();
app.use(express.json())

app.set('port', process.env.PORT);
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`)
});
