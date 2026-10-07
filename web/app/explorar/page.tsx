import { redirect } from "next/navigation";

// A antiga página /explorar agora é a página inicial.
export default function Explorar() {
  redirect("/");
}