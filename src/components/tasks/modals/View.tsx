import DetailsModal from "../../common/modals/Details";
import { useModal } from "../../../context/modal";
import { Task } from "@prisma/client";

export interface ViewTaskModalProps extends Task {}

export default function ViewTaskModal({
  id,
  title,
  description,
  color,
}: ViewTaskModalProps) {
  const { closeModal } = useModal();
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <DetailsModal className="bg-white text-main" onClose={handleCloseModal}>
      <div className="flex w-full items-center gap-4">
        <div
          style={{ background: color || "white" }}
          className="h-[10px] w-[10px] rounded-full"
        ></div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <p className="">{description}</p>
    </DetailsModal>
  );
}
