import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/Store";
import { getShoppingLists } from "../../store/ShoppingList/ShoppingList";
import { Text } from "../../components/Text/Text";
import style from "./SharedList.module.css";

export const SharedList = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  // FIX: Your slice uses "lists", not "shoppingLists".
  const { lists, isLoading, error } = useSelector(
    (state: RootState) => state.shoppingList,
  );

  // FIX: Your slice stores items inside each shopping list.
  // There is no separate shoppingItem state.
  const user = useSelector((state: RootState) => state.login.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getShoppingLists(user.id));
    }
  }, [dispatch, user?.id]);

  // FIX: Find the list directly from the slice.
  const list = lists.find(
    (shoppingList) => String(shoppingList.id) === String(id),
  );

  // FIX: Items belong to the list.
  // Your slice uses "items", not a separate shoppingItem array.
  const listItems = list?.items ?? [];

  if (isLoading) {
    return (
      <section className={style.page}>
        <div className={style.message}>
          <Text variant="h2">Loading shopping list...</Text>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={style.page}>
        <div className={style.message}>
          <Text variant="h2">Something went wrong</Text>

          <Text variant="p">{error}</Text>
        </div>
      </section>
    );
  }

  if (!list) {
    return (
      <section className={style.page}>
        <div className={style.message}>
          <Text variant="h2">List not found</Text>

          <Text variant="p">This shopping list could not be found.</Text>
        </div>
      </section>
    );
  }

  return (
    <section className={style.page}>
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <Text variant="h1" className={style.title}>
              {list.name}
            </Text>

            <Text variant="p" className={style.subtitle}>
              Shared shopping list
            </Text>
          </div>
        </div>

        <div className={style.info}>
          <div className={style.category}>
            <span>Category</span>

            {/* FIX: Your ShoppingList interface uses "category" only if
                it exists in your current type. If it does not exist,
                remove this field or add it to the interface. */}
          </div>

          <div className={style.count}>
            <span>Items</span>

            {/* FIX: Read the actual items array. */}
            <strong>{listItems.length}</strong>
          </div>
        </div>

        {/* FIX: Your ShoppingList interface uses "note", not "notes". */}
        {list.note && (
          <div className={style.notes}>
            <Text variant="p">
              <strong>Notes:</strong> {list.note}
            </Text>
          </div>
        )}

        <div className={style.itemsSection}>
          <Text variant="h2" className={style.itemsTitle}>
            Shopping Items
          </Text>

          {listItems.length === 0 ? (
            <div className={style.empty}>
              <Text variant="p">This list has no items yet.</Text>
            </div>
          ) : (
            <div className={style.items}>
              {listItems.map((item, index) => (
                <div key={item.id} className={style.item}>
                  <div className={style.number}>{index + 1}</div>

                  {/* FIX: Your ListItem interface uses "imageUrl",
                      not "image". */}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className={style.itemImage}
                    />
                  )}

                  <div className={style.itemInfo}>
                    <Text variant="h3" className={style.itemName}>
                      {item.name}
                    </Text>

                    <Text variant="p" className={style.itemCategory}>
                      {item.category}
                    </Text>

                    {/* FIX: Your ListItem interface uses "note",
                        not "notes". */}
                    {item.note && (
                      <Text variant="p" className={style.itemNotes}>
                        {item.note}
                      </Text>
                    )}
                  </div>

                  <div className={style.quantity}>x{item.quantity}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
