document.addEventListener("DOMContentLoaded",()=>{
    const todolist = document.getElementById("todo-list"); 
    const input = document.getElementById("todo-input");
    const submitbut = document.getElementById("input-button");

    let tasks = JSON.parse(localStorage.getItem('tasklist')) || [];
    tasks.forEach((task) => rendertask(task));

    submitbut.addEventListener("click",()=>{ 
        let inputmsg = input.value.trim();
        if (inputmsg === "") return;

        let newTask = {
            id : Date.now(),
            text : inputmsg,
            completed : false
        };
        tasks.push(newTask);
        savetasks();
        rendertask(newTask);
        input.value = "";
        console.log(tasks);
    });

    function rendertask(task){
        let li = document.createElement('li');
        li.setAttribute('data-id',task.id);
        if (task.completed) li.classList.add('completed'); 
        li.innerHTML = `
        ${task.text}
        <button>Delete</button>
        `;
        li.addEventListener('click', (e) =>{
            if(e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            savetasks();
        })
        li.querySelector('button').addEventListener('click',(e)=>
        {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id!==task.id)
            li.remove();
            savetasks();
        })
        todolist.appendChild(li);
    }

    function savetasks(){
        localStorage.setItem("tasklist",JSON.stringify(tasks));
    }

})