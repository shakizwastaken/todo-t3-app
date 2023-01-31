import { Task as ITask } from "@prisma/client";

import { FaTrash } from "react-icons/fa";
import { useModal } from "../../context/modal";
import { api } from "../../utils/api";
import ViewTaskModal from "./modals/View";

export interface TaskProps extends ITask {}

export default function Task({ id, title, description, color }: TaskProps) {
  const utils = api.useContext();

  const { openModal } = useModal();

  const { mutate: deleteTask } = api.task.delete.useMutation({
    onSuccess() {
      utils.task.findAll.invalidate();
    },
  });
  const handleDelete = () => {
    deleteTask(id);
  };

  const handleDetails = () => {
    openModal(<ViewTaskModal {...{ id, title, description, color }} />);
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md bg-white p-6`}
    >
      <div
        className="h-full w-[6px] rounded-full"
        style={{ background: color || "white" }}
      ></div>

      <div className="flex  w-full flex-col gap-4">
        <h1 className="text-2xl font-bold text-main">{title}</h1>
        <p
          className="cursor-pointer  select-none text-accent"
          onClick={handleDetails}
        >
          details
        </p>
      </div>

      <div
        className="btn  cursor-pointer !p-2 text-red-600"
        onClick={handleDelete}
      >
        <FaTrash size={"16px"} />
      </div>
    </div>
  );
}
