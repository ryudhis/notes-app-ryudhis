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
  Textarea,
  Spinner,
  useToast,
  useMediaQuery,
  Select,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import Header from "@/components/Header";

const NotesPage = () => {
  const { notes, fetchNotes, addNote, loading } = useNotesStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const router = useRouter();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchNotes();
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

  const handleSaveNote = async () => {
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
        <div className="w-full flex flex-col px-6">
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
        <div className="mx-auto self-start">
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
          <div className="grid grid-cols-2 gap-4 w-[360px] py-4">
            {filteredNotes.map((note) => (
              <Card
                onClick={() => router.push(`/notes/${note.id}`)}
                key={note.id}
                bgColor={"#FFFDFA"}
                className="p-4 gap-2 hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer active:scale-95"
                direction={"column"}
                color={"secondary-text"}
                borderRadius={"xl"}
                justify={"space-between"}
              >
                <div className="flex flex-col gap-2">
                  <Heading fontWeight={"black"} fontSize={16}>
                    {note.title.length > 32
                      ? `${note.title.substring(0, 32)}...`
                      : note.title}
                  </Heading>
                  <Text fontWeight={"bold"} fontSize={14}>
                    {note.body.length > 80
                      ? `${note.body.substring(0, 80)}...`
                      : note.body}
                  </Text>
                </div>
                <Text fontSize={14}>{convertDate(note.createdAt)}</Text>
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
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={isLargerThan768 ? 500 : 360} bgColor={"#FFFDFA"}>
          <ModalHeader color={"secondary-text"}>Add new note</ModalHeader>
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
            <Button colorScheme="flame-pea" mr={3} onClick={handleSaveNote}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default NotesPage;
