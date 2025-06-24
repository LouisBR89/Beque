"use client"

import { CardSummary } from "@/components/card-summary";
import { Category } from "@/components/categories";
import { ChartAnalyze } from "@/components/chart-analyze";
import { Header } from "@/components/header";
import { TransactionTable } from "@/components/transactions";
import { TransactionResponse } from "@/lib/types/transactions";
import { Car, CircleEllipsis, Hamburger, Pill, TreePalm } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// import transactions from "../assets/transactions.json" with { type: "json" };

const categories = [
  {
    id: "1",
    icon: Hamburger,
    name: "Alimentação",
    quantity: 10,
    amount: 100,
  },
  {
    id: "2",
    icon: Car,
    name: "Transporte",
    quantity: 5,
    amount: 50,
  },
  {
    id: "3",
    icon: TreePalm,
    name: "Lazer",
    quantity: 3,
    amount: 30,
  },
  {
    id: "4",
    icon: Pill,
    name: "Saúde",
    quantity: 2,
    amount: 20,
  },
  {
    id: "5",
    icon: CircleEllipsis,
    name: "Educação",
    quantity: 1,
    amount: 10,
  },
]

interface SetSeachParamsProps {
  perPage: number,
  page: number,
  pages: number,
  items: number,
}


export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [transactionsResponse, setTransactionsResponse] = useState<TransactionResponse>({} as TransactionResponse);

  const page = useSearchParams().get('page') || 1;
  const perPage = useSearchParams().get('perPage') || 10;

  const setSearchParams = useCallback((props: SetSeachParamsProps) => {
    const { perPage, page, pages, items } = props;

    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    params.set('perPage', perPage.toString())
    params.set('pages', pages.toString())
    params.set('items', items.toString())
    const url = `${pathname}?${params.toString()}`
    router.push(url)
  }, [searchParams, router, pathname])

  const getTransactions =  useCallback(async ({ page, perPage }: { page: string; perPage: string }) => {
    const response = await fetch(`http://localhost:3333/api/v1/transactions?_page=${page}&_per_page=${perPage}`)
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json() as TransactionResponse;

    
    setTransactionsResponse({ 
      ...data,
      currentPage: Number(page),
      perPage: Number(perPage),
     });

    setSearchParams({
      perPage: Number(perPage),
      page: Number(page),
      pages: data.pages,
      items: data.items
    })
    return data;
  }, [setSearchParams])

  useEffect(() => {
    getTransactions({ page: page.toString(), perPage: perPage.toString() })

  }, [getTransactions, page, perPage])



  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "start",
      alignItems: "start",
      maxWidth: "1000px",
      width: "100%",
      margin: "0 auto",
      padding: "1rem"
    }}>
      <Header />

      <section style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        width: "100%",
        height: "100%",
        maxHeight: "300px",
      }}>
        <CardSummary />
      </section>

      <section style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        width: "100%",
        height: "100%",
        maxHeight: "350px",
      }}>
        <ChartAnalyze />
        <Category categories={categories} />
      </section>

      <section style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        width: "100%",
      }}>
        {transactionsResponse.data && (
          <TransactionTable transactionResponse={transactionsResponse} />
        )}
      </section>
    </main >
  );
}
