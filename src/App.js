import React, { useState } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { tasklist } from './assets/tasklist.js';
import Title from './components/Title/Title';
import AddTaskModal from './components/AddTaskModal/AddTaskModal';
import moment from 'moment';
import TaskList from './components/TaskList/TaskList';
import Filters from './components/Filters/Filters';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stats from './components/Stats.js/Stats';
import { nanoid } from 'nanoid';

const filterMapTasks = {
  All: () => true,
  Open: task => !task.complete,
  Important: task => task.important,
  Completed: task => task.complete
};
const filterTaskNames = Object.keys(filterMapTasks);

const filterMapTags = {
  All: () => true,
  Low: task => task.tag === 'Low',
  Medium: task => task.tag === 'Medium',
  High: task => task.tag === 'High'
}
const filterTagNames = Object.keys(filterMapTags);


function App() {
  const [ taskList, setTaskList ] = useState(tasklist);

  // add new task
  const addTask = (inputTitle, inputDueDate, inputTag, inputDescription) => {
    const date = moment().format('YYYY-MM-DD');
    const newTask = { 
        id: nanoid(),
        title: inputTitle,
        description: inputDescription,
        important: false,
        enterDate: date,
        dueDate: moment(inputDueDate).format('YYYY-MM-DD'),
        tag: inputTag,
        complete: false
    };
    setTaskList([...taskList, newTask]);
  }

  // set task completed/uncompleted
  const completeTask = (id) => {
    const completed = taskList.map(task => {
      return id === task.id ? { ...task, complete: !task.complete } : { ...task };
    });
    setTaskList(completed);
  }

  // set task important/unimportant
  const importantTask = (id) => {
    const important = taskList.map(task => {
      return id === task.id ? { ...task, important: !task.important } : { ...task };
    });
    setTaskList(important);
  }

  // update task
  const updateTask = (id, inputTitle, inputDueDate, inputTag, inputDescription) => {
    const editedTasks = taskList.map(task => {
      if (id === task.id) {
        return { 
          ...task,
          title: inputTitle,
          dueDate: moment(inputDueDate).format('YYYY-MM-DD'),
          tag: inputTag,
          description: inputDescription
        }
      }
      return task;
    });
    setTaskList(editedTasks);
  }

  // delete task
  const deleteTask = (id) => {
    const remainingTasks = taskList.filter(task => id !== task.id);
    setTaskList(remainingTasks);
  }

  // filter tasks and tags
  const [ filterTasks, setFilterTasks ] = useState('All');
  const [ filterTags, setFilterTags ] = useState('All');

  // search by title
  const [ searchfield, setSearchfield ] = useState('');
  const filterTasksSearch = taskList.filter(task => {
    return task.title.toLowerCase().includes(searchfield.toLowerCase());
  })

  // stats
  const allTasks = taskList.length;
  const openTasks = taskList.map(task => !task.complete).filter(x => x).length;
  const completedTasks = taskList.map(task => task.complete).filter(x => x).length;
  const importantTasks = taskList.map(task => task.important).filter(x => x).length;

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={6} className='mb-4'>
            <Title />
          </Col>
          <Col md={6} className='mb-4'>
            <Stats 
              openTasks={openTasks} 
              completedTasks={completedTasks}
              importantTasks={importantTasks}
              allTasks={allTasks}
            />
          </Col>
        </Row>
        <AddTaskModal addTask={addTask} />
        <Filters 
          filterTaskNames={filterTaskNames}
          filterTagNames={filterTagNames}
          setFilterTasks={setFilterTasks}
          setFilterTags={setFilterTags}
          setSearchfield={setSearchfield}
        />
        <TaskList 
          tasklist={filterTasksSearch} 
          completeTask={completeTask}
          importantTask={importantTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          filterMapTasks={filterMapTasks}  
          filterTasks={filterTasks}
          filterMapTags={filterMapTags}
          filterTags={filterTags}  
        />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
