"use client"

// import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "Janeiro", expeses: 186 },
  { month: "Fevereiro", expeses: 305 },
  { month: "Março", expeses: 237 },
  { month: "Abril", expeses: 73 },
  { month: "Maio", expeses: 209 },
  { month: "Junho", expeses: 214 },
  { month: "Julho", expeses: 214 },
  { month: "Agosto", expeses: 214 },
  { month: "Outubro", expeses: 214 },
  { month: "Novembro", expeses: 214 },
  { month: "Dezembro", expeses: 214 },
]

const chartConfig = {
  expeses: {
    label: "Gastos",
    color: "black",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card className="border-none">
      {/* <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar 
              className="hover:fill-[var(--primary)] hover:transition-all"
              dataKey="expeses" 
              fill="var(--color-expeses)" 
              radius={5}
              
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
