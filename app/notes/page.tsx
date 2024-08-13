"use client";
import React, { useEffect, useState, useRef } from "react";
import useNotesStore from "@/store/notesStore";
import convertDate from "@/utils/convertDate";
import {
  Card,
  Heading,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  FormControl,
  ModalHeader,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import Header from "@/components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import truncateText from "@/utils/truncateText";

const NotesPage = () => {
  const { notes, fetchNotes, addNote, loading } = useNotesStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const router = useRouter();
  const [isLargerThanXL] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThanLG] = useMediaQuery("(min-width: 1024px)");
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = () => {
    let filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    if (fromDate) {
      filtered = filtered.filter(
        (note) => new Date(note.createdAt) >= new Date(fromDate)
      );
    }
    if (toDate) {
      filtered = filtered.filter(
        (note) => new Date(note.createdAt) <= new Date(toDate)
      );
    }
    if (sortBy === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return filtered;
  };

  const filteredNotes = handleFilter();

  const handleAddNote = async () => {
    const newNote = {
      id: `${Date.now()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
    };
    const message = addNote(newNote);
    toast.promise(Promise.resolve(message), {
      loading: { title: "Saving note", description: "Please wait" },
      success: {
        title: "Note saved",
        description: "Your note was saved successfully",
      },
      error: {
        title: "Failed to save",
        description: "There was an error saving your note",
      },
    });
    onClose();
    setTitle("");
    setBody("");
  };

  return (
    <main className="w-full min-h-screen flex justify-center py-6">
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
      ) : filteredNotes.length === 0 ? (
        <div className="w-full flex flex-col px-6 md:px-8 lg:px-10 xl:px-12">
          <Header
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
            sortBy={sortBy}
            setSortBy={setSortBy}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
          <div className="flex-grow flex flex-col items-center justify-center">
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
        <div className="mx-auto self-start w-full px-6 md:px-8 lg:px-10 xl:px-12">
          <Header
            searchTitle={searchTitle}
            setSearchTitle={setSearchTitle}
            sortBy={sortBy}
            setSortBy={setSortBy}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
          <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-8 py-4 md:py-6 lg:py-8 xl:py-10">
            {filteredNotes.map((note) => (
              <Card
                onClick={() => router.push(`/notes/${note.id}`)}
                key={note.id}
                bgColor={"#FFFDFA"}
                className="p-4 gap-2 hover:scale-105 lg:hover:scale-[104%] xl:hover:scale-[102%] transition-all ease-in-out duration-300 cursor-pointer active:scale-95"
                direction={"column"}
                color={"secondary-text"}
                borderRadius={"xl"}
                justify={"space-between"}
              >
                <div className="flex flex-col gap-2">
                  <Heading
                    fontWeight={"black"}
                    fontSize={
                      isLargerThanXL
                        ? 28
                        : isLargerThanLG
                        ? 24
                        : isLargerThanMD
                        ? 20
                        : 16
                    }
                  >
                    {note.title.length > 32
                      ? `${note.title.substring(0, 32)}...`
                      : note.title}
                  </Heading>
                  <Text
                    fontWeight={"bold"}
                    fontSize={
                      isLargerThanXL
                        ? 22
                        : isLargerThanLG
                        ? 20
                        : isLargerThanMD
                        ? 16
                        : 14
                    }
                    dangerouslySetInnerHTML={{
                      __html: truncateText(note.body, 100),
                    }}
                  />
                </div>
                <Text
                  fontSize={
                    isLargerThanXL
                      ? 22
                      : isLargerThanLG
                      ? 20
                      : isLargerThanMD
                      ? 16
                      : 14
                  }
                >
                  {convertDate(note.createdAt)}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      )}
      <IconButton
        onClick={onOpen}
        position={"fixed"}
        className="bottom-5 right-5"
        size={"lg"}
        borderRadius={"full"}
        bgColor={"white"}
        aria-label="Add new notes"
        shadow={"md"}
        color={"flame-pea.500"}
        icon={<AddIcon />}
      />
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          maxW={isLargerThanXL ? "50%" : isLargerThanLG ? "60%" : "80%"}
          bgColor={"#FFFDFA"}
        >
          <ModalHeader
            color={"secondary-text"}
            fontSize={isLargerThanMD ? "20" : "16"}
            fontWeight={isLargerThanMD ? "bold" : "semibold"}
          >
            Add new note
          </ModalHeader>
          <ModalCloseButton color={"flame-pea.500"} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel
                color={"secondary-text"}
                fontSize={isLargerThanMD ? "20" : "16"}
              >
                Title
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="Your note title here.."
                focusBorderColor="secondary-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                color={"secondary-text"}
                fontSize={isLargerThanMD ? "20" : "16"}
              >
                Body
              </FormLabel>
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                placeholder="Your note body content here.."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="flame-pea" mr={3} onClick={handleAddNote}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default NotesPage;
