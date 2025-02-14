import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { NavBar, ProgressCircle } from "antd-mobile";
import { BsTruck } from "react-icons/bs";

const TodoPage = () => {
  return (
    <div className="relative">
      {/* Fixed Status Cards */}
      <div className="fixed top-0 w-full">
        <NavBar className="bg-white" backIcon={false}>
          <div className="flex justify-center items-center gap-3">
            <MdArrowBackIos />
            <div>2025-02-14</div>
            <MdArrowForwardIos />
          </div>
        </NavBar>
      </div>
      <div className="h-[50px]"></div>
      <div className="px-4 py-2 flex justify-between gap-3">
        <div className="bg-white w-1/3 p-2 rounded-lg flex-col items-center text-sm gap-1 flex justify-center ">
          <ProgressCircle
            percent={50}
            style={{
              "--fill-color": "var(--adm-color-warning)",
            }}
          >
            50%
          </ProgressCircle>
          <div>Progress: 3/5</div>
        </div>
        <div className="bg-white w-1/3 p-2 rounded-lg flex-col items-center text-sm gap-1 flex justify-center">
          <ProgressCircle percent={50}>50%</ProgressCircle>
          <div>Active: 3/5</div>
        </div>
        <div className="bg-white w-1/3 p-2 rounded-lg flex-col items-center text-sm gap-1 flex justify-center">
          <ProgressCircle
            percent={50}
            style={{
              "--fill-color": "var(--adm-color-success)",
            }}
          >
            50%
          </ProgressCircle>
          <div>Complete: 3/5</div>
        </div>
      </div>
      {/* List of Tasks (Below Fixed Header) */}
      <div className="px-4 flex flex-col gap-1">
        <div className="text-base w-full flex items-center">
          <div className="w-1/12 bg-slate-400 h-[1px]"></div>
          <div className="w-2/12 text-center">Active</div>
          <div className="w-9/12 bg-slate-400 h-[1px]"></div>
        </div>
        {[1, 2, 3].length > 0 ? (
          [1, 2, 3].map((item) => (
            <div
              className="w-full bg-white p-4 rounded-lg border flex items-center border-gray-200 shadow-sm gap-3"
              key={item}
            >
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-slate-100">
                <BsTruck size={24} />
              </div>
              <div>
                <div className="text-lg line-clamp-1">
                  ដឹកជញ្ជូនទំនិញជូនអិតិថិជន DN-000001
                </div>
                <p className="text-sm text-gray-600">
                  2025-02-14
                  <span className="bg-green-200 px-2 rounded-lg text-green-700 font-semibold ms-2">
                    Active
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No missions found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
