import { CloseCircleOutline, SearchOutline } from "antd-mobile-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "../components/web-order/ProductItem";
import {
  Badge,
  DotLoading,
  FloatingBubble,
  InfiniteScroll,
  Popup,
  Stepper,
} from "antd-mobile";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import Error from "../components/share/Error";
import { getCategory, getProduct, Product } from "../api/order";
import { BsCart2 } from "react-icons/bs";
import defaultImage from "../assets/imgaes/logo.png";
import { priceValue } from "../utils/share";

const WebOrderPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState<number>(1);
  const [cId, setCId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  // Fetch category
  const {
    data: dCategory,
    isLoading: lCategory,
    isError: eCategory,
  } = useQuery("categories", () => getCategory(id || ""));
  // Infinite product fetching with useInfiniteQuery
  const {
    data: dProduct,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: lProduct,
    isError: eProduct,
  } = useInfiniteQuery(
    ["products", cId, searchKey],
    ({ pageParam = 1 }) => getProduct(pageParam, "20", cId, searchKey, id || ""),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next_page_url) {
          return new URL(lastPage.next_page_url).searchParams.get("page");
        }
        return undefined;
      },
    }
  );
  // Handle add to cart
  const handleAddToCart = (item: Product) => {
    setProduct(item);
    setVisible(true);
  };

  // Handle reset cart
  const handleReset = () => {
    setProduct(null);
    setVisible(false);
    setQty(1);
  };

  // Handle submit add to cart
  const handleSubmitAddToCart = (product: Product | null, qty: number) => {
    if (!product) {
      console.error("Product is null!");
      return;
    }
    const item = { product, qty };
    const cart: { product: Product; qty: number }[] = JSON.parse(
      window.localStorage.getItem("cart") || "[]"
    );
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].qty += qty;
    } else {
      cart.push(item);
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
    handleReset();
  };

  // Cart badge value
  const cartBadge = () => {
    try {
      const carts = window.localStorage.getItem("cart");
      const jsonCarts = carts ? JSON.parse(carts) : [];
      return Array.isArray(jsonCarts) ? jsonCarts.length : 0;
    } catch (error) {
      console.error("Failed to parse cart data:", error);
      return 0;
    }
  };
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle reset search
  const handleResetSearch = () => {
    setSearchKey("");
    setSearchInput("");
  };

  // Handle input search
  const handleInputSearch = (value: string) => {
    setSearchInput(value);

    if (value === "") {
      setSearchKey("");
    }
  };

  // Wrap handleSearch in useCallback
  const handleSearch = useCallback(() => {
    setSearchKey(searchInput);
  }, [searchInput]);

  // Debounce search function
  const debouncedSearch = useCallback(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      handleSearch();
    }, 300);
  }, [handleSearch]);

  // Debounce search logic
  useEffect(() => {
    debouncedSearch();

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, [searchInput, debouncedSearch]);
  // Loading and error handling
  if (lCategory) return <p></p>;
  if (eCategory || eProduct || !id) return <Error />;
  return (
    <div>
      <div className="p-4">
        {/* Search area */}
        <div className="flex bg-white p-2 rounded-lg items-center w-full">
          <div className="me-2">
            {searchInput ? (
              <CloseCircleOutline
                color="red"
                fontSize={22}
                onClick={() => handleResetSearch()}
              />
            ) : (
              <SearchOutline fontSize={22} />
            )}
          </div>
          <input
            className="text-base w-[90%] border-none outline-none focus:ring-0 focus:outline-none"
            type="text"
            placeholder="ស្វែងរកផលិតផល..."
            value={searchInput}
            onChange={(e) => handleInputSearch(e.target.value)}
          />
        </div>
        {/* Category area */}
        <section className="my-4">
          <div className="flex w-full overflow-auto scroll-smooth scrollbar-hide">
            <button
              onClick={() => setCId("")}
              className={`px-4 min-w-fit py-1 text-base me-2 rounded-lg ${
                !cId ? "bg-primary text-white" : "bg-white"
              }`}
            >
              ទាំងអស់
            </button>
            {dCategory?.map((item) => (
              <button
                onClick={() => setCId(item.id.toString())}
                className={`px-4 min-w-fit py-1 text-base me-2 rounded-lg ${
                  item.id.toString() === cId
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
                key={item.id}
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>

        {/* Product list area */}
        {!lProduct && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
            {dProduct?.pages
              .flatMap((page) => page.data)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddToCart(item)}
                  className="bg-white p-2 rounded-lg"
                >
                  <ProductItem item={item} />
                </div>
              ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="w-full h-5 flex justify-center items-center">
            <DotLoading />
          </div>
        )}

        {/* Infinite Scroll */}
        {hasNextPage && (
          <InfiniteScroll
            loadMore={async () => {
              await fetchNextPage();
            }}
            hasMore={!!hasNextPage}
          >
            Loading...
          </InfiniteScroll>
        )}

        <FloatingBubble
          onClick={() => navigate(`/web/order/${id}/cart`)}
          axis="x"
          magnetic="x"
          style={{
            "--initial-position-bottom": "64px",
            "--initial-position-right": "24px",
            "--edge-distance": "24px",
          }}
        >
          <Badge
            color="white"
            content={<div className="text-black">{cartBadge().toString()}</div>}
          >
            <BsCart2 fontSize={22} className="me-1" />
          </Badge>
        </FloatingBubble>
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
        }}
      >
        {/* Popup Content */}
        <div className="p-4 h-full flex flex-col justify-between items-center">
          <div className="text-lg font-semibold mb-2">បញ្ចុលចំនួន</div>
          <div className="flex bg-white w-full items-center rounded-xl gap-2 p-2">
            <div className="flex justify-between h-full gap-2">
              <div className="min-h-full w-[96px]">
                <img
                  src={
                    product?.thumbnail
                      ? `${import.meta.env.VITE_APP_ASSET_URL}${
                          product?.thumbnail
                        }`
                      : defaultImage
                  }
                  alt="img"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="flex flex-col justify-around items-start">
              <div className="text-sm line-clamp-2">{product?.name}</div>
              <div>
                <div className="text-base font-bold">
                  {priceValue(product?.unit_price)}
                </div>
              </div>
            </div>
          </div>
          <div className="h-[120px]">
            <div className="mt-2  p-2 rounded-lg">
              <Stepper
                className="custom-stepper"
                defaultValue={1}
                min={1}
                value={qty}
                onChange={(value) => {
                  setQty(value);
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-0 px-4 w-full mb-3">
            <button
              className="p-3 bg-primary w-full rounded-2xl text-lg font-bold text-white"
              onClick={() => handleSubmitAddToCart(product, qty)}
            >
              បញ្ចុលកន្ត្រក - {priceValue((product?.unit_price ?? 0) * qty)}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default WebOrderPage;
