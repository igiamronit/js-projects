const tasklist = [];

            function addTask(){
                const taskName = document.querySelector('.taskbar');
                const taskDate = document.querySelector('.date-input');
                const taskDetails = {
                    name: taskName.value,
                    date: taskDate.value
                };
                tasklist.push(taskDetails);
                taskName.value = '';
                taskDate.value = '';



            }

            function displayTask(){
                let fullHTML = '';
                for(let i = 0; i<tasklist.length; i++){
                    const html =`
                    <p>
                            ${tasklist[i].name} ${tasklist[i].date} <button onclick = "tasklist.splice(${i},1); displayTask();">
                                Delete
                            </button>
                    </p>
                    `
                    fullHTML+=html;
                }
                document.querySelector('.tasks').innerHTML = fullHTML;
            }