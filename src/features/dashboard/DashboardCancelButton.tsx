import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/ConfirmModal";

export type AdminCancelButtonProps = {
  withConfrim?: boolean;
};

export const DashboardCancelButton = (props: AdminCancelButtonProps) => {
  const router = useRouter();

  return (
    <ConfirmModal
      onConfirm={() => router.back()}
      size="lg"
      isEnabled={props.withConfrim ?? false}
      title={"Discard changes?"}
      message={"You are about to undo all the changes you made."}
      confirmVariant="@dangerSecondary"
      confirmText={"Discard changes"}
      cancelText={"Keep changes"}
    >
      <Button display={{ base: "none", md: "inline-flex" }}>{"Cancel"}</Button>
    </ConfirmModal>
  );
};
