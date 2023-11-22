import RangeCalendar from "@/components/common/calendar/rangeCalendar";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";

export default function TimeBooking() {
  const { start_date, end_date } = useAppSelector((state) => state.booking);

  const handleCheckDateAllowed = () => {
    const startDate = start_date && new Date(start_date);
    const endDate = end_date && new Date(end_date);

    const threeDaysLater = startDate && new Date(startDate);
    startDate && threeDaysLater?.setDate(startDate.getDate() + 2);
    // return endDate.getTime() > threeDaysLater.getTime();
    return startDate && endDate && endDate > startDate;
  };

  const handleConvertDate = () => {
    const startDate = start_date && new Date(start_date);
    const endDate = end_date && new Date(end_date);
    const startFormatted = startDate && format(startDate, "d MMM yyyy");
    const endFormatted = endDate && format(endDate, "d MMM yyyy:");

    const result = `${startFormatted} - ${endFormatted}`;
    return result;
  };

  return (
    <div className="spacing_between_cpn_detail">
      {handleCheckDateAllowed() ? (
        <>
          <h4 className="heading__detail_apartment">
            {end_date &&
              start_date &&
              new Date(end_date).getDate() -
                new Date(start_date).getDate()}{" "}
            đêm tại căn hộ này.
          </h4>
          <p>{handleConvertDate()}</p>
        </>
      ) : (
        <>
          <h4 className="heading__detail_apartment">Chọn ngày nhận phòng</h4>
          <p>Thời gian ở tối thiểu: 3 đêm</p>
        </>
      )}

      <RangeCalendar />
    </div>
  );
}
