import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import CurrencyFormat from "react-currency-format";
import { INCOMESTATS } from "../../graphql/income";
import { useLazyQuery } from "@apollo/client";
import DataFetching from "../DataFetching/DataFetching";

const IncomeStats = () => {
  const { user } = useContext(AppContext);
  const { reloadPage } = useContext(AuthHomeContext);
  const currency = user.currency ?? "";
  const [altLoading, setAltLoading] = useState(true);
  const [fetchIncomeStats, { data, error, loading }] = useLazyQuery(
    INCOMESTATS,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    fetchIncomeStats();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (reloadPage) {
      fetchIncomeStats();
    }
    // eslint-disable-next-line
  }, [reloadPage]);

  useEffect(() => {
    if (data) {
      setStats(data.incomeStats);
      setAltLoading(false);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const [stats, setStats] = useState(null);
  return (
    <div className="relative w-full h-full grid grid-rows-3 row-gap-3">
      <div className="col-span-1 bg-white shadow text-md flex items-center p-6">
        <div className="w-12 h-12 flex justify-center items-center rounded-lg mr-10 bg-oxford-blue">
          <i className="fa fa-wallet text-white"></i>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-1">
            {stats && (
              <CurrencyFormat
                value={stats.income_total}
                displayType="text"
                thousandSeparator={true}
                prefix={currency}
              />
            )}
          </p>
          <p style={{ fontSize: "13px" }}>Total income earned</p>
        </div>
      </div>
      <div className="col-span-1 bg-white shadow text-md flex items-center p-6">
        <div className="w-12 h-12 flex justify-center items-center rounded-lg mr-10 bg-light-red">
          <i className="fa fa-credit-card text-white"></i>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-1">
            {stats && (
              <CurrencyFormat
                value={stats.income_spent}
                displayType="text"
                thousandSeparator={true}
                prefix={currency}
              />
            )}
          </p>
          <p style={{ fontSize: "13px" }}>Income spent</p>
        </div>
      </div>
      <div className="col-span-1 bg-white shadow text-md flex items-center p-6">
        <div
          className="w-12 h-12 flex justify-center items-center rounded-lg mr-10"
          style={{ background: "#387C6D" }}
        >
          <i className="fa fa-coins text-white"></i>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-1">
            {stats && (
              <CurrencyFormat
                value={stats.income_remainder}
                displayType="text"
                thousandSeparator={true}
                prefix={currency}
              />
            )}
          </p>
          <p style={{ fontSize: "13px" }}>Income remaining</p>
        </div>
      </div>
      <DataFetching display={loading || altLoading} />
    </div>
  );
};

export default IncomeStats;
