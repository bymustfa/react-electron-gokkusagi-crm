import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import {
  Layout,
  CardHeader,
  Tabs,
  ActiviteNormalForm,
  TableDropdown,
} from "../components/partials";
import { Button, LiteTable } from "../components/base";

import { CustomersTabs, CustomersContents } from "../utils/customerPageUtils";

import { SelectCustomers } from "../features/customers/customerSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import cn from "classnames";

export default function CustomersPage() {
  const [customerModalShow, setCustomerModalShow] = useState(false);
  const [activiteModalShow, setActiviteModalShow] = useState(false);
  const [tablePage, setTablePage] = useState(1);
  const [tablePageLen, setTablePageLen] = useState(25);
  const [tableColumns, setTableColumns] = useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const [tableConfig, setTableCongfig] = useState({
    activePage: 0,
    pageLenght: 0,
    pages: 0,
    start: 0,
    end: 0,
    total: 0,
  });

  const customersContents = CustomersContents();
  const customerDatas = useSelector(SelectCustomers);

  const tableDataCall = () => {
    setTableColumns([]);
    const url =
      process.env.REACT_APP_API_URL +
      `Musteri/GetMusteriTable?pageNumber=${tablePage}&pageSize=${tablePageLen}`;
    axios.get(url).then((response) => {
      if (response.status === 200) {
        const { data } = response;

        const tmpConfig = tableConfig;

        tmpConfig.activePage = data.Veri.activePage;
        tmpConfig.pageLenght = data.Veri.pageLen;
        tmpConfig.pages = data.Veri.pages;
        tmpConfig.start = data.Veri.skip;
        tmpConfig.end = data.Veri.take;
        tmpConfig.total = data.Veri.total;
        setTableCongfig(tmpConfig);
        setTableColumns(data.Veri.data);
      }
    });
  };

  useEffect(() => {
    tableDataCall();
  }, []);

  useEffect(() => {
    tableDataCall();
  }, [tablePageLen, tablePage]);

  const saveCustomer = () => {
    console.log(customerDatas);
  };

  const handleActiviteSave = (saveDatas, fileState) => {
    const formData = new FormData();
    Object.keys(saveDatas).map((item) => {
      formData.append(item, saveDatas[item]);
    });

    fileState.map((file) => {
      formData.append("file", file);
    });
    const controlDatas = [...formData].map((x) => {
      return {
        key: x[0],
        value: x[1],
      };
    });

    console.log(controlDatas, [...formData]);
  };

  return (
    <Layout>
      <CardHeader
        title="Müşteriler"
        description="CRM"
        buttons={[
          <Button
            key={1}
            text="Yenile"
            icon={<i className="fas fa-sync" />}
            type="info"
            className="mr-3 btn-sm"
            onClick={() => {
              tableDataCall();
            }}
          />,
          <Button
            key={2}
            text="Filtre"
            type="success"
            className="mr-3 btn-sm"
            icon={<i className="fas fa-filter" />}
          />,
          <Button
            key={3}
            text="Yeni Ekle"
            icon={<i className="fas fa-plus" />}
            className="btn-sm"
            onClick={() => setCustomerModalShow(true)}
          />,
        ]}
      />

      <div className="border rounded p-4">
        <LiteTable
          headers={[
            { title: "Müşteri No", key: "MusteriNo" },
            { title: "Ünvan", key: "MusteriUnvan", width: "400px" },
            { title: "Telefon", key: "Telefon1" },
            { title: "Mail", key: "Email" },
            { title: "Vergi No", key: "VergiNo" },
            {
              title: "İşlemler",
              key: -1,
              render: (column) => {
                return (
                  <TableDropdown>
                    <li className="navi-item">
                      <span
                        className="navi-link cursor-pointer"
                        onClick={() => {
                          console.log("Müşteri Id: ", column.Id);
                          setSelectedCustomerId(column.Id);
                          setActiviteModalShow(true);
                        }}
                      >
                        <span className="navi-icon">
                          <i className="la la-plus"></i>
                        </span>
                        <span className="navi-text">Faaliyet Gir</span>
                      </span>
                    </li>
                  </TableDropdown>
                );
                // return (
                //   <div className="position-relative">
                //     <label
                //       className="cursor-pointer"
                //       htmlFor={"dropElement_" + column.Id}
                //     >
                //       <i className="fas fa-cog" /> İşlemler
                //     </label>
                //     <input
                //       type="checkbox"
                //       className="dropdown-checbox"
                //       id={"dropElement_" + column.Id}
                //     />
                //
                //     <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                //       <ul className="navi flex-column navi-hover py-2">
                //         <li className="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">
                //           İşemler:
                //         </li>
                //         <li className="navi-item">
                //           <span
                //             className="navi-link cursor-pointer"
                //             onClick={() => alert("asdasd")}
                //           >
                //             <span className="navi-icon">
                //               <i className="la la-plus"></i>
                //             </span>
                //             <span className="navi-text">Faaliyet Gir</span>
                //           </span>
                //         </li>
                //       </ul>
                //     </div>
                //   </div>
                // );
              },
            },
          ]}
          columns={tableColumns}
          activePage={tableConfig.activePage}
          pageLength={tableConfig.pageLenght}
          pages={tableConfig.pages}
          start={tableConfig.start}
          end={tableConfig.end}
          total={tableConfig.total}
          pageLenChange={(e) => setTablePageLen(e)}
          pageChange={(e) => setTablePage(e)}
        />
      </div>

      <Modal size="xl" show={customerModalShow} centered>
        <Tabs
          tabs={CustomersTabs}
          contents={customersContents}
          modal={true}
          modalClose={{ set: setCustomerModalShow, question: true }}
          buttons={[
            <Button
              text="Kaydet"
              icon={<i className="far fa-save" />}
              className="btn-sm"
              key={1}
              onClick={() => saveCustomer()}
            />,
          ]}
        />
      </Modal>

      <Modal size="lg" show={activiteModalShow} centered>
        <Modal.Header>
          <Modal.Title>Faaliyet</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setActiviteModalShow(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <ActiviteNormalForm
            selectedCustomerId={selectedCustomerId}
            handleActiviteSave={handleActiviteSave}
          />
        </Modal.Body>
      </Modal>
    </Layout>
  );
}
