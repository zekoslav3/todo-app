import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import './Stats.css';

const Stats = ({ openTasks, completedTasks, importantTasks, allTasks }) => {
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='card-statitstics'>Statistics</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col xl={3} sm={6} className='mb-4 mb-xl-0'>
                                <div className='d-flex align-items-center'>
                                    <div className='avatar bg-info bg-opacity-50 me-2'>
                                        <div className='avatar-content'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="avatar-icon"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                        </div>
                                    </div>
                                    <div className='my-auto'>
                                        <h4 className='fw-bolder mb-0'>{allTasks}</h4>
                                        <p className='font-small mb-0'>All Tasks</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={3} sm={6} className='mb-4 mb-xl-0'>
                                <div className='d-flex align-items-center'>
                                    <div className='avatar bg-primary bg-opacity-50 me-2'>
                                        <div className='avatar-content'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="avatar-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                        </div>
                                    </div>
                                    <div className='my-auto'>
                                        <h4 className='fw-bolder mb-0'>{openTasks}</h4>
                                        <p className='font-small mb-0'>Open</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={3} sm={6} className='mb-4 mb-xl-0'>
                                <div className='d-flex align-items-center'>
                                    <div className='avatar bg-warning bg-opacity-50 me-2'>
                                        <div className='avatar-content'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="avatar-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        </div>
                                    </div>
                                    <div className='my-auto'>
                                        <h4 className='fw-bolder mb-0'>{importantTasks}</h4>
                                        <p className='font-small mb-0'>Important</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={3} sm={6} className='mb-4 mb-xl-0'>
                                <div className='d-flex flex-row'>
                                    <div className='avatar bg-success bg-opacity-50 me-2'>
                                        <div className='avatar-content'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="avatar-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    </div>
                                    <div className='my-auto'>
                                        <h4 className='fw-bolder mb-0'>{completedTasks}</h4>
                                        <p className='font-small mb-0'>Completed</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>   
        </div>
    )
}

export default Stats;