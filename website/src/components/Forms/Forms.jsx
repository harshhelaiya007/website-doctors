import { React, useState } from 'react'
import './Forms.css'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'

function Forms() {

    const [cardSections, setCardSections] = useState([{ id: 0 }]);
    const [activeSection, setActiveSection] = useState(cardSections[0]);
    let [cardTranslate, setcardTranslate] = useState(0);

    const handleAddSection = () => {
        const newSection = { id: cardSections.length };
        setCardSections([...cardSections, newSection]);
        setActiveSection(newSection);
        setcardTranslate(cardTranslate += 18);
    };

    const handleSelectSection = (section) => {
        setActiveSection(section);
    };

    const handleRemoveSection = (sectionId) => {
        const updatedSections = cardSections.filter((section) => section.id !== sectionId);
        setCardSections(updatedSections);
        if (activeSection.id === sectionId) {
            setActiveSection(updatedSections[0]);
        }
    };

    return (
        <div>
            {/* <!-- Form Section start here --> */}
            <section className="form-section main">
                <div className="form-section-inner">
                    <div className="add-btn-div" onClick={handleAddSection}>
                        <img src="./assets/image/add-btn.png" alt="Add Button" className="add-btn" />
                    </div>
                    <div className={`minus-btn-div ${cardSections.length > 1 ? '' : 'dsp-none'}`} onClick={handleRemoveSection}>
                        <img src="./assets/image/minus-btn.png" alt="Minus Button" className="minus-btn" />
                    </div>
                    <div className="sideBar-cardClone">
                        {cardSections.map((section) => (
                            <div key={section.id} className="select-item" onClick={() => handleSelectSection(section)}>
                                <Link to=''>{section.id + 1}</Link>
                            </div>
                        ))}
                    </div>
                    <div className="container card-section-wrapper">
                        {cardSections.map((section) => (
                            <div
                                style={{ transform: `translateY(${0}px)` }}
                                key={section.id}
                                className={`card-section ${section.id > 0 ? 'cloned' : ''}`}
                                data-id={`card-${section.id}`}
                            >
                                <div className="heading-title">
                                    <h2>
                                        Doctors Details Form <span className="form-number">{section.id + 1}</span>
                                    </h2>
                                </div>
                                <div className="card-section-body">
                                    {/* Render input fields here */}
                                    <Card />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <!-- Form Section end here --> */}
        </div>
    )
}

export default Forms;