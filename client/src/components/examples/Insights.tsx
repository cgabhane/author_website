import Insights from '../Insights'

export default function InsightsExample() {
  const mockInsights = [
    { id: "1", title: "Why Most Cloud Migrations Fail – and How to Fix It" },
    { id: "2", title: "The Rise of AI Agents in Cloud Operations" },
    { id: "3", title: "Sovereign Cloud: Balancing Compliance and Innovation" }
  ]
  
  return <Insights insights={mockInsights} />
}
