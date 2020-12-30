

import Stock from './Stock'
import React from 'react'

export default function StockList({ items, fields }) {

  return (
    <>
      <tbody>
        <Stock  items={items} fields={fields} />
      </tbody>
    </>
  )
}
