import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Livitech Design Studio Patna",
  description:
    "Visit our Kankarbagh Patna design studio or book a free consultation with our senior architects and licensed civil engineers. Instant BOQ & callback.",
};

export default function ContactPage() {
  return <ContactClient />;
}

