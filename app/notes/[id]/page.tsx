"use client";
import React, { useEffect, useRef, useState } from "react";
import useNotesStore from "@/store/notesStore";
import convertDate from "@/utils/convertDate";
import {
  Card,
  Heading,
  Text,
  Spinner,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  FormControl,
  ModalHeader,
  FormLabel,
  Input,
  Textarea,
  ModalFooter,
  Button,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useParams } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/navigation";

const NotesDetail = () => {
  const { note, loading, fetchNote, deleteNote, editNote } = useNotesStore();
  const { id } = useParams();
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const initialRef = useRef(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleEditNote = async () => {
    const editedNote = {
      id: id.toString(),
      title,
      body,
      createdAt: new Date().toISOString(),
    };
    const message = editNote(editedNote);
    toast.promise(Promise.resolve(message), {
      loading: { title: "Editing note", description: "Please wait" },
      success: {
        title: "Note edited",
        description: "Your note was edited successfully",
      },
      error: {
        title: "Failed to save",
        description: "There was an error Editing your note",
      },
    });
    setRefresh((prev) => !prev);
    onModalClose();
    setTitle("");
    setBody("");
  };

  const handleDeleteNote = async () => {
    const message = deleteNote(id);
    toast.promise(Promise.resolve(message), {
      loading: { title: "Deleting note", description: "Please wait" },
      success: {
        title: "Note deleted",
        description: "Your note was deleted successfully",
      },
      error: {
        title: "Failed to delete",
        description: "There was an error deleting your note",
      },
    });
    onAlertClose();
    router.push("/notes");
  };

  useEffect(() => {
    fetchNote(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refresh]); // Add refreshTrigger to the dependency array

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  return (
    <main className="w-full flex justify-center min-h-screen p-2">
      {loading ? (
        <div className="flex flex-col justify-center items-center text-center">
          <Spinner size="xl" color="flame-pea.500" />
          <Text
            mt={2}
            color="flame-pea.500"
            fontWeight={"bold"}
            fontSize={20}
            className="animate-pulse"
          >
            Loading...
          </Text>
        </div>
      ) : !note ? (
        <div className="mx-auto w-full flex justify-center">
          <IconButton
            onClick={() => router.push("/notes")}
            position={"fixed"}
            size={"lg"}
            borderRadius={"full"}
            bgColor={"white"}
            aria-label="Add new notes"
            shadow={"md"}
            color={"flame-pea.500"}
            className="top-2 left-2"
            icon={<ChevronLeftIcon className="scale-125" />}
          />
          <div className="flex flex-col items-center justify-center">
            <Player
              autoplay
              loop
              src="https://lottie.host/10bbc5fc-38ec-496b-b08c-988df6c00bf9/1VMOnQPW4e.json"
              style={{ height: "300px", width: "300px", paddingRight: "20px" }}
            ></Player>
            <Text
              className="text-center"
              fontWeight={"bold"}
              fontSize={22}
              color={"flame-pea.500"}
            >
              No notes found
            </Text>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-between gap-4">
          <IconButton
            onClick={() => router.push("/notes")}
            size={"lg"}
            borderRadius={"full"}
            bgColor={"white"}
            aria-label="Add new notes"
            shadow={"md"}
            color={"flame-pea.500"}
            className="self-start"
            icon={<ChevronLeftIcon className="scale-125" />}
          />
          <Card
            bgColor={"#FFFDFA"}
            className="p-4 gap-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer active:scale-95"
            w={"full"}
            h={"fit-content"}
            minH={"400px"}
            direction={"column"}
            color={"secondary-text"}
            borderRadius={"xl"}
            justify={"space-between"}
          >
            <div className="flex flex-col gap-4">
              <Heading fontWeight={"black"} fontSize={32}>
                {note.title}
              </Heading>
              <Text fontWeight={"bold"} fontSize={22}>
                {note.body}
              </Text>
            </div>
            <Text placeSelf={"end"} fontWeight={"semibold"} fontSize={16}>
              {convertDate(note.createdAt)}
            </Text>
          </Card>
          <div className="flex gap-4 self-end">
            <IconButton
              onClick={onModalOpen}
              size={"lg"}
              borderRadius={"full"}
              bgColor={"white"}
              aria-label="Add new notes"
              shadow={"md"}
              color={"flame-pea.500"}
              icon={<EditIcon />}
            />
            <IconButton
              onClick={onAlertOpen}
              size={"lg"}
              borderRadius={"full"}
              bgColor={"white"}
              aria-label="Add new notes"
              shadow={"md"}
              color={"flame-pea.500"}
              icon={<DeleteIcon />}
            />
          </div>
        </div>
      )}

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            maxW={isLargerThan768 ? 500 : 360}
            className="max-w-[360px]"
            bgColor={"#FFFDFA"}
          >
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={"secondary-text"}
            >
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody color={"secondary-text"}>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="flame-pea" onClick={handleDeleteNote} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent maxW={isLargerThan768 ? 500 : 360} bgColor={"#FFFDFA"}>
          <ModalHeader color={"secondary-text"}>Edit Note</ModalHeader>
          <ModalCloseButton color={"flame-pea.500"} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"secondary-text"}>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Your note title here.."
                focusBorderColor="secondary-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color={"secondary-text"}>Body</FormLabel>
              <Textarea
                placeholder="Your note body content here.."
                focusBorderColor="secondary-text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="flame-pea" mr={3} onClick={handleEditNote}>
              Edit
            </Button>
            <Button onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default NotesDetail;
