import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import Tasks from "../components/tasks/Tasks";
import TasksHeader from "../components/tasks/Header";

const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center py-10">
      <div className="flex h-full w-[75vw] flex-col items-center justify-center gap-4">
        <TasksHeader />
        <Tasks />
      </div>
    </div>
  );
};

export default Home;
