"use client";
import { Button } from "@/components/ui/button";
import { User } from "@/drizzle/schema";
import { fetchUsers } from "@/features/users/actions";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function Home() {
  const [users , setUsers] = useState<User[]>([]);
  const [isPending , startTrans] = useTransition();


  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Hello World!</h1>
      <br />
      {/* <Button variant="destructive">Click Me</Button>
      <Button variant="ghost">Click Me</Button>
      <Button variant="link">Click Me</Button>
      <Button variant="outline">Click Me</Button>
      <Button variant="secondary">Click Me</Button> */}
      <Button variant="default" onClick={() => {
        startTrans(async() => {
          fetchUsers().then((data) => {
            setUsers(data);
            console.log(data);
          });
        });

      }}>Click Me</Button>


      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name} - {user.email} - {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
