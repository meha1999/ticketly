import Link from "next/link";


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
      <Link href="customer/auth/login">صفحه ورود مشتری</Link>
      <Link href="staff/auth/login">صفحه ورود ارزیاب</Link>
      <Link href="supplier/auth/login">صفحه ورود تامیین کننده</Link>
      <Link href="superuser/auth/login">صفحه ورود ادمین</Link>
    </div>
  );
}
