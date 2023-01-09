import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Link href="mechanic/auth/login">صفحه ورود مکانیک</Link>
      <Link href="evaluator/auth/login">صفحه ورود ارزیاب</Link>
      <Link href="admin/auth/login">صفحه ورود ادمین</Link>
    </div>
  );
}
