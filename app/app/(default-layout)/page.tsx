"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { VscGithubAction } from "react-icons/vsc";
import { FiMinus, FiPlus } from "react-icons/fi";
import Image from "next/image"; // Import Next.js Image component
import Modal from "@/app/components/common/Modal";

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  imageUrl: string;
}

export default function PantryListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [originalQuantity, setOriginalQuantity] = useState<number | null>(null);

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

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleActionButtonClick = () => {
    setIsActionOpen(true);
  };

  const handleItemClick = (item: Product) => {
    setSelectedItem(item);
    setIsPreviewOpen(true);
    setOriginalQuantity(item.quantity); // Store the original quantity
  };

  const updateQuantity = (newQuantity: any) => {
    if (selectedItem) {
      setSelectedItem({ ...selectedItem, quantity: newQuantity });
    }
  };

  const incrementQuantity = () => {
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity + 1,
      });
    }
  };

  const decrementQuantity = () => {
    if (selectedItem && selectedItem.quantity > 0) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      });
    }
  };

  const handleMassRemove = () => {
    // Update this logic based on how you manage the state of your items
    // Here, I'm just setting an empty array for demonstration purposes
    pantryItems = []; // Make sure this is managed by state if dynamic
    setIsActionOpen(false);
    toast("All items have been removed");
  };

  const handleQuantityChange = () => {
    setIsPreviewOpen(false);

    if (selectedItem) {
      if (selectedItem.quantity === 0) {
        toast("Product removed successfully");
        // Logic to remove the item from your state
        // Example: setPantryItems(pantryItems.filter(item => item.id !== selectedItem.id));
      } else if (selectedItem.quantity !== originalQuantity) {
        toast("Product quantity updated successfully");
        // Logic to update the item in your state
        // Example: Update the quantity of the specific item in your state
      }
      // If quantity is unchanged, do nothing
    }

    setSelectedItem(null); // Reset the selected item
    setOriginalQuantity(0); // Reset the original quantity
  };

  let pantryItems = [
    // Example items - replace with your actual data
    {
      id: 1,
      name: "Apples",
      description: "Fresh green apples",
      quantity: 5,
      unit: "kg", // Added unit field
      imageUrl: "https://source.unsplash.com/300x200/?apple",
    },
    // add 10 more items
    {
      id: 2,
      name: "Bananas",
      description: "Fresh bananas",
      quantity: 2,
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?banana",
    },
    {
      id: 3,
      name: "Oranges",
      description: "Fresh oranges",
      quantity: 3,
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?orange",
    },
    {
      id: 4,
      name: "Grapes",
      description: "Fresh grapes",
      quantity: 1,
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?grapes",
    },
    {
      id: 5,
      name: "Strawberries",
      description: "Fresh strawberries",
      quantity: 1,
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?strawberries",
    },
    {
      id: 6,
      name: "Blueberries",
      description: "Fresh blueberries",
      quantity: 1,
      unit: "quantity",
      imageUrl: "https://source.unsplash.com/300x200/?blueberries",
    },
    {
      id: 7,
      name: "Raspberries",
      description: "Fresh raspberries",
      quantity: 1,
      unit: "quantity",
      imageUrl: "https://source.unsplash.com/300x200/?raspberries",
    },
    {
      id: 8,
      name: "Pineapple",
      description: "Fresh pineapple",
      quantity: 1,
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?pineapple",
    },
    {
      id: 9,
      name: "Mango",
      description: "Fresh mango",
      quantity: 1,
      unit: "quantity",
      imageUrl: "https://source.unsplash.com/300x200/?mango",
    },
    {
      id: 10,
      name: "Peach",
      description: "Fresh peach",
      quantity: 1,
      unit: "quantity",
      imageUrl: "https://source.unsplash.com/300x200/?peach",
    },
    {
      id: 11,
      name: "Plum",
      description: "Fresh plum",
      quantity: 1,
      unit: "quantity",
      imageUrl: "https://source.unsplash.com/300x200/?plum",
    },
  ];

  const filteredPantryItems = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Search pantry items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-l-full w-full"
        />
        <button
          onClick={handleActionButtonClick}
          className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-r-full border border-gray-300 text-md"
        >
          <VscGithubAction />
        </button>
      </div>

      <Modal open={isActionOpen} onClose={() => setIsActionOpen(false)}>
        <div className="p-4 bg-white rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Pantry Actions</h2>
          <p className="text-center mb-6">
            {filteredPantryItems.length > 0
              ? `You have ${filteredPantryItems.length} items in your pantry.`
              : "There are no items in your pantry."}
          </p>
          <button
            onClick={handleMassRemove}
            disabled={filteredPantryItems.length === 0}
            className={`w-full px-4 py-3 rounded-lg ${
              filteredPantryItems.length > 0
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Remove All
          </button>
        </div>
      </Modal>

      <Modal open={isPreviewOpen} onClose={handleQuantityChange}>
        <div className="p-6 bg-white rounded-lg max-w-2xl mx-auto">
          {selectedItem && (
            <>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 relative">
                    <Image
                      src={selectedItem.imageUrl || "/default-image.jpg"}
                      alt={selectedItem.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-2">
                    {selectedItem.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedItem.description}
                  </p>
                  <div className="flex items-center mb-4 gap-3">
                    <span className="text-gray-700 text-lg">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(Math.max(0, selectedItem.quantity - 1))
                        }
                        className="bg-gray-200 hover:bg-gray-300 p-2 text-gray-700"
                      >
                        <FiMinus />
                      </button>
                      <input
                        type="text"
                        value={selectedItem.quantity}
                        readOnly
                        className="w-12 text-center border-l border-r"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(selectedItem.quantity + 1)
                        }
                        className="bg-gray-200 hover:bg-gray-300 p-2 text-gray-700"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>

      <div>
        {filteredPantryItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border border-gray-300 p-2 rounded-lg hover:shadow-lg cursor-pointer mb-2"
            onClick={() => handleItemClick(item)} // Pass the whole item object
          >
            <div className="w-10 h-10 relative mr-2">
              <Image
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-md font-bold">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            <span className="text-gray-800">
              {item.unit === "quantity"
                ? `x${item.quantity}`
                : `${item.quantity} ${item.unit}`}
            </span>
          </div>
        ))}
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
    </div>
  );
}
