
import React from "react";
import StockList from "./StockList";
import {Table} from "react-bootstrap"
export default function StockTable({ items, fields }) {

  return (
    <>
      <Table striped bordered hover  size="sm" responsive="sm">
        <thead>
          <tr>
            {fields &&
              fields.map(function (fieldDef) {
                return (
                  <th key={fieldDef.field} data-field={fieldDef.field}>
                    {fieldDef.label}
                  </th>
                );
              })}
          </tr>
        </thead>
        <StockList items={items} fields={fields} />
      </Table>
    </>
  );
}
