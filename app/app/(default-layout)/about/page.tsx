"use client";

import React, { useState, useEffect } from "react";
import GetVersion from "../../components/GetVersion";
export default function About() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-2xl font-bold mb-4">
        Σχετικά με το Pantry Inventory
      </h1>
      <div className="bg-gray-100 p-4 rounded-lg my-4 w-2/3 max-w-md text-center">
        <p className="text-base text-gray-700">
          Το Pantry Inventory είναι ένα καινοτόμο εργαλείο διαχείρισης αποθήκης,
          σχεδιασμένο για να βοηθήσει τους λάτρεις της μαγειρικής και τους
          επαγγελματίες στη διατήρηση ενός οργανωμένου και λειτουργικού
          περιβάλλοντος για τα τρόφιμα και τα είδη τους.
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg my-4 w-2/3 max-w-md text-center">
        <p className="text-base text-gray-700">
          Το Pantry Inventory δημιουργήθηκε από τον Κωνσταντίνο Σταθόπουλο, έναν
          παθιασμένο λάτρη της μαγειρικής με χρόνια εμπειρία στη διατήρηση
          τροφίμων και στο μαγείρεμα. Η εφαρμογή αποτελεί το αποτέλεσμα της
          αφοσίωσής του στη βελτίωση του χόμπι της μαγειρικής, παρέχοντας μια
          χρηστική και λειτουργικά πλούσια λύση για τη διαχείριση αποθήκης.
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg my-4 w-2/3 max-w-md text-center">
        <p className="text-base text-gray-700">
          Είτε είστε αρχάριος είτε έμπειρος μάγειρας, το Pantry Inventory
          προσφέρει μια ευρεία γκάμα εργαλείων και χαρακτηριστικών για να σας
          βοηθήσει να παρακολουθείτε τις παραμέτρους των τροφίμων, να
          προγραμματίζετε εργασίες συντήρησης και να εξασφαλίζετε την ευημερία
          του τροφίμου συστήματός σας. Καταδυθείτε στον κόσμο του Pantry
          Inventory και απολαύστε τη χαρά της διατήρησης ενός οργανωμένου
          περιβάλλοντος με ευκολία.
        </p>
      </div>
      {isScrolling && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-white hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-full shadow-md"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
      <p className="text-sm text-gray-500 mt-4">
        Έκδοση εφαρμογής: <GetVersion />
      </p>
    </div>
  );
}
