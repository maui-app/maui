import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { CURRENTMONTHINCOME } from "../../graphql/income";
import CurrencyFormat from "react-currency-format";
import { useLazyQuery } from "@apollo/client";
import DataFetching from "../DataFetching/DataFetching";
import {
  months,
  monthEnds,
  getCountdown,
  getFormattedDate,
} from "../../utilities/date";
import errorHandler from "../../utilities/errorHandler";

const CurrentMonthData = () => {
  const { user } = useContext(AppContext);
  const { reloadPage } = useContext(AuthHomeContext);
  const [altLoading, setAltLoading] = useState(true);
  const currency = user.currency ?? "";
  const history = useHistory();
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const countdown = getCountdown(monthEnding);
      setCountdown(countdown);
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
    // eslint-disable-next-line
  }, []);

  const [fetchCurrentIncome, { data, error, loading }] = useLazyQuery(
    CURRENTMONTHINCOME,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    fetchCurrentIncome();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (reloadPage) {
      fetchCurrentIncome();
    }
    // eslint-disable-next-line
  }, [reloadPage]);

  useEffect(() => {
    if (data) {
      setIncome(data.currentMonthIncome);
      setAltLoading(false);
    }

    if (error) {
      errorHandler(error, history);
    }
    // eslint-disable-next-line
  }, [data, error]);

  const initDate = new Date();
  const monthEndingDate = `${monthEnds[initDate.getMonth()]} ${
    months[initDate.getMonth()]
  } ${initDate.getFullYear()}`;
  const monthEnding = new Date(monthEndingDate);
  const [countdown, setCountdown] = useState(getCountdown(monthEnding));
  const [income, setIncome] = useState(null);

  return (
    <div className="h-full relative p-8 shadow bg-white w-full">
      <div className="flex flex-col w-full">
        <div
          className="flex flex-col mb-6 w-full py-4 bg-revolver-purple"
          style={{ background: "#fff" }}
        >
          <div
            className="relative w-full"
            style={{ height: "4px", background: "rgba(0,0, 0, 0.06)" }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-revolver-purple transition-all ease-in duration-500 mb-3"
              style={{
                width: income ? income.percent_remainder : "0%",
              }}
            ></div>
          </div>
        </div>
        {income && (
          <p className="mb-6">
            <i className="fa fa-money-bill-alt mr-2 text-revolver-purple"></i>{" "}
            {income.remainder ? (
              <CurrencyFormat
                value={income.remainder}
                displayType="text"
                thousandSeparator={true}
                prefix={currency}
              />
            ) : (
              currency + "0"
            )}{" "}
            {"left of "}
            {income.total ? (
              <CurrencyFormat
                value={income.total}
                displayType="text"
                thousandSeparator={true}
                prefix={currency}
              />
            ) : (
              currency + "0"
            )}
          </p>
        )}
        <p className="mb-6">
          <i className="far fa-calendar-minus mr-2 text-revolver-purple"></i>{" "}
          {getFormattedDate()}
        </p>
        <p className="mb-6">
          <i className="far fa-map mr-2 text-revolver-purple"></i>{" "}
          {user.timezone}
        </p>
        <p>
          <i className="far fa-hourglass mr-3 text-revolver-purple"></i>{" "}
          {months[new Date().getMonth()]} ending in {countdown}
        </p>
      </div>
      <DataFetching display={loading || altLoading} />
    </div>
  );
};

export default CurrentMonthData;
