import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.listen(5000, () => console.log('Running on port 5000'));

var users = {};
var tweets = {};

server.get("/tweets", (req, res) => {
    // Verifica se o usuário da request está cadastrado
    for (let a = 0; a < users.length; a++){
        if (users[a] == req.username){
            // Adiciona o tweet no objeto
            tweets.push(req);
            res.send('OK');
            break;
        }
        else if (a == users.length - 1 && users[a] != req.username){
            res.send('UNAUTHORIZED');
        }
    }
})

