import { useState, useEffect } from "react";
import { Divider, NavBar, Stepper } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { Product } from "../api/type";

const CartPage = () => {
  // Load cart items with quantities from localStorage
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Handle removing item from the cart
  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.product.id !== id);
    setCartItems(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle quantity change
  const handleQtyChange = (id: number, qty: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === id ? { ...item, qty } : item
    );
    setCartItems(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Filter products from the mock data to display in the cart
  const displayedCartItems: {product:Product, qty:number}[] = JSON.parse(localStorage.getItem('cart') || '[]');

  // Calculate total price
  const totalPrice = displayedCartItems.reduce((total, product) => {
    const itemInCart = cartItems.find((item) => item.product.id === product.product.id);
    return total + product.product.sale_price * (itemInCart?.qty || 1);
  }, 0);

  return (
    <>
      <div className="fixed top-0 w-full">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          Cart
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4 bg-gray-100 space-y-4">
        {displayedCartItems.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty 😢</div>
        ) : (
          displayedCartItems.map((product) => {
            const itemInCart = cartItems.find((item) => item.product.id === product.product.id);
            return (
              <CartItem
                key={product.product.id}
                product={product.product}
                qty={itemInCart?.qty || 1}
                onQtyChange={handleQtyChange}
                onRemove={handleRemoveItem}
              />
            );
          })
        )}
      </div>
      <div className="fixed bottom-0 w-full p-4">
        <Divider />
        {/* Total Price Section */}
        <div className="flex mt-4  p-4 pt-0 rounded-xl justify-between items-center">
          <div className="text-lg font-semibold">Total:</div>
          <div className="text-lg font-bold">${totalPrice.toFixed(2)}</div>
        </div>
        <div className="w-full flex gap-4">
          <button
            onClick={() => navigate("/sale-order")}
            className="bg-primary p-3 w-1/2 rounded-xl text-lg font-bold text-white"
          >
            Sale Order
          </button>
          <button
            onClick={() => navigate("/sale-invoice")}
            className="bg-primary p-3 w-1/2 rounded-xl text-lg font-bold text-white"
          >
            Sale Invoice
          </button>
        </div>
      </div>
    </>
  );
};

const CartItem = ({
  product,
  qty,
  onQtyChange,
  onRemove,
}: {
  product: Product;
  qty: number;
  onQtyChange: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}) => {
  const priceValue = (value?: number) => {
    return value?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  return (
    <div className="flex bg-white w-full items-center justify-between p-2 rounded-xl">
      <div className="flex">
        <div className="bg-primary w-16 h-16 me-2 rounded-xl overflow-hidden">
          <img
            src={`${import.meta.env.VITE_APP_ASSET_URL}${product.thumbnail}`}
            alt={product.name}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-around items-start">
          <div className="text-base font-semibold">{product.name}</div>
          <div className="text-base">{priceValue(product.sale_price)}</div>
        </div>
      </div>
      <div className="flex items-end flex-col">
        <div className="flex items-start">
          <div>{priceValue(product.sale_price * qty)}</div>
          <button
            onClick={() => onRemove(product.id)}
            className="text-red-500 hover:text-red-700 font-semibold mb-5 ms-2"
          >
            <FaRegTrashAlt size={14} />
          </button>
        </div>
        <Stepper
          min={1}
          value={qty}
          onChange={(value) => onQtyChange(product.id, value)}
        />
      </div>
    </div>
  );
};

export default CartPage;
