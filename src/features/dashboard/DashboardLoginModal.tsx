import { FieldInput } from "@/components/FieldInput";
import { useToastSuccess } from "@/components/Toast";
import { useAuthContext } from "@/features/auth/AuthProvider";
import {
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  type UseModalProps,
} from "@chakra-ui/react";
import { Formiz, useForm } from "@formiz/core";

export type DashboardLoginModalProps = Pick<
  UseModalProps,
  "onClose" | "isOpen"
>;

export const DashboardLoginModal: React.FC<DashboardLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const toastSuccess = useToastSuccess();
  const { login } = useAuthContext();

  const form = useForm<{ secret: string }>({
    onValidSubmit: (values) => {
      login(values.secret);
      onClose();

      // TODO check using the api
      toastSuccess({
        title: "Logged In Successfully!",
      });
    },
  });

  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Formiz connect={form} autoForm>
            <Stack spacing="4">
              <Stack>
                <Heading size="md">{"Login"}</Heading>
                <Text fontSize="sm">
                  {"Enter the admin super secret code!"}
                </Text>
              </Stack>
              <FieldInput
                name="secret"
                label={"Secret"}
                autoFocus
                required={"Required"}
              />
              <HStack spacing={8}>
                <Button
                  size="lg"
                  isDisabled={form.isSubmitted && !form.isValid}
                  type="submit"
                  variant="@primary"
                  flex={1}
                >
                  {"Confirm"}
                </Button>
              </HStack>
            </Stack>
          </Formiz>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
