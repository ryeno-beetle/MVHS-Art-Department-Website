import Accordion from 'react-bootstrap/Accordion';
import './Event.css';

// component for each individual event
export const EventComponent = ({ data }) => {
    return (
        
        data.map((event, i) => {
            return (
                <div className = "event" key = {"event" + i}>
                    <Accordion defaultActiveKey="1" key = {"accordion" + i}>
                        <Accordion.Item eventKey="0" key = {"accordionitem" + i}>
                            <Accordion.Header key = {"accordionheader" + i}>{event.name}</Accordion.Header>
                            <Accordion.Body key = {"accordionbody" + i}>
                            <p key = {"desc" + i}>{event.description}</p>
                            {event.link === "n/a" ? <p key = {"time" + i}>Time: {event.time}</p> : <p key = {"time" + i}>Time: {event.time} - For more information click <a href={event.link} rendered="#{event.link !== 'n/a'}" key = {"link" + i}>here</a></p>}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div> //event
            );
        })
    )
}