import { useState, useEffect } from "react";
import { firestore, collection } from "../firebase";
import { collatedTasksExists } from "../helpers";
import moment from "moment";
import { getDocs, query, where } from "firebase/firestore";

export const useTasks = (selectedProject) => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskCollection = collection(firestore, "tasks");
                let tasksQuery = query(
                    taskCollection,
                    where("userId", "==", "jllFXwyAL3tzHMtzRbw")
                );

                if (selectedProject && !collatedTasksExists(selectedProject)) {
                    tasksQuery = query(
                        tasksQuery,
                        where("projectId", "==", selectedProject)
                    );
                } else if (selectedProject === "TODAY") {
                    tasksQuery = query(
                        tasksQuery,
                        where("date", "==", moment().format("DD/MM/YYYY"))
                    );
                } else if (selectedProject === "INBOX" || selectedProject === 0) {
                    tasksQuery = query(tasksQuery, where("date", "==", ""));
                }

                const snapshot = await getDocs(tasksQuery);
                const newTasks = snapshot.docs.map((task) => ({
                    id: task.id,
                    ...task.data(),
                }));

                setTasks(
                    selectedProject === "NEXT_7"
                        ? newTasks.filter(
                              (task) =>
                                  moment(task.date, "DD/MM/YYYY").diff(moment(), "days") <= 7 &&
                                  task.archived !== true
                          )
                        : newTasks.filter((task) => task.archived !== true)
                );

                setArchivedTasks(newTasks.filter((task) => task.archived !== false));
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [selectedProject]);

    return { tasks, archivedTasks };

};

  
export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectCollection = collection(firestore, "projects");
                const projectQuery = query(
                    projectCollection,
                    where("userId", "==", "jllFXwyAL3tzHMtzRbw"),
                    orderBy("projectId")
                );

                const snapshot = await getDocs(projectQuery);
                const allProjects = snapshot.docs.map((project) => ({
                    ...project.data(),
                    docId: project.id,
                }));

                setProjects(allProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return { projects, setProjects };
};