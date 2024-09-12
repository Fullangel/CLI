import { addTask, deleteTask, updateTask, listenTask, listTaskStatus } from './TaskManager';

const args = process.argv.slice(2);
const command = args[0];

switch(command) {
    case 'add':
        const [description] = args.slice(1);
        addTask(description);
    break;

    case 'update':
        const [idToUpdate, newStatus] = args.slice(1);
        updateTask(idToUpdate, newStatus); //TODO: revisar `newstatus` porque es un string
        break;
};
