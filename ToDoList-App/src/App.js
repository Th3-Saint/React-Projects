import { useState } from "react";

function Header() {
  return (
    <header className="h-[15rem] flex justify-center items-center text-white">
      <h1 className="text-6xl uppercase">To Do List</h1>
    </header>
  );
}

function Form({ handelSubmit, task, handlInput }) {
  return (
    <form
      onSubmit={handelSubmit}
      className="flex gap-[5rem] text-black items-center justify-center"
    >
      <input
        type="text"
        placeholder="Add tasks..."
        className="outline-none pl-4 h-[2.3rem]"
        onChange={(event) => handlInput(event.target.value)}
        value={task}
      />
      <button className="bg-white p-[0.5rem] font-bold rounded-md">
        Add Task
      </button>
    </form>
  );
}

function Task({ task, deleteTask }) {
  const [done, setIsDone] = useState(false);

  return (
    <li className="text-3xl flex items-center  justify-between text-white ">
      <div>
        {" "}
        <h1
          className={`${
            done
              ? "bg-green-500 rounded-md text-black line-through"
              : "text-black"
          } bg-white opacity-80 max-w-[40rem] break-words rounded-xl pl-[1rem] p-[0.5rem] `}
        >
          {task.name}
        </h1>
        <p className="bg-white text-sm text-black font-bold inline-block p-1 rounded-lg">{task.time}</p>
      </div>
      <div>
        <button
          onClick={() => setIsDone(true)}
          className="text-2xl bg-green-500 outline-none text-black p-[0.5rem] mr-[4rem]"
        >
          Done
        </button>
        <button
          onClick={() => setIsDone(false)}
          className="text-2xl bg-red-600 outline-none text-white p-[0.5rem] mr-[4rem]"
        >
          Unfinched
        </button>
        <button onClick={() => deleteTask(task.name)} className="text-4xl">
          &times;
        </button>
      </div>
    </li>
  );
}

function Tasks({ Tasksdata, deleteTask }) {
  return (
    <div className="flex flex-col mt-[5rem] w-3/4 ml-auto mr-auto">
      <ul className="flex flex-col gap-[2rem]">
        {Tasksdata.map((task) => {
          return <Task task={task} deleteTask={deleteTask} />;
        })}
      </ul>
    </div>
  );
}

function App() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");

  const deleteTask = (taskName) => {
    console.log(taskName);
    const taskData = taskList.filter((task) => {
      return taskName !== task.name;
    });
    setTaskList(taskData);
  };
  const handlInput = (input) => {
    setTask(input);
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    if (task !== "") {
      const taskData = {
        name: task,
        time:
          new Date(Date.now()).getHours() +
          " : " +
          new Date(Date.now()).getMinutes(),
      };
      setTaskList((list) => [...list, taskData]);
      console.log(taskList);
      setTask("");
    }
  };
  return (
    <div className=" text-white bg-slate-900 overflow-">
      <div className="ml-auto mr-auto w-[100rem] ">
        <Header />
        <Form handlInput={handlInput} handelSubmit={handelSubmit} task={task} />
        <Tasks Tasksdata={taskList} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
