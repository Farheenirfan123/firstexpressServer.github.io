const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors())

app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})

const users = [
    {
        fullName: "Aman",
        userSurName: "Ali",
        UserEmail: "a@gmail.com",
        Password: "11",
        ProfilUrl: "",
        posts: ["post-1", "post-2"]
      }
];


app.use(express.json())
app.use(cors());


app.listen(5000, () => console.log('Example app listening on port 5000!'));

app.get('/', (req, res) => 
  res.send("I am live")
)

app.post('/login' , (req, res)=>{
    const found = users.find((items)=>{return  items.UserEmail == req.body.UserEmail})

    if(!found){
        users.push(req.body)
        res.json(users);

    }
    else{
        res.send(false)
    } 
})

app.post('/login2' , (req, res)=>{
    const found = users.find((items)=>{return  items.UserEmail == req.body.UserEmail && items.Password == req.body.Password})

    if(found){
        res.json(found);
    }
    else{
        res.send(false)
    }
})

app.get('/profile' , (req, res)=> {
    res.json(users)
})

app.post('/creatpost', (req, res)=> {
    const found = users.find((items)=>{return  items.UserEmail == req.body.UserEmail})

    if(found){
        found.posts.unshift(req.body.newPost)
        res.send("Post created")
    }
    else{
        res.send("Invalid")
    } 
})

app.delete('/deletepost', (req, res)=> {
    const found = users.find((items)=>{return  items.UserEmail == req.body.UserEmail})

    if(found){
        found.posts.splice(req.body.postIndex,1)
        res.send("Post deleted")
    }
    else{
        res.send("Invalid")
    } 
})

app.put('/editpost', (req, res)=> {
 
    const found = users.find((items)=>{return  items.UserEmail == req.body.UserEmail})

    if(found){
        const postIndex = req.body.postIndex;
        if(postIndex >= 0 && postIndex < found.posts.length){
            found.posts[postIndex] = req.body.newPostData;
            res.status("200").send("Post edited")
        }
        else{
            res.status("404").send("User not found")
        }
    }
    else{
        res.status("404").send("User not found")
    } 
})