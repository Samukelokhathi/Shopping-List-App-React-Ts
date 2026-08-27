import type { ShoppingList } from "../../types/User";
import Button from "../../ui/Button/Button";
import { Text } from "../../ui/Text/Text";
import styles from "./ShoppingListCard.module.css";

interface ShoppingListCardProps {
  list: ShoppingList;
  onEdit: (list: ShoppingList) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

const ShoppingListCard = ({
  list,
  onEdit,
  onDelete,
  onClick,
}: ShoppingListCardProps) => {
  return (
    <div className={styles.card} onClick={() => onClick(list.id)}>
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
