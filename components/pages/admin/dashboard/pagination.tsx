"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }: any) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const ITEM_PER_PAGE = 6;

  const hasPrev = page ? ITEM_PER_PAGE * (+page - 1) > 0 : false;

  const hasNext = page
    ? ITEM_PER_PAGE * (+page - 1) + ITEM_PER_PAGE < count
    : false;

  const handleChangePage = (type: any) => {
    if (!page) return;
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );

    type === "prev"
      ? params.set("page", `${+page - 1}`)
      : params.set("page", `${+page + 1}`);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${!hasPrev ? styles.disabled : ""}`}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={`${styles.button} ${!hasNext ? styles.disabled : ""}`}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
