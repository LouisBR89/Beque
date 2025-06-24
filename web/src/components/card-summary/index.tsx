import { Banknote, BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import style from "./card-summary.module.css";
import { Card } from "./card";

// interface CardSummaryProps {
//   amount: number;

// }


// const cards = [
//   {
//     icon: BanknoteArrowDown,
//     type: "income",
//     amount: 7840.56,
//     description: "Soma de todas as entradas do período",
//   },
//   {
//     icon: BanknoteArrowUp,
//     type: "expense",
//     amount: 1580.45,
//     description: "Soma de todas as saídas do período",
//   },
//   {
//     icon: Banknote,
//     type: "balance",
//     amount: 6260.11,
//     description: "Soma de todas as entradas e saídas do período",
//   }
// ]

export function CardSummary() {


  return (
    <div className={style.container}>

      <Card
        title="Entradas"
        amount={5000}
        description="Soma de todas as entradas"
        icon={BanknoteArrowDown}
        type="income"
      />

      <Card
        title="Saidas"
        amount={1000}
        description="Soma de todas as entradas"
        icon={BanknoteArrowUp}
        type="expense"
      />

      <Card
        title="Balanço"
        amount={4000}
        description="Soma de todas as entradas"
        icon={Banknote}
        type="balance"
      />
    </div>
  );
}
