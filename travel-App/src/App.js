import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  const handlitems = (item) => {
    setItems((items) => [...items, item]);
  };

  return (
    <div className="app">
      <Logo />
      <Form handlitems={handlitems}/>
      <PackageList items={items}/>
      <State />
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({handlitems}) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);


  const handlSubmit = (event) => {
    event.preventDefault();

    if (!description) return null;
    const item = { description, quantity, id: Date.now(), packed: false };
    handlitems(item);


    setDescription("");
    setquantity("");
  };

  return (
    <form className="add-form" onSubmit={handlSubmit}>
      <h3>what do u need for your form</h3>
      <select
        onChange={(e) => {
          setquantity(e.target.value);
        }}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <button>Add</button>
    </form>
  );
}

function Item({ item }) {
  return (
    <li style={item.packed ? { textDecoration: "line-through" } : {}}>
      <span>
        {item.quantity} {item.description}
      </span>
      <button>X</button>
    </li>
  );
}

function PackageList({items}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function State() {
  return (
    <footer>
      <em> You have X items on your list, and you already packed X(X%)</em>
    </footer>
  );
}
export default App;
