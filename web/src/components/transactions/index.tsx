import * as lucide from "lucide-react";

import { Transaction, TransactionResponse } from "@/lib/types/transactions";
import React from "react";
import { Pagination } from "../pagination";
import style from "./transactions-table.module.css";




interface TransactionTableProps {
  transactionResponse: TransactionResponse
}
export function TransactionTable(props: TransactionTableProps) {
  const { transactionResponse } = props

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        height: "100%",
      }}
    >
      <h3>Transactions</h3>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        overflow: "auto",
      }}>
        <table className={style.transactionTable}>
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Descrição</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Tipo</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Valor</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Banco</th>
              <th style={{ textAlign: "start", color: "#666", fontWeight: "normal" }}>Data</th>
            </tr>
          </thead>
          <tbody>
            {transactionResponse.data.map((transaction: Transaction) => (
              (
                <tr key={transaction.id}>
                  <td>
                    <div>
                      {transaction.category.icon in lucide
                        ? React.createElement(lucide[transaction.category.icon as keyof typeof lucide] as React.ElementType)
                        : null}
                    </div>
                  </td>
                  <td>
                    {transaction.description}
                  </td>
                  <td>
                    {transaction.type === "income" ? "Entrada" : "Saída"}
                  </td>
                  <td>
                    {transaction.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    {transaction.bank}
                  </td>
                  <td>
                    {new Date(transaction.date).toLocaleString("pt-BR")}
                  </td>
                </tr>
              )
            ))}

          </tbody>
        </table>
      </div>
      
      <Pagination 
        currentPage={transactionResponse.currentPage}
        perPage={transactionResponse.perPage}
        totalData={transactionResponse.items}
        totalPages={transactionResponse.pages}
      />
    </div>
  )
}
