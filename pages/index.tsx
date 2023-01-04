import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import DashboardLayout from "components/layouts/dashboard/evaluator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <DashboardLayout />
    </>
  );
}
