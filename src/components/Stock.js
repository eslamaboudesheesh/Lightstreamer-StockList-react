import React, { useState, useEffect } from 'react'
import Constants from './Constants'
import {
  LightstreamerClient
} from 'lightstreamer-client-web/lightstreamer-core.esm'
import { Subscription } from 'lightstreamer-client-web/lightstreamer-core.esm'
import {
  DynaGrid} from 'lightstreamer-client-web/lightstreamer.esm'
import formatDecimal from './format'

export default function Stock({ items , fields }) {

  let [state, setstate] = useState({})
  useEffect(() => {
    var hotTxtCol = '#000000'
    var imgUp = './quotes_up.gif'
    var imgDown = './quotes_down.gif'

    var sub = new Subscription(
      'MERGE',
      items,
      fields && fields.map((fieldDef) => fieldDef.field),
    )
    sub.setDataAdapter('QUOTE_ADAPTER')
    sub.setRequestedSnapshot('yes')
    sub.setRequestedMaxFrequency(1)

    sub.addListener({
      onItemUpdate: function (obj) {
        state = {}
        obj.forEachField(function (name, pos, val) {
          state[name] = val
        })

        setstate(state)
      },
    })

    const dynaGrid = new DynaGrid('stocks', true)
    dynaGrid.setNodeTypes(['div', 'span', 'img', 'a', 'input', 'tr', 'td'])
    dynaGrid.setAutoCleanBehavior(true, false)

    dynaGrid.addListener({
      onVisualUpdate: function (key, info) {
        if (info == null) {
          //cleaning
          return
        }
        // illumination color
        // choose the backgroundColor
        var lastPrice = info.getChangedFieldValue('last_price')
        if (lastPrice !== null) {
          var prevPrice = dynaGrid.getValue(key, 'last_price')
          if (!prevPrice || lastPrice > prevPrice) {
            info.setAttribute('lightgreen', null, 'backgroundColor')
          } else {
            info.setAttribute('#f8b87a', null, 'backgroundColor')
          }
        } else {
          info.setAttribute('lightgreen', null, 'backgroundColor')
        }

        //put arrow and handle change style

        var pctChange = info.getChangedFieldValue('pct_change')
        if (pctChange !== null) {
          pctChange = formatDecimal(pctChange, 2, true) + '%'
          hotTxtCol = pctChange.charAt(0) == '-' ? '#dd0000' : '#009900'
          if (pctChange.indexOf('-') > -1) {
            info.setCellValue('arrow', imgDown)
            info.setCellAttribute('arrow', null, null, 'backgroundColor')

            info.setCellAttribute('pct_change', 'black', hotTxtCol, 'color')
            info.setCellValue('pct_change', pctChange)
          } else {
            info.setCellValue('arrow', imgUp)
            info.setCellAttribute('arrow', null, null, 'backgroundColor')

            info.setCellAttribute('pct_change', 'black', hotTxtCol, 'color')
            info.setCellValue('pct_change', '+' + pctChange)
          }
          info.setCellAttribute('pct_change', 'bold', 'bold', 'fontWeight')
        }
      },
    })

    sub.addListener(dynaGrid)
    var lsClient = new LightstreamerClient(
      Constants().SERVER,
      Constants().ADAPTER,
    )

    lsClient.connect()
    lsClient.subscribe(sub)
    return () => {
      // lsClient.unsubscribe(sub)
    }
  }, [state])

  return (
    <>
      <tr data-source="lightstreamer" id="stocks">
        {fields.map(function (fieldDef) {
          return (
            <td key={fieldDef.field}>
           { fieldDef.field == "arrow" ? ( <div><img data-source="lightstreamer" data-field="arrow" data-update="src" src="./spacer.gif" width="20" height="8" border="0" alt="arrow"/> </div>  ) : 

              <div data-source="lightstreamer" data-field={fieldDef.field}>
                {state[fieldDef.field]}
              </div>
        }
            </td>
          )
        })}
      </tr>
    </>
  )
}
