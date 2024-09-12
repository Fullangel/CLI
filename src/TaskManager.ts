import * as fs  from 'fs';
import * as path from 'path';

const TASKS_FILE = path.join(__dirname, '../tasks.json');

interface Task {
    id: string;
    description: string;
    status: 'todo' | 'in progress' | 'done';
    createdAt: string;
    updatedAt: string;
};

//Constante para leer el json
const readTask = (): Task[] => {
    if(!fs.existsSync(TASKS_FILE)){
        fs.writeFileSync(TASKS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
};

//Escribir en el json
const writeTask = (tasks: Task[]): void => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

export const addTask = (description: string): void => {
    const tasks = readTask();
    const newTask: Task = {
        id: Date.now().toString(),
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTask(tasks);
    console.log('Tarea agregada', newTask);
};

export const updateTask = (id: string, status: 'todo' | 'in progress' | 'done'): void => {
    const tasks = readTask();
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return console.log('Tarea no encontrada');
    }
    task.status = status;
    task.updatedAt = new Date().toISOString();
    writeTask(tasks);
    console.log('Tarea actualizada', task);
};

export const deleteTask = (id: string): void => {
    let tasks = readTask();
    tasks = tasks.filter(t => t.id !== id);
    writeTask(tasks);
    console.log('Tarea eliminada');
};

export const listenTask = (): void => {
    const tasks = readTask();
    console.log('Todas las tareas', tasks);
};

export const listTaskStatus = (status: 'todo' | 'in progress' | 'done'): void => {
    const tasks = readTask();
    const filteredTasks = tasks.filter(t => t.status === status);
    console.log(`Tareas con estado: ${status}`, filteredTasks);
};