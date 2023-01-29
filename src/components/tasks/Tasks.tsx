import { useModal } from "../../context/modal";
import { api } from "../../utils/api";
import CreateTaskModal from "./Create";
import Task from "./Task";

export default function Tasks() {
  const { data: tasks } = api.task.findAll.useQuery();

  const { openModal } = useModal();

  const mapTasks = () => tasks?.map((task, i) => <Task key={i} {...task} />);

  const handleCreate = () => {
    openModal(<CreateTaskModal />);
  };

  return (
    <>
      {tasks?.length && tasks?.length > 0 ? (
        <div className="flex h-full w-full flex-col gap-2 rounded-md bg-main p-4">
          {mapTasks()}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-md bg-main">
          <h1 className="text-center text-3xl font-bold text-white">
            No tasks to display
          </h1>
          <button className="btn btn_light" onClick={handleCreate}>
            Create a task
          </button>
        </div>
      )}
    </>
  );
}
