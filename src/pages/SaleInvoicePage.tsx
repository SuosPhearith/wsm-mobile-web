import { useState, useEffect } from "react";
import { Dialog, Modal, NavBar, Popup, TextArea, Toast } from "antd-mobile";
import { CloseCircleOutline, EditFill, FileOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { priceValue, priceValueWithCurrency } from "../utils/share";
import { Customer, Product, SaleInvoiceInterface } from "../api/type";
import defaultAvatar from "../assets/imgaes/profile2.jpg";
import { useMutation, useQuery } from "react-query";
import { createSaleInvoice } from "../api/sale";
import { MdError } from "react-icons/md";
import { FaCheckCircle, FaLessThan, FaStore, FaTruck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { LuBox } from "react-icons/lu";
import { FiDollarSign, FiMapPin, FiTag } from "react-icons/fi";
import { PosApp } from "./SelectedAppPage";
import { calculateTotal } from "../api/cart";
import Error from "../components/share/Error";

const SaleInvoicePage = () => {
  const { t } = useTranslation(); // Use "saleInvoice" namespace
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [posApps, setPosApps] = useState<PosApp[]>([]);
  const [cartItems, setCartItems] = useState<
    { product: Product; qty: number }[]
  >([]);
  const [note, setNote] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);

    const customerData = window.localStorage.getItem("selectedCustomer");
    if (customerData) {
      const customer: Customer = JSON.parse(customerData);
      setSelectedCustomer(customer);
    } else {
      setSelectedCustomer(null);
    }
  }, []);

  const displayedCartItems: { product: Product; qty: number }[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const clearSelectedCustomer = () => {
    setSelectedCustomer(null);
    window.localStorage.removeItem("selectedCustomer");
  };

  const { mutate: mOrder, isLoading: lOrder } = useMutation({
    mutationFn: createSaleInvoice,
    onSuccess: (data) => {
      window.localStorage.setItem("ordered", JSON.stringify(data) || "{}");
      window.localStorage.removeItem("selectedCustomer");
      window.localStorage.removeItem("cart");
      navigate("/ordered-invoice");
      Toast.show({
        content: (
          <div className="flex justify-center items-start gap-2 text-green-500">
            <FaCheckCircle size={22} />
            {t("saleInvoice.orderSuccess")}
          </div>
        ),
        duration: 2000,
      });
    },
    onError: (error) => {
      Dialog.alert({
        content: (
          <div className="text-red-500 flex items-center gap-1">
            <MdError size={24} />
            {t("saleInvoice.orderError")}
          </div>
        ),
        confirmText: t("saleInvoice.close"),
      });
      console.log(error);
    },
  });

  const handleSaleInvoice = () => {
    const selectedCustomer = window.localStorage.getItem("selectedCustomer");
    const cart = window.localStorage.getItem("cart");

    if (!selectedCustomer || !cart || JSON.parse(cart).length === 0) {
      Modal.alert({
        title: t("saleInvoice.errorTitle"),
        content: t("saleInvoice.selectCustomerError"),
        confirmText: t("saleInvoice.ok"),
      });
      return;
    }
    // Check stock warning
    const warningProducts: { product: Product; qty: number }[] = [];

    // Convert cart to JSON
    const cartJson: { product: Product; qty: number }[] = JSON.parse(cart);

    // Loop check
    cartJson.forEach((cart) => {
      const totalStock = cart.product.inventories.reduce(
        (sum, inv) => sum + inv.quantity,
        0
      );

      if (cart.qty > totalStock) {
        warningProducts.push(cart);
      }
    });
    //====================
    Dialog.confirm({
      title: t("saleInvoice.confirmOrder"),
      content: (
        <div className="max-h-[400px]">
          {warningProducts.length > 0 ? (
            warningProducts.map((product) => (
              <div
                key={product.product.id}
                className="bg-white border border-yellow-500 p-2 m-2 text-xs rounded-lg flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col">
                  <p className="text-gray-800">{product.product.name}</p>
                  <span className="text-xs text-blue-600 flex items-center">
                    Stock:{" "}
                    {product.product.inventories.reduce(
                      (sum, inv) => sum + inv.quantity,
                      0
                    )}
                    <FaLessThan size={10} className="mx-2"/>
                    <span className="text-red-600">QTY: {product.qty}</span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No stock warnings.</p>
          )}
        </div>
      ),
      confirmText: "Ok",
      cancelText: "Cancel",
      onConfirm: () => {
        const cartData: { product: Product; qty: number }[] = JSON.parse(cart);
        const customer: Customer = JSON.parse(selectedCustomer);
        const orderData: SaleInvoiceInterface = {
          items: cartData.map((item) => ({
            product_id: item.product.id,
            qty: item.qty,
            note: "Nothing",
          })),
          customer_id: customer.id,
          pos_app_id: localStorage.getItem("app") || "",
          remark: note,
        };
        mOrder(orderData);
      },
    });
  };

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  const [selectedApp, setSelectedApp] = useState<{
    id: string;
    name: string;
    currency: string;
    warehouse?: string;
  } | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setPosApps(parsedData.pos_apps || []);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Set only one selection at a time
  const handleSelection = (
    id: string,
    name: string,
    currency: string,
    warehouse: string
  ) => {
    setSelectedApp(
      selectedApp?.id === id ? null : { id, name, currency, warehouse }
    );
  };

  // Handle Confirm Click
  const handleConfirm = () => {
    if (selectedApp) {
      // get currency from local storage
      const currency = localStorage.getItem("currency") || "";
      if (selectedApp.currency !== currency) {
        Dialog.confirm({
          title: "Switch Confirmation",
          content: `It will remove current cart and hold data?`,
          confirmText: "Switch",
          cancelText: "Cancel",
          onConfirm: () => {
            window.localStorage.removeItem("cart");
            window.localStorage.removeItem("hold");
            window.localStorage.setItem("app", selectedApp.id);
            window.localStorage.setItem("app-name", selectedApp.name);
            window.localStorage.setItem("currency", selectedApp.currency);
            window.localStorage.setItem(
              "warehouse",
              selectedApp.warehouse || ""
            );
            navigate("/sale");
          },
        });
      } else {
        window.localStorage.removeItem("hold");
        window.localStorage.setItem("app", selectedApp.id);
        window.localStorage.setItem("app-name", selectedApp.name);
        window.localStorage.setItem("currency", selectedApp.currency);
        window.localStorage.setItem("warehouse", selectedApp.warehouse || "");
        setVisible(false);
      }
    }
  };

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
    isLoading: lTotal,
    isError: eTotal,
  } = useQuery(
    ["total", debouncedCartItems, selectedCustomer],
    () =>
      calculateTotal({
        items: debouncedCartItems.map((item) => ({
          product_id: item.product.id,
          qty: item.qty,
        })),
        pos_app_id: window.localStorage.getItem("app") || "",
        customer_id: selectedCustomer?.id,
      }),
    { enabled: debouncedCartItems.length > 0 }
  );

  if (eTotal) {
    return <Error />;
  }

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          {t("saleInvoice.saleInvoiceTitle")}
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4">
        <div className="mb-2">
          <div className="flex items-center">
            <LuBox fontSize={20} />
            <div className="text-lg ms-1 font-semibold">Stock allocation</div>
          </div>
          <div
            onClick={() => setVisible(true)}
            className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg"
          >
            <div className="text-sm">
              {localStorage.getItem("app-name")}
              <span className="bg-primary text-white px-1 rounded-md ms-2 text-sm">
                {localStorage.getItem("warehouse")}
              </span>
            </div>
            <div>
              <EditFill fontSize={18} />
            </div>
          </div>
        </div>
        <div>
          {!selectedCustomer ? (
            <div
              onClick={() => navigate("/customer")}
              className="flex items-center w-full bg-white mt-2 justify-between p-3 rounded-lg"
            >
              <div className="text-base">{t("saleInvoice.selectCustomer")}</div>
              <div>
                <EditFill fontSize={18} />
              </div>
            </div>
          ) : (
            <div className="flex p-2 justify-between items-center bg-white mt-2 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-300 flex justify-center items-center">
                  <img
                    src={selectedCustomer?.avatar || defaultAvatar}
                    alt="image"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-center ms-2">
                  <div className="flex">
                    <div className="font-semibold">
                      {selectedCustomer?.name}
                    </div>
                  </div>
                  <div className="text-primary">
                    {selectedCustomer.phone_number}
                  </div>
                </div>
              </div>
              <div>
                <CloseCircleOutline
                  onClick={() => clearSelectedCustomer()}
                  className="text-red-500"
                  fontSize={24}
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg mt-2 p-3">
            <TextArea
              value={note}
              onChange={(v) => setNote(v)}
              placeholder={t("saleInvoice.enterNote")}
              showCount
              maxLength={100}
            />
          </div>
        </div>
        <div className="mb-[150px]">
          <div className="flex items-center mt-5">
            <FileOutline fontSize={20} />
            <div className="text-lg ms-1 font-semibold">
              {t("saleInvoice.summary")}
            </div>
          </div>
          <div className="bg-white rounded-lg mt-2 p-3">
            {displayedCartItems.length === 0 ? (
              <div className="text-center text-gray-500">
                {t("saleInvoice.emptyCart")}
              </div>
            ) : (
              displayedCartItems.map((product) => {
                const itemInCart = cartItems.find(
                  (item) => item.product.id === product.product.id
                );
                return (
                  <div
                    className="bg-white flex justify-between items-center rounded-lg my-1"
                    key={product.product.id}
                  >
                    <div className="flex items-center p-2">
                      <div className="text-blue-600 flex min-w-fit me-2">
                        {itemInCart?.qty} x
                      </div>
                      <div className="">
                        {product.product.name}
                        <span className="text-black ms-2 font-bold">
                          {priceValue(product.product.unit_price)}
                        </span>
                      </div>
                    </div>
                    <div className="text-blue-600 ms-3">
                      {priceValue(
                        product.product.unit_price * (itemInCart?.qty ?? 0)
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="mt-5">
            <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
              <div className="text-base">Subtotal:</div>
              <div className="text-base">
                {lTotal ? <div>...</div> : priceValue(total?.subtotal)}
              </div>
            </div>
            <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
              <div className="text-base">Discount:</div>
              <div className="text-base">
                {lTotal ? <div>...</div> : priceValue(total?.discount)}
              </div>
            </div>
            <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
              <div className="text-lg font-semibold">Grand Total:</div>
              <div className="text-lg font-semibold">
                {lTotal ? <div>...</div> : priceValue(total?.grand_total)}
              </div>
            </div>
            {total?.second_grand_total && (
              <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
                <div className="text-base">
                  Grand Total ({total?.second_currency}):
                </div>
                <div className="text-base">
                  {lTotal ? (
                    <div>...</div>
                  ) : (
                    priceValueWithCurrency(
                      total?.second_grand_total,
                      total?.second_currency
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full p-4 bg-white border-t-[1px] border-primary">
        <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
          <div className="text-lg font-semibold">Grand Total</div>
          <div className="text-lg font-bold">
            {lTotal ? (
              <div>...</div>
            ) : (
              priceValueWithCurrency(total?.grand_total, total?.currency)
            )}
          </div>
        </div>
        <div className="w-full flex gap-4">
          <button
            onClick={handleSaleInvoice}
            className="bg-primary p-3 w-full rounded-xl text-lg font-bold text-white"
          >
            {lOrder ? t("saleInvoice.loading") : t("saleInvoice.order")}
          </button>
        </div>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
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
          <div className="text-lg font-semibold mb-2">Select App</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {posApps.map((app) => (
              <div
                key={app.id}
                onClick={() =>
                  handleSelection(
                    app.id,
                    app.name,
                    app.main_currency,
                    app.warehouse?.name || ""
                  )
                }
                className={`p-6 border rounded-lg transition flex flex-col cursor-pointer ${
                  selectedApp?.id === app.id
                    ? "bg-blue-100 border-blue-500 shadow-lg"
                    : "bg-white border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {app.warehouse?.unit_type === "Truck" ? (
                    <FaTruck className="text-blue-500 text-2xl" />
                  ) : (
                    <FaStore className="text-blue-500 text-2xl" />
                  )}
                  <h2 className="font-semibold text-lg text-gray-800">
                    {app.name}
                  </h2>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiTag className="text-green-500" />
                  <p className="text-sm">Type: {app.type}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <FiDollarSign className="text-yellow-500" />
                  <p className="text-sm">
                    Currency: {app.main_currency} / {app.secondary_currency}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <FiMapPin className="text-red-500" />
                  <p className="text-sm">
                    Warehouse: {app.warehouse?.name || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="p-3 bg-primary w-full rounded-2xl text-lg font-bold text-white"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </Popup>
    </div>
  );
};

export default SaleInvoicePage;
