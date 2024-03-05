"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner"; // Replace with your actual toast implementation
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import Modal from "@/app/components/common/Modal";

interface Item {
  id: number;
  name: string;
  description?: string;
  unit?: string;
  imageUrl?: string;
}

export default function ManagePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClick = (itemId: number) => {
    toast(`Row clicked. Item ID: ${itemId}`);
  };

  const handleEdit = (itemId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents row click when clicking the button
    toast("Edit Modal coming soon");
  };

  const handleDelete = (itemId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents row click when clicking the button
    toast(`Item ${itemId} deleted successfully`);
  };

  const openEditModal = (item: Item, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents row click when clicking the button
    setSelectedItem(item);
    setIsModifyOpen(true);
  };

  const openAddModal = () => {
    setSelectedItem(null);
    setIsAddOpen(true);
  };

  const closeModal = () => {
    setIsModifyOpen(false);
    setIsAddOpen(false);
    setSelectedItem(null);
  };

  const handleSave = () => {
    // Handle save logic here for both add and edit
    toast("Changes saved successfully");
    closeModal();
  };

  const dummyData: Item[] = [
    { id: 1, name: "Papaya" },
    { id: 2, name: "Melon" },
    { id: 3, name: "Strawberry" },
    { id: 4, name: "Apricot" },
    { id: 5, name: "Orange" },
    { id: 6, name: "Blackberry" },
    { id: 7, name: "Banana" },
    { id: 8, name: "Nectarine" },
    { id: 9, name: "Pomegranate" },
    { id: 10, name: "Fig" },
    { id: 11, name: "Peach" },
    { id: 12, name: "Plum" },
    { id: 13, name: "Kiwi" },
    { id: 14, name: "Lychee" },
    { id: 15, name: "Passion Fruit" },
    { id: 16, name: "Apple" },
    { id: 17, name: "Guava" },
    { id: 18, name: "Tangerine" },
    { id: 19, name: "Grapes" },
    { id: 20, name: "Lemon" },
  ];

  const filteredData = searchTerm
    ? dummyData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : dummyData;

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4 items-center">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-l-full w-full"
        />
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-r-full border border-gray-300"
        >
          <MdAddTask />
        </button>
      </div>

      {/* <Modal open={isModifyOpen} onClose={closeModal}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Edit Item</h2>
          <input
            type="text"
            value={selectedItem?.name || ""}
            onChange={(e) =>
              setSelectedItem({ ...selectedItem, name: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </Modal> */}

      <Modal open={isAddOpen} onClose={closeModal}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Add New Item</h2>
          <input
            type="text"
            value={selectedItem?.name || ""}
            placeholder="Enter item name"
            onChange={(e) =>
              setSelectedItem({ id: Date.now(), name: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Item
          </button>
        </div>
      </Modal>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={(e) => handleEdit(item.id, e)}
                    className="text-gray-600 hover:text-gray-800 mr-2"
                  >
                    <FaEdit aria-label="Edit" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaTrashAlt aria-label="Delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
