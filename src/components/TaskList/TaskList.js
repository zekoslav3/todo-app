import React from 'react';
import Task from '../Task/Task';

const TaskList = ({ tasklist, completeTask, importantTask, updateTask, deleteTask, filterMapTasks, filterTasks, filterMapTags, filterTags }) => {
    return (
        <div>
            {
                tasklist
                .filter(filterMapTasks[filterTasks])
                .filter(filterMapTags[filterTags])
                .map(task => {
                    return (
                        <Task 
                            key={task.id} 
                            task={task} 
                            completeTask={completeTask}
                            importantTask={importantTask}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />
                    )
                })
            }
        </div>
    )
}

export default TaskList;