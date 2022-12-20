import React, { useState } from "react";
import "./Table.css";
const Table = () => {
  function numberWithCommas(x) {
    return x.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  }
  const a = [
    {
      option: "",
      num1: "",
      num2: "",
    },
    {
      num1: "",
      num2: "",
    },
    {
      num1: "",
      num2: "",
    },
  ];
  const [data, setData] = useState(a);
  const [total, setTotal] = useState({ total1: 0, total2: 0 });

  const handleClick = (e) => {
    setData([...data, { num1: "", num2: "" }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    let values = [...data];
    if (value === "account1" || value === "account2") {
      values[index] = { num1: "", num2: "" };
      setData(values);
    } else {
      values[index][name] = value;
      setData(values);
    }
    const arr1 = data.map((item) => {
      return Number(item.num1.replace(/,/g, ""));
      
    });
    const arr2 = data.map((item) => {
      return Number(item.num2.replace(/,/g, ""));
    });
    console.log(arr2[0]);
    setTotal({
      total1: arr1.reduce((acc, curr) => {
        return acc + curr;
      }),
      total2: arr2.reduce((acc, curr) => {
        return acc + curr;
      }),
    });
  };

  const handleRemove = (e, index) => {
    const val = [...data];
    val.splice(index, 1);
    setData(val);
  };
//   const handleBlur = (e, x, index) => {
//     const { name } = e.target;
//     let values = [...data];
//     let num = numberWithCommas(Number(x));

//     values[index][name] = num;

//     setData(values);
//   };

  return (
    <>
      <div className="main-table">
        <div className="extra-items">
          <div className="inputs head">Accounts</div>
          <div className="inputs head">Debit Amount</div>
          <div className="inputs head">Credit Amount</div>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <select
                className="inputs"
                onChange={(e) => handleChange(e, index)}
              >
                <option name="option1" value="account1">
                  account1
                </option>
                <option name="option2" value="account2">
                  account2
                </option>
              </select>

              <input
                name="num1"
                className="inputs"
                value={item.num1}
                type="number"
                onChange={(e) => handleChange(e, index)}
                // onBlur={(e) => handleBlur(e, item.num1, index)}
              />

              <input
                name="num2"
                value={item.num2}
                className="inputs"
                type="number"
                onChange={(e) => handleChange(e, index)}
                // onBlur={(e) => handleBlur(e, item.num2, index)}
              />
              <button
                className="btn btn-primary"
                onClick={(e) => handleRemove(e, index)}
              >
                Remove
              </button>
            </div>
          );
        })}
        <div className="extra-items">
          <div className="button">
            <button className="btn btn-primary" onClick={(e) => handleClick(e)}>
              Add Row
            </button>
            <h6>Total :</h6>
          </div>
          <div className="total-value">
            ₹{numberWithCommas(parseFloat(total.total1)) || 0}
          </div>
          <div className="total-value">
            ₹ {numberWithCommas(parseFloat(total.total2)) || 0}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
