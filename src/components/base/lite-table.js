import React, { useState } from "react";
import cn from "classnames";

export default function LiteTable({
  headers = [],
  columns,
  activePage = 0,
  pageLength = 0,
  pages = 0,
  start = 0,
  end = 0,
  total = 0,
  selectPageSize = [10, 25, 50, 100, 200],
  pageLenChange,
  pageChange,
}) {
  return (
    <>
      <div className="datatable datatable-bordered datatable-head-custom datatable-default datatable-primary datatable-loaded table-responsive ">
        <table
          className="datatable-table table table-hover  table-striped"
          style={{ display: "block", width: "100%" }}
        >
          <thead className="datatable-head">
            <tr className="datatable-row">
              {headers.map((data) => (
                <th
                  className="datatable-cell datatable-cell-sort p-0 py-2"
                  key={Math.floor(Math.random() * 99999)}
                >
                  <span
                    style={
                      data.width ? { width: data.width } : { width: "137px" }
                    }
                  >
                    {data.title}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="datatable-body border-right border-left">
            {columns.map((column) => (
              <tr className="datatable-row " key={column.Id}>
                {headers.map((head) => (
                  <td
                    className="datatable-cell p-1"
                    key={Math.floor(Math.random() * 99999)}
                  >
                    <span
                      style={
                        head.width ? { width: head.width } : { width: "137px" }
                      }
                    >
                      {head.render ? head.render(column) : column[head.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="datatable-pager datatable-paging-loaded">
          <ul className="datatable-pager-nav mb-5 mb-sm-0">
            <li>
              <span
                title="İlk"
                className="datatable-pager-link datatable-pager-link-first"
                onClick={() => pageChange(1)}
              >
                <i className="flaticon2-fast-back" />
              </span>
            </li>
            <li>
              <span
                title="Previous"
                className="datatable-pager-link datatable-pager-link-prev "
                onClick={() =>
                  pageChange(activePage - 1 >= 1 ? activePage - 1 : 1)
                }
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

            {pages > 5
              ? [...Array(5)].map((el, index) => {
                  index += 1;
                  return (
                    <li key={index}>
                      <span
                        className={cn([
                          "datatable-pager-link datatable-pager-link-number",
                          activePage === index && "datatable-pager-link-active",
                        ])}
                        title={index}
                        onClick={() => pageChange(index)}
                      >
                        {index}
                      </span>
                    </li>
                  );
                })
              : [...Array(pages)].map((el, index) => {
                  index += 1;
                  return (
                    <li key={index}>
                      <span
                        className={cn([
                          "datatable-pager-link datatable-pager-link-number",
                          activePage === index && "datatable-pager-link-active",
                        ])}
                        title={index}
                      >
                        {index}
                      </span>
                    </li>
                  );
                })}

            {pages > 5 ? (
              <>
                <li>
                  <span
                    className="datatable-pager-link datatable-pager-link-number disabled"
                    title="..."
                  >
                    ...
                  </span>
                </li>
                <li>
                  <span
                    className={cn([
                      "datatable-pager-link datatable-pager-link-number",
                      activePage === pages && "datatable-pager-link-active",
                    ])}
                    title={pages}
                    onClick={() => pageChange(pages)}
                  >
                    {pages}
                  </span>
                </li>
              </>
            ) : (
              ""
            )}

            <li>
              <span
                title="Sonraki"
                className="datatable-pager-link datatable-pager-link-next"
                onClick={() =>
                  pageChange(activePage + 1 <= pages ? activePage + 1 : pages)
                }
              >
                <i className="flaticon2-next" />
              </span>
            </li>
            <li>
              <span
                title="Son"
                className="datatable-pager-link datatable-pager-link-last"
                onClick={() => pageChange(pages)}
              >
                <i className="flaticon2-fast-next" />
              </span>
            </li>
          </ul>

          <div className="datatable-pager-info">
            <select
              className="form-control w-65px mr-3"
              value={pageLength}
              onChange={(e) => pageLenChange(e.target.value)}
            >
              {selectPageSize.map((data) => (
                <option value={data} key={data}>
                  {data}
                </option>
              ))}
            </select>
            <span className="datatable-pager-detail">
              <b>{total}</b> adet kayıttan <b>{start}</b> ile <b>{end}</b> arası
              kayıt gösteriliyor
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
