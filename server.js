import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.listen(5000, () => console.log('Running on port 5000'));

var users = {};
var tweets = {};

server.post("/tweets", (req, res) => {
    // Verifica se o usuário da request está cadastrado e pega o avatar
    for (let a = 0; a < users.length; a++){
        if (users[a] == req.username){
            // Adiciona o tweet ao objeto
            const obj = { username: req.username, avatar: users[a].avatar, tweet: req.tweet}
            tweets.push(obj);
            res.send('OK');
            break;
        }
        else if (a == users.length - 1 && users[a] != req.username){
            res.send('UNAUTHORIZED');
        }
    }
})

server.post("/sign-up", (req, res) => {
    // Salva em users
    users.push(req);
    res.send('OK');
})

server.get('/tweets', (req, res) => {
    // Se existem menos de 10 tweets, retorna todos
    if (tweets.length <= 10){
        res.send(tweets);
    }
    // Se existem mais, aplica um for pros dez últimos
    else{
        let obj = {};
        const tot = tweets.length;
        for(let a = 0; a < 10; a++){
            obj.push(tweets[tot - a]);
        }
        res.send(obj);
    }
})

