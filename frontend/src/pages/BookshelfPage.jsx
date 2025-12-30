import { useEffect, useState } from "react";
import api from "../utils/api";

const BookshelfPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.get("/api/items");
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Bookshelf</h2>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.title} ({item.authors.map((a) => a.name).join(",")})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookshelfPage;
