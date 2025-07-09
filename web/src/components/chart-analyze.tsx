import { Chart } from "./chart";

export function ChartAnalyze() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
      height: "100%",
    }}>
      <h3>Gráfico de Análise</h3>
      <div>
        <Chart />
      </div>
    </div>
  )
}
