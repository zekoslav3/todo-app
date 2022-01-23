import React, { useState } from 'react';
import { Badge, Button, Card, Form, FormControl, Modal } from 'react-bootstrap';
import './Task.css';
import { toast } from 'react-toastify';
import moment from 'moment';

const Task = ({ task, completeTask, importantTask, updateTask, deleteTask }) => {
    // show, hide modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // validate form input
    const [validated, setValidated] = useState(false);

    // set and save input data
    const [inputTitle, setTitle] = useState(task.title);
    const [inputDueDate, setDueDate] = useState(task.dueDate);
    const [inputTag, setTag] = useState(task.tag);
    const [inputDescription, setDescription] = useState(task.description);

    const onInputTitleChange = (event) => setTitle(event.target.value);
    const onInputDueDateChange = (event) => setDueDate(event.target.value);
    const onInputTagChange = (event) => setTag(event.target.value);
    const onInputDescriptionChange = (event) => setDescription(event.target.value);

    // handle actions
    const handleCompleteTask = () => {
        completeTask(task.id);
        toastComplete(); 
    }

    const handleImportantTask = () => {
        importantTask(task.id);
    }

    const handleUpdateTask = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            updateTask(task.id, inputTitle, inputDueDate, inputTag, inputDescription);
            handleClose();
            setValidated(false);
            toast.success(
                <div className='toast-text'>
                    <div className='toast-title-success'>Task Updated!</div>
                    <div className='toast-subtitle'>Data Saved</div>
                </div>
            );
        }      
    };

    const handleDeleteTask = () => {
        deleteTask(task.id);
        toast.success(
            <div className='toast-text'>
                <div className='toast-title-success'>Task Deleted!</div>
                <div className='toast-subtitle'>Data Saved</div>
            </div>
        );
    }

    // styling
    const badgeColor = (tag) => {
        return tag === 'Low' ? 'success' 
            : tag === 'Medium' ? 'warning' 
            : tag === 'High' ? 'danger'
            : '';
    }

    const borderColor = (card, complete) => {
        if (!complete) {
            return card === 'Low' ? 'success' 
            : card === 'Medium' ? 'warning' 
            : card === 'High' ? 'danger'
            : '';
        }
    }

    // toasts settings
    const toastComplete = () => {
        if (!task.complete) {
            toast.success(
                <div className='toast-text'>
                    <div className='toast-title-success'>Congratulation!</div>
                    <div className='toast-subtitle'>Task Completed</div>
                </div>
            );
        } else {
            toast.warn(
                <div className='toast-text'>
                    <div className='toast-title-warning'>Not Done Yet!</div>
                    <div className='toast-subtitle'>Task Re-opened</div>
                </div>
            );
        }   
    }

    return (
        <>
            <Card id={task.id} className='mb-2 task-card' border={borderColor(task.tag, task.complete)}>
                <Card.Body className='d-flex align-items-center'>
                    <Form.Check inline id={task.id} onChange={handleCompleteTask} defaultChecked={task.complete} />
                    <div className={task.complete ? 'complete-task me-auto update-task' : 'me-auto update-task'} onClick={handleShow}>
                        {task.title} / <Badge bg={badgeColor(task.tag)} pill>{task.tag}</Badge> / Due date: {moment(task.dueDate).format('DD.MM.YYYY')}
                        <div className='mt-1 text-small'>{task.description}</div>
                    </div>
                    <span className={task.important ? 'me-4 task-item-important important-checked' : 'me-4 task-item-important'} onClick={handleImportantTask}>
                        <svg id={task.id} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="important-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </span>
                    <Button variant='outline-danger' onClick={handleDeleteTask} size='sm'>Delete</Button>
                </Card.Body>
            </Card>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleUpdateTask}>     
                        <Form.Group className="mb-3" controlId="validationTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={task.title}
                                onChange={onInputTitleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                defaultValue={task.dueDate}
                                onChange={onInputDueDateChange}
                            />
                             <Form.Control.Feedback type="invalid">
                                Please enter due date.
                            </Form.Control.Feedback>           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationTag">
                            <Form.Label>Tag</Form.Label>
                            <Form.Select defaultValue={task.tag} onChange={onInputTagChange} required aria-label="Default select example">
                                <option></option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Please select tag.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <FormControl 
                                as="textarea" 
                                aria-label="With textarea" 
                                rows="3"
                                defaultValue={task.description}
                                onChange={onInputDescriptionChange}
                            />
                        </Form.Group>
                        <div className='form-buttons'>
                            <Button className='me-2' variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save
                            </Button>
                        </div>                    
                    </Form>      
                </Modal.Body>
            </Modal>
        </>
        
    )
}

export default Task;