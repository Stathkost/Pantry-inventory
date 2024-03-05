"use client";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRef } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  unit: string;
  imageUrl: string;
}

export default function Enlist() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Replace this with your actual product fetching logic
  const fakeProducts: Product[] = [
    {
      id: 1,
      name: "Apples",
      description: "Fresh green apples",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?apple",
    },
    {
      id: 2,
      name: "Bananas",
      description: "Ripe bananas",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?banana",
    },
    {
      id: 3,
      name: "Oranges",
      description: "Juicy oranges",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?orange",
    },
    {
      id: 4,
      name: "Mangoes",
      description: "Sweet mangoes",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?mango",
    },
    {
      id: 5,
      name: "Pineapples",
      description: "Tropical pineapples",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?pineapple",
    },
    {
      id: 6,
      name: "Grapes",
      description: "Fresh grapes",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?grapes",
    },
    {
      id: 7,
      name: "Strawberries",
      description: "Juicy strawberries",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?strawberry",
    },
    {
      id: 8,
      name: "Blueberries",
      description: "Sweet blueberries",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?blueberry",
    },
    {
      id: 9,
      name: "Raspberries",
      description: "Fresh raspberries",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?raspberry",
    },
    {
      id: 10,
      name: "Blackberries",
      description: "Juicy blackberries",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?blackberry",
    },
    {
      id: 11,
      name: "Peaches",
      description: "Sweet peaches",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?peach",
    },
    {
      id: 12,
      name: "Nectarines",
      description: "Fresh nectarines",
      unit: "kg",
      imageUrl: "https://source.unsplash.com/300x200/?nectarine",
    },
  ];
  const filteredProducts = searchTerm
    ? fakeProducts
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (searchTerm === "") {
      setSelectedProduct(null);
    } else {
      const exactMatch = fakeProducts.find(
        (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        setSelectedProduct(exactMatch);
        setShowDropdown(false);
      } else {
        setSelectedProduct(null);
        setShowDropdown(true);
      }
    }
    setHighlightedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setSearchTerm(product.name);
    setShowDropdown(false);
    setHighlightedIndex(-1);
  };

  const handleAddToPantry = () => {
    if (selectedProduct && quantity) {
      toast(`Added ${quantity} of ${selectedProduct.name} to the pantry`);
      setSelectedProduct(null);
      setSearchTerm("");
      setQuantity("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredProducts.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (filteredProducts.length > 0) {
        handleSelectProduct(filteredProducts[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleInputFocus = () => {
    const exactMatch = fakeProducts.some(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setShowDropdown(
      searchTerm.length > 0 && filteredProducts.length > 0 && !exactMatch
    );
  };

  const isAddButtonDisabled = !selectedProduct || !quantity;

  return (
    <div ref={containerRef} className="container mx-auto p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          className="p-2 border border-gray-300 rounded-full w-full"
        />
        {showDropdown && (
          <div className="absolute mt-1 left-0 right-0 bg-white border border-gray-300 rounded shadow-lg">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`cursor-pointer p-2 ${
                  highlightedIndex === index
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelectProduct(product)}
                onMouseEnter={() => setHighlightedIndex(-1)}
                onMouseLeave={() => setHighlightedIndex(-1)}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProduct ? (
        <div className="border p-2 mb-4">
          <div className="flex items-center mb-2">
            <div className="w-16 h-16 relative mr-2">
              <Image
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
              <p>Unit: {selectedProduct.unit}</p>
            </div>
          </div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mb-2"
          />
          <button
            onClick={handleAddToPantry}
            disabled={isAddButtonDisabled}
            className={`py-2 px-4 rounded ${
              isAddButtonDisabled
                ? "bg-gray-200"
                : "bg-white hover:bg-gray-100 text-gray-700"
            } font-bold w-full`}
          >
            Add to Pantry
          </button>
        </div>
      ) : (
        <div className="border p-2 mb-4">
          <p>Select a product to see its details and add to pantry</p>
        </div>
      )}
    </div>
  );
}
