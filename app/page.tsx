"use client";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center w-full mx-auto min-h-screen">
      <div className="flex flex-col gap-28 items-center py-8 w-full h-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-text-primary">
          Ryudhis&apos;s Notes
        </h1>
        <div className="flex flex-col gap-8 md:gap-10 items-center">
          <Image
            src="/images/login.svg"
            alt=""
            width={0}
            height={0}
            className="w-[268px] h-[197px] md:w-[294.8px] md:h-[216.7px] lg:w-[335px] lg:h-[246.25px] xl:w-[402px] xl:h-[295.5px]"
            priority
          />
          <div className="flex flex-col gap-3 text-center max-w-[80%]">
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-text-primary">
              World&apos;s Safest And Largest Digital Notebook
            </h3>
            <p className="font-bold text-text-secondary md:text-lg lg:text-xl xl:text-2xl">
              Ryudhis&apos;s Notes is the world&apos;s safest, largest and
              intelligent digital notebook. Let&apos;s get started to make a
              great notes!
            </p>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <Button
              onClick={() => router.push("/notes")}
              colorScheme="flame-pea"
              fontSize={20}
              fontWeight="black"
              letterSpacing={3}
              py="40px"
              px="76px"
              borderRadius="xl"
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
