import { v4 as uuidv4 } from "uuid";

let today = new Date();
let day = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

let currentDate = month + 1 + "-" + day + "-" + year;

const Data = [
  {
    createdAt: currentDate,
    task: "Complete online JavaScript course",
    active: false,
    id: uuidv4(),
  },
  {
    createdAt: currentDate,
    task: "Jog around the park 3x",
    active: true,
    id: uuidv4(),
  },
  {
    createdAt: currentDate,
    task: "10 minutes meditation",
    active: true,
    id: uuidv4(),
  },
  {
    createdAt: currentDate,
    task: "Read for 1 hour",
    active: true,
    id: uuidv4(),
  },
  {
    createdAt: currentDate,
    task: "Pick up groceries",
    active: true,
    id: uuidv4(),
  },
  {
    createdAt: currentDate,
    task: "Complete Todo App on Frontend Mentor",
    active: true,
    id: uuidv4(),
  },
];

export default Data;
