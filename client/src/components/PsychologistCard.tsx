import React from 'react';
import { Link } from 'react-router-dom';
import { Psychologist } from "@myproject/shared";

export interface PsychologistCardProps {
    psychologist: Psychologist;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({ psychologist }) => {
    return (
        <div className="psychologist-card">
            {psychologist.photoURL && (
                <img src={psychologist.photoURL}
                     alt={`${psychologist.name} ${psychologist.lastName}`}
                     style={{ maxWidth: '100px', height: 'auto' }} />
            )}
            <h3>
                <Link to={`/psychologists/${psychologist.id}`}>
                    {psychologist.name} {psychologist.lastName}
                </Link>
            </h3>
            {psychologist.specializations && psychologist.specializations.length > 0 && (
                <p>Špecializácia: {psychologist.specializations.join(", ")}</p>
            )}
        </div>
    );
};

export default PsychologistCard;
