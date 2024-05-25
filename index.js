const express=require("express");
const app=express();

let tasks = [];


//GET is used to retrieve resources from the server.
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

//POST is used to create new resources on the server.
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        description
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//PUT is used to update existing resources on the server.
app.put('/tasks/:id', (req, res) => {
    const { title, description } = req.body;
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        if (title) task.title = title;
        if (description) task.description = description;
        res.status(200).json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

//DELETE is used to remove resources from the server.
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
 });


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(2000,()=>{
  console.log("server is running");
});