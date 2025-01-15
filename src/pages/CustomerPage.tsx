import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DotLoading,
  Form,
  InfiniteScroll,
  Input,
  NavBar,
  Popup,
} from "antd-mobile";
import { CloseCircleOutline, SearchOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { createCustomer, getCustomer } from "../api/sale";
import { useInfiniteQuery, useMutation } from "react-query";
import defaultAvatar from "../assets/imgaes/profile2.jpg";
import { CreateCustomerInterface, Customer } from "../api/type";
import { FaUserPlus } from "react-icons/fa";
import Error from "../components/share/Error";
import { MdError } from "react-icons/md";

const CustomerPage = () => {
  const navigate = useNavigate();

  // State for search input and filtered customers
  const [searchKey, setSearchKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [form] = Form.useForm<CreateCustomerInterface>();

  const {
    data: dCustomer,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: lCustomer,
    isError: eCustomer,
    refetch,
  } = useInfiniteQuery(
    ["customers", searchKey],
    ({ pageParam = 1 }) => getCustomer(pageParam, "20", searchKey),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.next_page_url) {
          return new URL(lastPage.next_page_url).searchParams.get("page");
        }
        return undefined;
      },
    }
  );

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

  // Set selected customer and navigate back to SaleInvoicePage
  const setCustomer = (customer: Customer) => {
    window.localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    navigate(-1); // Go back to the previous page
  };
  // Handle create new
  const { mutate, isLoading } = useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      setVisible(false);
      refetch();
      setCustomer(data)
    },
    onError: (error) => {
      Dialog.alert({
        content: (
          <>
            <div className="text-red-500 flex items-center gap-1">
              <MdError size={24} /> Something weng wrong.
            </div>
          </>
        ),
        confirmText: "Close",
      });
      console.log(error);
    },
  });
  const handleCreateNew = () => {
    setVisible(true);
  };

  const handleCreate = (value: CreateCustomerInterface) => {
    mutate(value);
  };
  if (eCustomer) {
    return <Error />;
  }

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar
          className="bg-white"
          onBack={() => navigate(-1)}
          right={
            <div className="flex justify-end">
              <FaUserPlus
                size={24}
                className="text-blue-500"
                onClick={handleCreateNew}
              />
            </div>
          }
        >
          Select Customer
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4 pt-1">
        {/* Search Input */}
        <div className="flex bg-white p-2 rounded-lg items-center">
          <div className="w-[10%]">
            <SearchOutline fontSize={22} />
          </div>
          <input
            className="text-base w-[83%] border-none outline-none focus:ring-0 focus:outline-none"
            type="text"
            placeholder="Search by phone..."
            value={searchInput}
            onChange={(e) => handleInputSearch(e.target.value)}
          />
          {searchKey && (
            <div
              onClick={() => handleResetSearch()}
              className="text-red-500 w-[7%] flex justify-end"
            >
              <CloseCircleOutline fontSize={20} />
            </div>
          )}
        </div>

        {/* Customer List */}
        {!lCustomer && (
          <div>
            {dCustomer?.pages
              .flatMap((page) => page.data)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex p-2 justify-between items-center bg-white mt-2 rounded-xl"
                  onClick={() => setCustomer(item)}
                >
                  <div className="flex items-center ">
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex justify-center items-center">
                      <img
                        src={item?.avatar || defaultAvatar}
                        alt="image"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center ms-2">
                      <div className="flex">
                        <div className="font-semibold">{item.name}</div>
                      </div>
                      <div className="text-primary">{item.phone_number}</div>
                    </div>
                  </div>
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
        <InfiniteScroll
          loadMore={async () => {
            await fetchNextPage();
          }}
          hasMore={!!hasNextPage}
        >
          No more
        </InfiniteScroll>
      </div>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "60vh",
          paddingBottom: "80px", // Add padding to avoid overlap with the fixed button
        }}
      >
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="text-lg font-semibold mb-2">Create new Customer</div>
          <Form
            form={form}
            name="basic"
            className="w-full"
            onFinish={handleCreate}
          >
            {/* Name Field */}
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            {/* Phone Number Field */}
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^[0-9]{8,12}$/,
                  message: "Invalid phone number format!",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            {/* Fixed Bottom Button */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t">
              <button
                type="submit"
                className="p-3 bg-primary w-full rounded-2xl text-lg font-bold text-white"
              >
                {isLoading ? '...': 'Create'}
              </button>
            </div>
          </Form>
        </div>
      </Popup>
    </div>
  );
};

export default CustomerPage;
