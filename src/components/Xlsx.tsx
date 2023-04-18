import React, { useState } from "react";
import '../style/xlsx.scss';
import { Typography, Button, message } from "antd";
const { Paragraph, Title } = Typography;
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";


const Xlsx = ({ setVisible }: any) => {
  type Any = any
  const [file, setFile]: any = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
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
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      let values = "";
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          const cellValue = worksheet[cellAddress]?.v;
          if (cellValue) {
            if (values) {
              values += ", ";
            }
            values += cellValue;
          }
        }
      }
      if (values) {
        message.success(`Значения ячеек A1-A5: ${values}`);
      } else {
        message.warning("Файл не содержит данных в ячейках A1-A5!");
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="xlsx-wrapper">
      <div className="xlsx-content">
        <Title>
          Проверка эксель файла
          <Paragraph>
            Кнопка проверить, по нажатию проверяет действительно ли выбран файл
            с расширением .xlsx При правильном расширении вывести пользователю
            сообщение со значением ячеек А1-А5 через запятую
          </Paragraph>
          <Button className="xlsx-btn" onClick={() => setVisible(true)}>
            snils
          </Button>
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