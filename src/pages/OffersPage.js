import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../components/base";
import { Layout, CardHeader, Tabs } from "../components/partials";
import { OffersTabs, OfferContents } from "../utils/offerPageUtils";

import { SelectOffers } from "../features/offers/offerSlice";
import { useSelector } from "react-redux";

export default function OffersPage() {
  const offerDatas = useSelector(SelectOffers);
  const [offersModalOpen, setOpenModalShow] = useState(false);
  const offerContents = OfferContents();

  const offerSave = () => {
    console.log("Teklifi Kaydet: ", offerDatas);
  };

  return (
    <Layout>
      <CardHeader
        title="Teklifler"
        description="Sipariş Yönetimi"
        buttons={[
          <Button
            key={1}
            text="Yenile"
            icon={<i className="fas fa-sync" />}
            type="info"
            className="mr-3 btn-sm"
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
            onClick={() => setOpenModalShow(true)}
            className="btn-sm"
          />,
        ]}
      />

      <div className="border rounded p-4">{/*<LiteTable />*/}</div>

      <Modal size="xl" show={offersModalOpen} centered>
        <Tabs
          tabs={OffersTabs}
          contents={offerContents}
          modal={true}
          modalClose={{ set: setOpenModalShow, question: true }}
          buttons={[
            <Button
              text="Kaydet"
              icon={<i className="far fa-save" />}
              className="btn-sm"
              key={1}
              onClick={() => offerSave()}
            />,
          ]}
        />
      </Modal>
    </Layout>
  );
}
