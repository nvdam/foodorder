import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./orders.module.css";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await fetch(
        "https://naga-project-ff79f-default-rtdb.firebaseio.com/orders.json"
      );
      const responseData = await response.json();
      console.log(responseData);
      let loadedOrders = [];
      for (const key in responseData) {
        loadedOrders.push({
          id: key,
          name: responseData[key].orderData,
          totalCost: responseData[key].total,
        });
        console.log("updated loadedOrders are:", loadedOrders);
        setOrders(loadedOrders);
        setLoading(false);
      }
    };
    fetchOrders().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  let ordersList = orders.map((eachItem) => (
    <div style={{ padding: "20px" }}>
      <Card>
        <p key={eachItem.id}>
          <b>OrderID:</b> <span style={{ color: "green" }}>{eachItem.id}</span>
          
        </p>

        {eachItem.name.map((item) => (
          <h4>
            Name:
            <span style={{ color: "green" }}>
              {item.name} <i style={{ fontSize: "23px" }}> * {item.amount}  </i>
            </span>
          </h4>
        )
        )}
        <span style={{color: 'white', backgroundColor: 'red'}}>OrderCost: {eachItem.totalCost}</span>

      </Card>
    </div>
  ));

  return (
    <>
      <div className={classes.orders}>
        <Card>
          <h1 className={classes.summary}> Your Orders </h1>
          {loading && <p> Fetching All the Orders...</p> }
          {ordersList}
        </Card>
      </div>
    </>
  );
}
export default Orders;
