"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDateBooking } from "@/redux/slices/booking";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface IProps {}

export default function RangeCalendar({}: IProps) {
  const { dates, start_date, end_date } = useAppSelector(
    (state : RootState) => state.booking
  );

  const dispatch = useAppDispatch();

  const handleDisableBookingDay = useMemo(() => {
    const datesDiable: Date[] = [];

    dates?.forEach((contract) => {
      const startDate = new Date(contract.start_date);
      const endDate = new Date(contract.end_date);

      // if (endDate < now) return;

      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        datesDiable.push(new Date(date));
      }
    });

    return datesDiable.length ? datesDiable : [];
  }, [dates]);

  const handleSelect = (date: any) => {
    const startDate = new Date(date.selection123.startDate);
    const endDate = new Date(date.selection123.endDate);

    const threeDaysLater = new Date(startDate);
    threeDaysLater.setDate(startDate.getDate() + 2);

    const start_date = startDate > endDate ? endDate : startDate;
    const end_date = endDate < startDate ? startDate : endDate;

    dispatch(
      setDateBooking({
        start_date,
        end_date,
      })
    );
  };

  return (
    <div className="my-6">
      <DateRange
        ranges={[
          {
            startDate: start_date ?? new Date(),
            endDate: end_date ?? new Date(),
            key: "selection123",
          },
        ]}
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
