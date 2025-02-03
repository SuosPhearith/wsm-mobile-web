import { useState, useEffect, useCallback, useRef } from "react";
import { DotLoading, InfiniteScroll, NavBar } from "antd-mobile";
import { CloseCircleOutline, SearchOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { FaFileInvoiceDollar } from "react-icons/fa";
import Error from "../components/share/Error";
import { getSaleOrderHistory } from "../api/profile";
import {
  formatDateTimeWithToday,
  priceValueWithCurrency,
} from "../utils/share";
import { LuRefreshCcw } from "react-icons/lu";

const SaleOrderHistory = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchKey, setSearchKey] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    data: dInvoice,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: lInvoice,
    isError: eInvoice,
    refetch,
  } = useInfiniteQuery(
    ["saleOrder", searchKey],
    ({ pageParam = 1 }) => getSaleOrderHistory(pageParam, "20", searchKey),
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

  if (eInvoice) {
    return <Error />;
  }

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar
          className="bg-white"
          onBack={() => navigate("/profile")}
          right={
            <div className="flex justify-end">
              <LuRefreshCcw
                size={24}
                className="text-blue-500"
                onClick={() => refetch()}
              />
            </div>
          }
        >
          Sale Order History
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
            placeholder="Search Invoice"
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

        {lInvoice && <div className="flex justify-center p-10">Loading...</div>}

        {!lInvoice && (
          <div>
            {dInvoice?.pages
              .flatMap((page) => page.data)
              .map((item) => (
                <div
                  className="bg-white p-2 flex items-center justify-between rounded-lg gap-3 mt-2"
                  key={item.order_no}
                  onClick={() =>
                    navigate(`/sale-order-history/${item.order_no}`)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <FaFileInvoiceDollar size={30} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{item.order_no}</span>
                        <span className="font-light">
                          ({item.order_items_count} items)
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">
                          {item.customer.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end flex-col items-end">
                    <div className="font-bold">
                      {priceValueWithCurrency(item.grand_total, item.currency)}
                    </div>
                    <div className="text-blue-600">
                      {formatDateTimeWithToday(item.created_at)}
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
          {!lInvoice && "No More"}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SaleOrderHistory;
