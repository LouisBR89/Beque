import { type LucideIcon } from "lucide-react";
import style from "./category.module.css";

interface CategoryProps {
  categories: {
    id: string;
    icon: LucideIcon;
    name: string;
    quantity: number;
    amount: number;
  }[]
}
export function Category(props: CategoryProps) {
  const { categories } = props
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "350px",
        width: "100%",
        height: "100%",
      }}
    >
      <h3>Categorias</h3>
      <div className={style.categoriesContainer}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={style.category}
          >
            <div>
              <div>
                {cat.icon && < cat.icon />}
              </div>
              <span>{cat.name}</span>
            </div>
            <span>
              {cat.quantity.toLocaleString("pt-BR", {
                style: "decimal",
                minimumFractionDigits: 0,
                currency: "BRL",
              })}
            </span>
            <span>
              {cat.amount.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
