import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReduser";

export default function Card(props) {
  const dispatch = useDispatchCart();
  let data = useCart()
  const priceRef = useRef();
  let options = props.options;
  let priceOption = Object.keys(options);
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const handleaddtocart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.fooditem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
        return
      }
      return
    } // console.log(data)
    await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })

  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ "width": "20rem", maxHeight: "360px" }}
        >
          <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ height: "120px", ObjectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.fooditem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100  bg-light rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100  bg-warning rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOption.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline h-100 fs-5 "> ₹{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button className="btn btn-success" onClick={handleaddtocart}> Add To Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
