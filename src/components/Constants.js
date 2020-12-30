
 export default function Constants () {

  var protocolToUse = document.location.protocol != "file:" ? document.location.protocol : "http:";

  return {
    ADAPTER: "DEMO",
    SERVER: "http://push.lightstreamer.com/",

    ITEMS: ["item1","item2","item3","item4","item5","item6","item7","item8","item9","item10"],

    FIELD_DEF: [
      {field: "stock_name", label: "Name"},
      {field: "last_price", label: "Last"},
      {field: "time", label: "Time"},
      {field: "arrow", label: "arrow"},
      {field: "pct_change", label: "Change"},
      {field: "bid_quantity", label: "Bid Size"},
      {field: "bid", label: "Bid"},
      {field: "ask", label: "Ask"},
      {field: "ask_quantity", label: "Ask Size"},
      {field: "min", label: "Min"},
      {field: "max", label: "Max"},
      {field: "ref_price", label: "Ref."},
      {field: "open_price", label: "Open"}
    ]
  };

}

