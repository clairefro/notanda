import { useParams } from "react-router-dom";

const ItemDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Item Detail</h2>
      <p>Viewing details for item ID: {id}</p>
    </div>
  );
};

export default ItemDetailPage;
