import { useModal } from "../../context/modal";
import CreateTaskModal from "./Create";

export default function TasksHeader() {
  const { openModal } = useModal();

  const handleCreate = () => {
    openModal(<CreateTaskModal />);
  };

  return (
    <div className="flex h-[75px] w-full items-center justify-between">
      <h1 className="select-none text-2xl font-bold text-main">
        Your tasks list
      </h1>
      <button className="btn btn_light" onClick={handleCreate}>
        Create a task
      </button>
    </div>
  );
}
