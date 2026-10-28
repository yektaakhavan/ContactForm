// controlled form pattern
// generic change handler
// lifting state from FileUpload
// FormData for file upload
// loading state
// basic validation
// error messages زیر هر input

// 1️⃣ Add React state
// 2️⃣ Convert inputs → controlled inputs
// 3️⃣ Add generic change handler
// 4️⃣ Add validation state
// 5️⃣ Write validation function
// 6️⃣ Show error messages
// 7️⃣ Handle form submit
// 8️⃣ Add loading state
// 9️⃣ Integrate FileUpload
// 10️⃣ Reset form after submit

// قطعه کدهای کامنت شده مربوط به ارسال فرم به API هست.

import { useState } from "react";
import FileUpload from "./FileUpload";

export default function ContactForm() {
  // form data state
  const [formData, setFormData] = useState({
    companyName: "",
    businessNature: "",
    address: "",
    postcode: "",
    contactName: "",
    phone: "",
    email: "",
    message: "",
  });

 

  // validation errors
  const [errors, setErrors] = useState({});

  // uploaded files
  const [files, setFiles] = useState([]);

  // loading state
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // generic input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // receive files
  const handleFilesChange = (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  // form validation
  const validateForm = () => {
    const newErrors = {};

    // اگر بعد از حذف فاصله‌ها چیزی باقی نماند → خطا
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    if (!formData.contactName.trim())
      newErrors.contactName = "Contact name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.phone.trim()) newErrors.phone = "Contact Phone is required";

    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    return newErrors;
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // اینجا فقط کارهای لوکال انجام می‌شود
    console.log("Form submitted locally!", formData);
    console.log("Files ready to be sent:", files);

    // setIsSubmitting(true);

    //   try {
    //     const data = new FormData();

    //     Object.entries(formData).forEach(([key, value]) => {
    //       data.append(key, value);
    //     });

    //     files.forEach((item) => {
    //       data.append("files", item.file);
    //     });

    //     await fetch("/api/contact", {
    //       method: "POST",
    //       body: data,
    //     });

    //     alert("Form submitted successfully");

    // reset form
    setFormData({
      companyName: "",
      businessNature: "",
      address: "",
      postcode: "",
      contactName: "",
      phone: "",
      email: "",
      message: "",
    });

    setErrors({});
    setFiles([]);
    //   } catch (error) {
    //     console.error(error);
    //     alert("Something went wrong");
    //   }

    //   setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact us</h1>

      <p className="text-gray-500 mb-12 max-w-md">
        Need an experienced and skilled hand with custom IT projects? Fill out
        the form to get a free consultation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* company name */}
        <div>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company Name"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        {/* business nature */}

        <input
          type="text"
          name="businessNature"
          value={formData.businessNature}
          onChange={handleChange}
          placeholder="Nature of Business"
          className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
        />

        {/* address + postcode */}
        <div className="grid grid-cols-2 gap-8">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
          />

          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="Postcode"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
          />
        </div>

        {/* contact name */}
        <div>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Contact Name"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
          )}
        </div>

        {/* phone */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Contact Phone"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* message */}

        <textarea
          rows="2"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Let's talk about your idea"
          className="w-full border-b border-gray-300 py-3 outline-none resize-none focus:border-yellow-600"
        />

        {/* file upload */}
        <FileUpload onFilesChange={handleFilesChange} />

        {/* submit */}
        <button
          // disabled={isSubmitting}
          className="w-full px-16 py-4 bg-slate-400 text-white rounded-lg tracking-widest hover:bg-slate-500 transition disabled:opacity-50"
        >
          Submit
          {/* {isSubmitting ? "Submitting..." : "Submit"} */}
        </button>
      </form>
    </div>
  );
}

// ساده فقط با html
// import FileUpload from "./FileUpload";

// export default function ContactForm() {
//   return (
//     <div>
//       {/* Heading */}
//       <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact us</h1>

//       <p className="text-gray-500 mb-12 max-w-md">
//         Need an experienced and skilled hand with custom IT projects? Fill out
//         the form to get a free consultation.
//       </p>

//       {/* Form */}
//       <form className="space-y-8">
//         <input
//           type="text"
//           placeholder="Your Company Name"
//           className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//         />

//         <input
//           type="text"
//           placeholder="Nature of Business"
//           className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//         />

//         {/* Two column fields */}
//         <div className="grid grid-cols-2 gap-8">
//           <input
//             type="text"
//             placeholder="Address"
//             className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//           />

//           <input
//             type="text"
//             placeholder="Postcode"
//             className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//           />
//         </div>

//         <input
//           type="text"
//           placeholder="Contact Name"
//           className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//         />

//         <input
//           type="tel"
//           placeholder="Contact Phone"
//           className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border-b border-gray-300 py-3 outline-none focus:border-yellow-600"
//         />

//         <textarea
//           rows="2"
//           placeholder="Let's talk about your idea"
//           className="w-full border-b border-gray-300 py-3 outline-none resize-none focus:border-yellow-600"
//         />

//         {/* Upload Component */}
//         <FileUpload />

//         {/* Button */}
//         <button className="w-full px-16 py-4 bg-slate-400 text-white rounded-lg tracking-widest hover:bg-slate-500 transition">
//           submit
//         </button>
//       </form>
//     </div>
//   );
// }
