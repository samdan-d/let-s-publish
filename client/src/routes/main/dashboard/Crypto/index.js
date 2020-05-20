import React from "react";
import {Col, Row} from "antd";

import {Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";
import {increamentData, lineData} from "../../Metrics/data";
import ChartCard from "components/dashboard/Crypto/ChartCard";
import Auxiliary from "util/Auxiliary";
import Portfolio from "components/dashboard/Crypto/Portfolio";
import BalanceHistory from "components/dashboard/Crypto/BalanceHistory";
import SendMoney from "components/dashboard/Crypto/SendMoney";
import RewardCard from "components/dashboard/Crypto/RewardCard";
import CurrencyCalculator from "components/dashboard/Crypto/CurrencyCalculator";
import CryptoNews from "components/dashboard/Crypto/CryptoNews";
import DownloadMobileApps from "components/dashboard/Crypto/DownloadMobileApps";
import OrderHistory from "components/dashboard/Crypto/OrderHistory";

const Crypto = () => {
  return (
    <Auxiliary>
      <Row>
        <Col xl={15} lg={24} md={24} sm={24} xs={24}>
          <CryptoNews/>
        </Col>
        <Col xl={12} lg={24} md={12} sm={24} xs={24}>
          <BalanceHistory/>
        </Col>
      </Row>

    </Auxiliary>
  );
};

export default Crypto;
