"use client";
import { Search2Icon, SettingsIcon } from "@chakra-ui/icons";
import {
  Heading,
  IconButton,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormControl,
  useMediaQuery,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const Header = ({
  searchTitle,
  setSearchTitle,
  sortBy,
  setSortBy,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  const initialRef = useRef(null);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const {
    isOpen: isSettingOpen,
    onOpen: onSettingOpen,
    onClose: onSettingClose,
  } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  return (
    <div className="flex justify-between items-center">
      <IconButton
        onClick={isSettingOpen ? onSettingClose : onSettingOpen}
        size={"lg"}
        borderRadius={"full"}
        bgColor={"transparent"}
        aria-label="Settings"
        color={"primary-text"}
        icon={<SettingsIcon />}
      />
      <Heading fontWeight={"black"} color={"primary-text"} fontSize={18}>
        {sortBy === "recent" ? "Recent Notes" : "Oldest Notes"}
      </Heading>
      <IconButton
        onClick={isSearchOpen ? onSearchClose : onSearchOpen}
        size={"lg"}
        borderRadius={"full"}
        bgColor={"transparent"}
        aria-label="Search"
        color={"primary-text"}
        icon={<Search2Icon />}
      />
      <Modal
        initialFocusRef={initialRef}
        isOpen={isSearchOpen}
        onClose={onSearchClose}
      >
        <ModalOverlay />
        <ModalContent
          maxW={isLargerThan768 ? 500 : 360}
          bgColor={"#FFFDFA"}
          py={2}
          borderRadius={"xl"}
          mt={8}
        >
          <ModalBody>
            <FormControl>
              <Input
                ref={initialRef}
                placeholder="Search by searchTitle..."
                focusBorderColor="secondary-text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSearchClose();
                  }
                }}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isSettingOpen}
        onClose={onSettingClose}
      >
        <ModalOverlay />
        <ModalContent
          maxW={isLargerThan768 ? 500 : 360}
          bgColor={"#FFFDFA"}
          pt={2}
          pb={4}
          borderRadius={"xl"}
          m={8}
        >
          <ModalBody className="flex flex-col gap-2">
            <FormControl>
              <FormLabel color={"secondary-text"}>Sort By</FormLabel>
              <Select
                focusBorderColor="secondary-text"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color={"secondary-text"}>From</FormLabel>
              <Input
                type="date"
                focusBorderColor="secondary-text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={"secondary-text"}>To</FormLabel>
              <Input
                type="date"
                focusBorderColor="secondary-text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Header;
