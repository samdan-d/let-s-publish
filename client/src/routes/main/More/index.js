import React from "react";
import {Col, Row} from "antd";
import Biography from "../../../components/profile/Biography/index";
import Auxiliary from "../../../util/Auxiliary";


const Profile = () => {

  return (
    <Auxiliary>
      <div className="gx-profile-content">
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <Biography/>
          </Col>
        </Row>
      </div>
    </Auxiliary>
  );
};

export default Profile;


