import { useState, useEffect } from "react";
import { Dialog, Modal, NavBar, TextArea, Toast } from "antd-mobile";
import { FileOutline, UserContactOutline } from "antd-mobile-icons";
import { useNavigate, useParams } from "react-router-dom";
import { priceValue, priceValueWithCurrency } from "../utils/share";
import { SaleOrderWebInterface } from "../api/type";
import { useMutation, useQuery } from "react-query";
import Error from "../components/share/Error";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { LuMapPin, LuUser } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { calculateTotal, commitOrder, FormWebOrder, Product } from "../api/order";
import { useForm, SubmitHandler } from "react-hook-form";

const WebOrderCommitPage = () => {
  // Load cart items with quantities from localStorage
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cartItems, setCartItems] = useState<
    { product: Product; qty: number }[]
  >([]);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  // form data
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormWebOrder>();

  const onSubmit: SubmitHandler<FormWebOrder> = async (data) => {
    const cart = window.localStorage.getItem("cart");
    // Manually trigger validations
    const isValid = await trigger();
    if (!isValid) return;
    if (!cart || JSON.parse(cart).length === 0) {
      Modal.alert({
        title: (
          <>
            <div className="text-yellow-600">សូមបញ្ចូលព័ត៌មាន</div>
          </>
        ),
        content: (
          <>
            <div className="text-center">សូមបញ្ចូលព័ត៌មានអោយគ្រប់</div>
          </>
        ),
        confirmText: "បិទ",
      });
      return;
    }

    // Log final form data
    Dialog.confirm({
      title: "សូមបញ្ចាក់ការកុម្ម៉ង់",
      confirmText: "កុម្ម៉ង់",
      cancelText: "ទេ",
      onConfirm: () => {
        const cartData: { product: Product; qty: number }[] = JSON.parse(cart);
        const orderData: SaleOrderWebInterface = {
          items: cartData.map((item) => ({
            product_id: item.product.id,
            qty: item.qty,
          })),
          phone_number: data.phone,
          name: data.name,
          address: data.address || "",
          remark: note,
          posApp: id || '',
        };

        mOrder(orderData);
      },
    });
  };

  // make order
  const { mutate: mOrder, isLoading: lOrder } = useMutation({
    mutationFn: commitOrder,
    onSuccess: (data) => {
      window.localStorage.setItem('quickOrdered', JSON.stringify(data));
      window.localStorage.removeItem("cart");
      navigate(`/web/order/${id}/invoice`);
      Toast.show({
        content: (
          <>
            <div className="flex justify-center items-start gap-2 text-green-500">
              <FaCheckCircle size={22} />
              កុម្ម៉ង់ដោយជោគជ័យ
            </div>
          </>
        ),
        duration: 2000,
      });
    },
    onError: (error) => {
      Dialog.alert({
        content: (
          <>
            <div className="text-red-500 flex items-center gap-1">
              <MdError size={24} /> {t("saleOrder.orderError")}
            </div>
          </>
        ),
        confirmText: "Close",
      });
      console.log(error);
    },
  });

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  // Filter products from the mock data to display in the cart
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
    isLoading: lTotal,
    isError: eTotal,
  } = useQuery(
    ["total", debouncedCartItems],
    () =>
      calculateTotal({
        items: debouncedCartItems.map((item) => ({
          product_id: item.product.id,
          qty: item.qty,
        })),
        // chnageMe
        posApp: id || "",
      }),
    { enabled: debouncedCartItems.length > 0 }
  );

  if (eTotal) {
    return <Error />;
  }

  return (
    <div className="">
      <div className="fixed top-0 w-full ">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
          បញ្ជាការកកុម្ម៉ង់
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <div>
            <div className="flex items-center">
              <UserContactOutline fontSize={20} />
              <div className="text-lg ms-1 font-semibold">ព័ត៌មានដឹកជញ្ជូន</div>
            </div>
            <div
              className={`flex items-center w-full bg-white mt-2  px-3 py-2 rounded-lg border border-1  ${
                errors.name && "border border-1 border-red-400"
              }`}
            >
              <LuUser size={20} />
              <input
                {...register("name", { required: true, maxLength: 30 })}
                type="text"
                placeholder="បញ្ចូលឈ្មោះ"
                className="border-0 rounded-lg px-3 text-lg focus:outline-none"
              />
            </div>
            <div
              className={`flex items-center w-full bg-white mt-2 px-3 py-2 rounded-lg border border-1  ${
                errors.phone && "border border-1 border-red-400"
              }`}
            >
              <FiPhone size={20} />
              <input
                {...register("phone", {
                  required: "លេខទូរស័ព្ទត្រូវតែបំពេញ",
                  maxLength: {
                    value: 20,
                    message: "លេខទូរស័ព្ទមិនអាចលើសពី 20 តួអក្សរ",
                  },
                  pattern: {
                    value: /^0[1-9]{1}[0-9]{7,8}$/,
                    message: "លេខទូរស័ព្ទមិនត្រឹមត្រូវ (ឧទាហរណ៍: 012345678)",
                  },
                })}
                type="text"
                placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                className="border-0 rounded-lg px-3 text-lg focus:outline-none"
              />
            </div>
            <div className="flex items-center w-full bg-white mt-2 px-3 py-2 rounded-lg">
              <LuMapPin size={20} />
              <input
              {...register("address", { maxLength: 100 })}
                type="text"
                placeholder="បញ្ចូលទីតាំង"
                className="border-0 rounded-lg px-3 text-lg focus:outline-none"
              />
            </div>
            <div className="bg-white rounded-lg mt-2 p-3">
              <TextArea
                value={note}
                onChange={(v) => setNote(v)}
                placeholder="បញ្ចូលការកត់សម្គាល់"
                showCount
                maxLength={100}
              />
            </div>
          </div>

          <div className="mb-[150px]">
            <div className="flex items-center mt-5">
              <FileOutline fontSize={20} />
              <div className="text-lg ms-1 font-semibold">របាយការណ៍សង្ខេប</div>
            </div>
            {displayedCartItems.length === 0 ? (
              <div className="text-center text-gray-500">មិនមានទំនិញ</div>
            ) : (
              displayedCartItems.map((product) => {
                const itemInCart = cartItems.find(
                  (item) => item.product.id === product.product.id
                );
                return (
                  <div
                    className="bg-white border border-gray-300 px-2 flex justify-between items-center rounded-lg my-1"
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
            <div className="mt-5">
              <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
                <div className="text-base">សរុប:</div>
                <div className="text-base">
                  {lTotal ? <div>...</div> : priceValue(total?.subtotal)}
                </div>
              </div>
              <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
                <div className="text-base">បញ្ចុះតម្លៃ:</div>
                <div className="text-base">
                  {lTotal ? <div>...</div> : priceValue(total?.discount)}
                </div>
              </div>
              <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
                <div className="text-lg font-semibold">សរុបចុងក្រោយ:</div>
                <div className="text-lg font-semibold">
                  {lTotal ? <div>...</div> : priceValue(total?.grand_total)}
                </div>
              </div>
              {total?.second_grand_total && (
                <div className="flex p-4 pt-0 rounded-xl justify-between items-center">
                  <div className="text-base">
                    សរុបចុងក្រោយ ({total?.second_currency}):
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
            <div className="text-lg font-semibold">សរុបចុងក្រោយ</div>
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
              type="submit"
              className="bg-primary p-3 w-full rounded-xl text-lg text-white"
            >
              {lOrder ? t("saleInvoice.loading") : "ដាក់ការកុម្ម៉ង់"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WebOrderCommitPage;
