"use client";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col gap-28 items-center py-8 max-w-[320px] mx-auto">
      <h1 className="text-2xl font-bold text-text-primary">
        Ryudhis&apos;s Notes
      </h1>
      <div className="flex flex-col gap-8 items-center">
        <Image
          src="/images/login.svg"
          alt=""
          width={0}
          height={0}
          className="w-[268px] h-[197px]"
          priority
        />
        <div className="flex flex-col gap-3 text-center">
          <h3 className="text-2xl font-black text-text-primary">
            World&apos;s Safest And Largest Digital Notebook
          </h3>
          <p className="font-bold text-text-secondary">
            Ryudhis&apos;s Notes is the world&apos;s safest, largest and
            intelligent digital notebook. Join over 10M+ users already using
            Notely.
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <Button
            onClick={() => router.push("/login")}
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
          <Text
            onClick={() => {
              router.push("/register");
            }}
            color="flame-pea.500"
            fontWeight="extrabold"
          >
            Don&apos;t have an account?
          </Text>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
