import React from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

export const Checkbox = ({ id }) => {
    const db = firestore;

    const archiveTask = () => {
        const taskRef = doc(db, 'tasks', id); 
        updateDoc(taskRef, { archived: true }) 
            .then(() => {
                console.log(`Task with id: ${id} archived successfully`);
            })
            .catch((error) => {
                console.error("Error archiving task: ", error);
            });
    };

    return (
        <div 
            className="checkbox-holder"
            data-testid="checkbox-action"
            onClick={() => archiveTask()}
        >
            <span className="checkbox" />
        </div>
    );
};
