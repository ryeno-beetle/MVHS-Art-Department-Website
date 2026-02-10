import Accordion from 'react-bootstrap/Accordion';
import './Club.css';

// component for each individual club
export const Club = ({ data }) => {
    return (
        data.map((club, i) => {
            if (club.src != "https://lh3.googleusercontent.com/d/undefined") {
                return (
                    <div className = "club" key = {"club" + i}>
                        <Accordion defaultActiveKey="1" key = {"accordion" + i}>
                            <Accordion.Item eventKey="0" key = {"accordionitem" + i}>
                                <Accordion.Header className = "club-accordion-header" key = {"accordionheader" + i}>{club.name}</Accordion.Header>
                                <Accordion.Body className="imgNdesc" key = {"accordionbody" + i}>
                                <div key = {"contents" + i}>
                                    <img src = {club.src} key = {"img" + i}></img>
                                    <p key = {"advisor" + i}>Advisor: {club.advisor}, President(s): {club.president}</p>
                                    <p key = {"room" + i}>Room: {club.room}, Day: {club.day}, Time: {club.time} ({club.frequency})</p>
                                    <p key = {"mission" + i}>{club.missionStatement}</p>
                                    <p key = {"contact" + i}>Contact club president(s) for more info at: {club.presidentEmail}</p>
                                </div>    
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div> //club
                );
            } else {
                return (
                    <div className = "club" key = {"club" + i}>
                        <Accordion defaultActiveKey="1" key = {"accordion" + i}>
                            <Accordion.Item eventKey="0" key = {"accordionitem" + i}>
                                <Accordion.Header className = "club-accordion-header" key = {"accordionheader" + i}>{club.name}</Accordion.Header>
                                <Accordion.Body className="imgNdesc" key = {"accordionbody" + i}>
                                <div key = {"contents" + i}>
                                    <p key = {"advisor" + i}> Advisor: {club.advisor}, President(s): {club.president}</p>
                                    <p key = {"room" + i}>Room: {club.room}, Day: {club.day}, Time: {club.time} ({club.frequency})</p>
                                    <p key = {"mission" + i}>{club.missionStatement}</p>
                                    <p key = {"contact" + i}>Contact club president(s) for more info at: {club.presidentEmail}</p>
                                </div>    
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div> //club
                );
            }

        })
    )
}