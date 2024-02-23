import { FieldInput } from "@/components/FieldInput";
import { useToastError, useToastSuccess } from "@/components/Toast";
import { useRateMovie } from "@/features/movies/useRateMovie";
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
import { isInRangeNumber, isNumber } from "@formiz/validations";

export type RateMovieModalProps = Pick<UseModalProps, "onClose" | "isOpen"> & {
  movieId: string;
};

export const RateMovieModal: React.FC<RateMovieModalProps> = ({
  isOpen,
  onClose,
  movieId,
}) => {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const rateMovie = useRateMovie({
    onSuccess() {
      onClose();
      toastSuccess({
        title: "Rate Movie Successfully!",
      });
    },
    onError(error) {
      toastError({
        title: "Rate Movie Failed!",
        description: error.response?.data.detail,
      });
    },
  });

  const form = useForm<{ rate: number }>({
    onValidSubmit: (values) => {
      rateMovie.mutate({
        movieId,
        payload: {
          rate: values.rate,
        },
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
                <Heading size="md">{"Rate Movie"}</Heading>
                <Text fontSize="sm">{"What is the rate of this movie?"}</Text>
              </Stack>
              <FieldInput
                name="rate"
                label={"Rate"}
                autoFocus
                required={"Required"}
                validations={[
                  {
                    handler: isInRangeNumber(1, 5),
                    message: "Value must be between 1 and 5",
                  },
                  {
                    handler: isNumber(),
                    message: "Value should be a number between 1 and 5",
                  },
                ]}
              />
              <HStack spacing={8}>
                <Button
                  size="lg"
                  isDisabled={form.isSubmitted && !form.isValid}
                  type="submit"
                  variant="@primary"
                  flex={1}
                >
                  Rate
                </Button>
              </HStack>
            </Stack>
          </Formiz>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
