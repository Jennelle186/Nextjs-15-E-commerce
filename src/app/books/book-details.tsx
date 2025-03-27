"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Book } from "../admin/books/bookComponent";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type CartItem = Book & {
  quantity: number;
};

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  books: Book[];
  onAddToCart: (book: Book, quantity: number) => void;
  isInCart: (bookId: string) => boolean;
  cartItems: CartItem[];
  onBookChange: (book: Book) => void;
}

export function BookDetailsModal({
  isOpen,
  onClose,
  book,
  books,
  onAddToCart,
  isInCart,
  cartItems,
  onBookChange,
}: BookDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [currentBookIndex, setCurrentBookIndex] = useState<number>(-1);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Reset quantity when book changes
  useEffect(() => {
    if (book) {
      // Get current quantity from cart if book is in cart
      const cartItem = cartItems.find((item) => item.isbn === book.isbn);
      setQuantity(cartItem ? 1 : 1);

      // Find the index of the current book
      const index = books.findIndex((b) => b.isbn === book.isbn);
      setCurrentBookIndex(index);
    }
  }, [book, books, cartItems]);

  // Handle keyboard events (Escape to close, arrow keys for navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "+" || e.key === "=") {
        setQuantity((prev) => prev + 1);
      } else if (e.key === "-" && quantity > 1) {
        setQuantity((prev) => Math.max(1, prev - 1));
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentBookIndex, books.length, quantity]);

  // Handle navigation to previous book
  const handlePrevious = () => {
    if (currentBookIndex > 0) {
      const prevBook = books[currentBookIndex - 1];
      setCurrentBookIndex(currentBookIndex - 1);
      onBookChange(prevBook);
    }
  };

  // Handle navigation to next book
  const handleNext = () => {
    if (currentBookIndex < books.length - 1) {
      const nextBook = books[currentBookIndex + 1];
      setCurrentBookIndex(currentBookIndex + 1);
      onBookChange(nextBook);
    }
  };

  // Handle adding to cart with animation and feedback
  const handleAddToCart = () => {
    if (!book) return;

    setIsAdding(true);

    // Add to cart with the selected quantity
    onAddToCart(book, quantity);

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? "copy" : "copies"} of "${
        book.title
      }" added to your cart.`,
    });

    // Reset adding state and close modal
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 500);
  };

  // Get cart quantity if book is in cart
  const getCartQuantity = (bookId: string): number => {
    const cartItem = cartItems.find((item) => item.isbn === bookId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle direct quantity input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  // Don't render anything if modal is closed or no book is selected
  if (!isOpen || !book) return null;

  //Placeholder description for books
  const bookDescription = `${
    book.title
  } is a captivating ${book.genre.toLowerCase()} book written by ${
    (book.authors?.firstName +
      " " +
      book.authors?.firstName +
      " " +
      book.authors?.lastName +
      ".",
    book.description)
  }`;

  // Check if we're at the first or last book to disable navigation buttons
  const isFirstBook = currentBookIndex === 0;
  const isLastBook = currentBookIndex === books.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="book-details-title"
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 md:top-4 md:right-4"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Book image */}
                <div className="relative bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 md:p-8">
                  <div className="relative w-full max-w-[200px] md:max-w-[250px] aspect-[2/3] mx-auto">
                    <Image
                      unoptimized
                      src={
                        book.bookImageUrl ||
                        "/placeholder.svg?height=400&width=300"
                      }
                      alt={book.title}
                      className="object-cover rounded-md shadow-md"
                      fill
                      sizes="(max-width: 768px) 200px, 250px"
                      priority
                    />
                  </div>

                  {/* Navigation buttons - Larger on mobile for better touch targets */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-4">
                    <Button
                      variant="secondary"
                      size={isMobile ? "default" : "icon"}
                      className={`rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md ${
                        isFirstBook ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handlePrevious}
                      disabled={isFirstBook}
                      aria-label="Previous book"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      {isMobile && (
                        <span className="ml-1 sr-only md:not-sr-only">
                          Previous
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      size={isMobile ? "default" : "icon"}
                      className={`rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md ${
                        isLastBook ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleNext}
                      disabled={isLastBook}
                      aria-label="Next book"
                    >
                      {isMobile && (
                        <span className="mr-1 sr-only md:not-sr-only">
                          Next
                        </span>
                      )}
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Book details */}
                <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h2
                        id="book-details-title"
                        className="text-xl md:text-2xl font-bold"
                      >
                        {book.title}
                      </h2>
                      <p className="text-muted-foreground">
                        by {book.authors?.firstName} {book.authors?.middleName}{" "}
                        {book.authors?.lastName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-xl font-bold">
                        ₱{" "}
                        {book.price.toLocaleString("en-PH", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-xs md:text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {book.genre}
                      </span>
                    </div>

                    <div className="pt-2 md:pt-4">
                      <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">
                        Description
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground text-justify">
                        {bookDescription}
                      </p>
                    </div>

                    <div className="pt-4 md:pt-6 space-y-3 md:space-y-4">
                      {/* Enhanced Quantity selector */}
                      <div className="space-y-2">
                        <label
                          htmlFor="quantity-input"
                          className="block text-sm font-medium"
                        >
                          Quantity:
                        </label>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-r-none"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <input
                            id="quantity-input"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="h-9 w-16 text-center border-y border-input bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label="Quantity"
                          />

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-l-none"
                            onClick={() => setQuantity(quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>

                          <div className="ml-4 text-sm text-muted-foreground">
                            ₱{" "}
                            {(quantity * book.price).toLocaleString("en-PH", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Cart status */}
                      {isInCart(book.isbn) && (
                        <div className="text-sm text-green-600 dark:text-green-400 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          <span>
                            {getCartQuantity(book.isbn)}{" "}
                            {getCartQuantity(book.isbn) === 1
                              ? "copy"
                              : "copies"}{" "}
                            already in cart
                          </span>
                        </div>
                      )}

                      {/* Add to cart button */}
                      <Button
                        className="w-full bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400 h-10 md:h-11"
                        onClick={handleAddToCart}
                        disabled={isAdding}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {isAdding
                          ? "Adding..."
                          : isInCart(book.isbn)
                          ? `Add ${quantity} more to Cart`
                          : `Add ${quantity} to Cart`}
                      </Button>
                    </div>

                    {/* Navigation indicators */}
                    <div className="pt-3 md:pt-4 flex justify-between text-xs md:text-sm text-muted-foreground">
                      <span>
                        {!isFirstBook && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={handlePrevious}
                            className="p-0 h-auto"
                          >
                            ← Previous
                          </Button>
                        )}
                      </span>
                      <span className="text-center">
                        {currentBookIndex + 1} of {books.length}
                      </span>
                      <span>
                        {!isLastBook && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={handleNext}
                            className="p-0 h-auto"
                          >
                            Next →
                          </Button>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
