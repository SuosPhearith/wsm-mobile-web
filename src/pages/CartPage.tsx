import { useState, useEffect } from "react";
import { Dialog, DotLoading, NavBar, Popup, Stepper, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Product } from "../api/type";
import defaultImage from "../assets/imgaes/logo.png";
import { priceValue } from "../utils/share";
import { FiPlusCircle } from "react-icons/fi";
import { useQuery } from "react-query";
import { calculateTotal } from "../api/cart";
import Error from "../components/share/Error";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const CartPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<
    { product: Product; qty: number }[]
  >([]);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [holdName, setHoleName] = useState("");
  const [holdData, setHoleData] = useState<{ name: string }[]>(
    JSON.parse(window.localStorage.getItem("hold") || "[]") || []
  );

  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.product.id !== id);
    setCartItems(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQtyChange = (id: number, qty: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === id ? { ...item, qty } : item
    );
    setCartItems(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const displayedCartItems: { product: Product; qty: number }[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const [debouncedCartItems, setDebouncedCartItems] =
    useState(displayedCartItems);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCartItems(displayedCartItems);
    }, 500);

    return () => clearTimeout(handler);
  }, [displayedCartItems]);

  const {
    data: total,
    isLoading,
    isError,
  } = useQuery(
    ["total", debouncedCartItems],
    () =>
      calculateTotal({
        items: debouncedCartItems.map((item) => ({
          product_id: item.product.id,
          qty: item.qty === 0 ? 1 : item.qty,
        })),
        pos_app_id: window.localStorage.getItem("app") || "",
      }),
    { enabled: debouncedCartItems.length > 0 }
  );

  const cartValue = () => {
    try {
      const carts = window.localStorage.getItem("cart");
      const jsonCarts = carts ? JSON.parse(carts) : [];
      return Array.isArray(jsonCarts) ? jsonCarts.length : 0;
    } catch (error) {
      console.error("Failed to parse cart data:", error);
      return 0;
    }
  };

  //::::::::::::::::::::::::::::::=> Hole <=:::::::::::::::::::::::::::::::::

  const handleSaveHole = () => {
    try {
      const currentCart = window.localStorage.getItem("cart");

      if (
        !currentCart ||
        currentCart.trim() === "" ||
        JSON.parse(currentCart).length === 0
      ) {
        Dialog.alert({
          title: "Required Item",
          content: "No items in cart to save.",
          confirmText: "OK",
        });
        return;
      }

      if (!holdName.trim()) {
        Dialog.alert({
          title: "Required Name",
          content: "Hole name cannot be empty.",
          confirmText: "OK",
        });
        return;
      }

      const holdData =
        JSON.parse(window.localStorage.getItem("hold") || "[]") || [];

      // Check if hold name already exists
      if (holdData.some((hold: { name: string }) => hold.name === holdName)) {
        Dialog.alert({
          title: "Duplicate Name",
          content: "Hole name must be unique.",
          confirmText: "OK",
        });
        return;
      }

      const holdSaved = [
        ...holdData,
        { name: holdName, cart: JSON.parse(currentCart) },
      ];

      window.localStorage.setItem("hold", JSON.stringify(holdSaved));
      // remove cart after save
      window.localStorage.removeItem("cart");

      setHoleData(holdSaved);

      handleReset();
    } catch (error) {
      Dialog.alert({
        title: "Error",
        content: "An error occurred while saving the hold.",
        confirmText: "OK",
      });
      console.error("Error saving hold:", error);
    }
  };

  const handleClearCart = () => {
    Dialog.confirm({
      title: "Confirm Clear",
      content: "Are you sure to clear the cart?",
      confirmText: "Clear",
      cancelText: "Cancel",
      onConfirm: () => {
        window.localStorage.removeItem("cart");
        setCartItems([]);
        Toast.show({
          content: "Cart Cleared!",
        });
      },
    });
  };

  const handleReset = () => {
    setVisible(false);
    setHoleName("");
  };

  const handleApplyCart = (holdName: string) => {
    Dialog.confirm({
      title: "Confirm Apply",
      content: `Are you sure to apply "${holdName}"?`,
      confirmText: "Apply",
      cancelText: "Cancel",
      onConfirm: () => {
        try {
          const holdData =
            JSON.parse(window.localStorage.getItem("hold") || "[]") || [];

          // Find the selected hold
          const selectedHold = holdData.find(
            (hold: { name: string }) => hold.name === holdName
          );

          if (!selectedHold) {
            Dialog.alert({
              title: "Not Found",
              content: "Selected hold not found.",
              confirmText: "OK",
            });
            return;
          }

          // ✅ Apply selected hold to cart
          window.localStorage.setItem(
            "cart",
            JSON.stringify(selectedHold.cart)
          );
          setCartItems(selectedHold.cart);

          // ✅ Remove the applied hold from holdData
          const updatedHolds = holdData.filter(
            (hold: { name: string }) => hold.name !== holdName
          );
          window.localStorage.setItem("hold", JSON.stringify(updatedHolds));
          setHoleData(updatedHolds);

          Toast.show({
            content: `Cart Applied!`,
          });
        } catch (error) {
          Dialog.alert({
            title: "Error",
            content: "An error occurred while applying the hold.",
            confirmText: "OK",
          });
          console.error("Error applying hold:", error);
        }
      },
    });
  };

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <div className="fixed top-0 w-full">
        <NavBar
          className="bg-white"
          onBack={() => navigate(-1)}
          right={
            <div className="flex justify-end">
              <MdOutlineRemoveShoppingCart
                size={20}
                className="text-red-700"
                onClick={() => handleClearCart()}
              />
            </div>
          }
        >
          <div className="flex flex-col">
            <div>{t("cart.cartTitle")}</div>
          </div>
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      {/* Category area */}
      <section className="mt-4 px-4">
        <div className="flex w-full overflow-auto scroll-smooth scrollbar-hide">
          <button
            disabled={displayedCartItems.length === 0}
            onClick={() => setVisible(true)}
            className={`px-4 ${
              displayedCartItems.length === 0 ? "text-gray-400" : ""
            } min-w-fit py-1 text-base me-2 rounded-lg bg-white flex items-center text-blue-500`}
          >
            <FiPlusCircle className="me-2" /> Hold
          </button>
          {holdData?.map((item: { name: string }) => (
            <button
              onClick={() => handleApplyCart(item.name)}
              className={`px-4 min-w-fit py-1 text-base me-2 rounded-lg bg-white`}
              key={item.name}
            >
              {item.name}
            </button>
          ))}
        </div>
      </section>
      <div className="p-4 bg-gray-100 space-y-4 mb-[170px]">
        {displayedCartItems.length === 0 ? (
          <div className="text-center text-gray-500">{t("cart.emptyCart")}</div>
        ) : (
          displayedCartItems.map((product) => {
            const itemInCart = cartItems.find(
              (item) => item.product.id === product.product.id
            );
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
      <div className="fixed bottom-0 w-full p-4 bg-white border-t-[1px] border-primary">
        {/* Total Price Section */}
        <div className="flex mt-4  p-4 pt-0 rounded-xl justify-between items-center">
          <div className="text-lg font-semibold">{t("cart.total")}</div>
          <div className="text-lg font-bold">
            {!isLoading ? priceValue(total?.grand_total) : <DotLoading />}
          </div>
        </div>
        <div className="w-full flex gap-4">
          <button
            disabled={cartValue() === 0}
            onClick={() => navigate("/sale-order")}
            className={`p-3 w-1/2 rounded-xl text-lg font-bold text-white ${
              cartValue() === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {t("cart.saleOrder")}
          </button>

          <button
            disabled={cartValue() === 0}
            onClick={() => navigate("/sale-invoice")}
            className={`p-3 w-1/2 rounded-xl text-lg font-bold text-white ${
              cartValue() === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {t("cart.saleInvoice")}
          </button>
        </div>
      </div>

      <Popup
        visible={visible}
        onMaskClick={handleReset}
        onClose={handleReset}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "fit-content",
          background: "#f3f4f6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        {/* Popup Content */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-lg font-semibold mb-2">Save Hold</div>
          <input
            type="text"
            placeholder="Enter hold name"
            className="w-full p-3 rounded-lg mb-2 text-base"
            value={holdName}
            onChange={(e) => setHoleName(e.target.value)}
          />
        </div>
        <button
          className="p-3 bg-primary w-full rounded-2xl text-lg font-bold text-white"
          onClick={() => handleSaveHole()}
        >
          Confirm Hold
        </button>
      </Popup>
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
  return (
    <div className="flex bg-white w-full items-center justify-between p-2 rounded-xl h-fit">
      <div className="flex gap-2">
        <div className="bg-white min-h-full max-w-[54px] me-2 rounded-xl overflow-hidden">
          <img
            src={
              product.thumbnail
                ? `${import.meta.env.VITE_APP_ASSET_URL}${product.thumbnail}`
                : defaultImage
            }
            alt={product.name}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2 justify-around items-start">
          <div className="text-sm leading-tight	">{product.name}</div>
          <div className="text-sm font-semibold">{priceValue(product.unit_price * qty)}</div>
        </div>
      </div>
      <div className="flex items-end flex-col">
        <div className="flex items-start">
          {/* <div>{priceValue(product.unit_price * qty)}</div> */}
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
