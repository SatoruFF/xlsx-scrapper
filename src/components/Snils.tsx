import React, { useEffect, useRef, useState } from "react";
import "../style/snils.scss";
import { Typography, Button, Input } from "antd";
const { Paragraph, Title } = Typography;
import { message } from "antd";

const Snils = ({ setVisible }: any) => {
  const [value, setValue] = useState("");
  const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$/;
  const inputRef: any = useRef(null);

  const checker = (e: any) => {
    e.stopPropagation();
    if (!regex.test(value)) {
      message.error("Неверный формат СНИЛСа");
      inputRef.current.focus();
    } else {
      message.success("Формат СНИЛСа верный");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="snils-wrapper">
      <div className="snils-content">
        <Title>
          Проверка снилса
          <Paragraph>XXX-XXX-XXX XX</Paragraph>
          <Button className="snils-btn" onClick={() => setVisible(false)}>
            Excel
          </Button>
        </Title>

        <Input
          value={value}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          className="snils-input"
          placeholder="Введите номер в формате XXX-XXX-XXX XX"
        ></Input>
        <Button
          onClick={(e) => checker(e)}
          className="snils-btn"
          type="primary"
        >
          Проверить
        </Button>
      </div>
    </div>
  );
};

export default Snils;
