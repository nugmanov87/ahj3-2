export default function initialData(taskData) {
  taskData.addTask('testovoe1');
  taskData.addTask('testovoe2');
  arrData.addTask('testovoe3');
  arrData.addTask('testovoe4');
 

  const [...rest] = arrData.tasks;
  rest[3].pined = true;
}
