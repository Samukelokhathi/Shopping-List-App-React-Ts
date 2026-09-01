import Button from "../Button/Button";
import { Text } from "../Text/Text";
import styles from "./ItemCard.module.css";
import type { ListItem } from "../../types/User";

interface ItemCardProps {
  item: ListItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const ItemCard = ({
  item,
  onEdit,
  onDelete,
  onToggleComplete,
}: ItemCardProps) => {
  return (
    <div className={`${styles.card} ${item.completed ? styles.completed : ""}`}>
      <div className={styles.content}>
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.itemImage}
          />
        )}
        <Text variant="h2">{item.name}</Text>
        {item.category && <Text variant="p">Category: {item.category}</Text>}
        <Text variant="p">Quantity: {item.quantity}</Text>
        {item.note && <Text variant="p">Note: {item.note}</Text>}
      </div>

      <div
        className={styles.actions}
        onClick={(event) => event.stopPropagation()}
      >
        <Button type="button" onClick={() => onToggleComplete(item.id)}>
          {item.completed ? "Uncheck" : "Check"}
        </Button>
        <Button onClick={() => onEdit(item.id)}>Edit</Button>
        <Button onClick={() => onDelete(item.id)}>Delete</Button>
      </div>
    </div>
  );
};

export default ItemCard;
