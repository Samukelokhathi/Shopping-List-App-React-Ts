import { useNavigate } from "react-router-dom";
import type { ShoppingList } from "../../types/User";
import Button from "../Button/Button";
import { Text } from "../Text/Text";
import styles from "./ShoppingListCard.module.css";

interface ShoppingListCardProps {
  id: string;
  list: ShoppingList;
  onEdit: (list: ShoppingList) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

const ShoppingListCard = ({
  id,
  list,
  onEdit,
  onDelete,
}: ShoppingListCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => navigate("/shoppingListItems", { state: { id } })}
    >
      <div className={styles.content}>
        <Text variant="h2">{list.name}</Text>

        <Text variant="p">{list.numberOfItems} items</Text>

        {list.note && <Text variant="p">{list.note}</Text>}
      </div>

      <div
        className={styles.actions}
        onClick={(event) => event.stopPropagation()}
      >
        <Button onClick={() => onEdit(list)}>Edit</Button>

        <Button onClick={() => onDelete(list.id)}>Delete</Button>
      </div>
    </div>
  );
};

export default ShoppingListCard;

//navigate and params
