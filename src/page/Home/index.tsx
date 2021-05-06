import { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './styles.module.scss';

interface ITodo {
  id: number;
  titulo: string;
  descricao: string;
}

const Home: React.FC = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [getTitle, setTitle] = useState('');
  const [getDesc, setDesc] = useState('');

  const getAllTodos = useCallback(async () => {
    const { data } = await api.get('tarefas');

    setTitle(data.titulo);
    setDesc(data.descricao);
    setTodoList(data);
  }, [setTodoList, setTitle, setDesc]);

  const handleAddTask = useCallback(async () => {
    const newTask = {
      titulo: 'New Task',
      descricao: 'New Task',
    };

    const { data } = await api.post('tarefas', newTask);

    setTodoList([...todoList, data]);
  }, [setTodoList, todoList]);

  const handleRemoveTask = useCallback(
    async (taskId) => {
      await api.delete(`tarefas/${taskId}`);

      const returnNewTaskList = todoList.filter((removedTask) => {
        return removedTask.id !== taskId;
      });

      setTodoList(returnNewTaskList);
    },
    [setTodoList, todoList]
  );
  const handleUpdateTaskTitle = useCallback(
    async (taskItem: ITodo) => {
      const newTaskItemTitle = {
        titulo: `${getTitle}`,
        descricao: `${taskItem.descricao}`,
      };

      const { data } = await api.put(
        `tarefas/${taskItem.id}`,
        newTaskItemTitle
      );

      console.log('title', data);

      setTodoList(
        todoList.map((item) => {
          return item.id === data.id ? { ...data } : item;
        })
      );
    },
    [setTodoList, todoList, getTitle]
  );

  const handleUpdateTaskDescription = useCallback(
    async (taskItem: ITodo) => {
      const newTaskItemDesc = {
        titulo: `${taskItem.titulo}`,
        descricao: `${getDesc}`,
      };

      const { data } = await api.put(`tarefas/${taskItem.id}`, newTaskItemDesc);

      console.log('desc', data);

      setTodoList(
        todoList.map((item) => {
          return item.id === data.id ? { ...data } : item;
        })
      );
    },
    [setTodoList, todoList, getDesc]
  );

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <main className={styles.container}>
      <section>
        <h1>My VX List:</h1>
        <button onClick={handleAddTask}> Add New Task</button>
        <ul>
          {todoList.map((todoItem, index) => {
            return (
              <li key={index}>
                <div className={styles.idContainer}>
                  <strong>Task number: {todoItem.id}</strong>
                  <button onClick={() => handleRemoveTask(todoItem.id)}>
                    x
                  </button>
                </div>
                <div className={styles.fieldsetsContainer}>
                  <div>
                    <fieldset className={styles.inputContainer}>
                      <span>Title</span>
                      <input
                        type="text"
                        name="titulo"
                        onChange={(event) => setTitle(event.target.value)}
                        defaultValue={todoItem.titulo}
                      />
                    </fieldset>
                    <fieldset className={styles.inputContainer}>
                      <span>Description</span>
                      <input
                        type="text"
                        name="descricao"
                        onChange={(event) => setDesc(event.target.value)}
                        defaultValue={todoItem.descricao}
                      />
                    </fieldset>
                  </div>
                  <div className={styles.saveButtonContainer}>
                    <button
                      title="task_title"
                      onClick={() => handleUpdateTaskTitle(todoItem)}
                    >
                      Save
                    </button>
                    <button
                      title="task_description"
                      onClick={() => handleUpdateTaskDescription(todoItem)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Home;
