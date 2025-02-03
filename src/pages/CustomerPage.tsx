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
import { useTranslation } from "react-i18next";

const CustomerPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleResetSearch = () => {
    setSearchKey("");
    setSearchInput("");
  };

  const handleInputSearch = (value: string) => {
    setSearchInput(value);
    if (value === "") {
      setSearchKey("");
    }
  };

  const handleSearch = useCallback(() => {
    setSearchKey(searchInput);
  }, [searchInput]);

  const debouncedSearch = useCallback(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(() => {
      handleSearch();
    }, 300);
  }, [handleSearch]);

  useEffect(() => {
    debouncedSearch();

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, [searchInput, debouncedSearch]);

  const setCustomer = (customer: Customer) => {
    window.localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    navigate(-1);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      setVisible(false);
      refetch();
      setCustomer(data);
    },
    onError: (error: { data: { message: string } }) => {
      if (error.data.message) {
        Dialog.alert({
          content: (
            <div className="text-red-500 flex items-center gap-1">
              <MdError size={24} /> {t("customer.phoneExist")}
            </div>
          ),
          confirmText: t("customer.close"),
        });
        return;
      }
      Dialog.alert({
        content: (
          <div className="text-red-500 flex items-center gap-1">
            <MdError size={24} /> {t("customer.error")}
          </div>
        ),
        confirmText: t("customer.close"),
      });
      console.error(error);
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
          {t("customer.selectCustomer")}
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="p-4 pt-1">
        <div className="flex bg-white p-2 rounded-lg items-center">
          <div className="w-[10%]">
            <SearchOutline fontSize={22} />
          </div>
          <input
            className="text-base w-[83%] border-none outline-none focus:ring-0 focus:outline-none"
            type="text"
            placeholder={t("customer.searchPlaceholder")}
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
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex justify-center items-center">
                      <img
                        src={item?.avatar || defaultAvatar}
                        alt="image"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center ms-2">
                      <div className="font-semibold">{item.name}</div>
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

        <InfiniteScroll
          loadMore={async () => {
            await fetchNextPage();
          }}
          hasMore={!!hasNextPage}
        >
          {t("customer.noMore")}
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
          paddingBottom: "80px",
        }}
      >
        <div className="p-4 h-full flex flex-col justify-center items-center">
          <div className="text-lg font-semibold mb-2">
            {t("customer.createCustomer")}
          </div>
          <Form
            form={form}
            name="basic"
            className="w-full"
            onFinish={handleCreate}
          >
            <Form.Item
              label={t("customer.name")}
              name="name"
              rules={[{ required: true, message: t("customer.nameRequired") }]}
            >
              <Input placeholder={t("customer.enterName")} />
            </Form.Item>
            <Form.Item
              label={t("customer.phoneNumber")}
              name="phone_number"
              rules={[
                { required: true, message: t("customer.phoneRequired") },
                {
                  pattern: /^[0-9]{8,15}$/,
                  message: t("customer.invalidPhone"),
                },
              ]}
            >
              <Input placeholder={t("customer.enterPhone")} />
            </Form.Item>
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t">
              <button
                type="submit"
                className="p-3 bg-primary w-full rounded-2xl text-lg font-bold text-white"
              >
                {isLoading ? "..." : t("customer.create")}
              </button>
            </div>
          </Form>
        </div>
      </Popup>
    </div>
  );
};

export default CustomerPage;
