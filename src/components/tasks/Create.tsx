import { Task } from "@prisma/client";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useModal } from "../../context/modal";
import { api } from "../../utils/api";
import Input from "../common/Input";
import TextArea from "../common/TextArea";

export interface TaskData extends Omit<Task, "id"> {}

export default function CreateTaskModal() {
  const utils = api.useContext();

  const { closeModal } = useModal();
  const { register, handleSubmit, reset } = useForm<TaskData>();

  const { mutate: createTask } = api.task.create.useMutation({
    onSuccess() {
      utils.task.findAll.invalidate();
    },
  });

  //on submit
  const onSubmit: SubmitHandler<TaskData> = (data) => {
    //create task logic
    createTask(data);
    closeModal();
    reset();
  };

  //on cancel
  const handleCancel = () => {
    closeModal();
    reset();
  };

  return (
    <div className="flex w-screen flex-col overflow-y-auto bg-light px-6 py-4 text-white shadow-md md:w-[50vw] md:rounded-md">
      <div className="flex flex-1 items-center justify-center ">
        <div className="flex w-fit flex-wrap gap-4">
          <Input
            label="Title"
            type={"text"}
            register={register("title")}
            className="w-[350px]"
          />
          <TextArea label="Description" register={register("description")} />
          <Input label="Color" type={"color"} register={register("color")} />
        </div>
      </div>

      <div className="flex  items-center justify-end gap-4">
        <button className="btn btn_cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn_accent" onClick={handleSubmit(onSubmit)}>
          Create
        </button>
      </div>
    </div>
  );
}
