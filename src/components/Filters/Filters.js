import React from 'react';
import { Accordion, Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import './Filters.css';

const Filters = ({ filterTaskNames, filterTagNames, setSearchfield, setFilterTasks, setFilterTags }) => {
    const onTaskFilterChange = (event) => {
        setFilterTasks(event.target.value);
    }

    const onTagFilterChange = (event) => {
        setFilterTags(event.target.value);
    }

    const onSearchfieldChange = (event) => {
        setSearchfield(event.target.value);
    }
    
    return (
        <div className='mb-4'>
            <Accordion defaultActiveKey=''>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Filters</Accordion.Header>
                    <Accordion.Body>
                        <Row className='mb-4'>
                            <Col md={6} className='mb-3 mb-xl-0'>
                                <div className='filter-title mb-2'>Tasks</div>
                                <FloatingLabel controlId='taskFilter' label='Task filter'>
                                    <Form.Select aria-label='Task filter' onChange={onTaskFilterChange}>
                                        {
                                            filterTaskNames.map(name => (
                                                <option key={name} value={name}>{name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </FloatingLabel>                              
                            </Col>
                            <Col md={6}>
                                <div className='filter-title mb-2'>Tags</div>
                                <FloatingLabel controlId='tagFilter' label='Tag filter'>
                                    <Form.Select aria-label='Tag filter' onChange={onTagFilterChange}>
                                        {
                                            filterTagNames.map(name => (
                                                <option key={name} value={name}>{name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel type='search' label='Search by Title'>
                                    <Form.Control type='search' placeholder='Search by Title' onChange={onSearchfieldChange} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Filters;