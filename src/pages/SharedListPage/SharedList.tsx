import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { ShoppingList } from "../../types/User";
import styles from "./SharedListPage.module.css";

export const SharedListPage = () => {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get<ShoppingList>(
          `http://localhost:3000/lists/${id}`,
        );
        setList(res.data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchList();
  }, [id]);

  if (loading) return <div className={styles.center}>Loading...</div>;
  if (notFound || !list)
    return (
      <div className={styles.center}>
        <h2>List not found</h2>
        <p>This shopping list could not be found.</p>
      </div>
    );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{list.name}</h1>
          <p className={styles.subtitle}>Shared shopping list</p>
        </div>
        <div className={styles.info}>
          <div className={styles.badge}>
            <span>Items</span>
            <strong>{list.items.length}</strong>
          </div>
          <div className={styles.badge}>
            <span>Done</span>
            <strong>
              {list.items.filter((i) => i.completed).length}/{list.items.length}
            </strong>
          </div>
        </div>
        {list.note && (
          <p className={styles.notes}>
            <strong>Notes:</strong> {list.note}
          </p>
        )}
        <h2 className={styles.itemsTitle}>Shopping Items</h2>
        {list.items.length === 0 ? (
          <p className={styles.empty}>This list has no items yet.</p>
        ) : (
          <div className={styles.items}>
            {list.items.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.item} ${item.completed ? styles.checked : ""}`}
              >
                <div className={styles.number}>{index + 1}</div>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={styles.itemImage}
                  />
                )}
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemCategory}>{item.category}</p>
                  {item.note && <p className={styles.itemNotes}>{item.note}</p>}
                </div>
                <div className={styles.quantity}>x{item.quantity}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
