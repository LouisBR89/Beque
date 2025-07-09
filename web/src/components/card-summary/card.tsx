import style from "./card-summary.module.css";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  amount: number;
  description: string;
  type: "income" | "expense" | "balance";
  icon: LucideIcon;
}

export function Card(props: CardProps) {
  
  return (
    <div className={`${style.card} ${style[props.type]}`}>
      <div className={style.header}>
        <span>{props.title}</span>
        {props.icon && <props.icon strokeWidth={1}/>}
        {/* <BanknoteArrowDown strokeWidth={1} /> */}

      </div>
      <div
        className={`${style.content}`}
      >
        <span>{props.amount.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</span>
      </div>

      <div className={style.footer}>
        <p>{props.description}</p>
      </div>
    </div>
  )
}
