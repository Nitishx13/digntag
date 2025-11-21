"use client";
import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
};

type State = {
  users: User[];
  addUser: (u: Omit<User, "id">) => void;
};

export const useUsers = create<State>((set) => ({
  users: [
    { id: "u1", name: "Admin", email: "admin@example.com", role: "admin" },
    { id: "u2", name: "Aarav", email: "aarav@example.com", role: "user" },
  ],
  addUser: (u) =>
    set((s) => ({ users: [{ id: crypto.randomUUID(), ...u }, ...s.users] })),
}));
