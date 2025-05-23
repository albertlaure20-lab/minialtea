import React, { useState, useEffect } from 'react';

const initialProducts = [
  { id: 1, name: 'Classic Milk Tea', price: 100, category: 'Milk Tea', stock: 10 },
  { id: 2, name: 'Taro Milk Tea', price: 100, category: 'Milk Tea', stock: 8 },
  { id: 3, name: 'Matcha Milk Tea', price: 100, category: 'Milk Tea', stock: 7 },
  { id: 4, name: 'Watermelon Milk Tea', price: 150, category: 'Milk Tea', stock: 6 },
  { id: 5, name: 'Thai Milk Tea', price: 150, category: 'Milk Tea', stock: 5 },
  { id: 6, name: 'Okinawa Milk Tea', price: 150, category: 'Milk Tea', stock: 4 },
  { id: 7, name: 'Honeydew Milk Tea', price: 100, category: 'Milk Tea', stock: 9 },
  { id: 8, name: 'Brown Sugar Milk Tea', price: 100, category: 'Milk Tea', stock: 10 },
  { id: 9, name: 'Strawberry Milk Tea', price: 150, category: 'Fruit Tea', stock: 6 },
  { id: 10, name: 'Mango Milk Tea', price: 150, category: 'Fruit Tea', stock: 5 },
];

export default function Dashboard({ user, onLogout }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addOrder = (product) => {
    if (product.stock <= 0) return alert('Item out of stock');

    setProducts(products.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));
    const newOrder = { ...product, time: new Date() };
    setOrders([...orders, newOrder]);
    setHistory([...history, newOrder]);
  };

  const cancelOrder = (index) => {
    const product = orders[index];
    setProducts(products.map(p =>
      p.id === product.id ? { ...p, stock: p.stock + 1 } : p
    ));
    setOrders(orders.filter((_, i) => i !== index));
  };

  const total = orders.reduce((sum, item) => sum + item.price, 0);

  const groupedByCategory = products.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2 className="brand">WELCOME TO MINI ALTEA</h2>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
        </ul>
      </nav>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>HELLO HAVE A NICE DAY!</h1>
            <small>{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</small>
          </div>
          <button className="logout-btn" onClick={onLogout}>Log Out</button>
        </header>

        <section className="store-info">
          <h2>Store Details</h2>
          <p><strong>Owner:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </section>

        <section className="products">
          <h2>Milk Tea Products</h2>
          {Object.entries(groupedByCategory).map(([category, items]) => (
            <article key={category} className="product-category">
              <h3>{category}</h3>
              <div className="product-list">
                {items.map(product => (
                  <div key={product.id} className="product-card">
                    <h4>{product.name}</h4>
                    <p>₱{product.price.toFixed(2)}</p>
                    <p>Stock: {product.stock}</p>
                    <button 
                      onClick={() => addOrder(product)} 
                      disabled={product.stock <= 0}
                      className={product.stock <= 0 ? 'disabled-btn' : 'add-btn'}
                    >
                      {product.stock <= 0 ? 'Out of Stock' : 'Add to Order'}
                    </button>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="orders">
          <h2>Current Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="order-list">
              {orders.map((order, index) => (
                <div key={index} className="order-card">
                  <p>{order.name} - ₱{order.price.toFixed(2)}</p>
                  <button className="cancel-btn" onClick={() => cancelOrder(index)}>Cancel</button>
                </div>
              ))}
            </div>
          )}
          <h3>Total: ₱{total.toFixed(2)}</h3>
        </section>

        <section className="billing">
          <h2>Billing</h2>
          <p>Total Orders: {history.length}</p>
          <p>Total Income: ₱{history.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
        </section>

        <section className="history">
          <h2>Customer Order History</h2>
          {history.length === 0 ? (
            <p>No past orders</p>
          ) : (
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  {item.name} - ₱{item.price.toFixed(2)} ({new Date(item.time).toLocaleTimeString()})
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
