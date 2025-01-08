/* eslint-disable no-unused-vars */
import React from "react";
import { styles } from "../constants/styles";
import { MdOutlineSavings, MdAttachMoney } from "react-icons/md";

const Assets = () => {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <span className={`${styles.card} lg:col-span-2`}>
          <span className="flex items-center gap-2">
            <MdOutlineSavings size={25} />
            <h5 className="font-bold">Total Balance</h5>
          </span>
          <h3 className={styles.money}>$10.00</h3>
        </span>
        <span className={styles.card}>
          <span className="flex items-center gap-2">
            <MdAttachMoney size={25} />
            <h5 className="font-bold">Profits</h5>
          </span>
          <h3 className={` text-green-600 ${styles.money}`}>$0.00</h3>
        </span>
        <span className={styles.card}>
          <span className="flex items-center gap-2">
            <MdOutlineSavings size={25} />
            <h5 className="font-bold">Unrealized Profits</h5>
          </span>
          <h3 className={styles.money}>$0.00</h3>
        </span>
      </div>
    </section>
  );
};

export default Assets;
