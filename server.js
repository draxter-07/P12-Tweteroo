import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());
server.listen(5000, () => console.log('Running on port 5000'));

var users = [];
var tweets = [];

server.post("/tweets", (req, res) => {
    // Verifica se o usuário da request está cadastrado e pega o avatar
    const r = req.body;
    if (users.length != 0){
        for (let a = 0; a < users.length; a++){
            if (users[a].username == r.username){
                // Adiciona o tweet ao objeto
                const obj = { username: r.username, avatar: users[a].avatar, tweet: r.tweet}
                tweets.push(obj);
                res.status(200);
                res.send('OK');
                break;
            }
            else if ((a == users.length - 1 || a == users.length) && users[a].username != r.username){
                res.status(202);
                res.send('UNAUTHORIZED');
            }
        }
    }
    else{
        res.status(202);
        res.send('UNAUTHORIZED');
    }
})

server.post("/sign-up", (req, res) => {
    // Salva em users
    users.push(req);
    res.status(200);
    res.send('OK');
})

server.get('/tweets', (req, res) => {
    // Se existem menos de 10 tweets, retorna todos
    if (tweets.length <= 10){
        res.status(200);
        res.send(tweets);
    }
    // Se existem mais, aplica um for pros dez últimos
    else{
        let obj = [];
        const tot = tweets.length;
        for(let a = 0; a < 10; a++){
            obj.push(tweets[tot - a]);
        }
        res.status(200);
        res.send(obj);
    }
})


