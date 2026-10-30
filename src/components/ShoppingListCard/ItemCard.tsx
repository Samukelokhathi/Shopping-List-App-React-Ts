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
      <div className={styles.imageCol}>
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.itemImage}
          />
        ) : (
          <div className={styles.itemImagePlaceholder}>IMG</div>
        )}
      </div>

      <div className={styles.infoCol}>
        <div className={styles.headerRow}>
          <Text variant="h2" className={styles.name}>
            {item.name}
          </Text>

          <div className={styles.meta}>
            {item.category && (
              <Text variant="p" className={styles.metaItem}>
                Category: <span>{item.category}</span>
              </Text>
            )}
            <Text variant="p" className={styles.metaItem}>
              Quantity: <span>{item.quantity}</span>
            </Text>
          </div>
        </div>

        {item.note && (
          <Text variant="p" className={styles.note}>
            Note: {item.note}
          </Text>
        )}

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
    </div>
  );
};

export default ItemCard;
