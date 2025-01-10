import { useState, useEffect, useCallback, useRef } from "react";
import { DotLoading, InfiniteScroll, NavBar } from "antd-mobile";
import { CloseCircleOutline, SearchOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { getCustomer } from "../api/sale";
import { useInfiniteQuery } from "react-query";
import defaultAvatar from "../assets/imgaes/profile2.jpg";
import { Customer } from "../api/type";

const CustomerPage = () => {
  const navigate = useNavigate();

  // State for search input and filtered customers
  const [searchKey, setSearchKey] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const {
    data: dCustomer,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: lCustomer,
    isError: eCustomer,
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
  if (eCustomer) {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="fixed top-0 w-full">
        <NavBar className="bg-white" onBack={() => navigate(-1)}>
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
    </div>
  );
};

export default CustomerPage;
