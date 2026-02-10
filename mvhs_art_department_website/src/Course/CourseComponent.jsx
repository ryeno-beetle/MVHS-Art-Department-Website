import Accordion from 'react-bootstrap/Accordion';
import './Course.css';

// component for each individual course
export const Course = ({ data }) => {
    return (
        data.map((course, i) => {
            return (
                <div className = "course" key = {"course" + i}>
                    <Accordion defaultActiveKey="1" key = {"accordion" + i}>
                        <Accordion.Item eventKey="0" key = {"accordionitem" + i}>
                            <Accordion.Header className = "accordion-header" key = {"accordionheader" + i}>{course.courseName}</Accordion.Header>
                            <Accordion.Body key = {"accordionbody" + i}>
                            <p key = {"teacher" + i}>Teacher: {course.teacher}, Course Code: {course.courseCode}</p>
                            <p key = {"desc" + i}>{course.description}</p>
                            <p key = {"email" + i}>Email {course.teacher} at <a href={"mailto:" + course.email}>{course.email}</a> for more info!</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div> //course
            );
        })
    )
}