{
  /* <form className="">
<div className="grid grid-rows-5">
  <div className="grid row-span-1 grid-cols-2">
    <div className="col-span-2 mx-3 flex">
      <label htmlFor="" className="text-slate-900 ml-2">
        Tiêu đề thực đơn:
      </label>
      <input
        type="text"
        className="border-b uppercase ml-2 border-solid border-slate-400 w-2/3 h-6 outline-none"
        value={menuName}
        disabled
        onChange={(event) =>
          setMenuName(event.target.value)
        }
      />
    </div>
  </div>

  <div className="grid row-span-1 grid-cols-3">
    <div className="col-span-1 mx-3">
      <label htmlFor="" className="text-slate-900 ml-2">
        Chọn ngày:
      </label>
      <select
        className="ml-3 w-1/2 h-11 border rounded-lg p-2 bg-sky-300 outline-slate-300 shadow-lg hover:bg-sky-400"
        id=""
        value={eatdateId}
        disabled
        onChange={(event) =>
          setEatdateId(event.target.value)
        }
      >
        {dataEatDates.eatdates &&
          dataEatDates.eatdates.length > 0 &&
          dataEatDates.eatdates.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.eatdate}
              </option>
            );
          })}
      </select>
    </div>

    <div className="col-span-2 mx-3 flex">
      <label
        htmlFor=""
        className="text-slate-900 ml-2 mt-3"
      >
        Chọn buổi ăn:
      </label>
      <div
        className="flex w-4/5"
        id=""
        onClick={(e) =>
          handleFindEatTimeslot(e.target.value)
        }
      >
        {dataSession.session &&
          dataSession.session.length > 0 &&
          dataSession.session.map((item, index) => {
            return (
              <option
                key={index}
                value={item.id}
                className="ml-2 w-1/2 h-12 shadow-lg rounded-lg p-2 mr-3 bg-green-300 hover:bg-green-500 cursor-pointer hover:text-white text-center"
              >
                {item.name}
              </option>
            );
          })}
      </div>
    </div>
  </div>

  <div className="grid row-span-1 grid-cols-4 mt-1">
    <div className="col-span-2 mx-3 mb-3">
      <label htmlFor="" className="text-slate-900 ml-2">
        Chọn giờ ăn
      </label>
      <div
        className="flex"
        id=""
        onClick={(event) =>
          setEatTimeslotId(event.target.value)
        }
      >
        {dataFindEatTimeslots &&
          dataFindEatTimeslots.length > 0 &&
          dataFindEatTimeslots.map((item, index) => {
            return (
              <option
                key={index}
                value={item.id}
                className="w-full h-12 shadow-lg rounded-lg p-2 mr-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer hover:text-white text-center"
              >
                {item.khunggioan}
              </option>
            );
          })}
      </div>
    </div>
  </div>

  <div className="grid row-span-1 grid-cols-2">
    <div className="col-span-1 mx-3 mt-2">
      <label htmlFor="" className="text-slate-900 ml-2">
        Chọn mục dinh dưỡng
      </label>
      <select
        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
        id=""
        value={dishCategory}
        disabled
      >
        <option>{menuName}</option>
      </select>
    </div>
    <div className="col-span-1 mx-3 mt-2">
      <label htmlFor="" className="text-slate-900 ml-2">
        Chọn món ăn
      </label>
      <select
        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
        id=""
        onChange={(event) => setDishId(event.target.value)}
      >
        {dataFindDish?.finddish?.data &&
          dataFindDish?.finddish?.data.length > 0 &&
          dataFindDish?.finddish?.data.map(
            (item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item?.name}
                </option>
              );
            }
          )}
      </select>
    </div>
  </div>

  <div className="grid row-span-1 grid-cols-2">
    <div className="col-span-1 mx-3">
      <label htmlFor="" className="text-slate-900 ml-2">
        Số lần ăn
      </label>
      <input
        type="text"
        placeholder="..."
        className="w-full h-10 border rounded-lg p-2 mt-1 bg-slate-100 outline-slate-300"
        onChange={(event) => setSolan(event.target.value)}
      />
    </div>

    <div className="col-span-1 mx-3">
      <label htmlFor="" className="text-slate-900 ml-2">
        Ghi chú
      </label>
      <textarea
        type="text"
        placeholder="..."
        className=" w-full h-10 border rounded-lg px-2 mt-1 bg-slate-100 outline-slate-300"
        onChange={(event) => setGhichu(event.target.value)}
      />
    </div>
  </div>
</div>
</form> */
}
