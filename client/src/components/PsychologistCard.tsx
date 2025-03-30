import React from 'react';
import { Link } from 'react-router-dom';
import { Psychologist } from "../../../shared/PsychologistInterfaces";

export interface PsychologistCardProps {
    psychologist: Psychologist;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({ psychologist }) => {
    return (
        <div className="psychologist-card">
            {psychologist.PhotoURL && (
                <img src={psychologist.PhotoURL}
                     alt={`${psychologist.Name} ${psychologist.LastName}`}
                     style={{ maxWidth: '100px', height: 'auto' }} />
            )}
            <h3>
                <Link to={`/psycholog/${psychologist.id}`}>
                    {psychologist.Name} {psychologist.LastName}
                </Link>
            </h3>
            {psychologist.Specializations && psychologist.Specializations.length > 0 && (
                <p>Špecializácia: {psychologist.Specializations[0]}</p>
            )}
        </div>
    );
};

export default PsychologistCard;
