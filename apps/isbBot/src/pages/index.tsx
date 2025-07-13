import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId") || ""
    if (userId === "") {
      localStorage.clear()
      router.push('/interview')
    }
    else {
      router.push('/application/personal-details')
    }

  }, [router]);
  return (
    <>
      <Head>
        <title>ISB</title>
      </Head>
      <div
      >
        <LoadingScreen />
      </div>

    </>
  );
};
export default Home;
