import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageFeedback } from "../../pages/voter/voterSlice";
import {
  Button,
  Form,
  Radio,
  Modal,
  Tag,
  Select,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";
import { showHideLoading } from "../../utils/HandleLoading";

const ManageFeedBackModal = (props) => {
  const { loading } = useSelector((state) =>
    state.voters ? state.voters : []
  );

  const [value, setValue] = useState(1);
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const dateFormat = "YYYY-MM-DD";
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const {
    visible,
    onClose,
    selectedVoter,
    feebackDate,
    setShowFeedBackModal,
    politicalParties,
    politicalStatus,
  } = props;

  const submitForm = async (values) => {
    try {
      if (values) {
        values.voterId = selectedVoter.voterId;
        let previousPoliticalPartyObject = politicalParties.filter(
          (politicalParty) => {
            return politicalParty.value == values.previousPoliticalParty
              ? politicalParty.key
              : "";
          }
        );
        values.previousPoliticalParty =
          previousPoliticalPartyObject.length > 0
            ? previousPoliticalPartyObject[0].key
            : "";
        await dispatch(manageFeedback(values));
        console.log("************", loading);
        showHideLoading(false);
      }
    } catch {}
  };

  if (selectedVoter) {
    let previousPoliticalPartyName = politicalParties.filter(
      (politicalParty) => {
        return politicalParty.key == selectedVoter.previousPoliticalParty
          ? politicalParty.value
          : "";
      }
    );

    form.setFieldsValue({
      currentPoliticalStatus: selectedVoter.currentPoliticalStatus,
      previousPoliticalParty: previousPoliticalPartyName,
      date: moment(feebackDate, dateFormat),
    });
  }

  return (
    <>
      <Modal
        title="Political Feedback"
        visible={visible}
        okText="Submit"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              submitForm(values);
              onClose();
            })
            .catch((info) => {
              console.log("Validation Failed:", info);
            });
        }}
        onCancel={() => onClose()}
      >
        <Form name="basic" form={form}>
          <Form.Item
            name="currentPoliticalStatus"
            label="Current Political Status"
          >
            <Radio.Group
              onChange={onChange}
              name="currentPoliticalStatus"
              value={value}
            >
              {politicalStatus.map((element) => {
                return (
                  <Radio value={element.name}>
                    <Tag
                      color={element.color}
                      style={{
                        width: "100px",
                        height: "30px",
                        padding: "5px",
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "15px",
                        marginBottom: "20px",
                      }}
                    >
                      {element.name}
                    </Tag>
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
          <Form.Item name="previousPoliticalParty">
            <Select
              placeholder="Previous Political Party"
              allowClear
              style={{ width: "57%" }}
              options={politicalParties}
            ></Select>
          </Form.Item>
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: "Please input date",
              },
            ]}
          >
            <DatePicker placeholder="Date" style={{ width: "57%" }} />
          </Form.Item>
          <Form.Item name="remarks">
            <TextArea rows={4} placeholder="Remarks" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ManageFeedBackModal;
