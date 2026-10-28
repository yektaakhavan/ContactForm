import Navbar from "../components/layout/Navbar";
import ContactForm from "../components/contact/ContactForm";
import ContactSidebar from "../components/contact/ContactSidebar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <main className="grid grid-cols-1 md:grid-cols-12 gap-16 py-16">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <div className="md:col-span-5">
            <ContactSidebar />
          </div>
        </main>
      </div>
    </div>
  );
}
