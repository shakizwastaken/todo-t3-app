import { Task } from "@prisma/client";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { useModal } from "../../../context/modal";
import { api } from "../../../utils/api";
import Input from "../../common/Input";
import SubmitModal from "../../common/modals/Submit";
import TextArea from "../../common/TextArea";

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
    <SubmitModal onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
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
    </SubmitModal>
  );
}
