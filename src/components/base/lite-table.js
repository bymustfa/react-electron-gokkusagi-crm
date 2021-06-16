import React from "react";
import Button from "./button";

export default function LiteTable() {
  return (
    <>
      <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded table-responsive  ">
        <table
          className="datatable-table table"
          style={{ display: "block", width: "100%" }}
        >
          <thead className="datatable-head">
            <tr className="datatable-row">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((data) => (
                <th className="datatable-cell datatable-cell-sort" key={data}>
                  <span style={{ width: "137px" }}>Head {data}</span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="datatable-body">
            {[1, 2, 3, 4, 5].map((rw) => (
              <tr className="datatable-row " key={rw}>
                {[1, 2, 3, 4, 5, 6, 7].map((data) => (
                  <td className="datatable-cell" key={data}>
                    <span style={{ width: "137px" }}>Column {data}</span>
                  </td>
                ))}

                <td className="datatable-cell">
                  <span style={{ width: "137px" }}>
                    <Button
                      icon={<i className="fa fa-cog" />}
                      text="İşlemler"
                      type="base"
                      className="p-0 text-hover-primary"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="datatable-pager datatable-paging-loaded">
          <ul className="datatable-pager-nav mb-5 mb-sm-0">
            <li>
              <span
                title="First"
                className="datatable-pager-link datatable-pager-link-first datatable-pager-link-disabled"
              >
                <i className="flaticon2-fast-back" />
              </span>
            </li>
            <li>
              <span
                title="Previous"
                className="datatable-pager-link datatable-pager-link-prev datatable-pager-link-disabled"
                data-page="1"
                disabled="disabled"
              >
                <i className="flaticon2-back" />
              </span>
            </li>
            <li />
            <li style={{ display: "none" }}>
              <input
                type="text"
                className="datatable-pager-input form-control"
                title="Page number"
              />
            </li>
            <li>
              <span
                className="datatable-pager-link datatable-pager-link-number datatable-pager-link-active"
                data-page="1"
                title="1"
              >
                1
              </span>
            </li>
            <li>
              <span
                className="datatable-pager-link datatable-pager-link-number"
                data-page="2"
                title="2"
              >
                2
              </span>
            </li>

            <li>
              <span
                title="Next"
                className="datatable-pager-link datatable-pager-link-next"
                data-page="2"
              >
                <i className="flaticon2-next" />
              </span>
            </li>
            <li>
              <span
                title="Last"
                className="datatable-pager-link datatable-pager-link-last"
                data-page="10"
              >
                <i className="flaticon2-fast-next" />
              </span>
            </li>
          </ul>

          <div className="datatable-pager-info">
            <select className="form-control w-65px mr-3">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="datatable-pager-detail">
              ... adet kayıttan ... ile ... arası kayıt gösteriliyor
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
