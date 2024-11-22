import { useState, useEffect } from "react";
import { firestore, collection } from '../firebase';
import { collatedTasksExists } from '../helpers';
import moment from 'moment';
import { getDocs, query, where } from 'firebase/firestore';

export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe;

        let taskCollection = collection(firestore, 'tasks');
        let tasksQuery = query(taskCollection, where('userId', '==', 'jllFXwyAL3tzHMtzRbw'));

        if (selectedProject && !collatedTasksExists(selectedProject)) {
            tasksQuery = query(tasksQuery, where('projectId', '==', selectedProject));
        } else if (selectedProject === 'TODAY') {
            tasksQuery = query(tasksQuery, where('date', '==', moment().format('DD/MM/YYYY')));
        } else if (selectedProject === 'INBOX' || selectedProject === 0) {
            tasksQuery = query(tasksQuery, where('date', '==', ''));
        }

        unsubscribe = getDocs(tasksQuery).then(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task =>
                            moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                            task.archived !== true
                    )
                : newTasks.filter(task => task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        });

        return () => unsubscribe;
    }, [selectedProject]);

    return { tasks, archivedTasks };
};

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        let projectCollection = collection(firestore, 'projects');
        let projectQuery = query(projectCollection, where('userId', '==', 'jllFXwyAL3tzHMtzRbw'), orderBy('projectId'));

        getDocs(projectQuery).then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
            }
        });
    }, [projects]);

    return { projects, setProjects };
};
