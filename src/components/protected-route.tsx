"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login"); // redirect to login if no token
    } else {
      setIsAuth(true); // token exists, allow access
    }
  }, [router]);

  if (!isAuth) {
    return <p>Checking authentication...</p>; // temporary fallback
  }

  return <>{children}</>;
}
