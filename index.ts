import { addTask, deleteTask, updateTask, listenTask, listTaskStatus } from './TaskManager';

const args = Bun.argv.slice(2);
const command = args[0];

switch(command) {
    case 'add':
        const [description] = args.slice(1);
        if(!description){
            console.log('Por favor, proporciona una descripción para la tarea');
            break;
        }
        addTask(description);
    break;

    case 'update':
        const [idToUpdate, newStatus] = args.slice(1);
        if (!idToUpdate || !newStatus) {
            console.log('Por favor, Proporciona un ID y un nuevo estado para la tarea');
            break;
        }
        updateTask(idToUpdate, newStatus);
    break;
    
    case 'delete': 
        const [idToDelete] = args.slice(1);
        if(!idToDelete){
            console.log('Por favor, Proporciona un ID para eliminar la tarea');
            break;
        }
        deleteTask(idToDelete);
    break;

    case 'list':
        listenTask();
    break;

    case 'list-todo':
        listTaskStatus('todo');
    break;

    case 'list-in-progress':
        listTaskStatus('in-progress');
    break;

    case 'list-done':
        listTaskStatus('done');
    break;

    default:
        console.log('comando no reconocido');
    break;
};
