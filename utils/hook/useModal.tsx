"use client"

import { useState } from "react";

export default function useModal<T>() {
  const [isOpen, setIsOpen] = useState(false);
  const [typePopup, setTypePopup] = useState<T | null>(null);

  const openPopup = (type?: T) => {
    if (type) {
      setTypePopup(type);
    }
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setTypePopup(null);
  };
  
  return { typePopup, isOpen, openPopup, closePopup };
}
