import React, { useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './AddTaskModal.css';

const AddTaskModal = ({ addTask }) => {
    // show, hide modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // validate form input
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            addTask(inputTitle, inputDueDate, inputTag, inputDescription);
            handleClose();
            setTitle('');
            setDueDate('');
            setTag('');
            setDescription('');
            setValidated(false);
            toastSaved();
        }      
    };

    // set and save input data
    const [inputTitle, setTitle] = useState('');
    const [inputDueDate, setDueDate] = useState('');
    const [inputTag, setTag] = useState('');
    const [inputDescription, setDescription] = useState('');

    const onInputTitleChange = (event) => setTitle(event.target.value);
    const onInputDueDateChange = (event) => setDueDate(event.target.value);
    const onInputTagChange = (event) => setTag(event.target.value);
    const onInputDescriptionChange = (event) => setDescription(event.target.value);

    // toasts settings
    const toastSaved = () => toast.success(<div className='toast-text'><div className='toast-title-success'>Task Added!</div><div className='toast-subtitle'>Data Saved</div></div>);
    
    return (
        <div className='mb-4'>
            <Button variant='primary' onClick={handleShow}>Add task</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>     
                        <Form.Group className="mb-3" controlId="validationTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={inputTitle}
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
                                value={inputDueDate}
                                onChange={onInputDueDateChange}
                            />
                             <Form.Control.Feedback type="invalid">
                                Please enter due date.
                            </Form.Control.Feedback>           
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationTag">
                            <Form.Label>Tag</Form.Label>
                            <Form.Select value={inputTag} onChange={onInputTagChange} required aria-label="Default select example">
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
                                rows="3"
                                aria-label="With textarea" 
                                value={inputDescription}
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
        </div>
    )
}

export default AddTaskModal;