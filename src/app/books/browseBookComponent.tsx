"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";
import { bookGenres } from "../admin/books/new/bookMaps";
import { Button } from "@/components/ui/button";
import { Book, BookListComponentProps } from "../admin/books/bookComponent";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type cartItemType = Book & { quantity: number };

const BrowseBooksComponent = ({ books }: BookListComponentProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [genre, setSelectedGenre] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<cartItemType[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Save cart items to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  if (!books) return <p>No books found.</p>;

  const filteredBooks = genre.length
    ? books.filter((book) => genre.includes(book.genre))
    : books;

  //add to cart
  const addToCart = (book: Book) => {
    const quantityToAdd = quantities[book.isbn] || 1;

    // If stocks are 0, prevent adding to cart
    if (book.stocks === 0) {
      toast({
        title: "Out of Stock",
        description: "This book is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    // Check if book is already in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.isbn === book.isbn
    );

    const existingQuantity =
      existingItemIndex >= 0 ? cartItems[existingItemIndex].quantity : 0;
    const totalAfterAdd = existingQuantity + quantityToAdd;

    if (totalAfterAdd > book.stocks) {
      toast({
        title: "Stock Limit Reached",
        description: `Only ${book.stocks - existingQuantity} more in stock.`,
        variant: "destructive",
      });
      return;
    }

    if (existingItemIndex >= 0) {
      // Update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity = totalAfterAdd;
      setCartItems(updatedCart);
    } else {
      // Add new item
      setCartItems([...cartItems, { ...book, quantity: quantityToAdd }]);
    }

    // Reset quantity selector
    setQuantities((prev) => ({ ...prev, [book.isbn]: 1 }));

    // Show cart briefly
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(cartItems.filter((book) => book.isbn !== bookId));
  };

  //update cart item quantity inside the cart sidebar
  const updateCartItemQuantity = (bookId: string, newQuantity: number) => {
    const bookInCart = cartItems.find((item) => item.isbn === bookId);
    if (!bookInCart) return;

    if (newQuantity < 1) return;

    if (newQuantity > bookInCart.stocks) {
      toast({
        title: "Stock Limit Reached",
        description: `You can only add up to ${bookInCart.stocks} item(s).`,
        variant: "destructive",
      });
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.isbn === bookId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
  };

  //increment and decrement quantity of books
  const incrementQuantity = (bookId: string) => {
    const book = filteredBooks.find((b) => b.isbn === bookId);
    const currentQty = quantities[bookId] || 1;

    if (!book) return;

    if (currentQty >= book.stocks) {
      toast({
        title: "Stock Limit Reached",
        description: `Maximum available: ${book.stocks}`,
        variant: "destructive",
      });
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [bookId]: currentQty + 1,
    }));
  };

  const decrementQuantity = (bookId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [bookId]: Math.max(1, (prev[bookId] || 1) - 1),
    }));
  };

  const isInCart = (bookId: string) =>
    cartItems.some((item) => item.isbn === bookId);

  //total price of the entire cart items
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  //number of items or books that were added in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Your Next
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300 ml-2",
                pacifico.className
              )}
            >
              Adventure
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of handpicked books across various genres.
            Find your next favorite read and embark on a journey of imagination.
          </p>
        </div>
      </div>

      {/* Genre filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {bookGenres.map((g) => (
          <Button
            key={g.value}
            variant={genre.includes(g.value) ? "default" : "outline"}
            className={cn(
              "rounded-full",
              genre.includes(g.value) &&
                "bg-gradient-to-r from-indigo-300 to-rose-300 text-white hover:from-indigo-400 hover:to-rose-400"
            )}
            onClick={() => {
              setSelectedGenre((prev) =>
                prev.includes(g.value)
                  ? prev.filter((val) => val !== g.value)
                  : [...prev, g.value]
              );
            }}
          >
            {g.label}
          </Button>
        ))}
      </div>

      {/* Book Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredBooks.map((book) => (
          <motion.div
            key={book.isbn}
            className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Book Cover */}
            <div className="relative w-full aspect-[2/3] overflow-hidden">
              <Image
                unoptimized
                src={book.bookImageUrl || "/placeholder.svg"}
                alt={book.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                width={300}
                height={450}
                priority={false}
              />
            </div>

            {/* Book details */}
            <div className="p-3 flex flex-col">
              <div className="mb-2">
                <h3 className="font-medium text-sm line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {book.authors?.firstName} {book.authors?.lastName}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  Stocks left: {book.stocks}
                </p>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">
                  ₱
                  {book.price.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none border-r"
                    onClick={() => decrementQuantity(book.isbn)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">
                    {quantities[book.isbn] || 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none border-l"
                    onClick={() => incrementQuantity(book.isbn)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <Button
                size="sm"
                className={cn(
                  "w-full transition-all duration-300 mt-auto",
                  isInCart(book.isbn)
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
                )}
                onClick={() =>
                  isInCart(book.isbn)
                    ? removeFromCart(book.isbn)
                    : addToCart(book)
                }
              >
                {isInCart(book.isbn) ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Add to Cart
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="rounded-full h-16 w-16 shadow-lg bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Your cart is empty
              </p>
              <Button
                className="mt-4 bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.isbn}
                    className="flex gap-4 mb-4 p-3 border border-gray-100 dark:border-gray-700 rounded-lg"
                  >
                    <div className="h-20 w-16 flex-shrink-0">
                      <Image
                        unoptimized
                        src={item.bookImageUrl || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover rounded w-full h-full"
                        width={64}
                        height={80}
                        priority={false}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.authors?.firstName} {item.authors?.lastName}
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">
                          ₱
                          {item.price.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFromCart(item.isbn)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity controls in cart */}
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-muted-foreground mr-2">
                          Qty:
                        </span>
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-none border-r p-0"
                            onClick={() =>
                              updateCartItemQuantity(
                                item.isbn,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-none border-l p-0"
                            onClick={() =>
                              updateCartItemQuantity(
                                item.isbn,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="ml-auto text-sm font-medium">
                          ₱
                          {(item.price * item.quantity).toLocaleString(
                            "en-PH",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
                <div className="flex justify-between mb-1">
                  <span>
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}
                    )
                  </span>
                  <span className="font-bold">
                    {" "}
                    ₱
                    {totalPrice.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-indigo-300 to-rose-300 hover:from-indigo-400 hover:to-rose-400"
                  onClick={() => {
                    localStorage.removeItem("cartItems");
                    setCartItems([]);
                    router.push("/checkout"); // navigate to your checkout page
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default BrowseBooksComponent;
