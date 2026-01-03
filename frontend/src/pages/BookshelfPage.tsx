import { useEffect, useState } from "react";
import api from "../utils/api";
import { ItemWithAuthors } from "../types";

const BookshelfPage = () => {
  const [items, setItems] = useState<ItemWithAuthors[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.get<ItemWithAuthors[]>("/api/items");
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
        {items.map((item) => (
          <li key={item.id}>
            {item.title} ({item.authors.map((a) => a.name).join(",")})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookshelfPage;
