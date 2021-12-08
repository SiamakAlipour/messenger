import express , {Request , Response , Application} from 'express';

const app : Application = express();

app.get("/" , (req :Request,res : Response) => {
    res.send("hello");
})

const PORT = process.env.PORT || "8001";
app.listen(PORT , () => {
    console.log(`server is running on Port : ${8001}`);
})