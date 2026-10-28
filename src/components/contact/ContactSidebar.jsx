// ContactSidebar
// │
// ├── offices (data)
// ├── phones (data)
// │
// ├── newsletter state
// │    ├── email
// │    ├── error
// │    └── success
// │
// ├── validateEmail()
// ├── handleChange()
// └── handleSubmit()

// Offices → map
// Phones → map
// Newsletter → controlled form

import UsImage from "../../assets/images/UsImage.png";
import UkImage from "../../assets/images/UkImage.png";
import CheckImage from "../../assets/svg/IconsTick.svg";
import { useState } from "react";

// office,phone چون داده های استاتیک هستند بهتر است به بیرون از تابع کامپوننت بروند چون اگر داخل بدنه تابع باشند در هر بار Re-render کامپوننت، این آرایه‌ها دوباره در حافظه ساخته می‌شوند (Re-allocated).

const offices = [
  {
    country: "United States",
    address: "500 5th Avenue Suite 400, NY 10110",
  },
  {
    country: "United Kingdom",
    address: "High St, Bromley BR1 1DN",
  },
  {
    country: "France",
    address: "80 avenue des Terroirs de France, Paris",
  },
];

const phones = [
  {
    flag: UkImage,
    number: "+44 7777777777",
    alt: "UK phone number",
  },
  {
    flag: UsImage,
    number: "+1 3333333333",
    alt: "US phone number",
  },
];

export default function ContactSidebar() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) return "Email is required";

    if (!emailRegex.test(email)) return "Please enter a valid email address";

    return "";
  };

  const handleChange = (e) => {
    setEmail(e.target.value);

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = () => {
    const validationError = validateEmail();

    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <div className="space-y-12 pt-10">
      {/* Offices */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">Offices</h3>

        <div className="space-y-6 text-sm text-gray-500">
          {offices.map((office) => (
            <p key={office.country}>
              <span className="block font-semibold text-gray-700">
                {office.country}
              </span>
              {office.address}
            </p>
          ))}
        </div>
      </div>

      {/* Quick Inquiries */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">For Quick Inquiries</h3>

        <div className="space-y-3 text-sm text-gray-600">
          {phones.map((phone) => (
            <div key={phone.number} className="flex items-center gap-2">
              <img src={phone.flag} alt={phone.alt} />
              <span>{phone.number}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4">
          Would you like to join our newsletter?
        </h3>

        <div className="flex items-end gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="flex-1 border-b border-gray-300 py-2 outline-none focus:border-yellow-600"
          />

          <button
            onClick={handleSubmit}
            className="p-3 bg-slate-400 text-white rounded"
            aria-label="Subscribe to newsletter"
          >
            <img src={CheckImage} alt="Submit email" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      </div>
    </div>
  );
}

// ساده فقط با html
// import UsImage from "../../assets/images/UsImage.png";
// import UkImage from "../../assets/images/UkImage.png";
// import CheckImage from "../../assets/svg/IconsTick.svg";
// export default function ContactSidebar() {
//   return (
//     <div className="space-y-12 pt-10">
//       {/* Offices */}
//       <div>
//         <h3 className="font-bold text-gray-900 mb-4">Offices</h3>

//         <div className="space-y-6 text-sm text-gray-500">
//           <p>
//             <span className="block font-semibold text-gray-700">
//               United States
//             </span>
//             500 5th Avenue Suite 400, NY 10110
//           </p>

//           <p>
//             <span className="block font-semibold text-gray-700">
//               United Kingdom
//             </span>
//             High St, Bromley BR1 1DN
//           </p>
//           <p>

//               France 80 avenue des Trroirs de France, Paris

//           </p>
//         </div>
//       </div>

//       {/* Quick Inquiries */}
//       <div>
//         <h3 className="font-bold text-gray-900 mb-4">For Quick Inquiries</h3>

//         <div className="space-y-3 text-sm text-gray-600">
//           <div className="flex">
//             <img src={UkImage} alt="" />
//             +44 7777777777
//           </div>
//           <div className="flex">
//             <img src={UsImage} alt="" />
//             +1 3333333333
//           </div>
//         </div>
//       </div>

//       {/* Newsletter */}
//       <div>
//         <h3 className="font-bold text-gray-900 mb-4">
//           Would ypu like to join our newsletter?
//         </h3>

//         <div className="flex items-end gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="flex-1 border-b border-gray-300 py-2 outline-none focus:border-yellow-600"
//           />

//           <button className="p-3 bg-slate-400 text-white rounded">
//             <img src={CheckImage} alt="" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
