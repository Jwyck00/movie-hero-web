import { ConfirmModal } from "@/components/ConfirmModal";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export type AdminBackButtonProps = {
  withConfrim?: boolean;
};

export const DashboardBackButton = (props: AdminBackButtonProps) => {
  const router = useRouter();
  return (
    <ConfirmModal
      onConfirm={() => router.back()}
      size="lg"
      isEnabled={props.withConfrim ?? false}
      confirmVariant="@dangerSecondary"
      title={"Discard changes?"}
      message={"You are about to undo all the changes you made."}
      confirmText={"Discard changes"}
      cancelText={"Keep changes"}
    >
      <IconButton aria-label={"Back"} icon={<LuArrowLeft />} />
    </ConfirmModal>
  );
};
