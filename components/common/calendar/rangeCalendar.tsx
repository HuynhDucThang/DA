"use client";

import { IApartmentContract } from "@/utils/interface";
import { useEffect, useMemo, useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface IDay {
  start_day: string;
  end_day: string;
}

interface IProps {
  apartmentContract: IApartmentContract[];
}

export default function RangeCalendar({ apartmentContract }: IProps) {
  const [rangeDate, setRangeDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection123",
  });

  const handleDisableBookingDay = useMemo(() => {
    const datesDiable: Date[] = [];
    const now = new Date();

    apartmentContract?.forEach((contract) => {
      const startDate = new Date(contract.start_date);
      const endDate = new Date(contract.end_date);

      if (endDate < now) return;

      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        datesDiable.push(new Date(date));
      }
    });

    return datesDiable.length ? datesDiable : [];
  }, [apartmentContract]);

  const handleSelect = (date: any) => {
    setRangeDate((pre) => ({
      ...pre,
      startDate: date.selection123.startDate,
      endDate: date.selection123.endDate,
    }));
  };

  return (
    <div>
      <DateRange
        ranges={[rangeDate]}
        months={2}
        minDate={new Date()}
        rangeColors={["#FD5B61"]}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        direction="horizontal"
        disabledDates={handleDisableBookingDay}
        onChange={handleSelect}
        // editableDateInputs={false}
        // showPreview={false}
      />
    </div>
  );
}
