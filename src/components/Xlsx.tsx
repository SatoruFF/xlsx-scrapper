import React, { useState } from "react";
import "../style/xlsx.scss";
import { Typography, Button, message } from "antd";
const { Paragraph, Title } = Typography;
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

const Xlsx = ({ setVisible }: any) => {
  type Any = any;
  const [file, setFile]: any = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    } as Any,
    maxFiles: 1,
    onDrop: (acceptedFiles: any) => {
      setFile(acceptedFiles[0]);
    },
  });

  const checker = () => {
    if (!file) {
      message.error("Файл не выбран!");
      return;
    }
    if (!file.name.endsWith(".xlsx")) {
      message.error("Выбранный файл не является файлом с расширением .xlsx!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet: any = workbook.Sheets[sheetName];
      let values = "";
      let count = 0;
      for (let R = 0; R < 5; ++R) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: 0 });
        const cellValue = worksheet[cellAddress]?.v;
        if (cellValue) {
          if (values) {
            values += ", ";
          }
          values += cellValue.trim();
          count++;
        }
      }
      if (values) {
        message.success(`Первые пять значений в столбце A: ${values}`);
      } else {
        message.warning("Файл не содержит данных в первом столбце!");
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="xlsx-wrapper">
      <div className="xlsx-content">
        <Title className="xlsx-txt">
          Проверка эксель файла
          <Paragraph className="query-disabled">
            При правильном расширении вывести пользователю
            сообщение со значением ячеек А1-А5 через запятую
          </Paragraph>
          <div className="btn-group">
            <Paragraph className="query-disabled">Перейти на страницу проверки снилс:</Paragraph>
            <Button type="default" className="xlsx-btn first-btn" onClick={() => setVisible(true)}>
              snils
            </Button>
          </div>
        </Title>

        <div className="drag">
          <div {...getRootProps({ className: "dropzone" })}>
            <input
              {...getInputProps()}
              onChange={(e: any) => setFile(e.target.files[0])}
            />
            <p>Перетащите сюда файл, или кликните для выбора</p>
          </div>
          {file && <Paragraph>Выбранный файл: {file.name}</Paragraph>}
        </div>

        <Button className="xlsx-btn" type="primary" onClick={() => checker()}>
          Проверить
        </Button>
      </div>
    </div>
  );
};

export default Xlsx;
