import Image from "next/image";
import DemoPage from "./overview/page";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

export default function Home() {
  return (
    <div>
      <DemoPage />
    </div>
  );
}
