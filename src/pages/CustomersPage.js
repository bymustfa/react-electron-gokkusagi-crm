import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { useToasts } from "react-toast-notifications";

import {
  Layout,
  CardHeader,
  Tabs,
  ActionNormalForm,
  TableDropdown,
} from "../components/partials";
import { Button, LiteTable, Input, SelectBox } from "../components/base";

import { SelectCustomers } from "../features/customers/customerSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import cn from "classnames";

import { CustomersTabs, CustomersContents } from "../utils/customerPageUtils";

import {
  getProvinces,
  getDistricts,
  getNeighborhoods,
} from "../utils/parameters";

import { customerRequiredSet } from "../utils/required";

export default function CustomersPage() {
  const { addToast } = useToasts();
  const [customerModalShow, setCustomerModalShow] = useState(false);
  const [activiteModalShow, setActiviteModalShow] = useState(false);
  const [filterModalShow, setFilterModalShow] = useState(false);
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

  const [customerFilters, setCustomerFilters] = useState({
    MusteriNo: "",
    MusteriUnvan: "",
    Telefon1: "",
    Email: "",
    Il: "",
    Ilce: "",
    Semt: "",
  });

  const customersContents = CustomersContents();
  const customerDatas = useSelector(SelectCustomers);

  const [province, setProvince] = useState([]);
  const [filterProvince, setFilterProvince] = useState("");
  const [district, setDistrict] = useState([]);
  const [filterDistrict, setFilterDistrict] = useState("");
  const [neighborhood, setNeighborhood] = useState([]);
  const [filterNeighborhood, setFilterNeighborhood] = useState("");

  const [filterStatus, setFilterStatus] = useState(false);

  const tableDataCall = (filter = "") => {
    setTableColumns([]);
    const url =
      process.env.REACT_APP_API_URL +
      `Musteri/GetMusteriTable?pageNumber=${tablePage}&pageSize=${tablePageLen}&filter=${filter}`;
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

    getProvinces(40).then((datas) =>
      setProvince([{ value: "", name: "Seçiniz" }, ...datas])
    );
  }, []);

  useCallback(() => {
    if (filterProvince && filterProvince !== undefined) {
      getDistricts(filterProvince).then((datas) =>
        setDistrict([{ value: "", name: "Seçiniz" }, ...datas])
      );
    }
  }, [filterProvince]);

  useCallback(() => {
    if (filterDistrict && filterDistrict !== undefined) {
      getNeighborhoods(filterDistrict).then((datas) =>
        setNeighborhood([{ value: "", name: "Seçiniz" }, ...datas])
      );
    }
  }, [filterDistrict]);

  useCallback(() => {
    if (!customerModalShow) {
      tableDataCall();
    }
  }, [customerModalShow]);

  useCallback(() => {
    tableDataCall();
  }, [tablePageLen, tablePage]);

  const saveCustomer = () => {
    let saveStatus = true;
    let alertContent = "";
    customerRequiredSet.map((req) => {
      if (String(customerDatas[req.key]).trim().length == 0) {
        alertContent += `<div>${req.empty}</div>`;
        saveStatus = false;
      }
    });

    if (saveStatus) {
      console.log(customerDatas);
    } else {
      addToast(alertContent, {
        appearance: "warning",
        autoDismiss: true,
      });
    }
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

  const setFilterState = (key, value) => {
    const tmp = customerFilters;
    tmp[key] = value;
    setCustomerFilters(tmp);
  };

  const filterRemove = () => {
    tableDataCall();
    setFilterStatus(false);
    const tmp = {};
    Object.keys(customerFilters).map((data) => {
      tmp[data] = "";
    });
    setCustomerFilters(tmp);
  };

  const customerFilterTable = () => {
    let filter = "";
    Object.keys(customerFilters).map((data) => {
      const value = customerFilters[data].trim();
      if (value.length > 0 && value !== "Seçiniz") {
        filter += `or ${data} LIKE '$$${value}$$' `;
      }
    });
    filter = filter.substr(3, filter.length).trim();

    tableDataCall(filter);
    setFilterModalShow(false);
    setFilterStatus(true);
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
          filterStatus && (
            <Button
              key={10}
              text="Filtre Temizle"
              className="mr-3 btn-sm"
              icon={<i className="fas fa-trash-alt" />}
              onClick={() => filterRemove()}
            />
          ),
          <Button
            key={2}
            text="Filtre"
            type="success"
            className="mr-3 btn-sm"
            icon={<i className="fas fa-filter" />}
            onClick={() => setFilterModalShow(true)}
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
          <ActionNormalForm
            selectedCustomerId={selectedCustomerId}
            handleActiviteSave={handleActiviteSave}
          />
        </Modal.Body>
      </Modal>

      <Modal size="lg" show={filterModalShow} centered>
        <Modal.Header>
          <Modal.Title>Filtre</Modal.Title>
          <button
            type="button"
            className="close ml-4"
            onClick={() => setFilterModalShow(false)}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <Input
              placeholder="Müşteri No"
              label="Müşteri No"
              parentClass="col-md-6"
              value={customerFilters.MusteriNo}
              onChange={(e) => setFilterState("MusteriNo", e.target.value)}
            />

            <Input
              placeholder="Müşteri Ünvan"
              label="Müşteri Ünvan"
              parentClass="col-md-6"
              value={customerFilters.MusteriUnvan}
              onChange={(e) => setFilterState("MusteriUnvan", e.target.value)}
            />
          </div>

          <div className="row">
            <Input
              placeholder="Telefon"
              label="Telefon"
              parentClass="col-md-6"
              value={customerFilters.Telefon1}
              onChange={(e) => setFilterState("Telefon1", e.target.value)}
            />

            <Input
              placeholder="Mail"
              label="Mail"
              parentClass="col-md-6"
              value={customerFilters.Email}
              onChange={(e) => setFilterState("Email", e.target.value)}
            />
          </div>

          <div className="row">
            <SelectBox
              parentClass="col-md-4"
              label="İl"
              selected={""}
              options={province}
              onChange={(e) => {
                setFilterProvince(e.value);
                setFilterState("Il", e.name);
              }}
            />

            <SelectBox
              parentClass="col-md-4"
              label="İlçe"
              selected={""}
              options={
                district.length > 0
                  ? district
                  : [{ value: "", name: "Seçiniz" }]
              }
              onChange={(e) => {
                setFilterDistrict(e.value);
                setFilterState("Ilce", e.name);
              }}
            />

            <SelectBox
              parentClass="col-md-4"
              label="Semt"
              selected={""}
              options={
                neighborhood.length > 0
                  ? neighborhood
                  : [{ value: "", name: "Seçiniz" }]
              }
              onChange={(e) => {
                setFilterNeighborhood(e.value);
                setFilterState("Semt", e.name);
              }}
            />
          </div>

          <div className="text-center">
            <Button
              text="Filtrele"
              icon={<i className="fas fa-filter" />}
              onClick={() => customerFilterTable()}
            />
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}
